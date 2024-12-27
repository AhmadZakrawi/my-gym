import React from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import TopBar from "./components/TopBar.jsx";
import AddNew from "./components/AddNew.jsx";

import TableList from "./components/TableList.jsx";
import { AddNewTopBar } from "./components/AddNew.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import IconButton from "@mui/material/IconButton";
import ExtendMembershipDialog from "../reports/components/ExtendMembershipDialog.jsx";
import MenuListButton from "../reports/components/MenuListButton.jsx";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import StopIcon from "@mui/icons-material/Stop";
import { useMembers } from "../hooks/useMembers.jsx";
import { useMemberships } from "../hooks/useMemberships.jsx";
import Alert from "@mui/material/Alert";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useTasks } from "../hooks/useTasks.jsx";


export default function Members() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [fullName, setFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [membershipId, setMembershipId] = React.useState("");
  const [allMembers, setAllMembers] = React.useState([]);
  const [allMemberships, setAllMemberships] = React.useState([]);

  const {userdata, dispatch} = useAuthContext()
  const {completeTask} = useTasks()

  const {
    getMembers,
    addMember,
    addLoading,
    getLoading,
    getError,
    deleteMember,
  } = useMembers();

  const { getAllMemberships } = useMemberships();

  const resetAddFormStates = () => {
    setFullName("");
    setMembershipId("");
    setGender("");
  };

  const getAllMembers = async () => {
    let members = await getMembers();

    members = members.map((member) => {
      return {
        ...member,
        registered: moment(new Date(member.registered)).format(
          "MMMM Do YYYY, HH:mm"
        ),
      };
    });
    setAllMembers(members);
  };

  const getAllTheMemberships = async () => {
    let memberships = await getAllMemberships();

    setAllMemberships(memberships);
  };

  React.useEffect(() => {
    getAllMembers();
    getAllTheMemberships();
  }, []);

  const addMemberClicked = async () => {
    const newMember = await addMember(fullName, gender, null, null, membershipId);
    async function completeTheTask() {
      console.log("user data tasks", userdata.tasks)
      const allTasks = [...userdata?.tasks]
      const filteredTask = allTasks.filter(task => {return task.order == 3})
      if (!filteredTask[0].completed) {
        const taskId = filteredTask[0].id
        const res = await completeTask(taskId, "member")
        let updatedTasks = allTasks.map(task => {
          if (task.order === 3) return {...task, completed: true}
          else return task
        })
  
        dispatch({ type: "TASK_COMPLETED", payload: {...userdata, tasks: updatedTasks} });
        localStorage.setItem("userdata", JSON.stringify({...userdata, tasks: updatedTasks}));
        console.log("complete task res: ", res)
      }
    }
    if (newMember) {
      resetAddFormStates();
      setAllMembers([
        ...allMembers,
        {
          ...newMember,
          registered: moment(new Date(newMember.registered)).format(
            "MMMM Do YYYY, HH:mm"
          ),
        },
      ]);

      completeTheTask()
    }
  };

  

  const deleteClick = async (id, fullName) => {
    //REMINDER: i'm passing the fullName in order to show it on the delete success message
    await deleteMember(id, fullName);
    await getAllMembers();

    //TODO: use the filter method on the state directly
    //cause its not effective to query the database everytime a member is delete
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
      minWidth: 200,
    },
    {
      field: "registered",
      headerName: "Registered",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
      minWidth: 200,
    },
    {
      field: "email",
      headerName: "Email",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 250,
      minWidth: 220,
    },
    {
      field: "phone",
      headerName: "Phone",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 100,
      maxWidth: 220,
    },
    {
      field: "membership.name",
      headerName: "Membership",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
      minWidth: 130,
    },
    {
      field: "expire",
      headerName: "Expire",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 100,
      maxWidth: 220,
    },
    {
      field: "debt",
      headerName: "Membership Debt",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      sortable: false,
      disableClickEventBubbling: true,
      flex: 1,
      minWidth: 100,
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
      <TopBar name="Members" toggleDrawer={toggleDrawer} />

      <AddNew isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
        <AddNewTopBar
          toggleDrawer={toggleDrawer}
          clickAction={addMemberClicked}
          loading={addLoading}
        />

        <Divider />

        <Box component="form" className="my-4 ">
          <TextField
            fullWidth
            label="Full name"
            id="name"
            size="small"
            sx={{ mb: 2 }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {allMemberships?.length > 0 ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="membershiptype">Membership</InputLabel>
              <Select
                labelId="membershipid"
                id="membershipselect"
                value={membershipId}
                label="Membership"
                onChange={(e) => setMembershipId(e.target.value)}
              >
                {allMemberships.map((memb) => (
                  <MenuItem value={memb.id}>{memb.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}

          <ToggleButtonGroup
            value={gender}
            exclusive
            onChange={(e) => setGender(e.target.value)}
            size="small"
            sx={{ mt: allMemberships.length > 0 ? 2 : 0 }}
            fullWidth
          >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </AddNew>

      {getError ? (
        <Alert sx={{ mt: 3 }} severity="error" variant="filled">
          {getError}
        </Alert>
      ) : (
        <TableList columns={columns} rows={allMembers} name="Members" loading={getLoading}/>
      )}

      <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
    </>
  );
}

function ActionButtons({ id, fullName, deleteClick }) {
  const [extendMembershipOpen, setExtendMembershipOpen] = React.useState(false);
  const [moreOptionsMenuAnchor, setMoreOptionsMenuAnchor] =
    React.useState(null);

  const deleteMemberClicked = async () => {
    setMoreOptionsMenuAnchor(null);

    await deleteClick(id, fullName);
  };

  return (
    <>
      <IconButton
        aria-label="extend membership"
        onClick={() => setExtendMembershipOpen(true)}
      >
        <AccessTimeIcon />
      </IconButton>
      ,
      <IconButton
        aria-label="more options"
        onClick={(e) => setMoreOptionsMenuAnchor(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <ExtendMembershipDialog
        memberName="Ala BEN"
        oldMembership="SILVER"
        expireDate="21/08/2023"
        open={extendMembershipOpen}
        setOpen={setExtendMembershipOpen}
      />
      <MenuListButton
        anchorEl={moreOptionsMenuAnchor}
        setAnchorEl={setMoreOptionsMenuAnchor}
      >
        <MenuItem onClick={() => setMoreOptionsMenuAnchor(null)}>
          <ListItemIcon>
            <ZoomInIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Show profile</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => setMoreOptionsMenuAnchor(null)}>
          <ListItemIcon>
            <StopIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Stop membership</ListItemText>
        </MenuItem>

        <MenuItem onClick={deleteMemberClicked}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuListButton>
    </>
  );
}
