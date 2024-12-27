import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import OutlinedInput from "@mui/material/OutlinedInput";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import DatePicker from "../../manage/components/DatePicker";

export default function ExtendMembershipDialog({
  memberName,
  oldMembership,
  expireDate,
  open,
  setOpen,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="extend membership dialog"
      >
        <DialogTitle id="responsive-dialog-title">
          {"You are going to expend " + memberName + " membership"}
        </DialogTitle>

        <Divider/>
        <DialogContent>
          <div className="mb-6">
            <div className="flex gap-1">
              <Typography>MEMBERSHIP:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {oldMembership}
              </Typography>
            </div>
            <div className="flex gap-1">
              <Typography>EXPIRE:</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {oldMembership}
              </Typography>
            </div>
          </div>

          <div className="py-3 bg-gray-400 text-center font-bold mb-6">NEW MEMBERSHIP ↓</div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Typography>MEMBERSHIP:</Typography>
              <Select
                native
                value={""}
                onChange={() => ""}
                size="small"
                input={
                  <OutlinedInput id="membershipselect" />
                }
              >
                <option value={"SILVER"}>SILVER</option>
                <option value={"GOLD"}>GOLD</option>
                <option value={"DIAMOND"}>DIAMOND</option>
              </Select>
            </div>

            <div>
              <DatePicker label="New expiration date" />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)} variant="text">
            CANCEL
          </Button>
          <Button onClick={() => setOpen(false)} autoFocus variant="contained">
            EXTEND
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
