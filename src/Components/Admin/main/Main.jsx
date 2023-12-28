import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Homepage from "../HomePage/Homepage";
import Schedule from "../Schedule/Schedule";

function AdminHomepage() {
  const location = useLocation();
  const [currentUrl, setCurrent] = useState();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  return (
    <Sidebar>
      <Menu>
        <MenuItem className={`${currentUrl === "/" && "bg-blue-400"}`} component={<Link to="/" />}> Dashboard</MenuItem>
        <MenuItem className={`${currentUrl === "/bus" && "bg-blue-400"}`} component={<Link to="/bus" />}> Bus</MenuItem>
        <MenuItem className={`${currentUrl === "/busoperator" && "bg-blue-400"}`} component={<Link to="/busoperator" />}> Bus Operator</MenuItem>
        <MenuItem className={`${currentUrl === "/schedule" && "bg-blue-400"}`} component={<Link to="/schedule" />}> Schedule</MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default AdminHomepage;
