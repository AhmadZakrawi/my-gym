import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Paper, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useSettings } from "../hooks/useSettings";
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const { updateSettings, updateLoading } = useSettings();
  const [gymName, setGymName] = React.useState("");
  const [language, setLanguage] = React.useState("");

  const resetStates = () => {
    setGymName("");
    setLanguage("");
  };

  const saveClicked = () => {
    updateSettings(gymName, language);
    resetStates();
  };
  return (
    <>

    <Box sx={{ display: "block", mx: "auto", maxWidth: 720 }}>
    {updateLoading ?  <div className="mb-3"><LinearProgress /></div> : null}
    <Paper sx={{p: 4}}>
    <Box className="flex justify-between items-center">
        <Typography>SETTINGS</Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveClicked}
        >
          SAVE
        </Button>
      </Box>

      <TextField
        id="gymName"
        label="New gym name"
        value={gymName}
        onChange={(e) => setGymName(e.target.value)}
        sx={{ mt: 4 }}
        fullWidth
        size="small"
      />

      <FormControl sx={{ mt: 2 }} fullWidth size="small">
        <InputLabel id="languagelabel">Language</InputLabel>
        <Select
          labelId="languagelabel"
          id="languageselect"
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
          size="small"
        >
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="french">Français</MenuItem>
          <MenuItem value="arabic">العربية</MenuItem>
        </Select>
      </FormControl>
      </Paper>
    </Box>

    <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
    

    </>
    
  );
}
