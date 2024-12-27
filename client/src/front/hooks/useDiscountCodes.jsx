import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export function useDiscountCodes() {
  const [getError, setGetError] = useState(null);
  const [addLoading, setAddLoading] = useState(null);
  const [getLoading, setGetLoading] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const {logout} = useLogout()

  const addDiscountCode = async (code, discount, discountType, usageLimit, expires) => {
    setAddLoading(true);

    try {
      const res = await api().post("/api/manage/discountcodes", { code, discount, discountType, usageLimit, expires });

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

        toast.success(`Discount code "${code}" added successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
        return res.data.discountCode;
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

  const getDiscountCodes = async () => {
    setGetLoading(true);
    setGetError(null);

    try {
      const res = await api().get("/api/manage/discountcodes");

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setGetLoading(false);
        setGetError(res.data.error);
      } else {
        setGetLoading(false);
        return res.data.discountCodes;
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

  const deleteDiscountCode = async (id, code) => {
    setDeleteLoading(true);

    try {
      const res = await api().delete(`/api/manage/discountcodes/${id}`);

      console.log("delete resp: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setDeleteLoading(false);

        toast.error(
          `Error occured while deleting the discount code "${code}"`,
          {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            closeOnClick: true,
          }
        );
      } else {
        setDeleteLoading(false);
        toast.success(`Discount code "${code}" deleted successfully`, {
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
    addDiscountCode,
    getDiscountCodes,
    deleteDiscountCode,
    getError,
    getLoading,
    addLoading,
  };
}
