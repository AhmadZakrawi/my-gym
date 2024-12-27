import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useAccount } from "../hooks/useAccount";
import { useAuthContext } from "../hooks/useAuthContext";
import Paper from "@mui/material/Paper";

export default function Account() {
  const { updateAccount, updateLoading } = useAccount();
  const [email, setEmail] = React.useState("");
  const [avatarBase64, setAvatarBase64] = React.useState("");
  const { userdata } = useAuthContext();

  const fileInputRef = React.createRef();

  const handleButtonClick = () => {
    // Click the hidden file input element when the button is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileSize = file.size;
      const maxSize = 3 * 1024 * 1024; // 3MB

      if (file.type.startsWith("image/")) {
        if (fileSize <= maxSize) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setAvatarBase64(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          toast.error("Maximum file size is 3MB", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 2500,
            closeOnClick: true,
          });
        }
      } else {
        toast.error("Only images are allowed", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 2500,
          closeOnClick: true,
        });
      }
    }
  };

  const resetStates = () => {
    setEmail("");
    setAvatarBase64("");
  };

  const saveClicked = () => {
    updateAccount(avatarBase64, email);
    resetStates();
  };

  return (
    <Paper sx={{
      
      p: 4,
      mx: "auto",
      maxWidth: 720,
    }}>
      <Box
        className="flex justify-between items-center mb-7"
        sx={{ mx: "auto", maxWidth: 720 }}
      >
        <Typography>ACCOUNT</Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={saveClicked}
        >
          SAVE
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          mx: "auto",
          maxWidth: 720,
        }}
      >
        {updateLoading ? (
          <div className="mb-3">
            <LinearProgress />
          </div>
        ) : null}
          
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                mb: 4,
              }}
            >
              <Avatar
                src={
                  avatarBase64
                    ? avatarBase64
                    : userdata
                    ? userdata.user.avatar
                    : "/static/images/avatar/1.jpg"
                }
                alt="Remy Sharp"
                sx={{
                  width: { xs: 180, md: 220 },
                  height: { xs: 180, md: 220 },
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }} // Hide the file input element
                onChange={handleFileChange}
                accept="image/*" // Allow only image files
              />
              <Button
                variant="contained"
                onClick={handleButtonClick}
                endIcon={<ImageIcon />}
                size="small"
              >
                Change profile picture
              </Button>
            </Box>

            <TextField
              id="email"
              type="email"
              label="Email address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
            />
          

        <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
      </Box>
    </Paper>
  );
}
