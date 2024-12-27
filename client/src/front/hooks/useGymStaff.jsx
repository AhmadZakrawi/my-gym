import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export const useGymStaff = () => {
  const [getError, setGetError] = useState(null);
  const [addLoading, setAddLoading] = useState(null);
  const [getLoading, setGetLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { logout } = useLogout();

  const addGymStaff = async (
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
      const res = await api().post("/api/manage/gymstaff", {
        fullName,
        gender,
        role,
        email,
        phone,
        joined,
        birthday,
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

        toast.success(`Gym staff "${fullName}" added successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res.data.gymstaff;
      }
    } catch (err) {
      setAddLoading(false);
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

  const getGymStaff = async () => {
    setGetLoading(true);
    setGetError(null);

    try {
      const res = await api().get("/api/manage/gymstaff");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setGetLoading(false);
        setGetError(res.data.error);
      } else {
        setGetLoading(false);

        return res.data.gymstaff;
      }
    } catch (err) {
      setGetLoading(false);
      setGetError(err.response.data.error);
      if (err.response.data.error === "TokenExpiredError") {
        logout();
      } else {
        toast.error(err.response.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        setGetError(err.response.data.error);
      }
    }
  };

  const deleteGymStaff = async (id, fullName) => {
    setDeleteLoading(true);

    try {
      const res = await api().delete(`/api/manage/gymstaff/${id}`);

      console.log("delete resp: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setDeleteLoading(false);

        toast.error(
          `Error occured while deleting the gym staff "${fullName}"`,
          {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            closeOnClick: true,
          }
        );
      } else {
        setDeleteLoading(false);
        toast.success(`Gym staff "${fullName}" deleted successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res;
      }
    } catch (err) {
      setDeleteLoading(false);
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

  return {
    addGymStaff,
    getGymStaff,
    deleteGymStaff,
    addLoading,
    getLoading,
    deleteLoading,
    getError,
  };
};
