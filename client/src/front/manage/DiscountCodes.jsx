import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import AddNew from "./components/AddNew.jsx";
import { AddNewTopBar } from "./components/AddNew.jsx";
import TableList from "./components/TableList.jsx";
import DateTimePicker from "./components/DateTimePicker.jsx";
import SelectWithCheckmarks from "./components/SelectWithCheckmarks.jsx";
import TopBar from "./components/TopBar.jsx";
import { useDiscountCodes } from "../hooks/useDiscountCodes.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import MenuListButton from "../reports/components/MenuListButton.jsx";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "dayjs";

export default function DiscountCodes() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const [code, setCode] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [discountType, setDiscountType] = React.useState("");
  const [usageLimit, setUsageLimit] = React.useState("");
  const [expires, setExpires] = React.useState(dayjs());
  const [allDiscountCodes, setAllDiscountCodes] = React.useState([]);

  const {
    addDiscountCode,
    getDiscountCodes,
    deleteDiscountCode,
    addLoading,
    getLoading,
    getError,
  } = useDiscountCodes();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  const resetAddFormStates = () => {
    setCode("");
    setDiscount("");
    setUsageLimit("");
    setExpires(dayjs());
  };

  const getAllDiscountCodes = async () => {
    let discountCodes = await getDiscountCodes();

    discountCodes = discountCodes?.map((dc) => {
      return {
        ...dc,
      };
    });

    setAllDiscountCodes(discountCodes);
  };

  React.useEffect(() => {
    getAllDiscountCodes();
  }, []);

  const addDiscountCodeClicked = async () => {
    const newDC = await addDiscountCode(
      code,
      discount,
      discountType,
      usageLimit,
      expires
    );

    if (newDC) {
      resetAddFormStates();
      setAllDiscountCodes([
        ...allDiscountCodes,
        {
          ...newDC,
        },
      ]);
    }
  };

  const deleteClick = async (id, code) => {
    //REMINDER: i'm passing the name in order to show it on the delete success message
    await deleteDiscountCode(id, code);
    await getAllDiscountCodes();

    //TODO: use the filter method on the state directly
    //cause its not effective to query the database everytime a member is delete
  };

  const columns = [
    { field: "code", headerName: "Code", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "discount", headerName: "Discount", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "discountType", headerName: "Discount Type", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 150 },
    { field: "active", headerName: "Active", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    { field: "usageLimit", headerName: "Usage Limit", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 130 },
    { field: "expires", headerName: "Expires", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 180 },
    { field: "numOfUses", headerName: "Number of Uses", disableColumnMenu: true, flex: 1, maxWidth: 220, minWidth: 140 },
    { field: "createdAt", headerName: "Created", disableColumnMenu: true, flex: 1, maxWidth: 220 },
    {
      field: "actions",
      headerName: "Actions",
      disableColumnMenu: true,
      disableColumnFilter: true,
      disableColumnSelector: true,
      sortable: false,
      disableClickEventBubbling: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <ActionButtons
            id={params.row.id}
            name={params.row.name}
            deleteClick={deleteClick}
          />
        );
      },
    },
  ];

  return (
    <>
      <TopBar name="Discount codes" toggleDrawer={toggleDrawer} />

      <AddNew isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
        <AddNewTopBar
          toggleDrawer={toggleDrawer}
          clickAction={addDiscountCodeClicked}
          loading={addLoading}
        />

        <Divider />

        <Box component="form" className="my-4 ">
          <TextField
            fullWidth
            label="Code"
            id="code"
            size="small"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <div className="my-4 flex gap-3">
            <TextField
              fullWidth
              label="Discount value"
              id="discountvalue"
              size="small"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <ToggleButtonGroup
              value={discountType}
              exclusive
              onChange={(e) => setDiscountType(e.target.value)}
              size="small"
            >
              <ToggleButton value="percentage">(%)</ToggleButton>
              <ToggleButton value="currency">TND</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <TextField
            fullWidth
            label="Usage limit"
            id="usagelimit"
            size="small"
            type="number"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
          />
          <div className="my-4">
            <DateTimePicker
              label={"Expiration Date"}
              value={expires}
              onChange={(newValue) => setExpires(newValue)}
            />
          </div>

          {/*
          // TODO: ADD INCLUDED MEMBERSHIPS
          
          <div className="flex items-center">
            <Typography>Does discount code cover all memberships?:</Typography>
            <Switch checked={false} onChange={() => false} />
          </div>

          <div>
            <SelectWithCheckmarks
              selectData={membershipsData}
              selected={selected}
              setSelected={setSelected}
              label="Select included memberships"
            />
  </div>*/}
        </Box>
      </AddNew>

      {getError ? (
        <Alert sx={{ mt: 3 }} severity="error" variant="filled">
          {getError}
        </Alert>
      ) : (
        <TableList
          columns={columns}
          rows={allDiscountCodes}
          name="Discount codes"
          loading={getLoading}
        />
      )}

      <ToastContainer position="bottom-center" autoClose={2700} newestOnTop />
    </>
  );
}

function ActionButtons({ id, code, deleteClick }) {
  const [moreOptionsMenuAnchor, setMoreOptionsMenuAnchor] =
    React.useState(null);

  const deleteDiscountCodeClicked = async () => {
    setMoreOptionsMenuAnchor(null);
    await deleteClick(id, code);
  };

  return (
    <>
      <IconButton
        aria-label="more options"
        onClick={(e) => setMoreOptionsMenuAnchor(e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <MenuListButton
        anchorEl={moreOptionsMenuAnchor}
        setAnchorEl={setMoreOptionsMenuAnchor}
      >
        <MenuItem onClick={deleteDiscountCodeClicked}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </MenuListButton>
    </>
  );
}
