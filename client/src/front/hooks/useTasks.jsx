import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export function useTasks() {
  const [tasksLoading, setTasksLoading] = useState(null);
  const [completeLoading, setCompleteLoading] = useState(null);
  const { logout } = useLogout();
  const getTasks = async () => {
    setTasksLoading(true);

    try {
      const res = await api().get("/api/dashboard/tasks");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setTasksLoading(false);
        toast.error(res.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setTasksLoading(false);
        return res.data.tasks;
      }
    } catch (err) {
      setTasksLoading(false);
      if (err.response.data.error === "TokenExpiredError") {
        logout();
      } else {
        toast.error(err.response.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      }
    }
  };


  const completeTask = async (id, name) => {
    setCompleteLoading(true);

    try {
      const res = await api().put(`/api/dashboard/tasks/${id}`);


      if (res.statusText.toLowerCase() !== "ok") {
        setCompleteLoading(false);

        toast.error(`Error occured when completing the tutorial step`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setCompleteLoading(false);
        toast.success(`Congratulations! you just added your first ${name}`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res;
      }
    } catch (err) {
        setCompleteLoading(false);
      if (err.response.data.error === "TokenExpiredError") {
        logout()
       } else {
         toast.error(err.response.data.error, {
           position: toast.POSITION.BOTTOM_CENTER,
           autoClose: 2500,
           closeOnClick: true,
         });
       }
    }
  };


  return {
    getTasks,
    tasksLoading,
    completeTask,
    completeLoading
  };
}
