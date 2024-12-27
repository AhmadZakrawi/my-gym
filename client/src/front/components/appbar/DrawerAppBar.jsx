import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SmsIcon from "@mui/icons-material/Sms";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MyGymLogo from "../../../assets/icons/mygym-logo-white.svg";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import HomeIcon from "@mui/icons-material/Home";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import DiscountIcon from "@mui/icons-material/Discount";
import GroupsIcon from "@mui/icons-material/Groups";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';


import SendIcon from "@mui/icons-material/Send";
import { ListItemIcon } from "@mui/material";

import Divider from "@mui/material/Divider";

import ListSubheader from "@mui/material/ListSubheader";
import { Link, useLocation } from "react-router-dom";
import StickySidebar from "../sidebar/Sidebar";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";



const drawerWidth = 240;
const navItems = [
  { text: "Dashboard", icon: <HomeIcon />, url: "/" },
  { text: "Manage", icon: <ManageAccountsIcon />, url: "/manage" },
  { text: "Reports", icon: <BarChartIcon />, url: "/reports/reportcenter" },
  { text: "Schedule", icon: <CalendarTodayIcon />, url: "/schedule" },
  { text: "Communication", icon: <SmsIcon />, url: "/communication" },
];
const settings = [
  { label: "Account", url: "/settings/account" },
  { label: "Settings", url: "/settings" },
  { label: "Logout", url: "/logout" },
];

const DrawerItemsTopList = [
  { text: "Dashboard", icon: <HomeIcon />, selected: true, url: "/" },
  { text: "Schedule", icon: <CalendarMonthIcon />, url: "/schedule" },
  { text: "Communication", icon: <SendIcon />, url: "/communication" },
];
const DrawerItemsManage = [
  {
    text: "Memberships",
    icon: <CalendarMonthIcon />,
    url: "/manage/memberships",
  },
  { text: "Classes", icon: <CardMembershipIcon />, url: "/manage/classes" },
  { text: "Programs", icon: <SportsGymnasticsIcon />, url: "/manage/programs" },
  {
    text: "Discount codes",
    icon: <DiscountIcon />,
    url: "/manage/discountcodes",
  },
  { text: "Gym staff", icon: <GroupsIcon />, url: "/manage/gymstaff" },
  { text: "Coaches", icon: <FitnessCenterIcon />, url: "/manage/coaches" },
];

const navItemsWhenNotLoggedIn = [
  {text: "Login", url: "/login"},
  {text: "Register", url: "/register"}
]

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {userdata} = useAuthContext()
  const {logout} = useLogout()
  const location = useLocation();


  const { pathname } = location;
  const includesManage = pathname.toLowerCase().includes('manage')

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (label) => {
    setAnchorElUser(null);
    if(label.toLowerCase() === 'logout') {
      logout()
    }
  };

  

  const drawer = userdata ? (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {DrawerItemsTopList.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.url}
              sx={{ alignItems: "center" }}
              selected={item.selected}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider />

        <ListSubheader>Manage</ListSubheader>

        {DrawerItemsManage.map((item) => (
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
        ))}

      </List>
    </Box>
  ) : <></>;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      
      {includesManage ? <StickySidebar includesManage={includesManage} /> :  null}

      <AppBar component="nav">
        <Toolbar>
         {userdata ? (
           <IconButton
           color="inherit"
           aria-label="open drawer"
           edge="start"
           onClick={handleDrawerToggle}
           sx={{ mr: 2, display: { md: "none" } }}
         >
           <MenuIcon />
         </IconButton>
         ) : null}
          <IconButton
            aria-label="delete"
            sx={{ mr: 3 }}
            component={Link}
            to="/"
          >
            <img width={108} src={MyGymLogo} alt="MyGym Logo" />
            {userdata?.user.gymName ? <Typography sx={{ml: 1, color: 'white', fontWeight: 'bold'}}> | {userdata?.user.gymName}</Typography>: null}
          </IconButton>
          <Box sx={{ display: { xs: userdata ? "none" : "block", md: "block" } }}>
            {userdata ? navItems.map((item) => (
              <Button
                component={Link}
                to={item.url}
                key={item.text}
                sx={{ color: "#fff" }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            )) : navItemsWhenNotLoggedIn.map((item) => (
              <Button
                component={Link}
                to={item.url}
                key={item.text}
                sx={{ color: "#fff" }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          {userdata ? (
            <Box sx={{ ml: "auto" }}>
            
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User avatar" src={userdata?.user.avatar} />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={() => handleCloseUserMenu(setting.label)}
                  component={Link}
                  to={setting.url.toLowerCase() === '/logout' ? null : setting.url}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          ) : null}
          
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box
        component="main"
        sx={{
          p: 3,
          backgroundColor: "rgb(240, 240, 240)",
          minHeight: includesManage ?  "calc(100vh - (64px + 48px))" : "calc(100vh - 64px)"
        }}
        style={{ marginTop: 64 }}
        className="w-full"
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default DrawerAppBar;
