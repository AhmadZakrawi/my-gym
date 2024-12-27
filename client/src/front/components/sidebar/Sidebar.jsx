import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import DiscountIcon from "@mui/icons-material/Discount";
import GroupsIcon from "@mui/icons-material/Groups";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import GroupIcon from "@mui/icons-material/Group";

import { Link } from "react-router-dom";

import { ListItemIcon } from "@mui/material";
import { useMediaQuery } from "@mui/material";

const StickySidebar = ({ includesManage }) => {
  const DrawerItemsManage = [
    {
      text: "Memberships",
      icon: <CalendarMonthIcon />,
      url: "/manage/memberships",
    },
    { text: "Members", icon: <GroupIcon />, url: "/manage/members" },
    { text: "Classes", icon: <CardMembershipIcon />, url: "/manage/classes" },
    {
      text: "Programs",
      icon: <SportsGymnasticsIcon />,
      url: "/manage/programs",
    },
    {
      text: "Discount codes",
      icon: <DiscountIcon />,
      url: "/manage/discountcodes",
    },
    { text: "Gym staff", icon: <GroupsIcon />, url: "/manage/gymstaff" },
    { text: "Coaches", icon: <FitnessCenterIcon />, url: "/manage/coaches" },
  ];
  // const { isSidebarOpen } = useSidebar(); // Use the useSidebar hook to access the context
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));




  console.log("ssss", includesManage);
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "calc(100vh - 14px)",
        minWidth: 240,
        backgroundColor: "#FFFFFF",
        zIndex: 1,
        boxShadow: "2px 2px 10px #bbb",
        color: "#707070",
        marginTop: "14px",
        paddingTop: "64px",
        // display: isSidebarOpen ? "block" : "none",
        display: isMobile ? "none" : "block",
      }}
    >
      <List>
            {includesManage
              ? DrawerItemsManage.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      sx={{ alignItems: "center" }}
                      selected={item.selected}
                      component={Link}
                      to={item.url}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))
              : null}
      </List>
    </Box>
  );
};

export default StickySidebar;
