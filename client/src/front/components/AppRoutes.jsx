import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import GymStaff from "../manage/GymStaff";

import DiscountCodes from "../manage/DiscountCodes";
import Programs from "../manage/Programs";
import Memberships from "../manage/Memberships";
import Classes from "../manage/Classes";
import ManageMembers from "../manage/Members";
import ReportsCenter from "../reports/ReportsCenter";
import Settings from "../profile/Settings";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Communication from "../communication/Communication";
import Account from "../profile/Account";

import { useAuthContext } from "../hooks/useAuthContext";
import Coaches from "../manage/Coaches";
import Calendar from "../schedule/Calendar";
import Dashboard from "../dashboard/Dashboard";

export default function AppRoutes() {
  const {userdata} = useAuthContext()
  return (
    <Routes>
      <Route path="/">
        <Route index element={userdata ? <Dashboard/> : <Navigate to="/login"/>} />
        <Route path="manage">
          <Route index element={userdata ? <Navigate to="/manage/memberships"/> : <Navigate to="/login"/>} />
          <Route path="/manage/memberships" element={userdata ? <Memberships /> : <Navigate to="/login"/>} />
          <Route path="/manage/members" element={userdata ? <ManageMembers /> : <Navigate to="/login"/>} />
          <Route path="/manage/classes" element={userdata ? <Classes /> : <Navigate to="/login"/>} />
          <Route path="/manage/programs" element={userdata ? <Programs /> : <Navigate to="/login"/>} />
          <Route path="/manage/discountcodes" element={userdata ? <DiscountCodes /> : <Navigate to="/login"/>} />
          <Route path="/manage/gymstaff" element={userdata ? <GymStaff /> : <Navigate to="/login"/>} />
          <Route path="/manage/coaches" element={userdata ? <Coaches /> : <Navigate to="/login"/>} />
        </Route>

        <Route path="reports">
          <Route index element={userdata ? <Navigate to="/reports/reportcenter"/> : <Navigate to="/login"/>} />
          <Route path="/reports/reportcenter" element={userdata ? <ReportsCenter /> : <Navigate to="/login"/>} />
        </Route>

        <Route path="schedule">
          <Route index element={userdata ? <Calendar />  : <Navigate to="/login"/>} />
        </Route>

        <Route path="communication">
          <Route index element={userdata ? <Communication /> : <Navigate to="/login"/>} />
        </Route>

        <Route path="settings">
          <Route index element={userdata ? <Settings /> : <Navigate to="/login"/>} />
          <Route path="/settings/account" element={userdata ? <Account/> : <Navigate to="/login"/>} />
        </Route>

        <Route path="/login" element={!userdata ? <Login /> : <Navigate to="/"/>} />
        <Route path="/register" element={!userdata ? <Register /> : <Navigate to="/"/>}/> 
        <Route
          path="*"
          element={<h1 style={{ margin: 0 }}>404 Not found!</h1>}
        />
      </Route>
    </Routes>
  );
}
