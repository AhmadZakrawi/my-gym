import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker as TP } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export default function TimePicker({ label, fullwidth, value, onChange }) {

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      sx={{ flex: fullwidth ? 1 : "auto" }}
    >
      <DemoContainer
        components={["TimePicker", "TimePicker"]}
        sx={{ flex: fullwidth ? 1 : "auto" }}
      >
        {window.innerWidth > 950 ? (
          <TP
            sx={{ flex: fullwidth ? 1 : "auto" }}
            label={label}
            value={value}
            onChange={onChange}
          />
        ) : (
          <MobileTimePicker
            sx={{ flex: fullwidth ? 1 : "auto" }}
            label={label}
            alue={value}
            onChange={onChange}
          />
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
}
