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
      <MenuItem component={<Link to="/home" />}> Documentation</MenuItem>
        <SubMenu label="Charts">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default AdminHomepage;
