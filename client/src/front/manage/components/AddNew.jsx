import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

//generic component to open a left drawer
//-- it should be used multiple times whenever we have a form to add or edit
export default function AddNew({ children, isDrawerOpen, toggleDrawer }) {
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 600 }}
      role="presentation"
      className="p-4"
    >
      {children}
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={window.innerWidth > 950 ? "right" : "top"}
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
        >
          {list(window.innerWidth > 950 ? "right" : "top")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

// generic component for top bar when add new button is clicked (has the close and save button)
//--it should be used multiple times whenever we have the form to add or edit
export function AddNewTopBar({ toggleDrawer, loading, clickAction }) {
  return (
    <Box className="flex justify-between mb-4">
      <IconButton aria-label="close" onClick={toggleDrawer(false)}>
        <CloseIcon />
      </IconButton>
      <LoadingButton onClick={clickAction} variant="contained" loading={loading ? loading : false} startIcon={<SaveIcon />}>
        Save
      </LoadingButton>
    </Box>
  );
}
