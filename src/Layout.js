
import React from "react";
import './Layout.css';
import Footer from "./components/Footer/Footer";
import { NavLink, Outlet } from "react-router-dom";
import { Clock, Timer, Watch } from "lucide-react";

function Layout() {
  return (
    <div className="navcontainer">
      {/* Top navigation bar */}
      <nav className="top-nav">
  <NavLink to="/clock" className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
    <Clock size={50} />
  </NavLink>
  <NavLink to="/stopwatch" className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
    <Watch size={50} />
  </NavLink>
  <NavLink to="/timer" className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
    <Timer size={50} />
  </NavLink>
</nav>


      {/* Main Content */}
      <div className="itemcontent">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
