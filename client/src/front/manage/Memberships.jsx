import React from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import TopBar from "./components/TopBar.jsx";
import AddNew from "./components/AddNew.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import TableList from "./components/TableList.jsx";
import { AddNewTopBar } from "./components/AddNew.jsx";

import { useMemberships } from "../hooks/useMemberships.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuListButton from "../reports/components/MenuListButton.jsx";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useTasks } from "../hooks/useTasks.jsx";

export default function Memberships() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [allMemberships, setAllMemberships] = React.useState([]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [type, setType] = React.useState("");
  const [periodQuantity, setPeriodQuantity] = React.useState("");
  const [periodType, setPeriodType] = React.useState("");
  const [sessions, setSessions] = React.useState("");
  const [classes, setClasses] = React.useState("");
  
  const {userdata, dispatch} = useAuthContext()
  const {completeTask} = useTasks()

  const {
    addMembership,
    getAllMemberships,
    deleteMembership,
    addLoading,
    getLoading,
    getError,
  } = useMemberships();

  const resetAddFormStates = () => {
    setName("");
    setPrice("");
    setType("");
    setPeriodQuantity("");
    setPeriodType("");
    setSessions("");
    setClasses("");
  };

  const getAllTheMemberships = async () => {
    let memberships = await getAllMemberships();

    memberships = memberships.map((membership) => {
      return {
        ...membership,
      };
    });
    setAllMemberships(memberships);
  };

  React.useEffect(() => {
    getAllTheMemberships();
  }, []);

  const addMembershipClicked = async () => {
    if (!type) {
      toast.error("All fields are required", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2500,
        closeOnClick: true,
      });
      return;
    }
    if (type === "time") {
      if (!periodQuantity || !periodType) {
        toast.error("All fields are required", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return;
      }
    }
    if (type === "session") {
      if (!sessions) {
        toast.error("All fields are required", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return;
      }
    }
    const newMembership = await addMembership(
      name,
      price,
      type,
      periodQuantity,
      periodType,
      sessions,
      classes
    );

    async function completeTheTask() {
      console.log("user data tasks", userdata.tasks)
      const allTasks = [...userdata?.tasks]
      const filteredTask = allTasks.filter(task => {return task.order == 2})
      if (!filteredTask[0].completed) {
        const taskId = filteredTask[0].id
        const res = await completeTask(taskId, "membership")
        let updatedTasks = allTasks.map(task => {
          if (task.order === 2) return {...task, completed: true}
          else return task
        })

        dispatch({ type: "TASK_COMPLETED", payload: {...userdata, tasks: updatedTasks} });
        localStorage.setItem("userdata", JSON.stringify({...userdata, tasks: updatedTasks}));
        console.log("complete task res: ", res)
      }
    }

    if (newMembership) {
      resetAddFormStates();

      setAllMemberships([
        ...allMemberships,
        {
          ...newMembership,
        },
      ]);

      completeTheTask()
    }
  };

  const deleteClick = async (id, name) => {
    //REMINDER: i'm passing the name in order to show it on the delete success message
    await deleteMembership(id, name);
    await getAllTheMemberships();

    //TODO: use the filter method on the state directly
    //cause its not effective to query the database everytime a member is delete
  };

  const columns = [
    // SHOW USAGE BY GETTING THE NUMBER OF MEMBERS WHO USE CERTAIN MEMBERSHIP
    { field: "name", headerName: "Name", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "price", headerName: "Price", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "length", headerName: "Length", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "type", headerName: "Type", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "periodType", headerName: "Period Type", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "periodQuantity", headerName: "Period Quantity", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 120 },
    { field: "sessions", headerName: "N° of Sessions", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 120 },
    { field: "classes", headerName: "Access to Classes", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 140 },
    { field: "usage", headerName: "Usage", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    {
      field: "actions",
      headerName: "Actions",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <>
      <TopBar name="Memberships" toggleDrawer={toggleDrawer} />

      <AddNew isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
        <AddNewTopBar
          toggleDrawer={toggleDrawer}
          clickAction={addMembershipClicked}
          loading={addLoading}
        />

        <Divider />

        <Box component="form" className="my-4 ">
          <TextField
            fullWidth
            label="Name"
            id="name"
            size="small"
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Price(TND)"
            id="price"
            size="small"
            type="number"
            sx={{ mb: 2 }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <FormControl size="small" fullWidth>
            <InputLabel id="membershiptype">Membership type</InputLabel>
            <Select
              labelId="membershiptype"
              id="membershiptypeselect"
              value={type}
              label="Membership type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="time">Time based</MenuItem>
              <MenuItem value="session">Session based</MenuItem>
            </Select>
          </FormControl>

          {type === "time" ? (
            <div className="my-4 flex gap-3">
              <TextField
                fullWidth
                label="Period quantity"
                id="periodquantity"
                size="small"
                type="number"
                value={periodQuantity}
                onChange={(e) => setPeriodQuantity(e.target.value)}
              />
              <ToggleButtonGroup
                value={periodType}
                exclusive
                onChange={(e) => setPeriodType(e.target.value)}
                size="small"
              >
                <ToggleButton value="day">Day</ToggleButton>
                <ToggleButton value="month">Month</ToggleButton>
              </ToggleButtonGroup>
            </div>
          ) : null}

          {type === "session" ? (
            <TextField
              fullWidth
              label="How many sessions?"
              id="sessionsnumber"
              size="small"
              type="number"
              sx={{ mb: 2, mt: 2 }}
              value={sessions}
              onChange={(e) => setSessions(e.target.value)}
            />
          ) : null}

          <FormControl size="small" fullWidth sx={{ mb: 2, mt: !type ? 2 : 0 }}>
            <InputLabel id="accesstoclasses">Access to classes</InputLabel>
            <Select
              labelId="accesstoclasses"
              id="accesstoclassesselect"
              value={classes}
              label="Access to classes"
              onChange={(e) => setClasses(e.target.value)}
            >
              <MenuItem value="no_classes">No Classes</MenuItem>
              <MenuItem value="all_classes">All Classes</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </AddNew>

      {getError ? (
        <Alert sx={{ mt: 3 }} severity="error" variant="filled">
          {getError}
        </Alert>
      ) : (
        <TableList columns={columns} rows={allMemberships} name="Memberships" loading={getLoading}/>
      )}

      <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
    </>
  );
}

function ActionButtons({ id, name, deleteClick }) {
  const [moreOptionsMenuAnchor, setMoreOptionsMenuAnchor] =
    React.useState(null);

  const deleteMembershipClicked = async () => {
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
        <MenuItem onClick={deleteMembershipClicked}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem onClick={''}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      </MenuListButton>
    </>
  );
}
