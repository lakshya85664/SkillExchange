

// // SkillUsersList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';
// import { Bounce, toast, ToastContainer } from 'react-toastify';
// import {
//     Container,
//     Typography,
//     Box,
//     Card,
//     Avatar,
//     Grid,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions
// } from "@mui/material";
// import Footer from "../common/Footer";

// const SkillUsersList = () => {
//     const { skillName } = useParams();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);

//     useEffect(() => {
//         const fetchUsersWithSkill = async () => {
//             try {
//                 const response = await axios.get(`/skill/getskillbyuserid/${skillName}`);
//                 setUsers(response.data.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching users with skill:", error);
//                 setLoading(false);
//             }
//         };

//         fetchUsersWithSkill();
//     }, [skillName]);

//     const handleBack = () => {
//         navigate("/user/requestskill");
//     };

//     const handleConnectClick = (user) => {
//         setSelectedUser(user);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//         setSelectedUser(null);
//     };

//     // SkillUsersList.jsx (updated handleConfirmRequest function)
//     const handleConfirmRequest = async () => {
//         try {
//             // Get current user data from localStorage
//             const userData = localStorage.getItem("user");

//             if (!userData) {
//                 alert("Please login to send a request");
//                 navigate("/login");
//                 return;
//             }

//             const currentUser = JSON.parse(userData);

//             if (!currentUser || !currentUser._id) {
//                 alert("Invalid user data. Please login again.");
//                 navigate("/login");
//                 return;
//             }

//             if (!selectedUser || !selectedUser._id) {
//                 alert("Invalid recipient selected");
//                 return;
//             }

//             const response = await axios.post('/request/send', {
//                 senderId: currentUser._id,
//                 receiverId: selectedUser._id,
//                 skillName: decodeURIComponent(skillName)
//             });

//             alert(`Request sent to ${selectedUser.userName} for learning ${decodeURIComponent(skillName)}`);
//             setOpenDialog(false);
//             setSelectedUser(null);
//         } catch (error) {
//             console.error("Error sending request:", error);
//             alert("Failed to send request. Please try again.");
//         }
//     };

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <Typography>Loading...</Typography>
//             </Box>
//         );
//     }

//     return (
//         <div>
//             <Box
//                 sx={{
//                     minHeight: "91vh",
//                     width: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     background: "#f5f7fa",
//                     padding: "40px 20px"
//                 }}
//             >
//                 <Container maxWidth="lg">
//                     <Button
//                         onClick={handleBack}
//                         variant="outlined"
//                         sx={{ mb: 4 }}
//                     >
//                         Back to Skills
//                     </Button>

//                     <Typography
//                         variant="h4"
//                         align="center"
//                         gutterBottom
//                         sx={{
//                             fontWeight: "bold",
//                             color: "#2d3748",
//                             mb: 6,
//                             fontSize: { xs: '1.8rem', sm: '2.2rem' }
//                         }}
//                     >
//                         Users who can teach: {decodeURIComponent(skillName)}
//                     </Typography>

//                     <Grid container spacing={4} justifyContent="center">
//                         {users.length > 0 ? (
//                             users.map(user => (
//                                 <Grid item xs={12} sm={6} md={4} key={user._id}>
//                                     <Card
//                                         sx={{
//                                             padding: "24px",
//                                             textAlign: "center",
//                                             background: "#ffffff",
//                                             borderRadius: "12px",
//                                             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                                             transition: "all 0.3s ease",
//                                             border: "1px solid #e2e8f0",
//                                             "&:hover": {
//                                                 transform: "translateY(-5px)",
//                                                 boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)"
//                                             }
//                                         }}
//                                     >
//                                         <Avatar
//                                             src={user.profilePic}
//                                             sx={{
//                                                 width: 80,
//                                                 height: 80,
//                                                 margin: '0 auto 16px',
//                                                 fontSize: '2rem'
//                                             }}
//                                         >
//                                             {user.userName ? user.userName.charAt(0).toUpperCase() : 'U'}
//                                         </Avatar>
//                                         <Typography
//                                             variant="h6"
//                                             sx={{
//                                                 fontWeight: "600",
//                                                 color: "#2d3748",
//                                                 mb: 1.5
//                                             }}
//                                         >
//                                             {user.userName}
//                                         </Typography>
//                                         <Typography
//                                             variant="body2"
//                                             sx={{
//                                                 color: "#718096",
//                                                 fontWeight: "500",
//                                                 mb: 2
//                                             }}
//                                         >
//                                             {user.email}
//                                         </Typography>
//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             onClick={() => handleConnectClick(user)}
//                                         >
//                                             Connect
//                                         </Button>
//                                     </Card>
//                                 </Grid>
//                             ))
//                         ) : (
//                             <Typography variant="h6" sx={{ color: "#718096", textAlign: 'center', width: '100%' }}>
//                                 No users found with this skill.
//                             </Typography>
//                         )}
//                     </Grid>
//                 </Container>
//             </Box>

//             {/* Confirmation Dialog */}
//             <Dialog
//                 open={openDialog}
//                 onClose={handleCloseDialog}
//                 PaperProps={{
//                     sx: {
//                         borderRadius: "12px",
//                         padding: "16px"
//                     }
//                 }}
//             >
//                 <DialogTitle sx={{ fontWeight: "600", color: "#2d3748" }}>
//                     Confirm Connection Request
//                 </DialogTitle>
//                 <DialogContent>
//                     <Typography>
//                         Do you want to send a connection request to <strong>{selectedUser?.userName} </strong>
//                         for learning <strong>{decodeURIComponent(skillName)}</strong>?
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button
//                         onClick={handleCloseDialog}
//                         sx={{
//                             color: "#718096",
//                             fontWeight: "600",
//                             "&:hover": {
//                                 backgroundColor: "rgba(113, 128, 150, 0.1)"
//                             }
//                         }}
//                     >
//                         No
//                     </Button>
//                     <Button
//                         onClick={handleConfirmRequest}
//                         sx={{
//                             color: "#4caf50",
//                             fontWeight: "600",
//                             "&:hover": {
//                                 backgroundColor: "rgba(76, 175, 80, 0.1)"
//                             }
//                         }}
//                     >
//                         Yes, Send Request
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Footer />
//         </div>
//     );
// };

// export default SkillUsersList;

// SkillUsersList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Container,
    Typography,
    Box,
    Card,
    Avatar,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import Footer from "../common/Footer";

const SkillUsersList = () => {
    const { skillName } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    // useEffect(() => {
    //     const fetchUsersWithSkill = async () => {
    //         try {
    //             const response = await axios.get(`/skill/getskillbyuserid/${skillName}`);
    //             setUsers(response.data.data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error("Error fetching users with skill:", error);
    //             toast.error("Failed to load users with this skill");
    //             setLoading(false);
    //         }
    //     };

    //     fetchUsersWithSkill();
    // }, [skillName]);

    useEffect(() => {
        // Get current user ID from localStorage when component mounts
        const userData = localStorage.getItem("user");
        if (userData) {
            const currentUser = JSON.parse(userData);
            setCurrentUserId(currentUser._id);
        }

        const fetchUsersWithSkill = async () => {
            try {
                const response = await axios.get(`/skill/getskillbyuserid/${skillName}`);
                setUsers(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users with skill:", error);
                toast.error("Failed to load users with this skill");
                setLoading(false);
            }
        };

        fetchUsersWithSkill();
    }, [skillName]);

    const handleBack = () => {
        navigate("/requestskill");
    };

    const handleConnectClick = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };

    const handleConfirmRequest = async () => {
        try {
            // Get current user data from localStorage
            const userData = localStorage.getItem("user");

            if (!userData) {
                toast.warning("Please login to send a request");
                navigate("/login");
                return;
            }

            const currentUser = JSON.parse(userData);

            if (!currentUser || !currentUser._id) {
                toast.error("Invalid user data. Please login again.");
                navigate("/login");
                return;
            }

            if (!selectedUser || !selectedUser._id) {
                toast.error("Invalid recipient selected");
                return;
            }

            const response = await axios.post('/request/send', {
                senderId: currentUser._id,
                receiverId: selectedUser._id,
                skillName: decodeURIComponent(skillName)
            });

            toast.success(`Request sent to ${selectedUser.userName} for learning ${decodeURIComponent(skillName)}`);
            setOpenDialog(false);
            setSelectedUser(null);
        } catch (error) {
            console.error("Error sending request:", error);
            toast.error("Failed to send request. Please try again.");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    //     return (
    //         <div>
    //             {/* Toast Container should be at the root level */}
    //             <ToastContainer
    //                 position="top-right"
    //                 autoClose={5000}
    //                 hideProgressBar={false}
    //                 newestOnTop={false}
    //                 closeOnClick
    //                 rtl={false}
    //                 pauseOnFocusLoss
    //                 draggable
    //                 pauseOnHover
    //                 theme="colored"
    //             />

    //             <Box
    //                 sx={{
    //                     minHeight: "91vh",
    //                     width: "100%",
    //                     display: "flex",
    //                     alignItems: "center",
    //                     justifyContent: "center",
    //                     background: "#f5f7fa",
    //                     padding: "40px 20px"
    //                 }}
    //             >
    //                 <Container maxWidth="lg">
    //                     <Button
    //                         onClick={handleBack}
    //                         variant="outlined"
    //                         sx={{ mb: 4 }}
    //                     >
    //                         Back to Skills
    //                     </Button>

    //                     <Typography
    //                         variant="h4"
    //                         align="center"
    //                         gutterBottom
    //                         sx={{
    //                             fontWeight: "bold",
    //                             color: "#2d3748",
    //                             mb: 6,
    //                             fontSize: { xs: '1.8rem', sm: '2.2rem' }
    //                         }}
    //                     >
    //                         Users who can teach: {decodeURIComponent(skillName)}
    //                     </Typography>

    //                     <Grid container spacing={4} justifyContent="center">
    //                         {users.length > 0 ? (
    //                             users.map(user => (
    //                                 <Grid item xs={12} sm={6} md={4} key={user._id}>
    //                                     <Card
    //                                         sx={{
    //                                             padding: "24px",
    //                                             textAlign: "center",
    //                                             background: "#ffffff",
    //                                             borderRadius: "12px",
    //                                             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    //                                             transition: "all 0.3s ease",
    //                                             border: "1px solid #e2e8f0",
    //                                             "&:hover": {
    //                                                 transform: "translateY(-5px)",
    //                                                 boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)"
    //                                             }
    //                                         }}
    //                                     >
    //                                         <Avatar
    //                                             // src={user.profilePic}
    //                                             src={`http://localhost:3000/${user.profilePic}`}
    //                                             sx={{
    //                                                 width: 80,
    //                                                 height: 80,
    //                                                 margin: '0 auto 16px',
    //                                                 fontSize: '2rem'
    //                                             }}
    //                                         >
    //                                             {user.userName ? user.userName.charAt(0).toUpperCase() : 'U'}
    //                                         </Avatar>
    //                                         <Typography
    //                                             variant="h6"
    //                                             sx={{
    //                                                 fontWeight: "600",
    //                                                 color: "#2d3748",
    //                                                 mb: 1.5
    //                                             }}
    //                                         >
    //                                             {user.userName}
    //                                         </Typography>
    //                                         <Typography
    //                                             variant="body2"
    //                                             sx={{
    //                                                 color: "#718096",
    //                                                 fontWeight: "500",
    //                                                 mb: 2
    //                                             }}
    //                                         >
    //                                             {user.email}
    //                                         </Typography>
    //                                         <Button
    //                                             variant="contained"
    //                                             color="primary"
    //                                             onClick={() => handleConnectClick(user)}
    //                                         >
    //                                             Connect
    //                                         </Button>
    //                                     </Card>
    //                                 </Grid>
    //                             ))
    //                         ) : (
    //                             <Typography variant="h6" sx={{ color: "#718096", textAlign: 'center', width: '100%' }}>
    //                                 No users found with this skill.
    //                             </Typography>
    //                         )}
    //                     </Grid>
    //                 </Container>
    //             </Box>

    //             {/* Confirmation Dialog */}
    //             <Dialog
    //                 open={openDialog}
    //                 onClose={handleCloseDialog}
    //                 PaperProps={{
    //                     sx: {
    //                         borderRadius: "12px",
    //                         padding: "16px"
    //                     }
    //                 }}
    //             >
    //                 <DialogTitle sx={{ fontWeight: "600", color: "#2d3748" }}>
    //                     Confirm Connection Request
    //                 </DialogTitle>
    //                 <DialogContent>
    //                     <Typography>
    //                         Do you want to send a connection request to <strong>{selectedUser?.userName} </strong>
    //                         for learning <strong>{decodeURIComponent(skillName)}</strong>?
    //                     </Typography>
    //                 </DialogContent>
    //                 <DialogActions>
    //                     <Button
    //                         onClick={handleCloseDialog}
    //                         sx={{
    //                             color: "#718096",
    //                             fontWeight: "600",
    //                             "&:hover": {
    //                                 backgroundColor: "rgba(113, 128, 150, 0.1)"
    //                             }
    //                         }}
    //                     >
    //                         No
    //                     </Button>
    //                     <Button
    //                         onClick={handleConfirmRequest}
    //                         sx={{
    //                             color: "#4caf50",
    //                             fontWeight: "600",
    //                             "&:hover": {
    //                                 backgroundColor: "rgba(76, 175, 80, 0.1)"
    //                             }
    //                         }}
    //                     >
    //                         Yes, Send Request
    //                     </Button>
    //                 </DialogActions>
    //             </Dialog>

    //             <Footer />
    //         </div>
    //     );
    // };

    // export default SkillUsersList;

    return (
        <div>
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <Box
                sx={{
                    minHeight: "91vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f5f7fa",
                    padding: "40px 20px"
                }}
            >
                <Container maxWidth="lg">
                    <Button
                        onClick={handleBack}
                        variant="outlined"
                        sx={{ mb: 4 }}
                    >
                        Back to Skills
                    </Button>

                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "#2d3748",
                            mb: 6,
                            fontSize: { xs: '1.8rem', sm: '2.2rem' }
                        }}
                    >
                        Users who can teach: {decodeURIComponent(skillName)}
                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        {users.length > 0 ? (
                            users.map(user => (
                                <Grid item xs={12} sm={6} md={4} key={user._id}>
                                    <Card
                                        sx={{
                                            padding: "24px",
                                            minHeight:"240px",
                                            textAlign: "center",
                                            background: "#ffffff",
                                            borderRadius: "12px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            transition: "all 0.3s ease",
                                            border: "1px solid #e2e8f0",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)"
                                            }
                                        }}
                                    >
                                        <Avatar
                                            src={`http://localhost:3000/${user.profilePic}`}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                margin: '0 auto 16px',
                                                fontSize: '2rem'
                                            }}
                                        >
                                            {user.userName ? user.userName.charAt(0).toUpperCase() : 'U'}
                                        </Avatar>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: "600",
                                                color: "#2d3748",
                                                mb: 1.5
                                            }}
                                        >
                                            {user.userName}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#718096",
                                                fontWeight: "500",
                                                mb: 2
                                            }}
                                        >
                                            {/* {user.email} */}
                                        </Typography>
                                        {user._id !== currentUserId && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleConnectClick(user)}
                                            >
                                                Connect
                                            </Button>
                                        )}
                                        {user._id === currentUserId && (
                                            <Typography variant="body2" color="textSecondary">
                                                (This is you)
                                            </Typography>
                                        )}
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="h6" sx={{ color: "#718096", textAlign: 'center', width: '100%' }}>
                                No users found with this skill.
                            </Typography>
                        )}
                    </Grid>
                </Container>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        padding: "16px"
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: "600", color: "#2d3748" }}>
                    Confirm Connection Request
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you want to send a connection request to <strong>{selectedUser?.userName} </strong>
                        for learning <strong>{decodeURIComponent(skillName)}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        sx={{
                            color: "#718096",
                            fontWeight: "600",
                            "&:hover": {
                                backgroundColor: "rgba(113, 128, 150, 0.1)"
                            }
                        }}
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleConfirmRequest}
                        sx={{
                            color: "#4caf50",
                            fontWeight: "600",
                            "&:hover": {
                                backgroundColor: "rgba(76, 175, 80, 0.1)"
                            }
                        }}
                    >
                        Yes, Send Request
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </div>
    );
};

export default SkillUsersList;