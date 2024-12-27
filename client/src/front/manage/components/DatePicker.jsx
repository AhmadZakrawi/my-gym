import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as DP } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

export default function DatePicker({ label, value, onChange }) {
  // responsive date picker
  //-- it should be used whenever we need a date picker
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        {window.innerWidth > 950 ? (
          <DP
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
          <MobileDatePicker
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
