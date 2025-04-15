

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../common/Footer';
// import {
//   Box, Typography, Button, Avatar, TextField,
//   Card, CardContent, Chip, Divider, IconButton,
//   Rating, Stack
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import CancelIcon from '@mui/icons-material/Cancel';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import StarIcon from '@mui/icons-material/Star';

// const UserProfile = () => {
//   const [user, setUser] = useState({});
//   const userId = localStorage.getItem("id");
//   const [editMode, setEditMode] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState({});
//   const [skill, setSkill] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const navigate = useNavigate();

//   const getUser = async () => {
//     try {
//       const res = await axios.get(`/users/getuserbyid/${userId}`);
//       setUser(res.data.data);
//       setUpdatedUser(res.data.data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const getUserSkills = async () => {
//     try {
//       const res = await axios.get(`/skill/getskillsbyuserid/${userId}`);
//       setSkill(res.data.data);
//     } catch (error) {
//       console.error("Error fetching user skills:", error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//     getUserSkills();
//   }, []);

//   const handleChange = (e) => {
//     setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(`/users/getuserbyidandupdate/${userId}`, updatedUser);
//       setUser(res.data.data);
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("profilePic", file);

//     try {
//       const response = await axios.put(`/users/getuserbyidandupdatepic/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (response.status === 200) {
//         getUser();
//       }
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//     }
//   };

//   const handleDeleteSkill = async (skillName) => {
//     try {
//       await axios.delete(`/skill/deleteskillbyuser/${userId}/${skillName}`);
//       // Refresh the skills list after deletion
//       getUserSkills();
//     } catch (error) {
//       console.error("Error deleting skill:", error);
//     }
//   };

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       backgroundColor: '#f8f9fa',
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       <Box sx={{
//         flex: 1,
//         py: 6,
//         px: { xs: 2, sm: 4, md: 6 },
//         maxWidth: '900px',
//         margin: '0 auto',
//         width: '100%'
//       }}>
//         <Typography variant="h4" sx={{
//           textAlign: 'center',
//           mb: 4,
//           fontWeight: 'bold',
//           color: 'primary.main',
//           textTransform: 'capitalize'
//         }}>
//           My Profile
//         </Typography>

//         <Card sx={{
//           borderRadius: '16px',
//           backgroundColor: '#eeeeee',
//           boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
//           mb: 4,
//           overflow: 'hidden',
//           border: '1px solid rgba(0,0,0,0.1)'
//         }}>
//           <CardContent sx={{ p: 4 }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column', md: 'row' },
//               gap: 4
//             }}>
//               {/* Profile Picture and Basic Info */}
//               <Box sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 minWidth: { md: '300px' }
//               }}>
//                 <input
//                   id="profile-pic-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                 />
//                 <label htmlFor="profile-pic-upload">
//                   <Avatar
//                     src={`http://localhost:3000/${user.profilePic}`}
//                     sx={{
//                       width: 160,
//                       height: 160,
//                       cursor: 'pointer',
//                       border: '4px solid',
//                       borderColor: 'primary.main',
//                       mb: 2,
//                       transition: 'all 0.3s ease',
//                       '&:hover': {
//                         transform: 'scale(1.05)',
//                         boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
//                       }
//                     }}
//                   />
//                 </label>

//                 {!editMode && (
//                   <>
//                     <Typography variant="h5" sx={{
//                       fontWeight: 'bold',
//                       mb: 1,
//                       textAlign: 'center'
//                     }}>
//                       {user.userName}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
//                       {user.email}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                       {user.contact}
//                     </Typography>

//                     <Button
//                       variant="outlined"
//                       startIcon={<EditIcon />}
//                       onClick={() => setEditMode(true)}
//                       sx={{
//                         mb: 3,
//                         borderRadius: '8px',
//                         px: 3,
//                         '&:hover': {
//                           backgroundColor: 'primary.main',
//                           color: 'white'
//                         }
//                       }}
//                     >
//                       Edit Profile
//                     </Button>
//                   </>
//                 )}
//               </Box>

//               {/* Profile Details */}
//               <Box sx={{ flex: 1 }}>
//                 {!editMode ? (
//                   <>
//                     <Divider sx={{ my: 3 }} />

//                     <Box sx={{
//                       mb: 3,
//                       width: "250px",
//                       backgroundColor: 'rgba(255, 215, 0, 0.1)',
//                       p: 2,
//                       borderRadius: '12px',
//                       border: '1px solid rgba(255, 215, 0, 0.3)'
//                     }}>
//                       <Typography variant="h6" sx={{
//                         fontWeight: 'bold',
//                         mb: 1,
//                         display: 'flex',
//                         alignItems: 'center'
//                       }}>
//                         <StarIcon color="warning" sx={{ mr: 1 }} />
//                         Rating
//                       </Typography>
//                       <Stack direction="row" spacing={1} alignItems="center">
//                         <Rating
//                           value={5}
//                           precision={0.5}
//                           readOnly
//                           size="large"
//                           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                         />
//                         <Typography variant="h6" sx={{
//                           fontWeight: 'bold',
//                           color: 'warning.main',
//                           ml: 1
//                         }}>
//                           5.0
//                         </Typography>
//                       </Stack>
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                         Based on 10 reviews
//                       </Typography>
//                     </Box>

//                     <Divider sx={{ my: 3 }} />

//                     <Box>
//                       <Box sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         mb: 2,
//                         justifyContent: 'space-between'
//                       }}>
//                         <Typography variant="h6" sx={{
//                           fontWeight: 'bold',
//                           display: 'flex',
//                           alignItems: 'center'
//                         }}>
//                           My Skills
//                         </Typography>
//                         <IconButton
//                           color="primary"
//                           onClick={() => navigate("/user/form")}
//                           sx={{
//                             '&:hover': {
//                               transform: 'scale(1.1)',
//                               backgroundColor: 'primary.light'
//                             }
//                           }}
//                           style={{ marginRight: "275px" }}
//                         >
//                           <AddCircleOutlineIcon fontSize="medium" />
//                         </IconButton>
//                       </Box>
//                       <Box sx={{
//                         display: 'flex',
//                         flexWrap: 'wrap',
//                         gap: 1.2,
//                         mb: 2
//                       }}>
//                         {skill.length > 0 ? (
//                           skill.map((s, index) => (
//                             // <Chip 
//                             //   key={index} 
//                             //   label={s.name} 
//                             //   color="primary"
//                             //   sx={{ 
//                             //     borderRadius: '8px',
//                             //     px: 1,
//                             //     py: 1.5,
//                             //     fontSize: '0.9rem',
//                             //     transition: 'all 0.2s ease',
//                             //     '&:hover': { 
//                             //       transform: 'translateY(-2px)',
//                             //       boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                             //     }
//                             //   }}
//                             // />

//                             <Chip
//                               key={index}
//                               label={s.name}
//                               color="primary"
//                               onDelete={() => handleDeleteSkill(s.name)}
//                               sx={{
//                                 borderRadius: '8px',
//                                 px: 1,
//                                 py: 1.5,
//                                 fontSize: '0.9rem',
//                                 transition: 'all 0.2s ease',
//                                 '&:hover': {
//                                   transform: 'translateY(-2px)',
//                                   boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
//                                 }
//                               }}
//                             />
//                           ))
//                         ) : (
//                           <Typography variant="body2" color="text.secondary">
//                             No skills added yet
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>
//                   </>
//                 ) : (
//                   <Box component="form" onSubmit={handleSubmit}>
//                     <Typography variant="h6" sx={{
//                       fontWeight: 'bold',
//                       mb: 3,
//                       color: 'primary.main'
//                     }}>
//                       Edit Profile
//                     </Typography>

//                     <TextField
//                       fullWidth
//                       label="Name"
//                       name="userName"
//                       value={updatedUser.userName || ''}
//                       onChange={handleChange}
//                       sx={{ mb: 2 }}
//                       InputProps={{
//                         sx: { borderRadius: '8px' }
//                       }}
//                     />

//                     <TextField
//                       fullWidth
//                       label="Email"
//                       name="email"
//                       value={updatedUser.email || ''}
//                       onChange={handleChange}
//                       sx={{ mb: 2 }}
//                       InputProps={{
//                         sx: { borderRadius: '8px' }
//                       }}
//                     />

//                     <TextField
//                       fullWidth
//                       label="Contact"
//                       name="contact"
//                       value={updatedUser.contact || ''}
//                       onChange={handleChange}
//                       sx={{ mb: 3 }}
//                       InputProps={{
//                         sx: { borderRadius: '8px' }
//                       }}
//                     />

//                     <Box sx={{
//                       display: 'flex',
//                       gap: 2,
//                       mt: 3,
//                       justifyContent: 'flex-end'
//                     }}>
//                       <Button
//                         variant="outlined"
//                         startIcon={<CancelIcon />}
//                         onClick={() => setEditMode(false)}
//                         sx={{
//                           borderRadius: '8px',
//                           px: 3,
//                           '&:hover': {
//                             backgroundColor: 'error.light',
//                             color: 'error.main'
//                           }
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         startIcon={<SaveIcon />}
//                         sx={{
//                           borderRadius: '8px',
//                           px: 3,
//                           '&:hover': {
//                             backgroundColor: 'primary.dark'
//                           }
//                         }}
//                       >
//                         Save Changes
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//       <Footer />
//     </Box>
//   );
// };

// export default UserProfile;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';
import {
  Box, Typography, Button, Avatar, TextField,
  Card, CardContent, Chip, Divider, IconButton,
  Rating, Stack, Dialog, DialogTitle, DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StarIcon from '@mui/icons-material/Star';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("id");
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [skill, setSkill] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`/users/getuserbyid/${userId}`);
      setUser(res.data.data);
      setUpdatedUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getUserSkills = async () => {
    try {
      const res = await axios.get(`/skill/getskillsbyuserid/${userId}`);
      setSkill(res.data.data);
    } catch (error) {
      console.error("Error fetching user skills:", error);
    }
  };

  useEffect(() => {
    getUser();
    getUserSkills();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/users/getuserbyidandupdate/${userId}`, updatedUser);
      setUser(res.data.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await axios.put(`/users/getuserbyidandupdatepic/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.status === 200) {
        getUser();
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  const handleDeleteClick = (skillName) => {
    setSkillToDelete(skillName);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!skillToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`/skill/deleteskillbyuser/${userId}/${skillToDelete}`);
      getUserSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{
        flex: 1,
        py: 6,
        px: { xs: 2, sm: 4, md: 6 },
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%'
      }}>
        <Typography variant="h4" sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
          color: 'primary.main',
          textTransform: 'capitalize'
        }}>
          My Profile
        </Typography>

        <Card sx={{
          borderRadius: '16px',
          backgroundColor: '#eeeeee',
          boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
          mb: 4,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.1)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4
            }}>
              {/* Profile Picture and Basic Info */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: { md: '300px' }
              }}>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="profile-pic-upload">
                  <Avatar
                    src={`http://localhost:3000/${user.profilePic}`}
                    sx={{
                      width: 160,
                      height: 160,
                      cursor: 'pointer',
                      border: '4px solid',
                      borderColor: 'primary.main',
                      mb: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                      }
                    }}
                  />
                </label>

                {!editMode && (
                  <>
                    <Typography variant="h5" sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textAlign: 'center'
                    }}>
                      {user.userName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      {user.email}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {user.contact}
                    </Typography>

                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => setEditMode(true)}
                      sx={{
                        mb: 3,
                        borderRadius: '8px',
                        px: 3,
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white'
                        }
                      }}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}
              </Box>

              {/* Profile Details */}
              <Box sx={{ flex: 1 }}>
                {!editMode ? (
                  <>
                    <Divider sx={{ my: 3 }} />
                    {(user.reviewCount > 0) && (
                      <Box sx={{
                        mb: 3,
                        width: "250px",
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        p: 2,
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 215, 0, 0.3)'
                      }}>
                        <Typography variant="h6" sx={{
                          fontWeight: 'bold',
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <StarIcon color="warning" sx={{ mr: 1 }} />
                          Rating
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Rating
                            value={user.averageRating}
                            precision={0.5}
                            readOnly
                            size="large"
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          />
                          <Typography variant="h6" sx={{
                            fontWeight: 'bold',
                            color: 'warning.main',
                            ml: 1
                          }}>
                            {user.averageRating ? user.averageRating.toFixed(1) : '0.0'}
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Based on {user.reviewCount || 0} reviews
                        </Typography>
                      </Box>
                    )}
                    <Divider sx={{ my: 3 }} />

                    <Box>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        justifyContent: 'space-between'
                      }}>
                        <Typography variant="h6" sx={{
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          My Skills
                        </Typography>
                        <IconButton
                          color="primary"
                          onClick={() => navigate("/user/form")}
                          sx={{
                            '&:hover': {
                              transform: 'scale(1.1)',
                              backgroundColor: 'primary.light'
                            }
                          }}
                          style={{ marginRight: "275px" }}
                        >
                          <AddCircleOutlineIcon fontSize="medium" />
                        </IconButton>
                      </Box>
                      <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1.2,
                        mb: 2
                      }}>
                        {skill.length > 0 ? (
                          skill.map((s, index) => (
                            <Chip
                              key={index}
                              label={s.name}
                              color="primary"
                              onDelete={() => handleDeleteClick(s.name)}
                              sx={{
                                borderRadius: '8px',
                                px: 1,
                                py: 1.5,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }
                              }}
                            />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No skills added yet
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Typography variant="h6" sx={{
                      fontWeight: 'bold',
                      mb: 3,
                      color: 'primary.main'
                    }}>
                      Edit Profile
                    </Typography>

                    <TextField
                      fullWidth
                      label="Name"
                      name="userName"
                      value={updatedUser.userName || ''}
                      onChange={handleChange}
                      sx={{ mb: 2 }}
                      InputProps={{
                        sx: { borderRadius: '8px' }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={updatedUser.email || ''}
                      onChange={handleChange}
                      sx={{ mb: 2 }}
                      InputProps={{
                        sx: { borderRadius: '8px' }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Contact"
                      name="contact"
                      value={updatedUser.contact || ''}
                      onChange={handleChange}
                      sx={{ mb: 3 }}
                      InputProps={{
                        sx: { borderRadius: '8px' }
                      }}
                    />

                    <Box sx={{
                      display: 'flex',
                      gap: 2,
                      mt: 3,
                      justifyContent: 'flex-end'
                    }}>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={() => setEditMode(false)}
                        sx={{
                          borderRadius: '8px',
                          px: 3,
                          '&:hover': {
                            backgroundColor: 'error.light',
                            color: 'error.main'
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{
                          borderRadius: '8px',
                          px: 3,
                          '&:hover': {
                            backgroundColor: 'primary.dark'
                          }
                        }}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Footer fullWidth={false} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Skill Removal</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove "{skillToDelete}" from your skills?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            disabled={isDeleting}
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            disabled={isDeleting}
            sx={{ borderRadius: '8px' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
