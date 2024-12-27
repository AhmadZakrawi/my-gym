import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as DTP } from "@mui/x-date-pickers/DateTimePicker";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

export default function DateTimePicker({ label, value, onChange }) {
  // responsive date picker
  //-- it should be used whenever we need a date picker
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        {window.innerWidth > 950 ? (
          <DTP
            label={label}
            value={value}
            onChange={onChange}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        ) : (
          <MobileDateTimePicker
            label={label}
            value={value}
            onChange={onChange}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
