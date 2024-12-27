import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from 'react-toastify';
import { useLogout } from "./useLogout.jsx";


export  function useMemberships() {
  const [addLoading, setAddLoading] = useState(null);
  const [getLoading, setGetLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [getError, setGetError] = useState(null);
  const {logout} = useLogout()

  const addMembership = async (
    name,
    price,
    type,
    periodQuantity,
    periodType,
    sessions,
    classes
  ) => {
    setAddLoading(true);

    try {
      const res = await api().post("/api/manage/memberships", {
        name,
        price,
        type,
        periodQuantity,
        periodType,
        sessions,
        classes,
      });

      console.log("response: ", res);

      if (res.status !== 201) {
        setAddLoading(false);
        toast.error(res.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setAddLoading(false);

        toast.success(`Membership "${name}" added successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res.data.membership;
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

  const getAllMemberships = async () => {
    setGetLoading(true);
    setGetError(null);

    try {
      const res = await api().get("/api/manage/memberships");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setGetLoading(false);
        setGetError(res.data.error);
      } else {
        setGetLoading(false);
        return res.data.memberships;
      }
    } catch (err) {
      setGetLoading(false);
      if (err.response.data.error === "TokenExpiredError") {
        logout()
       } else {
         setGetError(err.response.data.error);
       }
    }
  };

  const deleteMembership = async (id, name) => {
    setDeleteLoading(true);

    try {
      const res = await api().delete(`/api/manage/memberships/${id}`);

      console.log("delete resp: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setDeleteLoading(false);

        toast.error(`Error occured while delete the membership "${name}"`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setDeleteLoading(false);
        toast.success(`Membership "${name}" deleted successfully`, {
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
    addMembership,
    getAllMemberships,
    deleteMembership,
    addLoading,
    getLoading,
    getError,
  };
}
