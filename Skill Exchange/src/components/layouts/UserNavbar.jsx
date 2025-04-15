// import React from 'react'
// import hamburgermenu from "../../assets/images/hamburgermenu.png"
// import { useNavigate } from 'react-router-dom';

import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


const UserNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  return (

    // <nav className="app-header navbar navbar-expand bg-body">
    //   {/*begin::Container*/}
    //   <div className="container-fluid">
    //     {/*begin::Start Navbar Links*/}
    //     <ul className="navbar-nav">
    //       <li className="nav-item">
    //         <a
    //           className="nav-link1 btn btn-light"
    //           href="#"
    //           role="button"
    //           style={{
    //             color: "black",
    //             padding: "5px 10px",
    //             border: "1px solid #ccc",
    //             borderRadius: "5px",
    //           }}
    //           onClick={toggleSidebar}
    //         >
    //           <img src={hamburgermenu} style={{ height: "25px", width: "25px" }}></img>
    //         </a>
    //       </li>
    //       <li className="nav-item d-none d-md-block">
    //         <a href="/user/home" className="nav-link">
    //           Home
    //         </a>
    //       </li>
    //       <li className="nav-item d-none d-md-block">
    //         <a href="/user/contact" className="nav-link">
    //           Contact
    //         </a>
    //       </li>
    //     </ul>
    //     {/*end::Start Navbar Links*/}
    //     <ul className="navbar-nav ms-auto">
    //       <li className="nav-item">
    //         <a
    //           className="nav-link"
    //           data-widget="navbar-search"
    //           href="#"
    //           role="button"
    //         >
    //           <i className="bi bi-search" />
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <button className="btn btn-light" onClick={() => navigate("/login")}>LOGOUT</button>
    //       </li>
    //     </ul>
    //   </div>
    //   {/*end::Container*/}
    // </nav>

    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm" style={{ width: "100%" }}>
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">SkillExchange</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link text-white" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Skills</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Requests</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Messages</a></li>
            <li className="nav-item"><a className="nav-link text-white" href="#">Profile</a></li>
            <li className="nav-item">
             <button className="btn btn-outline-danger" onClick={() => navigate("/login")}>LOGOUT</button>
           </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default UserNavbar
