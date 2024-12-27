import React from "react";
import AddNew, { AddNewTopBar } from "./components/AddNew.jsx";
import { TextField, Divider, Box } from "@mui/material";

import TableList from "./components/TableList.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import TopBar from "./components/TopBar.jsx";
import { usePrograms } from "../hooks/usePrograms.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuListButton from "../reports/components/MenuListButton.jsx";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useTasks } from "../hooks/useTasks.jsx";


export default function Programs() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [allPrograms, setAllPrograms] = React.useState([]);

  const {
    addProgram,
    getPrograms,
    deleteProgram,
    addLoading,
    getLoading,
    getError,
  } = usePrograms();

  const {userdata, dispatch} = useAuthContext()
  const {completeTask} = useTasks()

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const resetAddFormStates = () => {
    setName("");
  };

  const getAllPrograms = async () => {
    let programs = await getPrograms();

    programs = programs?.map((program) => {
      return {
        ...program,
      };
    });

    setAllPrograms(programs);
  };

  React.useEffect(() => {
    getAllPrograms();
  }, []);

  const addProgramClicked = async () => {
    const newProgram = await addProgram(name);

    async function completeTheTask() {
      console.log("user data tasks", userdata.tasks)
      const allTasks = [...userdata?.tasks]
      const filteredTask = allTasks.filter(task => {return task.order == 4})
      if (!filteredTask[0].completed) {
        const taskId = filteredTask[0].id
        const res = await completeTask(taskId, "class program")
        let updatedTasks = allTasks.map(task => {
          if (task.order === 4) return {...task, completed: true}
          else return task
        })
  
        dispatch({ type: "TASK_COMPLETED", payload: {...userdata, tasks: updatedTasks} });
        localStorage.setItem("userdata", JSON.stringify({...userdata, tasks: updatedTasks}));
        console.log("complete task res: ", res)
      }
    }

    if (newProgram) {
      resetAddFormStates();
      setAllPrograms([
        ...allPrograms,
        {
          ...newProgram,
        },
      ]);
      completeTheTask()
    }
  };

  

  const deleteClick = async (id, name) => {
    //REMINDER: i'm passing the name in order to show it on the delete success message
    await deleteProgram(id, name);
    await getAllPrograms();

    //TODO: use the filter method on the state directly
    //cause its not effective to query the database everytime a member is delete
  };

  const columns = [
    { field: "name", headerName: "Program Name", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 180 },
    {
      field: "actions",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      headerName: "Actions",
      sortable: false,
      disableClickEventBubbling: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <ActionButtons
            id={params.row.id}
            name={params.row.name}
            deleteClick={deleteClick}
          />
        );
      },
    },
  ];

  return (
    <>
      <>
        <TopBar name="Programs" toggleDrawer={toggleDrawer} />

        <AddNew isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
          <AddNewTopBar
            toggleDrawer={toggleDrawer}
            clickAction={addProgramClicked}
            loading={addLoading}
          />

          <Divider />

          <Box component="form" className="my-4 ">
            <TextField
              fullWidth
              label="Program Name"
              id="name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
        </AddNew>
        {getError ? (
          <Alert sx={{ mt: 3 }} severity="error" variant="filled">
            {getError}
          </Alert>
        ) : (
          <TableList columns={columns} rows={allPrograms} name="Programs" loading={getLoading}/>
        )}

        <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
      </>
    </>
  );
}

function ActionButtons({ id, name, deleteClick }) {
  const [moreOptionsMenuAnchor, setMoreOptionsMenuAnchor] =
    React.useState(null);

  const deleteProgramClicked = async () => {
    setMoreOptionsMenuAnchor(null);
    await deleteClick(id, name);
  };

  return (
    <>
      <IconButton
        aria-label="more options"
        onClick={(e) => setMoreOptionsMenuAnchor(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <MenuListButton
        anchorEl={moreOptionsMenuAnchor}
        setAnchorEl={setMoreOptionsMenuAnchor}
      >
        <MenuItem onClick={deleteProgramClicked}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuListButton>
    </>
  );
}
