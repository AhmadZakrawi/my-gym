import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

import { useClasses } from "../../hooks/useClasses";

function generateOnetimeEvents(c) {
  const startDate = new moment();
  const classStartDate = new moment(c.startDate);
  const classStartTime = new moment(c.startTime);
  const classEndTime = new moment(c.endTime);
  startDate.set("year", classStartDate.year());
  startDate.set("month", classStartDate.month());
  startDate.set("date", classStartDate.date());
  startDate.set("hour", classStartTime.hour());
  startDate.set("minute", classStartTime.minute());

  const endDate = new moment();
  endDate.set("year", classStartDate.year());
  endDate.set("month", classStartDate.month());
  endDate.set("date", classStartDate.date());
  endDate.set("hour", classEndTime.hour());
  endDate.set("minute", classEndTime.minute());
  return { ...c, startDate, endDate, title: c["program.name"] + " class" };
}

function generateRecurringEvents(classObject) {
  let { startDate, endDate, startTime, endTime, reccuringDays } = classObject;
  function convertRecurringDays(rd) {
    console.log("rsdsdd", rd);
    let newRd = [];
    rd.forEach((r) => {
      switch (r.toLowerCase()) {
        case "sunday":
          newRd.push(0);
          break;
        case "monday":
          newRd.push(1);
          break;
        case "tuesday":
          newRd.push(2);
          break;
        case "wednesday":
          newRd.push(3);
          break;
        case "thursday":
          newRd.push(4);
          break;
        case "friday":
          newRd.push(5);
          break;
        case "saturday":
          newRd.push(6);
          break;
      }
    });

    return newRd;
  }

  if (reccuringDays) reccuringDays = convertRecurringDays(reccuringDays);

  console.log("reccdaa", reccuringDays);

  let recurringEvents = [];
  let currentDate = new Date(startDate);
  let theEndDate = new Date(endDate);
  console.log("curr", currentDate);
  console.log("endd", theEndDate);
  while (currentDate <= theEndDate) {
    console.log("enteeredd");
    const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    if (reccuringDays.includes(dayOfWeek)) {
      const startDateTime = new Date(currentDate);
      startDateTime.setHours(
        new Date(startTime).getHours(),
        new Date(startTime).getMinutes()
      );

      const endDateTime = new Date(currentDate);
      endDateTime.setHours(
        new Date(endTime).getHours(),
        new Date(endTime).getMinutes()
      );
      recurringEvents.push({
        id: classObject.id,
        startDate: startDateTime,
        endDate: endDateTime,
        title: classObject["program.name"] + " class",
      });
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log("reccev", recurringEvents);
  return recurringEvents;
}

const Calendar = () => {
  const [allClasses, setAllClasses] = React.useState([]);

  const { getClasses, getLoading, deleteClass, deleteLoading } = useClasses();

  const getAllClasses = async () => {
    let cls = await getClasses();
    let allEvents = [];
    if (cls) {
      cls.map((c) => {
        return c.type === "onetime"
          ? allEvents.push(generateOnetimeEvents(c))
          : allEvents.push(...generateRecurringEvents(c));
      });

      setAllClasses(allEvents);

      console.log("allEvents", allEvents);
    }
  };

  React.useEffect(() => {
    getAllClasses();
  }, []);

  async function commitChanges({ added, changed, deleted }) {
    if (deleted !== undefined) {
      await deleteClass(deleted);
      await getAllClasses();
    }
  }

  return (
    <>
      {getLoading || deleteLoading ? (
        <Paper sx={{height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", p: 4}}>
          <CircularProgress size={80} />
        </Paper>
      ) : (
        <Paper>
          <Scheduler data={allClasses}>
            <ViewState
              defaultCurrentDate={dayjs("YYYY-MM-DD")}
              defaultCurrentViewName="Week"
            />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <DayView startDayHour={6} endDayHour={23}/>
            <WeekView startDayHour={6} endDayHour={23}/>
            <Appointments />
            <AppointmentTooltip showCloseButton showDeleteButton />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <ViewSwitcher />
          </Scheduler>
        </Paper>
      )}
    </>
  );
};

export default Calendar;
