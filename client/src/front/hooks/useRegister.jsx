import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { toast } from "react-toastify";


export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(null);

  const register = async (name, gymName, email, password, confPassword) => {
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5555/api/user/register", {
        name,
        gymName,
        email,
        password,
        confPassword,
      });

      console.log("response: ", res);

      if (res.statusText.toLowerCase() !== "ok") {
        setIsLoading(false);
        toast.error(res.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      } else {
        setIsLoading(false);
        toast.success(
          "Registration successful, please confirm your email before you login",
          {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            closeOnClick: true,
          }
        );
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

  return { register, isLoading };
};
