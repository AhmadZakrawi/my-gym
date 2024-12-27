import React from "react";
import GetStarted from "./components/GetStarted";
import { Box } from "@mui/material";
import Members from "./components/Members";
import Calendar from "./components/Calendar";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Dashboard() {
  const { userdata } = useAuthContext();

  return (
    <>
      <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
        <Box sx={{ display: "flex", gap: 3, flexDirection: {xs: "column", md: userdata?.tasks.length > 0 ? "row" : "column"}, alignItems: "center" }}>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <GetStarted />
          </Box>

          <Box sx={{ width: { xs: "100%", md:  userdata?.tasks.length > 0 ? "50%" : "100%" } }}>
            <Members/>
          </Box>
        </Box>

        <Box>
          <Calendar/>
        </Box>
      </Box>
    </>
  );
}
