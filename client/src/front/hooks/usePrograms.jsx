import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export function usePrograms() {
  const [getError, setGetError] = useState(null);
  const [addLoading, setAddLoading] = useState(null);
  const [getLoading, setGetLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { logout } = useLogout();

  const addProgram = async (name) => {
    setAddLoading(true);

    try {
      const res = await api().post("/api/manage/programs", { name });

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

        toast.success(`Program "${name}" added successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res.data.program;
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

  const getPrograms = async () => {
    setGetLoading(true);
    setGetError(null);

    try {
      const res = await api().get("/api/manage/programs");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setGetLoading(false);
        setGetError(res.data.error);
      } else {
        setGetLoading(false);
        return res.data.programs;
      }
    } catch (err) {
      setGetLoading(false);
      if (err.response.data.error === "TokenExpiredError") {
        logout();
      } else {
        setGetError(err.response.data.error);
      }
    }
  };

  const deleteProgram = async (id, name) => {
    setDeleteLoading(true);

    try {
      const res = await api().delete(`/api/manage/programs/${id}`);

      console.log("delete resp: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setDeleteLoading(false);

        toast.error(`Error occured while delete the program "${name}"`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setDeleteLoading(false);
        toast.success(`Program "${name}" deleted successfully`, {
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
    addProgram,
    getPrograms,
    deleteProgram,
    getError,
    getLoading,
    addLoading,
  };
}
