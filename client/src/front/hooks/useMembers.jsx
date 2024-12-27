import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export const useMembers = () => {
  const [getError, setGetError] = useState(null);
  const [addLoading, setAddLoading] = useState(null);
  const [getLoading, setGetLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const {logout} = useLogout()

  const addMember = async (
    fullName,
    gender,
    email = null,
    phone = null,
    membershipId = null,
    expire = null,
    debt = null
  ) => {
    setAddLoading(true);

    try {
      const res = await api().post("/api/manage/members", {
        fullName,
        gender,
        email,
        phone,
        membershipId,
        expire,
        debt,
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

        toast.success(`Member "${fullName}" added successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res.data.member;
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

  const getMembers = async () => {
    setGetLoading(true);
    setGetError(null);

    try {
      const res = await api().get("/api/manage/members");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setGetLoading(false);
        setGetError(res.data.error);
      } else {
        setGetLoading(false);

        return res.data.members;
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

  const deleteMember = async (id, fullName) => {
    setDeleteLoading(true);

    try {
      const res = await api().delete(`/api/manage/members/${id}`);

      console.log("delete resp: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setDeleteLoading(false);

        toast.error(`Error occured while delete the member "${fullName}"`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setDeleteLoading(false);
        toast.success(`Member "${fullName}" deleted successfully`, {
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
    addMember,
    getMembers,
    deleteMember,
    addLoading,
    getLoading,
    deleteLoading,
    getError,
  };
};
