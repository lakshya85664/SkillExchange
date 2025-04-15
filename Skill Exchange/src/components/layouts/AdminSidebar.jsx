// import React from "react";
// import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";



// const AdminSidebar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleAvatarClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     navigate("/admin/profile")
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/adminlogin");
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
//       <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
//         Skill Exchange
//       </Typography>
//       <List>
//         {"Home Skills Requests Messages Contact".split(" ").map((text) => (
//           <ListItem button key={text}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const handleHomeClick = () => {navigate('/admin/profile')};

//   return (
//     <>
//     <Box sx={{ width: '99vw' }}>
//       <AppBar position="static" sx={{ backgroundColor: "#9e9e9e" }}>
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2, display: { sm: "none" } }}
//             onClick={handleDrawerToggle}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h5" onClick={handleHomeClick} sx={{ flexGrow: 1 ,fontWeight: 'bold' }} style={{cursor:"pointer",marginLeft:"80px"}}>
//             SkillExchange
//           </Typography>
//           <Box sx={{ display: { xs: "flex", sm: "flex" }, alignItems: "center" }}>
//             <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
//               {/* <Button color="inherit" onClick={handleHomeClick} style={{marginRight:"10px"}}>Home</Button> */}
//               <Box
//                 sx={{
//                   position: "relative",
//                   "&:hover > .dropdown": {
//                     display: "block",
//                   },
//                 }}
//               >
//                 <Button variant="contained" color="error" sx={{color:"white"}} onClick={handleLogout} style={{marginRight:"10px"}}>Logout</Button>
//                 <Box
//                   className="dropdown"
//                   sx={{
//                     display: "none",
//                     position: "absolute",
//                     top: "100%",
//                     left: 0,
//                     backgroundColor: "#f0f0f0", // Updated dropdown background color
//                     color: "#333", // Updated dropdown text color
//                     boxShadow: 1,
//                     borderRadius: 1,
//                     zIndex: 10,
//                     minWidth: "150px",
//                   }}
//                 >
//                   {/* <List>
//                     <ListItem button>
//                       <ListItemText primary="Telemedicine" sx={{ color: "inherit" }} />
//                     </ListItem>
//                     <ListItem button>
//                       <ListItemText primary="Lab Tests" sx={{ color: "inherit" }} />
//                     </ListItem>
//                     <ListItem button>
//                       <ListItemText primary="Pharmacy" sx={{ color: "inherit" }} />
//                     </ListItem>
//                   </List> */}
//                 </Box>
//               </Box>
//               {/* <Button color="inherit" onClick={handleReviewsClick} style={{marginRight:"10px"}}>Reviews</Button>
//               <Button color="inherit" onClick={handleQueryClick} style={{marginRight:"10px"}}>User Queries</Button> */}
//             </Box>
//             {/* <Avatar
//               sx={{ ml: 2, cursor: "pointer" }}
//               src="/static/images/avatar/1.jpg"
//               alt="User Avatar"
//               onClick={handleAvatarClick}
//             />
//             <Menu
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//               anchorOrigin={{ vertical: "top", horizontal: "right" }}
//               transformOrigin={{ vertical: "top", horizontal: "right" }}
//             >
//               <MenuItem onClick={handleClose}>Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//             </Menu> */}
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{
//           keepMounted: true, // Better open performance on mobile.
//         }}
//         sx={{
//           display: { xs: "block", sm: "none" },
//           "& .MuiDrawer-paper": { boxSizing: "border-box" },
//         }}
//       >
//         {drawer}
//       </Drawer>
//       <main className="app-main" style={{padding:"0px"}}>
//         <Outlet></Outlet>
//       </main>
//     </Box>
    

//     </>
//   );
// };

// export default AdminSidebar



import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/adminlogin");
  };

  const handleHomeClick = () => {
    navigate("/admin/profile");
  };

  return (
    <Box sx={{ display: "flex", width: "99vw", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#9e9e9e",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              cursor: "pointer",
              ml: { xs: 0, sm: 2 },
            }}
            onClick={handleHomeClick}
          >
            SkillExchange
          </Typography>

          <Button
            variant="contained"
            color="error"
            size={isMobile ? "small" : "medium"}
            sx={{ 
              color: "white",
              whiteSpace: "nowrap",
              minWidth: "fit-content",
            }}
            onClick={handleLogout}
          >
            {isMobile ? "Logout" : "Log Out"}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Empty Drawer for mobile - maintains structure but no content */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: 0 }, // Zero width since no content
        }}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          mt: "64px", // Matches AppBar height
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminSidebar;