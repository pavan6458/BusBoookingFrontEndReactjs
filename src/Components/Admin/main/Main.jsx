import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Homepage from "../HomePage/Homepage";
import Schedule from "../Schedule/Schedule";

function AdminHomepage() {
  const [presentRoute, setPresentRoute] = useState("Homepage");
  const route = (route) => {
    setPresentRoute(route);
  };
  return (
    <Sidebar>
      <Menu>
      <MenuItem component={<Link to="/" />}> Dashboard</MenuItem>
      <MenuItem component={<Link to="/bus" />}> Bus</MenuItem>
      <MenuItem component={<Link to="/busoperator" />}> Bus Operator</MenuItem>
      <MenuItem component={<Link to="/schedule" />}> schedule</MenuItem>

      </Menu>
    </Sidebar>
  );
}

export default AdminHomepage;
