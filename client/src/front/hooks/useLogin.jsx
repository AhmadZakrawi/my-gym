import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";


export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5555/api/user/login", {
        email,
        password,
      });

      if (res.statusText.toLowerCase() !== "ok") {
        setIsLoading(false);
        toast.error(res.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        localStorage.setItem("userdata", JSON.stringify(res.data));
        dispatch({ type: "LOGIN", payload: res.data });
        setIsLoading(false);
        console.log("login successfull", res);
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err.response.data.error, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2500,
        closeOnClick: true,
      });
    }
  };

  return { login, isLoading };
};
