import React from "react";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import TopBar from "./components/TopBar.jsx";
import AddNew from "./components/AddNew.jsx";
import SelectWithCheckmarks from "./components/SelectWithCheckmarks.jsx";
import TimePicker from "./components/TimePicker.jsx";
import TableList from "./components/TableList.jsx";
import DatePicker from "./components/DatePicker.jsx";
import { AddNewTopBar } from "./components/AddNew.jsx";

import RepeatTwoToneIcon from "@mui/icons-material/RepeatTwoTone";
import RepeatOneTwoToneIcon from "@mui/icons-material/RepeatOneTwoTone";

import { useClasses } from "../hooks/useClasses.jsx";
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
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import moment from "moment";
import { useAuthContext } from "../hooks/useAuthContext.jsx";
import { useTasks } from "../hooks/useTasks.jsx";

export default function Classes() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const [program, setProgram] = React.useState("");
  const [type, setType] = React.useState("");
  const [startTime, setStartTime] = React.useState(dayjs());
  const [endTime, setEndTime] = React.useState(dayjs());
  const [startDate, setStartDate] = React.useState(dayjs());
  const [endDate, setEndDate] = React.useState(dayjs());
  const [maxMembers, setMaxMembers] = React.useState("");
  const [reccuringDays, setReccuringDays] = React.useState([]);

  const [allPrograms, setAllPrograms] = React.useState([]);
  const [recurrentClasses, setRecurrentClasses] = React.useState([]);
  const [onetimeClasses, setOnetimeClasses] = React.useState([]);

  const {userdata, dispatch} = useAuthContext()
  const {completeTask} = useTasks()
  

  const { getPrograms } = usePrograms();
  const {
    addClass,
    getClasses,
    deleteClass,
    addLoading,
    getLoading,
    getError,
  } = useClasses();

  const [tabValue, setTabValue] = React.useState("1");

  const getAllPrograms = async () => {
    let programs = await getPrograms();
    setAllPrograms(programs);
  };

  React.useEffect(() => {
    getAllPrograms();
  }, []);

  const resetAddFormStates = () => {
    setProgram("");
    setType("");
    setStartTime(dayjs());
    setEndTime(dayjs());
    setStartDate(dayjs());
    setMaxMembers("");
    setReccuringDays([]);
  };

  const getAllTheClasses = async () => {
    let classes = await getClasses();

    classes = classes?.map((daClass) => {
      return {
        ...daClass,
      };
    });

    let recurrent = classes.filter((c) => c.type === "recurrent");
    recurrent = recurrent.map((r) => {
      return {
        ...r,
        startTime: moment(r.startTime).format("h:mm a"),
        endTime: moment(r.endTime).format("h:mm a"),
        startDate: moment(r.startDate).format("MMMM Do YYYY"),
        endDate: moment(r.endDate).format("MMMM Do YYYY"),
      };
    });
    let onetime = classes.filter((c) => c.type === "onetime");
    onetime = onetime.map((o) => {
      return {
        ...o,
        startTime: moment(o.startTime).format("h:mm a"),
        endTime: moment(o.endTime).format("h:mm a"),
        startDate: moment(o.startDate).format("MMMM Do YYYY"),
      };
    });
    setRecurrentClasses(recurrent);
    setOnetimeClasses(onetime);
  };

  React.useEffect(() => {
    getAllTheClasses();
  }, []);

  const addClassClicked = async () => {
    const newClass = await addClass(
      program,
      type,
      startTime,
      endTime,
      startDate,
      endDate,
      maxMembers,
      reccuringDays
    );

    async function completeTheTask() {
      console.log("user data tasks", userdata.tasks)
      const allTasks = [...userdata?.tasks]
      const filteredTask = allTasks.filter(task => {return task.order == 5})
      if (!filteredTask[0].completed) {
        const taskId = filteredTask[0].id
        const res = await completeTask(taskId, "class")
        let updatedTasks = allTasks.map(task => {
          if (task.order === 5) return {...task, completed: true}
          else return task
        })
  
        dispatch({ type: "TASK_COMPLETED", payload: {...userdata, tasks: updatedTasks} });
        localStorage.setItem("userdata", JSON.stringify({...userdata, tasks: updatedTasks}));
        console.log("complete task res: ", res)
      }
    }
  

    if (newClass) {
      resetAddFormStates();
      if (newClass.type === "onetime") {
        setOnetimeClasses([
          ...onetimeClasses,
          {
            ...newClass,
            startTime: moment(newClass.startTime).format("h:mm a"),
            endTime: moment(newClass.endTime).format("h:mm a"),
            startDate: moment(newClass.startDate).format("MMMM Do YYYY"),
          },
        ]);
      } else {
        setRecurrentClasses([
          ...recurrentClasses,
          {
            ...newClass,
            startTime: moment(newClass.startTime).format("h:mm a"),
            endTime: moment(newClass.endTime).format("h:mm a"),
            startDate: moment(newClass.startDate).format("MMMM Do YYYY"),
            endDate: moment(r.endDate).format("MMMM Do YYYY"),
          },
        ]);
      }

      completeTheTask()
    }
  };

  
  const deleteClick = async (id) => {
    //REMINDER: i'm passing the name in order to show it on the delete success message
    await deleteClass(id);
    await getAllTheClasses();

    //TODO: use the filter method on the state directly
    //cause its not effective to query the database everytime a member is delete
  };

  const daysData = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const recurrentColumns = [
    {
      field: "program.name",
      headerName: "Program",
      disableColumnMenu: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      disableColumnMenu: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "endTime",
      headerName: "End Time",
      disableColumnMenu: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      disableColumnMenu: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      disableColumnMenu: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "maxMembers",
      headerName: "Maximum Members",
      disableColumnMenu: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "reccuringDays",
      headerName: "Reccuring Days",
      disableColumnMenu: true,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "actions",
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

  const oneTimeColumns = [
    {
      field: "program.name",
      headerName: "Program",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
      minWidth: 150,
    },
    {
      field: "endTime",
      headerName: "End Time",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
      minWidth: 150,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      disableColumnMenu: true,
      flex: 1,
      maxWidth: 220,
    },
    {
      field: "maxMembers",
      headerName: "Maximum Members",
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
      <TopBar name="Classes" toggleDrawer={toggleDrawer} />

      <AddNew isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
        <AddNewTopBar
          toggleDrawer={toggleDrawer}
          clickAction={addClassClicked}
          loading={addLoading}
        />

        <Divider />

        <Box component="form" className="my-4 ">
          {allPrograms.length > 0 ? (
            <>
              <FormControl size="small" fullWidth sx={{ mb: 2 }}>
                <InputLabel id="selectprogram">Select program</InputLabel>
                <Select
                  labelId="selectprogram"
                  id="selectprogramselect"
                  value={program}
                  label="Select program"
                  onChange={(e) => setProgram(e.target.value)}
                >
                  {allPrograms.map((prog) => (
                    <MenuItem value={prog.id}>{prog.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/*
              <FormControl size="small" fullWidth sx={{ mb: 2 }}>
                <InputLabel id="selectcoach">Select coach</InputLabel>
                <Select
                  labelId="selectcoach"
                  id="selectcoachselect"
                  value={""}
                  label="Select coach"
                  onChange={() => true}
                >
                  <MenuItem value={10}>Hassen ben mrad</MenuItem>
                  <MenuItem value={10}>Maher ajmi</MenuItem>
                  <MenuItem value={10}>Sana toumi</MenuItem>
                </Select>
              </FormControl>
              */}
              <TextField
                fullWidth
                label="Max number of members"
                id="maxmembers"
                size="small"
                type="number"
                sx={{ mb: 2 }}
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
              />
              <div className="flex gap-4">
                <TimePicker
                  label="Start time"
                  fullwidth={1}
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                />
                <TimePicker
                  label="End time"
                  fullwidth={1}
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </div>
              <div className="mt-5 mb-3 flex gap-3 items-center">
                <Typography>Classes type</Typography>
                <ToggleButtonGroup
                  value={type}
                  exclusive
                  onChange={(e) => setType(e.target.value)}
                  size="small"
                >
                  <ToggleButton value="recurrent">Recurrent</ToggleButton>
                  <ToggleButton value="onetime">One-Time</ToggleButton>
                </ToggleButtonGroup>
              </div>
              {type === "recurrent" ? (
                <div className="mb-3">
                  <SelectWithCheckmarks
                    selectData={daysData}
                    selected={reccuringDays}
                    setSelected={setReccuringDays}
                    label="Which days this class happen?"
                    sx={{ mb: 2 }}
                  />
                </div>
              ) : null}
              <DatePicker
                label="Available from"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />
              {type === "recurrent" ? (
                <div className="mt-3">
                  <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </div>
              ) : null}
              {/*
              <div className="mt-8">
                <FormControlLabel
                  control={
                    <Switch
                      checked={true}
                      onChange={() => false}
                      name="isclassfree"
                    />
                  }
                  label="Is this class FREE?"
                />
              </div>
              */}
            </>
          ) : (
            <Alert sx={{ mt: 3 }} severity="error" variant="filled">
              You need to add a program before you add a class!
            </Alert>
          )}
        </Box>
      </AddNew>

      {getError ? (
        <Alert sx={{ mt: 3 }} severity="error" variant="filled">
          {getError}
        </Alert>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange}>
                <Tab label="RECURRENT" value="1" icon={<RepeatTwoToneIcon />} />
                <Tab
                  label="ONE-TIME"
                  value="2"
                  icon={<RepeatOneTwoToneIcon />}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <TableList
                columns={recurrentColumns}
                rows={recurrentClasses}
                name="recurrent classes"
                loading={getLoading}
              />
            </TabPanel>
            <TabPanel value="2">
              <TableList
                columns={oneTimeColumns}
                rows={onetimeClasses}
                name="one-time classes"
                loading={getLoading}
              />
            </TabPanel>
          </TabContext>
        </Box>
      )}

      <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
    </>
  );
}

function ActionButtons({ id, deleteClick }) {
  const [moreOptionsMenuAnchor, setMoreOptionsMenuAnchor] =
    React.useState(null);

  const deleteClassClicked = async () => {
    setMoreOptionsMenuAnchor(null);

    await deleteClick(id);
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
        <MenuItem onClick={deleteClassClicked}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuListButton>
    </>
  );
}
