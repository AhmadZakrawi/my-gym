import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// generic component which have the name of the page and an add new button
// -- it should be used in each manage page(for the moment--maybe has other uses later)
export default function TopBar({ name, toggleDrawer }) {
  return (
    <Box sx={{mb: 3}} className="flex justify-between items-center">
      <Typography>{name.toUpperCase()}</Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={toggleDrawer(true)}
      >
        ADD NEW
      </Button>
    </Box>
  );
}
