import { useState } from "react";
import api from "../utils/axios.js";
import { toast } from "react-toastify";
import { useLogout } from "./useLogout.jsx";

export function useSettings() {
  const [updateLoading, setUpadateLoading] = useState(null);
  const { logout } = useLogout();

  const updateSettings = async (gymName, language) => {
    setUpadateLoading(true);

    try {
      const res = await api().put("/api/profile/settings", { gymName, language });

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setUpadateLoading(false);
        toast.error(res.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setUpadateLoading(false);

        toast.success(`Settings updated successfully`, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      }
    } catch (err) {
      setUpadateLoading(false);
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
    updateSettings,
    updateLoading,
  };
}
