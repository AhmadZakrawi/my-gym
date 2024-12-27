import React, {useState} from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Illustration1 from "../../assets/imgs/auth-illustration-1.svg";
import Illustration2 from "../../assets/imgs/auth-illustration-2.svg";
import Logo from "../../assets/icons/mygym-logo-white.svg";
import { TextField, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import LoadingButton from '@mui/lab/LoadingButton';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Register() {
  const [name, setName] = useState('');
  const [gymName, setGymName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const {register, isLoading} = useRegister()

    const registerClicked = async () => {
      await register(name, gymName, email, password, confPassword)
    }

    
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: { xs: "start", md: "center" },
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "100%", md: "90%" },
          maxWidth: { md: "1600px" },
          borderRadius: "48px",
          maxHeight: { xs: "auto", md: "calc(100vh - (64px + 48px))" },
          boxShadow: "0px 10px 20px 15px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: { xs: "700px", md: "auto" },
            width: { xs: "100%", md: "40%" },
            borderRadius: { md: "48px" },
            borderTopLeftRadius: { xs: "48px" },
            borderTopRightRadius: { xs: "48px" },
            backgroundColor: "#1E5CBA",
            p: 3,
            position: "relative",
          }}
        >
          <div className="h-1/2 w-full">
            <img
              className="w-full h-full object-cover"
              src={Illustration1}
              alt="person running illustration"
            />
          </div>

          <div className="h-1/2 w-full">
            <img
              className="w-full h-full object-cover "
              src={Illustration2}
              alt="people lifting weight illustration"
            />
          </div>

          <Box
            sx={{
              position: "absolute",
              width: "86%",
              height: "86%",
              borderRadius: "32px",
              top: "50%",
              left: "50%",
              p: 3,
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.42)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(7px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <img
                src={Logo}
                alt="MyGym Logo"
                width={240}
                className="object-contain mb-3 mx-auto"
              />
              <Divider sx={{ bgcolor: "white" }} variant="middle" />
              <Typography sx={{ color: "white", my: 2, textAlign: "center" }}>
                N°1 Gym management tool in Tunisia.
              </Typography>
              <Divider sx={{ bgcolor: "white" }} variant="middle" />

              <Typography
                sx={{ color: "white", mt: 6, textAlign: "center" }}
                variant="h6"
              >
                Sign up and get your free 14 days trial
                <br />
                <i className="font-black">right now!</i>
              </Typography>
            </div>
            <div className="ml-auto">
              <Typography sx={{ color: "white" }}>
                Already have an account?
              </Typography>
              <Typography
                sx={{ color: "white", fontWeight: 900 }}
                component={Link}
                to="/login"
              >
                Login
              </Typography>
            </div>
          </Box>
        </Box>

        <Box
          sx={{
            mt: "3rem",
            mx: "auto",
            width: { xs: "100%", md: "60%" },
            height: "50%",
            maxWidth: { xs: "100%", md: "720px" },
            borderRadius: { md: "48px" },
            borderBottomLeftRadius: { xs: "48px" },
            borderBottomRightRadius: { xs: "48px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem", // Add padding to center content
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "2rem" }}>
            Register
          </Typography>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
            placeholder="Enter your name"
            fullWidth
            value={name} onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="gymname"
            label="Gym Name"
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
            placeholder="Enter your gym name"
            fullWidth
            value={gymName} onChange={(e) => setGymName(e.target.value)}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
            placeholder="Enter your email"
            fullWidth
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
            placeholder="Enter your password"
            fullWidth
            value={password} onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            id="confpassword"
            label="Confirm password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
            placeholder="Confirm your password"
            fullWidth
            value={confPassword} onChange={(e) => setConfPassword(e.target.value)}
          />
          <LoadingButton 
            variant="contained"
            color="primary"
            sx={{ marginBottom: "1rem" }}
            onClick={registerClicked}
            loading={isLoading}
          >
            Register
          </LoadingButton>
        </Box>
      </Box>
      <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
    </Box>
  );
}
