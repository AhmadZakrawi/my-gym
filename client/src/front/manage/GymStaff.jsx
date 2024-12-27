import React from "react";
import AddNew, { AddNewTopBar } from "./components/AddNew.jsx";
import { TextField, Divider, Box } from "@mui/material";
import DatePicker from "./components/DatePicker.jsx";
import TableList from "./components/TableList.jsx";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import TopBar from "./components/TopBar.jsx";
import { useGymStaff } from "../hooks/useGymStaff.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuListButton from "../reports/components/MenuListButton.jsx";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

import dayjs from "dayjs";

export default function GymStaf() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [fullName, setFullName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [joined, setJoined] = React.useState(dayjs());
  const [birthday, setBirthday] = React.useState(dayjs());

  const [allCoaches, setAllCoaches] = React.useState([]);

  const {
    getGymStaff,
    addGymStaff,
    deleteGymStaff,
    addLoading,
    getLoading,
    getError,
  } = useGymStaff();

  const resetAddFormStates = () => {
    setFullName("");
    setRole("");
    setGender("");
    setEmail("");
    setPhone("");
    setJoined(dayjs());
    setBirthday(dayjs());
  };

  const getAllCoaches = async () => {
    let gymstaff = await getGymStaff();

    gymstaff = gymstaff.map((gs) => {
      return {
        ...gs,
        joined: moment(new Date(gs.joined)).format("MMMM Do YYYY"),
        birthday: moment(new Date(gs.birthday)).format("MMMM Do YYYY"),
      };
    });
    setAllCoaches(gymstaff);
  };

  React.useEffect(() => {
    getAllCoaches();
  }, []);

  const addCoachClicked = async () => {
    const newGymStaff = await addGymStaff(
      fullName,
      gender,
      role,
      email,
      phone,
      joined,
      birthday
    );

    if (newGymStaff) {
      resetAddFormStates();
      setAllCoaches([
        ...allCoaches,
        {
          ...newGymStaff,
          joined: moment(new Date(newGymStaff.joined)).format("MMMM Do YYYY"),
          birthday: moment(new Date(newGymStaff.birthday)).format(
            "MMMM Do YYYY"
          ),
        },
      ]);
    }
  };

  const deleteClick = async (id, fullName) => {
    //REMINDER: i'm passing the fullName in order to show it on the delete success message
    await deleteGymStaff(id, fullName);
    await getAllCoaches();

    //TODO: use the filter method on the state directly
    //cause its not effective to query the database everytime a member is delete
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };
  const columns = [
    { field: "fullName", headerName: "Full Name", disableColumnMenu: true, flex: 1, maxWidth: 220,minWidth: 150  },
    { field: "gender", headerName: "Gender", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "role", headerName: "Role", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "phone", headerName: "Phone", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "email", headerName: "Email", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 220 },
    { field: "joined", headerName: "Join Date", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 140 },
    { field: "birthday", headerName: "Date of Birth", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 140 },
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

  return (
    <>
      <>
        <TopBar name="Gym staff" toggleDrawer={toggleDrawer} />

        <AddNew isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
          <AddNewTopBar
            toggleDrawer={toggleDrawer}
            clickAction={addCoachClicked}
            loading={addLoading}
          />

          <Divider />

          <Box component="form" className="my-4 ">
            <div className="my-4 flex gap-3">
              <TextField
                fullWidth
                label="Full name"
                id="fullName"
                size="small"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <ToggleButtonGroup
                value={gender}
                exclusive
                onChange={(e) => setGender(e.target.value)}
                size="small"
                fullWidth
              >
                <ToggleButton value="male">Male</ToggleButton>
                <ToggleButton value="female">Female</ToggleButton>
              </ToggleButtonGroup>
            </div>

            <div className="my-4 flex gap-3">
              <TextField
                fullWidth
                label="Role"
                id="role"
                size="small"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <TextField
                fullWidth
                label="Phone Number"
                id="phone"
                size="small"
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="my-4 flex gap-3">
              <TextField
                fullWidth
                label="Email"
                id="email"
                size="small"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-4">
              <DatePicker
                label="Joined date"
                value={joined}
                onChange={(newValue) => setJoined(newValue)}
              />
            </div>
            <div className="my-4">
              <DatePicker
                label="Date of Birth"
                value={birthday}
                onChange={(newValue) => setBirthday(newValue)}
              />
            </div>
          </Box>
        </AddNew>

        {getError ? (
          <Alert sx={{ mt: 3 }} severity="error" variant="filled">
            {getError}
          </Alert>
        ) : (
          <TableList columns={columns} rows={allCoaches} name="Gym staff" loading={getLoading} />
        )}

        <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
      </>
    </>
  );
}

function ActionButtons({ id, fullName, deleteClick }) {
  const [moreOptionsMenuAnchor, setMoreOptionsMenuAnchor] =
    React.useState(null);

  const deleteCoachClicked = async () => {
    setMoreOptionsMenuAnchor(null);
    await deleteClick(id, fullName);
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
        <MenuItem onClick={deleteCoachClicked}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuListButton>
    </>
  );
}
