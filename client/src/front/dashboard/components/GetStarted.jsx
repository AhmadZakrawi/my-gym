import React from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GetStartedLogo from "../../../assets/icons/getstarted.png";
import { useAuthContext } from "../../hooks/useAuthContext";

//TODO FIX BUG WHEN USER REFRESH PAGE TASKS ARE LOST SINCE IM STORING THEM IN AUTH CONTEXT JUST WHEN USER LOGS IN
export default function GetStarted() {
  const { userdata } = useAuthContext();

  const calculateDonePercentage = (arr) => {
    let doneElements = arr?.filter((item) => item.completed === true);
    return (doneElements?.length / arr?.length) * 100;
  };

  return (

    userdata?.tasks?.length > 0 ? (
      <Paper sx={{ px: 2, py: 3, maxHeight: "630px"}}>
      <div className="flex items-center  mb-3 gap-3">
        <img
          alt="Get started logo"
          src={GetStartedLogo}
          className="w-10 object-contain "
        />
        <Typography sx={{ fontWeight: "bold" }}>
          GET STARTED WITH MYGYM
        </Typography>
        <div className="border p-2 rounded">
          You are done in{" "}
          <i className="font-bold">
            {calculateDonePercentage(userdata?.tasks)}%
          </i>
        </div>
      </div>

      {userdata?.tasks?.map((task) => (
        <Task
          key={task.id}
          completed={task.completed}
          label={task.label}
          actionUrl={task.actionUrl}
        />
      ))}
    </Paper>

    ) : null
  );
}

function Task({ completed, label, actionUrl }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center py-1">
      <Checkbox checked={completed} size="small" />
      <Typography sx={{ textDecoration: completed ? "line-through" : "none" }}>
        {label}
      </Typography>
      {!completed && (
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          size="small"
          onClick={() => navigate(actionUrl)}
        >
          Take action
        </Button>
      )}
    </div>
  );
}
