import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export const useCoaches = () => {
  const [getError, setGetError] = useState(null);
  const [addLoading, setAddLoading] = useState(null);
  const [getLoading, setGetLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const {logout} = useLogout()

  const addCoach = async (
    fullName,
    gender,
    role = null,
    email = null,
    phone = null,
    joined = null,
    birthday = null
  ) => {
    setAddLoading(true);

    try {
      const res = await api().post("/api/manage/coaches", {
        fullName,
        gender,
        role,
        email,
        phone,
        joined,
        birthday
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

        toast.success(`Coach "${fullName}" added successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res.data.coach;
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

  const getCoaches = async () => {
    setGetLoading(true);
    setGetError(null);

    try {
      const res = await api().get("/api/manage/coaches");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setGetLoading(false);
        setGetError(res.data.error);
      } else {
        setGetLoading(false);

        return res.data.coaches;
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

  const deleteCoach = async (id, fullName) => {
    setDeleteLoading(true);

    try {
      const res = await api().delete(`/api/manage/coaches/${id}`);

      console.log("delete resp: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setDeleteLoading(false);

        toast.error(`Error occured while deleting the coach "${fullName}"`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setDeleteLoading(false);
        toast.success(`Coach "${fullName}" deleted successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res;
      }
    } catch (err) {
      setDeleteLoading(false);
      toast.error(`Error occured while delete the coach "${fullName}"`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2500,
        closeOnClick: true,
      });
    }
  };

  return {
    addCoach,
    getCoaches,
    deleteCoach,
    addLoading,
    getLoading,
    deleteLoading,
    getError,
  };
};