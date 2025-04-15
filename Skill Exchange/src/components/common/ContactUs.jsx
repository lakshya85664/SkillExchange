// // // import React, { useState } from "react";
// // // import Image from "./images/5124556.jpg";
// // // import Image2 from "./images/11007141.png";
// // // import { Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel, TextField } from "@mui/material";
// // // import { AccessTime, LocationOn, Phone } from "@mui/icons-material";
// // // import Footer from "./Footer";
// // // import "../../assets/contactus.css";

// // // const ContactUs = () => {
// // //   const [subject, setSubject] = useState("");
// // //   const [customSubject, setCustomSubject] = useState("");
// // //   const [username, setUsername] = useState("");
// // //   const [showCustomSubject, setShowCustomSubject] = useState(false);
// // //   const [showUsernameField, setShowUsernameField] = useState(false);

// // //   const handleSubjectChange = (event) => {
// // //     const value = event.target.value;
// // //     setSubject(value);
// // //     setShowCustomSubject(value === "other");
// // //     setShowUsernameField(value === "report-user");
// // //     if (value !== "other") {
// // //       setCustomSubject("");
// // //     }
// // //     if (value !== "report-user") {
// // //       setUsername("");
// // //     }
// // //   };

// // //   return (
// // //     <div className="contact-container">
// // //       <section>
// // //         <div className="contact-hero"></div>

// // //         {/* Info Cards */}
// // //         <div className="info-container">
// // //           <div className="info-card fade-in-up">
// // //             <i className="fas fa-map-marker-alt info-icon"></i>
// // //             <h3>Address</h3>
// // //             <p>58, SBR, AHMEDABAD, IND</p>
// // //           </div>
// // //           <div className="info-card fade-in-up delay-1">
// // //             <i className="fas fa-phone-alt info-icon"></i>
// // //             <h3>Call Us Now</h3>
// // //             <p>+91 36545 6789</p>
// // //           </div>
// // //           <div className="info-card fade-in-up delay-2">
// // //             <i className="fas fa-envelope info-icon"></i>
// // //             <h3>Mail Us Now</h3>
// // //             <p>support@skillexchange.com</p>
// // //           </div>
// // //         </div>

// // //         {/* Contact Form & Map Section */}
// // //         <div className="content-container">
// // //           <div className="contact-form fade-in-down">
// // //             <h2>Have Any Query? Please Contact Us!</h2>
// // //             <form>
// // //               <div className="input-group">
// // //                 <input type="text" placeholder="Your Name" required className="form-input" />
// // //                 <input type="email" placeholder="Your Email" required className="form-input" />
// // //               </div>

// // //               <FormControl fullWidth className="form-control">
// // //                 <InputLabel id="subject-label">Subject</InputLabel>
// // //                 <Select
// // //                   labelId="subject-label"
// // //                   value={subject}
// // //                   label="Subject"
// // //                   onChange={handleSubjectChange}
// // //                   required
// // //                 >
// // //                   <MenuItem value="">
// // //                     <em>Select a subject</em>
// // //                   </MenuItem>
// // //                   <MenuItem value="report-user">Report User</MenuItem>
// // //                   <MenuItem value="other">Other (please specify)</MenuItem>
// // //                 </Select>
// // //               </FormControl>

// // //               {showUsernameField && (
// // //                 <TextField
// // //                   fullWidth
// // //                   value={username}
// // //                   onChange={(e) => setUsername(e.target.value)}
// // //                   placeholder="Enter username to report"
// // //                   required
// // //                   className="form-input"
// // //                 />
// // //               )}

// // //               {showCustomSubject && (
// // //                 <TextField
// // //                   fullWidth
// // //                   value={customSubject}
// // //                   onChange={(e) => setCustomSubject(e.target.value)}
// // //                   placeholder="Please specify your query"
// // //                   required
// // //                   className="form-input"
// // //                 />
// // //               )}

// // //               <textarea placeholder="Message" required className="form-textarea"></textarea>
// // //               <button type="submit" className="send-button">
// // //                 Send Message
// // //               </button>
// // //             </form>
// // //           </div>
// // //           <div>
// // //             <img src={Image} alt="Contact" className="contact-image fade-in-up" />
// // //           </div>
// // //         </div>
// // //       </section>
// // //       <section>
// // //         <Grid container spacing={3} justifyContent="center" className="grid-container">
// // //           {/* Phone Section */}
// // //           <Grid item xs={12} md={4}>
// // //             <Box className="small-box">
// // //               <Phone className="box-icon" />
// // //               <Typography variant="h6" className="box-title">
// // //                 +(91) 36545 6789
// // //               </Typography>
// // //               <Typography variant="body2" className="box-text">
// // //                 support@skillexchange.com
// // //               </Typography>
// // //             </Box>
// // //           </Grid>
// // //           {/* Address Section */}
// // //           <Grid item xs={12} md={4}>
// // //             <Box className="small-box">
// // //               <LocationOn className="box-icon" />
// // //               <Typography variant="h6" className="box-title">
// // //                 58, Sindhu Bhavan Road
// // //               </Typography>
// // //               <Typography variant="body2" className="box-text bold">
// // //                 Ahmedabad, Gujarat
// // //               </Typography>
// // //             </Box>
// // //           </Grid>
// // //           {/* Timing Section */}
// // //           <Grid item xs={12} md={4}>
// // //             <Box className="small-box">
// // //               <AccessTime className="box-icon" />
// // //               <Typography variant="h6" className="box-title">
// // //                 Mon - Sat: 8am - 5pm
// // //               </Typography>
// // //               <Typography variant="body2" className="box-text">
// // //                 Sunday Closed
// // //               </Typography>
// // //             </Box>
// // //           </Grid>
// // //         </Grid>
// // //       </section>
// // //       <Footer />
// // //     </div>
// // //   );
// // // };

// // // export default ContactUs;

// // // import React, { useState } from "react";
// // // import Image from "./images/5124556.jpg";
// // // import Image2 from "./images/11007141.png";
// // // import { Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Snackbar, Alert } from "@mui/material";
// // // import { AccessTime, LocationOn, Phone } from "@mui/icons-material";
// // // import Footer from "./Footer";
// // // import "../../assets/contactus.css";
// // // import axios from "axios";
// // // import { useParams } from "react-router-dom";

// // // const ContactUs = () => {
// // //   const [subject, setSubject] = useState("");
// // //   const [customSubject, setCustomSubject] = useState("");
// // //   const [username, setUsername] = useState("");
// // //   const [name, setName] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [message, setMessage] = useState("");
// // //   const [showCustomSubject, setShowCustomSubject] = useState(false);
// // //   const [showUsernameField, setShowUsernameField] = useState(false);
// // //   const { id } = useParams();
// // //   const [snackbar, setSnackbar] = useState({
// // //     open: false,
// // //     message: "",
// // //     severity: "success"
// // //   });

// // //   const handleSubjectChange = (event) => {
// // //     const value = event.target.value;
// // //     setSubject(value);
// // //     setShowCustomSubject(value === "other");
// // //     setShowUsernameField(value === "report-user");
// // //     if (value !== "other") {
// // //       setCustomSubject("");
// // //     }
// // //     if (value !== "report-user") {
// // //       setUsername("");
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
    
// // //     try {
// // //       const reportData = {
// // //         name,
// // //         reporterUserId:{id},
// // //         email,
// // //         subject,
// // //         customSubject: subject === "other" ? customSubject : "",
// // //         username: subject === "report-user" ? username : "",
// // //         message
// // //       };
  
// // //       console.log("Sending report data:", reportData);
  
// // //       // Get the auth token from wherever you store it (localStorage, cookies, etc.)
// // //       const token = localStorage.getItem('authToken'); // or your token storage method
      
// // //       const response = await axios.post("reports/create", reportData, {
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${token}` // Send the auth token
// // //         }
// // //       });
      
// // //       if (response.data.success) {
// // //         setSnackbar({
// // //           open: true,
// // //           message: "Thank you! We've received your message and sent a confirmation to your email.",
// // //           severity: "success"
// // //         });
  
// // //         // Reset form
// // //         setName("");
// // //         setEmail("");
// // //         setSubject("");
// // //         setCustomSubject("");
// // //         setUsername("");
// // //         setMessage("");
// // //         setShowCustomSubject(false);
// // //         setShowUsernameField(false);
// // //       } else {
// // //         setSnackbar({
// // //           open: true,
// // //           message: response.data.message || "Failed to send message. Please try again.",
// // //           severity: "error"
// // //         });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error submitting form:", error);
// // //       setSnackbar({
// // //         open: true,
// // //         message: error.response?.data?.message || "Failed to send message. Please try again.",
// // //         severity: "error"
// // //       });
// // //     }
// // //   };

// // import React, { useState } from "react";
// // import Image from "./images/5124556.jpg";
// // import Image2 from "./images/11007141.png";
// // import { Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Snackbar, Alert } from "@mui/material";
// // import { AccessTime, LocationOn, Phone } from "@mui/icons-material";
// // import Footer from "./Footer";
// // import "../../assets/contactus.css";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";

// // const ContactUs = () => {
// //   const [subject, setSubject] = useState("");
// //   const [customSubject, setCustomSubject] = useState("");
// //   const [username, setUsername] = useState("");
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [showCustomSubject, setShowCustomSubject] = useState(false);
// //   const [showUsernameField, setShowUsernameField] = useState(false);
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success"
// //   });

// //   const handleSubjectChange = (event) => {
// //     const value = event.target.value;
// //     setSubject(value);
// //     setShowCustomSubject(value === "other");
// //     setShowUsernameField(value === "report-user");
// //     if (value !== "other") {
// //       setCustomSubject("");
// //     }
// //     if (value !== "report-user") {
// //       setUsername("");
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
    
// //     try {
// //       // Get user data from local storage
// //       const userData = JSON.parse(localStorage.getItem('user'));
// //       const reporterUserId = userData?.id; // Assuming the user object has an 'id' field
      
// //       if (!reporterUserId) {
// //         throw new Error("User not authenticated");
// //       }

// //       const reportData = {
// //         name,
// //         reporterUserId, // Directly use the ID from local storage
// //         email,
// //         subject,
// //         customSubject: subject === "other" ? customSubject : "",
// //         username: subject === "report-user" ? username : "",
// //         message
// //       };
  
// //       console.log("Sending report data:", reportData);
  
// //       const token = localStorage.getItem('authToken');
      
// //       const response = await axios.post("reports/create", reportData, {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
      
// //       if (response.data.success) {
// //         setSnackbar({
// //           open: true,
// //           message: "Thank you! We've received your message and sent a confirmation to your email.",
// //           severity: "success"
// //         });
  
// //         // Reset form
// //         setName("");
// //         setEmail("");
// //         setSubject("");
// //         setCustomSubject("");
// //         setUsername("");
// //         setMessage("");
// //         setShowCustomSubject(false);
// //         setShowUsernameField(false);
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: response.data.message || "Failed to send message. Please try again.",
// //           severity: "error"
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       setSnackbar({
// //         open: true,
// //         message: error.response?.data?.message || 
// //                (error.message === "User not authenticated" 
// //                 ? "Please log in to submit a report" 
// //                 : "Failed to send message. Please try again."),
// //         severity: "error"
// //       });
// //     }
// //   };

// //   const handleCloseSnackbar = () => {
// //     setSnackbar({ ...snackbar, open: false });
// //   };

// //   return (
// //     <div className="contact-container">
// //       <section>
// //         <div className="contact-hero"></div>

// //         {/* Info Cards */}
// //         <div className="info-container">
// //           <div className="info-card fade-in-up">
// //             <i className="fas fa-map-marker-alt info-icon"></i>
// //             <h3>Address</h3>
// //             <p>58, SBR, AHMEDABAD, IND</p>
// //           </div>
// //           <div className="info-card fade-in-up delay-1">
// //             <i className="fas fa-phone-alt info-icon"></i>
// //             <h3>Call Us Now</h3>
// //             <p>+91 36545 6789</p>
// //           </div>
// //           <div className="info-card fade-in-up delay-2">
// //             <i className="fas fa-envelope info-icon"></i>
// //             <h3>Mail Us Now</h3>
// //             <p>support@skillexchange.com</p>
// //           </div>
// //         </div>

// //         {/* Contact Form & Map Section */}
// //         <div className="content-container">
// //           <div className="contact-form fade-in-down">
// //             <h2>Have Any Query? Please Contact Us!</h2>
// //             <form onSubmit={handleSubmit}>
// //               <div className="input-group">
// //                 <input 
// //                   type="text" 
// //                   placeholder="Your Name" 
// //                   required 
// //                   className="form-input" 
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                 />
// //                 <input 
// //                   type="email" 
// //                   placeholder="Your Email" 
// //                   required 
// //                   className="form-input" 
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                 />
// //               </div>

// //               <FormControl fullWidth className="form-control">
// //                 <InputLabel id="subject-label">Subject</InputLabel>
// //                 <Select
// //                   labelId="subject-label"
// //                   value={subject}
// //                   label="Subject"
// //                   onChange={handleSubjectChange}
// //                   required
// //                 >
// //                   <MenuItem value="">
// //                     <em>Select a subject</em>
// //                   </MenuItem>
// //                   <MenuItem value="report-user">Report User</MenuItem>
// //                   <MenuItem value="other">Other (please specify)</MenuItem>
// //                 </Select>
// //               </FormControl>

// //               {showUsernameField && (
// //                 <TextField
// //                   fullWidth
// //                   value={username}
// //                   onChange={(e) => setUsername(e.target.value)}
// //                   placeholder="Enter username to report"
// //                   required
// //                   className="form-input"
// //                 />
// //               )}

// //               {showCustomSubject && (
// //                 <TextField
// //                   fullWidth
// //                   value={customSubject}
// //                   onChange={(e) => setCustomSubject(e.target.value)}
// //                   placeholder="Please specify your query"
// //                   required
// //                   className="form-input"
// //                 />
// //               )}

// //               <textarea 
// //                 placeholder="Message" 
// //                 required 
// //                 className="form-textarea"
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //               ></textarea>
// //               <button type="submit" className="send-button">
// //                 Send Message
// //               </button>
// //             </form>
// //           </div>
// //           <div>
// //             <img src={Image} alt="Contact" className="contact-image fade-in-up" />
// //           </div>
// //         </div>
// //       </section>
// //       <section>
// //         <Grid container spacing={3} justifyContent="center" className="grid-container">
// //           {/* Phone Section */}
// //           <Grid item xs={12} md={4}>
// //             <Box className="small-box">
// //               <Phone className="box-icon" />
// //               <Typography variant="h6" className="box-title">
// //                 +(91) 36545 6789
// //               </Typography>
// //               <Typography variant="body2" className="box-text">
// //                 support@skillexchange.com
// //               </Typography>
// //             </Box>
// //           </Grid>
// //           {/* Address Section */}
// //           <Grid item xs={12} md={4}>
// //             <Box className="small-box">
// //               <LocationOn className="box-icon" />
// //               <Typography variant="h6" className="box-title">
// //                 58, Sindhu Bhavan Road
// //               </Typography>
// //               <Typography variant="body2" className="box-text bold">
// //                 Ahmedabad, Gujarat
// //               </Typography>
// //             </Box>
// //           </Grid>
// //           {/* Timing Section */}
// //           <Grid item xs={12} md={4}>
// //             <Box className="small-box">
// //               <AccessTime className="box-icon" />
// //               <Typography variant="h6" className="box-title">
// //                 Mon - Sat: 8am - 5pm
// //               </Typography>
// //               <Typography variant="body2" className="box-text">
// //                 Sunday Closed
// //               </Typography>
// //             </Box>
// //           </Grid>
// //         </Grid>
// //       </section>
// //       <Footer />

// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={6000}
// //         onClose={handleCloseSnackbar}
// //       >
// //         <Alert 
// //           onClose={handleCloseSnackbar} 
// //           severity={snackbar.severity}
// //           sx={{ width: '100%' }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </div>
// //   );
// // };

// // export default ContactUs;

// import React, { useState } from "react";
// import Image from "./images/5124556.jpg";
// import { Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Snackbar, Alert } from "@mui/material";
// import { AccessTime, LocationOn, Phone } from "@mui/icons-material";
// import Footer from "./Footer";
// import "../../assets/contactus.css";
// import axios from "axios";
// import UserSidebar from "../layouts/UserSidebar";

// const ContactUs = () => {
//   const [subject, setSubject] = useState("");
//   const [customSubject, setCustomSubject] = useState("");
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [showCustomSubject, setShowCustomSubject] = useState(false);
//   const [showUsernameField, setShowUsernameField] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success"
//   });

//   const handleSubjectChange = (event) => {
//     const value = event.target.value;
//     setSubject(value);
//     setShowCustomSubject(value === "other");
//     setShowUsernameField(value === "report-user");
//     if (value !== "other") {
//       setCustomSubject("");
//     }
//     if (value !== "report-user") {
//       setUsername("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Get user ID from local storage if available
//       const userData = JSON.parse(localStorage.getItem('user'));
//       const reporterUserId = userData?._id || null;

//       const reportData = {
//         name,
//         email,
//         subject,
//         customSubject: subject === "other" ? customSubject : "",
//         username: subject === "report-user" ? username : "",
//         message,
//         reporterUserId // Will be null if no user is logged in
//       };
  
//       console.log("Sending report data:", reportData);
      
//       const response = await axios.post("reports/create", reportData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.data.success) {
//         setSnackbar({
//           open: true,
//           message: "Thank you! We've received your message.",
//           severity: "success"
//         });

//         // Reset form
//         setName("");
//         setEmail("");
//         setSubject("");
//         setCustomSubject("");
//         setUsername("");
//         setMessage("");
//         setShowCustomSubject(false);
//         setShowUsernameField(false);
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.data.message || "Failed to send message. Please try again.",
//           severity: "error"
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSnackbar({
//         open: true,
//         message: error.response?.data?.message || "Failed to send message. Please try again.",
//         severity: "error"
//       });
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
    
//     <div className="contact-container">
//       <UserSidebar />
//       <section>
//         <div className="contact-hero"></div>

//         {/* Info Cards */}
//         <div className="info-container">
//           <div className="info-card fade-in-up">
//             <i className="fas fa-map-marker-alt info-icon"></i>
//             <h3>Address</h3>
//             <p>58, SBR, AHMEDABAD, IND</p>
//           </div>
//           <div className="info-card fade-in-up delay-1">
//             <i className="fas fa-phone-alt info-icon"></i>
//             <h3>Call Us Now</h3>
//             <p>+91 36545 6789</p>
//           </div>
//           <div className="info-card fade-in-up delay-2">
//             <i className="fas fa-envelope info-icon"></i>
//             <h3>Mail Us Now</h3>
//             <p>support@skillexchange.com</p>
//           </div>
//         </div>

//         {/* Contact Form & Map Section */}
//         <div className="content-container">
//           <div className="contact-form fade-in-down">
//             <h2>Have Any Query? Please Contact Us!</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="input-group">
//                 <input 
//                   type="text" 
//                   placeholder="Your Name" 
//                   required 
//                   className="form-input" 
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <input 
//                   type="email" 
//                   placeholder="Your Email" 
//                   required 
//                   className="form-input" 
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <FormControl fullWidth className="form-control">
//                 <InputLabel id="subject-label">Subject</InputLabel>
//                 <Select
//                   labelId="subject-label"
//                   value={subject}
//                   label="Subject"
//                   onChange={handleSubjectChange}
//                   required
//                 >
//                   <MenuItem value="">
//                     <em>Select a subject</em>
//                   </MenuItem>
//                   <MenuItem value="report-user">Report User</MenuItem>
//                   <MenuItem value="other">Other (please specify)</MenuItem>
//                 </Select>
//               </FormControl>

//               {showUsernameField && (
//                 <TextField
//                   fullWidth
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter username to report"
//                   required
//                   className="form-input"
//                 />
//               )}

//               {showCustomSubject && (
//                 <TextField
//                   fullWidth
//                   value={customSubject}
//                   onChange={(e) => setCustomSubject(e.target.value)}
//                   placeholder="Please specify your query"
//                   required
//                   className="form-input"
//                 />
//               )}

//               <textarea 
//                 placeholder="Message" 
//                 required 
//                 className="form-textarea"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//               ></textarea>
//               <button type="submit" className="send-button">
//                 Send Message
//               </button>
//             </form>
//           </div>
//           <div>
//             <img src={Image} alt="Contact" className="contact-image fade-in-up" />
//           </div>
//         </div>
//       </section>
//       <section>
//         <Grid container spacing={3} justifyContent="center" className="grid-container">
//           {/* Phone Section */}
//           <Grid item xs={12} md={4}>
//             <Box className="small-box">
//               <Phone className="box-icon" />
//               <Typography variant="h6" className="box-title">
//                 +(91) 36545 6789
//               </Typography>
//               <Typography variant="body2" className="box-text">
//                 support@skillexchange.com
//               </Typography>
//             </Box>
//           </Grid>
//           {/* Address Section */}
//           <Grid item xs={12} md={4}>
//             <Box className="small-box">
//               <LocationOn className="box-icon" />
//               <Typography variant="h6" className="box-title">
//                 58, Sindhu Bhavan Road
//               </Typography>
//               <Typography variant="body2" className="box-text bold">
//                 Ahmedabad, Gujarat
//               </Typography>
//             </Box>
//           </Grid>
//           {/* Timing Section */}
//           <Grid item xs={12} md={4}>
//             <Box className="small-box">
//               <AccessTime className="box-icon" />
//               <Typography variant="h6" className="box-title">
//                 Mon - Sat: 8am - 5pm
//               </Typography>
//               <Typography variant="body2" className="box-text">
//                 Sunday Closed
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>
//       </section>
//       <Footer />

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import Image from "./images/5124556.jpg";
import { Box, Grid, Typography, MenuItem, Select, FormControl, InputLabel, TextField, Snackbar, Alert, useMediaQuery, useTheme } from "@mui/material";
import { AccessTime, LocationOn, Phone } from "@mui/icons-material";
import Footer from "./Footer";
import "../../assets/contactus.css";
import axios from "axios";
import UserSidebar from "../layouts/UserSidebar";

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showCustomSubject, setShowCustomSubject] = useState(false);
  const [showUsernameField, setShowUsernameField] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    setSubject(value);
    setShowCustomSubject(value === "other");
    setShowUsernameField(value === "report-user");
    if (value !== "other") {
      setCustomSubject("");
    }
    if (value !== "report-user") {
      setUsername("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const reporterUserId = userData?._id || null;

      const reportData = {
        name,
        email,
        subject,
        customSubject: subject === "other" ? customSubject : "",
        username: subject === "report-user" ? username : "",
        message,
        reporterUserId
      };
  
      const response = await axios.post("reports/create", reportData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        setSnackbar({
          open: true,
          message: "Thank you! We've received your message.",
          severity: "success"
        });

        // Reset form
        setName("");
        setEmail("");
        setSubject("");
        setCustomSubject("");
        setUsername("");
        setMessage("");
        setShowCustomSubject(false);
        setShowUsernameField(false);
      } else {
        setSnackbar({
          open: true,
          message: response.data.message || "Failed to send message. Please try again.",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to send message. Please try again.",
        severity: "error"
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="contact-container">
      <UserSidebar />
      <section>
        <div className="contact-hero"></div>

        {/* Info Cards */}
        <div className="info-container">
          <div className="info-card fade-in-up">
            <i className="fas fa-map-marker-alt info-icon"></i>
            <h3>Address</h3>
            <p>58, SBR, AHMEDABAD, IND</p>
          </div>
          <div className="info-card fade-in-up delay-1">
            <i className="fas fa-phone-alt info-icon"></i>
            <h3>Call Us Now</h3>
            <p>+91 36545 6789</p>
          </div>
          <div className="info-card fade-in-up delay-2">
            <i className="fas fa-envelope info-icon"></i>
            <h3>Mail Us Now</h3>
            <p>support@skillexchange.com</p>
          </div>
        </div>

        {/* Contact Form & Map Section */}
        <div className="content-container">
          <div className="contact-form fade-in-down">
            <h2>Have Any Query? Please Contact Us!</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  className="form-input" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                  className="form-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <FormControl fullWidth className="form-control">
                <InputLabel id="subject-label">Subject</InputLabel>
                <Select
                  labelId="subject-label"
                  value={subject}
                  label="Subject"
                  onChange={handleSubjectChange}
                  required
                >
                  <MenuItem value="">
                    <em>Select a subject</em>
                  </MenuItem>
                  <MenuItem value="report-user">Report User</MenuItem>
                  <MenuItem value="other">Other (please specify)</MenuItem>
                </Select>
              </FormControl>

              {showUsernameField && (
                <TextField
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username to report"
                  required
                  className="form-input"
                />
              )}

              {showCustomSubject && (
                <TextField
                  fullWidth
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Please specify your query"
                  required
                  className="form-input"
                />
              )}

              <textarea 
                placeholder="Message" 
                required 
                className="form-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button type="submit" className="send-button">
                Send Message
              </button>
            </form>
          </div>
          {!isMobile && (
            <div>
              <img src={Image} alt="Contact" className="contact-image fade-in-up" />
            </div>
          )}
        </div>
      </section>
      <section>
        <Grid container spacing={isMobile ? 2 : 3} justifyContent="center" className="grid-container">
          <Grid item xs={12} sm={5} md={3}>
            <Box className="small-box">
              <Phone className="box-icon" />
              <Typography variant="h6" className="box-title">
                +(91) 36545 6789
              </Typography>
              <Typography variant="body2" className="box-text">
                support@skillexchange.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="small-box">
              <LocationOn className="box-icon" />
              <Typography variant="h6" className="box-title">
                58, Sindhu Bhavan Road
              </Typography>
              <Typography variant="body2" className="box-text bold">
                Ahmedabad, Gujarat
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box className="small-box">
              <AccessTime className="box-icon" />
              <Typography variant="h6" className="box-title">
                Mon - Sat: 8am - 5pm
              </Typography>
              <Typography variant="body2" className="box-text">
                Sunday Closed
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </section>
      <Footer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ContactUs;