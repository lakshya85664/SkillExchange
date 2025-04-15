// // // import React from "react";
// // // import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from "@mui/material";
// // // import MenuIcon from "@mui/icons-material/Menu";
// // // import { useState } from "react";
// // // import { Outlet, useNavigate } from "react-router-dom";
// // // import axios from "axios";
// // // import { IoIosNotifications } from "react-icons/io";



// // // const UserSidebar = () => {
// // //   const [mobileOpen, setMobileOpen] = useState(false);
// // //   const [anchorEl, setAnchorEl] = useState(null);
// // //   const navigate = useNavigate();

// // //   const handleDrawerToggle = () => {
// // //     setMobileOpen(!mobileOpen);
// // //   };

// // //   const handleAvatarClick = (event) => {
// // //     setAnchorEl(event.currentTarget);
// // //   };

// // //   const handleClose = () => {
// // //     setAnchorEl(null);
// // //     navigate("/user/profile")
// // //   };

// // //   // const handleLogout = () => {
// // //   //   localStorage.clear();
// // //   //   navigate("/");
// // //   // };

// // //   const handleLogout = async () => {
// // //     try {
// // //       const userId = localStorage.getItem("id");
// // //       await axios.post(`/users/logout/${userId}`);
// // //       // Clear local storage and redirect
// // //       localStorage.clear();
// // //       navigate("/");
// // //     } catch (error) {
// // //       console.error("Logout error:", error);
// // //     }
// // //   };

// // //   const drawer = (
// // //     <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
// // //       <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
// // //         Skill Exchange
// // //       </Typography>
// // //       <List>
// // //         {"Home Skills Requests Messages Contact".split(" ").map((text) => (
// // //           <ListItem button key={text}>
// // //             <ListItemText primary={text} />
// // //           </ListItem>
// // //         ))}
// // //       </List>
// // //     </Box>
// // //   );

// // //   const handleHomeClick = () => { navigate('/') };
// // //   const handleSkillClick = () => { navigate('/user/requestskill') };
// // //   const handleRequestsClick = () => { navigate('/user/requests') };
// // //   const handleAboutClick = () => { navigate('/aboutus') };
// // //   const handleContactClick = () => { navigate('/user/contact') };
// // //   const handleMessageClick = () => { navigate('/user/messages') };
// // //   const handleNotificationsClick = () => { navigate('/user/notifications') };

// // //   return (
// // //     <>
// // //       <Box sx={{ width: '99vw' }}>
// // //         <AppBar position="static" sx={{ backgroundColor: "#9e9e9e" }}>
// // //           <Toolbar>
// // //             <IconButton
// // //               edge="start"
// // //               color="inherit"
// // //               aria-label="menu"
// // //               sx={{ mr: 2, display: { sm: "none" } }}
// // //               onClick={handleDrawerToggle}
// // //             >
// // //               <MenuIcon />
// // //             </IconButton>
// // //             <Typography variant="h5" onClick={handleHomeClick} sx={{ flexGrow: 1, fontWeight: 'bold' }} style={{ cursor: "pointer", marginLeft: "80px" }}>
// // //               SkillExchange
// // //             </Typography>
// // //             <Box sx={{ display: { xs: "flex", sm: "flex" }, alignItems: "center" }}>
// // //               <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
// // //                 <Button color="inherit" onClick={handleHomeClick} style={{ marginRight: "10px" }}>Home</Button>
// // //                 <Box
// // //                   sx={{
// // //                     position: "relative",
// // //                     "&:hover > .dropdown": {
// // //                       display: "block",
// // //                     },
// // //                   }}
// // //                 >
// // //                   <Button color="inherit" onClick={handleAboutClick} style={{ marginRight: "10px" }}>About</Button>
// // //                   <Button color="inherit" onClick={handleSkillClick} style={{ marginRight: "10px" }}>Skills</Button>
// // //                   <Box
// // //                     className="dropdown"
// // //                     sx={{
// // //                       display: "none",
// // //                       position: "absolute",
// // //                       top: "100%",
// // //                       left: 0,
// // //                       backgroundColor: "#f0f0f0", // Updated dropdown background color
// // //                       color: "#333", // Updated dropdown text color
// // //                       boxShadow: 1,
// // //                       borderRadius: 1,
// // //                       zIndex: 10,
// // //                       minWidth: "150px",
// // //                     }}
// // //                   >
// // //                   </Box>
// // //                 </Box>
// // //                 <Button color="inherit" onClick={handleRequestsClick} style={{ marginRight: "10px" }}>Requests</Button>
// // //                 <Button color="inherit" onClick={handleMessageClick} style={{ marginRight: "10px" }}>Messages</Button>
// // //                 <Button color="inherit" onClick={handleContactClick} style={{ marginRight: "10px" }}>Contact Us</Button>
// // //                 <Button color="inherit" onClick={handleNotificationsClick} style={{ marginRight: "-18px", marginLeft:"-18px"}}><IoIosNotifications style={{fontSize:"28px"}}/></Button>
// // //               </Box>
// // //               <Avatar
// // //                 sx={{ ml: 2, cursor: "pointer" }}
// // //                 src="/static/images/avatar/1.jpg"
// // //                 alt="User Avatar"
// // //                 onClick={handleAvatarClick}
// // //               />
// // //               <Menu
// // //                 anchorEl={anchorEl}
// // //                 open={Boolean(anchorEl)}
// // //                 onClose={handleClose}
// // //                 anchorOrigin={{ vertical: "top", horizontal: "right" }}
// // //                 transformOrigin={{ vertical: "top", horizontal: "right" }}
// // //               >
// // //                 <MenuItem onClick={handleClose}>Profile</MenuItem>
// // //                 <MenuItem onClick={handleLogout}>Log Out</MenuItem>
// // //               </Menu>
// // //             </Box>
// // //           </Toolbar>
// // //         </AppBar>
// // //         <Drawer
// // //           variant="temporary"
// // //           open={mobileOpen}
// // //           onClose={handleDrawerToggle}
// // //           ModalProps={{
// // //             keepMounted: true, // Better open performance on mobile.
// // //           }}
// // //           sx={{
// // //             display: { xs: "block", sm: "none" },
// // //             "& .MuiDrawer-paper": { boxSizing: "border-box" },
// // //           }}
// // //         >
// // //           {drawer}
// // //         </Drawer>
// // //         <main className="app-main" style={{ padding: "0px" }}>
// // //           <Outlet></Outlet>
// // //         </main>
// // //       </Box>


// // //     </>
// // //   );
// // // };

// // // export default UserSidebar

// // // UserSidebar.jsx
// // import React, { useState } from "react";
// // import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import { Outlet, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { IoIosNotifications } from "react-icons/io";
// // import Notifications from "../learners/Notifications"; // Import the Notifications component

// // const UserSidebar = () => {
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [showNotifications, setShowNotifications] = useState(false); // State for notifications visibility
// //   const navigate = useNavigate();

// //   const handleDrawerToggle = () => {
// //     setMobileOpen(!mobileOpen);
// //   };

// //   const handleAvatarClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = () => {
// //     setAnchorEl(null);
// //     navigate("/user/profile");
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       const userId = localStorage.getItem("id");
// //       await axios.post(`/users/logout/${userId}`);
// //       localStorage.clear();
// //       navigate("/");
// //     } catch (error) {
// //       console.error("Logout error:", error);
// //     }
// //   };

// //   // Toggle notifications dialog
// //   const toggleNotifications = () => {
// //     setShowNotifications(!showNotifications);
// //   };

// //   const drawer = (
// //     <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
// //       <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
// //         Skill Exchange
// //       </Typography>
// //       <List>
// //         {"Home Skills Requests Messages Contact".split(" ").map((text) => (
// //           <ListItem button key={text}>
// //             <ListItemText primary={text} />
// //           </ListItem>
// //         ))}
// //       </List>
// //     </Box>
// //   );

// //   const handleHomeClick = () => { navigate('/') };
// //   const handleSkillClick = () => { navigate('/user/requestskill') };
// //   const handleRequestsClick = () => { navigate('/user/requests') };
// //   const handleAboutClick = () => { navigate('/aboutus') };
// //   const handleContactClick = () => { navigate('/contact') };
// //   const handleMessageClick = () => { navigate('/user/messages') };

// //   return (
// //     <>
// //       <Box sx={{ width: '99vw' }}>
// //         <AppBar position="static" sx={{
// //           background: "#2A5CAA", // Your primary blue
// //           color: "white",
// //           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
// //         }}>
// //           <Toolbar>
// //             <IconButton
// //               edge="start"
// //               color="inherit"
// //               aria-label="menu"
// //               sx={{ mr: 2, display: { sm: "none" } }}
// //               onClick={handleDrawerToggle}
// //             >
// //               <MenuIcon />
// //             </IconButton>
// //             <Typography variant="h5" onClick={handleHomeClick} sx={{ flexGrow: 1, fontWeight: 'bold' }} style={{ cursor: "pointer", marginLeft: "80px" }}>
// //               SkillExchange
// //             </Typography>
// //             <Box sx={{ display: { xs: "flex", sm: "flex" }, alignItems: "center" }}>
// //               <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
// //                 <Button color="inherit" onClick={handleHomeClick} style={{ marginRight: "10px" }}>Home</Button>
// //                 <Box
// //                   sx={{
// //                     position: "relative",
// //                     "&:hover > .dropdown": {
// //                       display: "block",
// //                     },
// //                   }}
// //                 >
// //                   <Button color="inherit" onClick={handleAboutClick} style={{ marginRight: "10px" }}>About</Button>
// //                   <Button color="inherit" onClick={handleSkillClick} style={{ marginRight: "10px" }}>Skills</Button>
// //                   <Box
// //                     className="dropdown"
// //                     sx={{
// //                       display: "none",
// //                       position: "absolute",
// //                       top: "100%",
// //                       left: 0,
// //                       backgroundColor: "#f0f0f0",
// //                       color: "#333",
// //                       boxShadow: 1,
// //                       borderRadius: 1,
// //                       zIndex: 10,
// //                       minWidth: "150px",
// //                     }}
// //                   >
// //                   </Box>
// //                 </Box>
// //                 <Button color="inherit" onClick={handleRequestsClick} style={{ marginRight: "10px" }}>Requests</Button>
// //                 <Button color="inherit" onClick={handleMessageClick} style={{ marginRight: "10px" }}>Matches</Button>
// //                 <Button color="inherit" onClick={handleContactClick} style={{ marginRight: "10px" }}>Contact Us</Button>
// //                 {/* <Button 
// //                   color="inherit" 
// //                   onClick={toggleNotifications} 
// //                   style={{ marginRight: "-18px", marginLeft:"-18px"}}
// //                 >
// //                   <IoIosNotifications style={{fontSize:"28px"}}/>
// //                 </Button> */}
// //               </Box>
// //               <Avatar
// //                 sx={{ ml: 2, cursor: "pointer" }}
// //                 src="/static/images/avatar/1.jpg"
// //                 alt="User Avatar"
// //                 onClick={handleAvatarClick}
// //               />
// //               <Menu
// //                 anchorEl={anchorEl}
// //                 open={Boolean(anchorEl)}
// //                 onClose={handleClose}
// //                 anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //                 transformOrigin={{ vertical: "top", horizontal: "right" }}
// //               >
// //                 <MenuItem onClick={handleClose}>Profile</MenuItem>
// //                 <MenuItem onClick={handleLogout}>Log Out</MenuItem>
// //               </Menu>
// //             </Box>
// //           </Toolbar>
// //         </AppBar>
// //         <Drawer
// //           variant="temporary"
// //           open={mobileOpen}
// //           onClose={handleDrawerToggle}
// //           ModalProps={{
// //             keepMounted: true,
// //           }}
// //           sx={{
// //             display: { xs: "block", sm: "none" },
// //             "& .MuiDrawer-paper": { boxSizing: "border-box" },
// //           }}
// //         >
// //           {drawer}
// //         </Drawer>
// //         <main className="app-main" style={{ padding: "0px" }}>
// //           <Outlet></Outlet>
// //         </main>

// //         {/* Render Notifications as a dialog */}
// //         {/* {showNotifications && (
// //           <div style={{
// //             position: 'fixed',
// //             top: '58px',
// //             right: '20px',
// //             zIndex: 1200
// //           }}>
// //             <Notifications />
// //           </div>
// //         )} */}
// //         {/* {showNotifications && (
// //           <div style={{
// //             position: 'fixed',
// //             top: '58px',
// //             right: '20px',
// //             zIndex: 1200
// //           }}>
// //             <Notifications onClose={() => setShowNotifications(false)} />
// //           </div>
// //         )} */}
// //       </Box>
// //     </>
// //   );
// // };

// // export default UserSidebar;

// import React, { useState } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { IoIosNotifications } from "react-icons/io";
// import Notifications from "../learners/Notifications";

// const UserSidebar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("id"); // Check if user is logged in

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleAvatarClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     navigate("/user/profile");
//   };

//   const handleLogout = async () => {
//     try {
//       const userId = localStorage.getItem("id");
//       await axios.post(`/users/logout/${userId}`);
//       localStorage.clear();
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
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

//   const handleHomeClick = () => { navigate('/') };
//   const handleSkillClick = () => { navigate('/requestskill') };
//   const handleRequestsClick = () => { navigate('/user/requests') };
//   const handleAboutClick = () => { navigate('/aboutus') };
//   const handleContactClick = () => { navigate('/contact') };
//   const handleMessageClick = () => { navigate('/user/messages') };
//   const handleLoginClick = () => { navigate('/login') };
//   const handleRegisterClick = () => { navigate('/signup') };

//   return (
//     <>
//       <Box sx={{ width: '99vw' }}>
//         <AppBar position="static" sx={{
//           background: "#2A5CAA",
//           color: "white",
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
//         }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: 2, display: { sm: "none" } }}
//               onClick={handleDrawerToggle}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h5" onClick={handleHomeClick} sx={{ flexGrow: 1, fontWeight: 'bold' }} style={{ cursor: "pointer", marginLeft: "80px" }}>
//               SkillExchange
//             </Typography>
//             <Box sx={{ display: { xs: "flex", sm: "flex" }, alignItems: "center" }}>
//               <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
//                 <Button color="inherit" onClick={handleHomeClick} style={{ marginRight: "10px" }}>Home</Button>
//                 <Box
//                   sx={{
//                     position: "relative",
//                     "&:hover > .dropdown": {
//                       display: "block",
//                     },
//                   }}
//                 >
//                   <Button color="inherit" onClick={handleAboutClick} style={{ marginRight: "10px" }}>About</Button>
//                   <Button color="inherit" onClick={handleSkillClick} style={{ marginRight: "10px" }}>Skills</Button>
//                   <Box
//                     className="dropdown"
//                     sx={{
//                       display: "none",
//                       position: "absolute",
//                       top: "100%",
//                       left: 0,
//                       backgroundColor: "#f0f0f0",
//                       color: "#333",
//                       boxShadow: 1,
//                       borderRadius: 1,
//                       zIndex: 10,
//                       minWidth: "150px",
//                     }}
//                   >
//                   </Box>
//                 </Box>
//                 {isLoggedIn ? (
//                   <>
//                     <Button color="inherit" onClick={handleRequestsClick} style={{ marginRight: "10px" }}>Requests</Button>
//                     <Button color="inherit" onClick={handleMessageClick} style={{ marginRight: "10px" }}>Matches</Button>
//                   </>
//                 ) : null}
//                 <Button color="inherit" onClick={handleContactClick} style={{ marginRight: "10px" }}>Contact Us</Button>
//               </Box>
              
//               {isLoggedIn ? (
//                 <>
//                   <Avatar
//                     sx={{ ml: 2, cursor: "pointer" }}
//                     src="/static/images/avatar/1.jpg"
//                     alt="User Avatar"
//                     onClick={handleAvatarClick}
//                   />
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl)}
//                     onClose={() => setAnchorEl(null)}
//                     anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                     transformOrigin={{ vertical: "top", horizontal: "right" }}
//                   >
//                     <MenuItem onClick={handleClose}>Profile</MenuItem>
//                     <MenuItem onClick={handleLogout}>Log Out</MenuItem>
//                   </Menu>
//                 </>
//               ) : (
//                 <>
//                   <Button color="inherit" onClick={handleLoginClick} style={{ marginRight: "10px" }}>Login</Button>
//                   <Button color="inherit" onClick={handleRegisterClick}>Register</Button>
//                 </>
//               )}
//             </Box>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true,
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": { boxSizing: "border-box" },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <main className="app-main" style={{ padding: "0px" }}>
//           <Outlet></Outlet>
//         </main>
//       </Box>
//     </>
//   );
// };

// export default UserSidebar;

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const UserSidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("id");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate("/user/profile");
  };

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("id");
      await axios.post(`/users/logout/${userId}`);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250, padding: "10px" }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        SkillExchange
      </Typography>
      <Divider />
      <List>
        {[
          { text: "Home", path: "/" },
          { text: "About", path: "/aboutus" },
          { text: "Skills", path: "/requestskill" },
          { text: "Requests", path: "/user/requests" },
          { text: "Matches", path: "/user/messages" },
          { text: "Contact Us", path: "/contact" },
        ].map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              }
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {!isLoggedIn && (
          <>
            <Divider />
            <ListItem 
              button 
              onClick={() => handleNavigation("/login")}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem 
              button 
              onClick={() => handleNavigation("/signup")}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const handleHomeClick = () => navigate('/');
  const handleSkillClick = () => navigate('/requestskill');
  const handleRequestsClick = () => navigate('/user/requests');
  const handleAboutClick = () => navigate('/aboutus');
  const handleContactClick = () => navigate('/contact');
  const handleMessageClick = () => navigate('/user/messages');
  const handleLoginClick = () => navigate('/login');
  const handleRegisterClick = () => navigate('/signup');

  return (
    <>
      <Box sx={{ width: '99vw', overflowX: 'hidden' }}>
        <AppBar 
          position="static" 
          sx={{
            background: "#2A5CAA",
            color: "white",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { sm: "none" } }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Typography 
                variant="h5" 
                onClick={handleHomeClick} 
                sx={{ 
                  fontWeight: 'bold',
                  cursor: "pointer",
                  fontSize: isMobile ? "1.25rem" : "1.5rem"
                }}
              >
                SkillExchange
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!isMobile && (
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <Button color="inherit" onClick={handleHomeClick}>Home</Button>
                  <Button color="inherit" onClick={handleAboutClick}>About</Button>
                  <Button color="inherit" onClick={handleSkillClick}>Skills</Button>
                  
                  {isLoggedIn && (
                    <>
                      <Button color="inherit" onClick={handleRequestsClick}>Requests</Button>
                      <Button color="inherit" onClick={handleMessageClick}>Matches</Button>
                    </>
                  )}
                  
                  <Button color="inherit" onClick={handleContactClick}>Contact</Button>
                </Box>
              )}

              {isLoggedIn ? (
                <>
                  <Avatar
                    sx={{ cursor: "pointer" }}
                    src="/static/images/avatar/1.jpg"
                    alt="User Avatar"
                    onClick={handleAvatarClick}
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </Menu>
                </>
              ) : (
                !isMobile && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                    <Button 
                      color="inherit" 
                      onClick={handleRegisterClick}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                        }
                      }}
                    >
                      Register
                    </Button>
                  </Box>
                )
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { 
              boxSizing: "border-box",
              width: 250,
            },
          }}
        >
          {drawer}
        </Drawer>

        <main className="app-main" style={{ padding: "0px" }}>
          <Outlet />
        </main>
      </Box>
    </>
  );
};

export default UserSidebar;