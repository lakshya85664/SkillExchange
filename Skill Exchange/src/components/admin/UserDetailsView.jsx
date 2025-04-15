// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { 
// //   Box, 
// //   Typography, 
// //   Paper, 
// //   Avatar, 
// //   Button, 
// //   Chip,
// //   CircularProgress,
// //   Divider,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Grid,
// //   Card,
// //   CardContent
// // } from '@mui/material';
// // import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// // const UserDetailsView = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);
// //   const [skills, setSkills] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
        
// //         // Fetch user details
// //         const userResponse = await axios.get(`/users/getuserbyid/${id}`);
// //         setUser(userResponse.data.data);
        
// //         // Fetch user skills
// //         const skillsResponse = await axios.get(`/skill/getskillsbyuserid/${id}`);
// //         setSkills(skillsResponse.data.data);
        
// //       } catch (err) {
// //         setError('Failed to load user details');
// //         console.error('Error fetching data:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [id]);

// //   if (loading) {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
// //         <Typography color="error">{error}</Typography>
// //       </Box>
// //     );
// //   }

// //   if (!user) {
// //     return (
// //       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
// //         <Typography>User not found</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
// //       <Button 
// //         startIcon={<ArrowBackIcon />} 
// //         onClick={() => navigate(-1)}
// //         sx={{ mb: 2 }}
// //       >
// //         Back to Users
// //       </Button>
      
// //       <Paper elevation={3} sx={{ p: 3 }}>
// //         {/* User Profile Section */}
// //         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, minWidth: 325 }}>
// //           <Avatar 
// //             src={`http://localhost:3000/${user.profilePic}` || "https://via.placeholder.com/150"} 
// //             alt={user.userName}
// //             sx={{ width: 80, height: 80, mr: 3 }}
// //           />
// //           <Box>
// //             <Typography variant="h4" component="h1">
// //               {user.userName}
// //             </Typography>
// //             <Chip 
// //               label={user.status ? "Active" : "Inactive"} 
// //               color={user.status ? "success" : "error"} 
// //               size="small"
// //               sx={{ mt: 1 }}
// //             />
// //           </Box>
// //         </Box>

// //         <Divider sx={{ my: 2 }} />

// //         {/* User Details Section */}
// //         <List>
// //           <ListItem>
// //             <ListItemText 
// //               primary="Email" 
// //               secondary={user.email || 'Not provided'} 
// //             />
// //           </ListItem>
// //           <ListItem>
// //             <ListItemText 
// //               primary="Contact Number" 
// //               secondary={user.contact || 'Not provided'} 
// //             />
// //           </ListItem>
// //         </List>

// //         {/* Skills Section */}
// //         <Divider sx={{ my: 2 }} />
// //         <Typography variant="h6" sx={{ mb: 2 }}>
// //           Skills
// //         </Typography>
        
// //         {skills.length > 0 ? (
// //           <Grid container spacing={2}>
// //             {skills.map((skill, index) => (
// //               <Grid item xs={12} sm={6} key={index}>
// //                 <Card variant="outlined">
// //                   <CardContent>
// //                     <Typography variant="h6" component="div">
// //                       {skill.name}
// //                     </Typography>
// //                     <Typography variant="body2" color="text.secondary">
// //                       Category: {skill.categoryId?.name || 'Uncategorized'}
// //                     </Typography>
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         ) : (
// //           <Typography variant="body2" color="text.secondary">
// //             No skills found for this user.
// //           </Typography>
// //         )}

// //         {/* Action Buttons */}
// //         <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
// //           <Button 
// //             variant="contained" 
// //             onClick={() => navigate(`/admin/edituser/${id}`)}
// //             style={{backgroundColor:"#c62828"}}
// //           >
// //             Delete User
// //           </Button>
// //           <Button 
// //             variant="outlined" 
// //             color="error"
// //             onClick={() => navigate(-1)}
// //           >
// //             Back
// //           </Button>
// //         </Box>
// //       </Paper>
// //     </Box>
// //   );
// // };

// // export default UserDetailsView;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   Box, 
//   Typography, 
//   Paper, 
//   Avatar, 
//   Button, 
//   Chip,
//   CircularProgress,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Grid,
//   Card,
//   CardContent,
//   Badge
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import CategoryIcon from '@mui/icons-material/Category';

// const UserDetailsView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch user details
//         const userResponse = await axios.get(`/users/getuserbyid/${id}`);
//         setUser(userResponse.data.data);
        
//         // Fetch user skills with populated categories
//         const skillsResponse = await axios.get(`/skill/getskillsbyuserid/${id}`);
//         setSkills(skillsResponse.data.data);
        
//         // Fetch all categories for reference
//         const categoriesResponse = await axios.get('/category/getallcategories');
//         setCategories(categoriesResponse.data.data);
        
//       } catch (err) {
//         setError('Failed to load user details');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Function to get category name by ID
//   const getCategoryName = (categoryId) => {
//     const category = categories.find(cat => cat._id === categoryId);
//     return category ? category.name : 'Uncategorized';
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <Typography color="error">{error}</Typography>
//       </Box>
//     );
//   }

//   if (!user) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <Typography>User not found</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
//       <Button 
//         startIcon={<ArrowBackIcon />} 
//         onClick={() => navigate(-1)}
//         sx={{ mb: 2 }}
//       >
//         Back to Users
//       </Button>
      
//       <Paper elevation={3} sx={{ p: 3 }}>
//         {/* User Profile Section */}
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, minWidth: 325 }}>
//           <Avatar 
//             src={`http://localhost:3000/${user.profilePic}` || "https://via.placeholder.com/150"} 
//             alt={user.userName}
//             sx={{ width: 80, height: 80, mr: 3 }}
//           />
//           <Box>
//             <Typography variant="h4" component="h1">
//               {user.userName}
//             </Typography>
//             <Chip 
//               label={user.status ? "Active" : "Inactive"} 
//               color={user.status ? "success" : "error"} 
//               size="small"
//               sx={{ mt: 1 }}
//             />
//           </Box>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         {/* User Details Section */}
//         <List>
//           <ListItem>
//             <ListItemText 
//               primary="Email" 
//               secondary={user.email || 'Not provided'} 
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemText 
//               primary="Contact Number" 
//               secondary={user.contact || 'Not provided'} 
//             />
//           </ListItem>
//         </List>

//         {/* Skills Section */}
//         <Divider sx={{ my: 2 }} />
//         <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
//           <CategoryIcon sx={{ mr: 1 }} /> Skills & Categories
//         </Typography>
        
//         {skills.length > 0 ? (
//           <Grid container spacing={2}>
//             {skills.map((skill, index) => (
//               <Grid item xs={12} sm={6} key={index}>
//                 <Card variant="outlined" sx={{ height: '100%' }}>
//                   <CardContent>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//                         {skill.name}
//                       </Typography>
//                       {/* <Badge 
//                         badgeContent={skill.categoryId ? getCategoryName(skill.categoryId) : 'None'} 
//                         color="primary"
//                         sx={{ '& .MuiBadge-badge': { 
//                           right: -10, 
//                           top: 10,
//                           padding: '0 8px',
//                           borderRadius: '12px'
//                         } }}
//                       /> */}
//                     </Box>
//                     {skill.categoryId && (
//                       <Typography variant="body2" color="text.secondary">
//                         <strong>Category:</strong> {getCategoryName(skill.categoryId)}
//                       </Typography>
//                     )}
//                     {/* <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                       <strong>Added:</strong> {new Date(skill.createdAt).toLocaleDateString()}
//                     </Typography> */}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Typography variant="body2" color="text.secondary">
//             No skills found for this user.
//           </Typography>
//         )}

//         {/* Action Buttons */}
//         <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//         <Button 
//             variant="contained" 
//             onClick={() => navigate(`/admin/edituser/${id}`)}
//             style={{backgroundColor:"#c62828"}}
//           >
//             Delete User
//           </Button>
//           {/* <Button 
//             variant="contained" 
//             color="primary"
//             onClick={() => navigate(`/admin/edituser/${id}`)}
//           >
//             Edit User
//           </Button> */}
//           <Button 
//             variant="outlined" 
//             color="error"
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default UserDetailsView;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CategoryIcon from '@mui/icons-material/Category';

const UserDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch user details
        const userResponse = await axios.get(`/users/getuserbyid/${id}`);
        setUser(userResponse.data.data);
        
        // Fetch user skills with populated categories
        const skillsResponse = await axios.get(`/skill/getskillsbyuserid/${id}`);
        setSkills(skillsResponse.data.data);
        
        // Fetch all categories for reference
        const categoriesResponse = await axios.get('/category/getallcategories');
        setCategories(categoriesResponse.data.data);
        
      } catch (err) {
        setError('Failed to load user details');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Function to get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Uncategorized';
  };

  // Delete user function
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/users/deleteuser/${id}`);
      navigate('/admin/userdetails'); // Redirect to user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography>User not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to Users
      </Button>
      
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* User Profile Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, minWidth: 325 }}>
          <Avatar 
            src={`http://localhost:3000/${user.profilePic}` || "https://via.placeholder.com/150"} 
            alt={user.userName}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" component="h1">
              {user.userName}
            </Typography>
            <Chip 
              label={user.status ? "Active" : "Inactive"} 
              color={user.status ? "success" : "error"} 
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* User Details Section */}
        <List>
          <ListItem>
            <ListItemText 
              primary="Email" 
              secondary={user.email || 'Not provided'} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Contact Number" 
              secondary={user.contact || 'Not provided'} 
            />
          </ListItem>
        </List>

        {/* Skills Section */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <CategoryIcon sx={{ mr: 1 }} /> Skills & Categories
        </Typography>
        
        {skills.length > 0 ? (
          <Grid container spacing={2}>
            {skills.map((skill, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {skill.name}
                      </Typography>
                    </Box>
                    {skill.categoryId && (
                      <Typography variant="body2" color="text.secondary">
                        <strong>Category:</strong> {getCategoryName(skill.categoryId)}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No skills found for this user.
          </Typography>
        )}

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleOpenDeleteDialog}
            style={{backgroundColor:"#c62828"}}
          >
            Delete User
          </Button>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm User Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete user {user.userName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteUser} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDetailsView;