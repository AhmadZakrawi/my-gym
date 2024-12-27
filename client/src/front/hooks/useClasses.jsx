import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export function useClasses() {
  const [getError, setGetError] = useState(null);
  const [addLoading, setAddLoading] = useState(null);
  const [getLoading, setGetLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const {logout} = useLogout()

  const addClass = async (
    programId,
    type,
    startTime,
    endTime,
    startDate,
    endDate = null,
    maxMembers = null,
    reccuringDays = null
  ) => {
    setAddLoading(true);

    try {
      const res = await api().post("/api/manage/classes", {
        programId,
        type,
        startTime,
        endTime,
        startDate,
        endDate,
        maxMembers,
        reccuringDays,
      });

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setAddLoading(false);
        toast.error(res.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setAddLoading(false);

        toast.success(`Class added successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res.data.theClass;
      }
    } catch (err) {
      setAddLoading(false);
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

  const getClasses = async () => {
    setGetLoading(true);
    setGetError(null);

    try {
      const res = await api().get("/api/manage/classes");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setGetLoading(false);
        setGetError(res.data.error);
      } else {
        setGetLoading(false);

        return res.data.classes;
      }
    } catch (err) {
      setGetLoading(false);
      if (err.response.data.error === "TokenExpiredError") {
        logout()
       } else {
         setGetError(err.response.data.error)
       }
    }
  };

  const deleteClass = async (id) => {
    setDeleteLoading(true);

    try {
      const res = await api().delete(`/api/manage/classes/${id}`);

      console.log("delete resp: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setDeleteLoading(false);

        toast.error(`Error occured while deleting the class`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setDeleteLoading(false);
        toast.success(`Class deleted successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res;
      }
    } catch (err) {
      setDeleteLoading(false);
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
    addClass,
    getClasses,
    deleteClass,
    addLoading,
    getLoading,
    deleteLoading,
    getError,
  };
}
