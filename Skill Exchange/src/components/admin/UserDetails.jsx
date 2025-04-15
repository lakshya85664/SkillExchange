// // import { DataGrid } from '@mui/x-data-grid';
// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import { 
// //   TextField, 
// //   Paper, 
// //   Typography, 
// //   Box, 
// //   Button, 
// //   Dialog, 
// //   DialogTitle, 
// //   DialogContent, 
// //   DialogContentText, 
// //   DialogActions,
// //   IconButton,
// //   Avatar,
// //   Tooltip,
// //   Chip,
// //   Menu,
// //   MenuItem,
// //   ListItemIcon
// // } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// // import BlockIcon from '@mui/icons-material/Block';
// // import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// // import MoreVertIcon from '@mui/icons-material/MoreVert';
// // import { useNavigate } from 'react-router-dom';

// // const UserDetails = () => {
// //     const [users, setUsers] = useState([]);
// //     const [search, setSearch] = useState("");
// //     const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
// //     const [selectedUser, setSelectedUser] = useState(null);
// //     const [loading, setLoading] = useState(false);
// //     const [anchorEl, setAnchorEl] = useState(null);
// //     const [currentUserId, setCurrentUserId] = useState(null);
// //     const navigate = useNavigate();

// //     // Status options
// //     const STATUS_OPTIONS = {
// //         ACTIVE: 'active',
// //         INACTIVE: 'inactive',
// //         BLOCKED: 'blocked'
// //     };

// //     // Table columns
// //     const columns = [
// //         { 
// //             field: "profilePic", 
// //             headerName: "Photo", 
// //             width: 80,
// //             renderCell: (params) => (
// //                 <Avatar 
// //                     src={`http://localhost:3000/${params.value}` || "https://via.placeholder.com/150"} 
// //                     alt="Profile" 
// //                     sx={{ width: 40, height: 40 }}
// //                 />
// //             ),
// //             sortable: false,
// //             filterable: false
// //         },
// //         { field: "userName", headerName: "User Name", width: 180 },
// //         { field: "email", headerName: "Email", width: 250 },
// //         { field: "contact", headerName: "Contact No", width: 160 },
// //         { 
// //             field: "status", 
// //             headerName: "Status", 
// //             width: 120,
// //             renderCell: (params) => {
// //                 const status = params.row.status;
// //                 let statusText, statusColor;
                
// //                 switch(status) {
// //                     case STATUS_OPTIONS.ACTIVE:
// //                         statusText = "Active";
// //                         statusColor = "success";
// //                         break;
// //                     case STATUS_OPTIONS.INACTIVE:
// //                         statusText = "Inactive";
// //                         statusColor = "warning";
// //                         break;
// //                     case STATUS_OPTIONS.BLOCKED:
// //                         statusText = "Blocked";
// //                         statusColor = "error";
// //                         break;
// //                     default:
// //                         statusText = "Unknown";
// //                         statusColor = "default";
// //                 }
                
// //                 return (
// //                     <Chip 
// //                         label={statusText} 
// //                         color={statusColor} 
// //                         size="small"
// //                     />
// //                 );
// //             }
// //         },
// //         {
// //             field: "actions",
// //             headerName: "Actions",
// //             width: 150,
// //             renderCell: (params) => (
// //                 <Box>
// //                     <Tooltip title="View User">
// //                         <IconButton
// //                             color="primary"
// //                             onClick={() => navigate(`/admin/userdetails/${params.row._id}`)}
// //                         >
// //                             <VisibilityIcon />
// //                         </IconButton>
// //                     </Tooltip>
// //                     <Tooltip title="More actions">
// //                         <IconButton
// //                             onClick={(e) => {
// //                                 setAnchorEl(e.currentTarget);
// //                                 setCurrentUserId(params.row._id);
// //                             }}
// //                         >
// //                             <MoreVertIcon />
// //                         </IconButton>
// //                     </Tooltip>
// //                 </Box>
// //             ),
// //             sortable: false,
// //             filterable: false
// //         }
// //     ];

// //     // Fetch users from API
// //     const getAllUsers = async () => {
// //         setLoading(true);
// //         try {
// //             const res = await axios.get("/users/getallusers");
// //             // Ensure status is properly set for each user
// //             const usersWithStatus = res.data.data.map(user => ({
// //                 ...user,
// //                 status: user.status || STATUS_OPTIONS.INACTIVE
// //             }));
// //             setUsers(usersWithStatus);
// //         } catch (error) {
// //             console.error("Error fetching users:", error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Handle status change
// //     const handleStatusChange = async (userId, newStatus) => {
// //         try {
// //             await axios.put(`/users/getuserbyidandupdate/${userId}`, {
// //                 status: newStatus
// //             });
// //             getAllUsers(); // Refresh the list
// //             setAnchorEl(null); // Close the menu
// //         } catch (error) {
// //             console.error("Error changing user status:", error);
// //         }
// //     };

// //     // Delete user function
// //     const deleteUser = async () => {
// //         try {
// //             await axios.delete(`/users/deleteuser/${selectedUser._id}`);
// //             getAllUsers(); // Refresh the list
// //             setOpenDeleteDialog(false);
// //         } catch (error) {
// //             console.error("Error deleting user:", error);
// //         }
// //     };

// //     const handleOpenDeleteDialog = (user) => {
// //         setSelectedUser(user);
// //         setOpenDeleteDialog(true);
// //     };

// //     const handleCloseDeleteDialog = () => {
// //         setOpenDeleteDialog(false);
// //         setSelectedUser(null);
// //     };

// //     const handleMenuClose = () => {
// //         setAnchorEl(null);
// //         setCurrentUserId(null);
// //     };

// //     useEffect(() => {
// //         getAllUsers();
// //     }, []);

// //     // Filter users based on search input
// //     const filteredUsers = users.filter(user =>
// //         user.userName?.toLowerCase().includes(search.toLowerCase()) ||
// //         user.email?.toLowerCase().includes(search.toLowerCase())
// //     );

// //     return (
// //         <Box 
// //             sx={{ 
// //                 maxWidth: "80%", 
// //                 margin: "auto", 
// //                 mt: 5, 
// //                 p: 3,
// //                 background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)", 
// //                 borderRadius: 2 
// //             }}
// //         >
// //             <Paper elevation={5} 
// //                 sx={{ 
// //                     p: 3, 
// //                     borderRadius: 2, 
// //                     backgroundColor: "#ffffff", 
// //                     boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" 
// //                 }}
// //             >
// //                 <Typography 
// //                     variant="h4" 
// //                     align="center" 
// //                     gutterBottom 
// //                     sx={{ 
// //                         fontWeight: "bold", 
// //                         color: "#1565c0" 
// //                     }}
// //                 >
// //                     User Management
// //                 </Typography>

// //                 {/* Search Bar */}
// //                 <TextField
// //                     label="Search Users..."
// //                     variant="outlined"
// //                     fullWidth
// //                     sx={{ 
// //                         mb: 2, 
// //                         bgcolor: "#f5f5f5", 
// //                         borderRadius: 1 
// //                     }}
// //                     onChange={(e) => setSearch(e.target.value)}
// //                 />

// //                 {/* Data Grid */}
// //                 <DataGrid
// //                     rows={filteredUsers}
// //                     columns={columns}
// //                     pageSize={5}
// //                     rowsPerPageOptions={[5]}
// //                     loading={loading}
// //                     getRowId={(row) => row._id}
// //                     sx={{
// //                         height: 400,
// //                         border: "2px solid #64b5f6",
// //                         borderRadius: "8px",
// //                         boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
// //                         "& .MuiDataGrid-row": {
// //                             backgroundColor: "#ffffff",
// //                             "&:nth-of-type(odd)": { backgroundColor: "#f1f8ff" },
// //                             "&:hover": { backgroundColor: "#e3f2fd" },
// //                         },
// //                         "& .MuiDataGrid-columnHeaders": {
// //                             backgroundColor: "#1565c0",
// //                             color: "black",
// //                             fontSize: "16px",
// //                             fontWeight: "bold",
// //                         },
// //                         "& .MuiDataGrid-cell": {
// //                             color: "#333",
// //                         },
// //                     }}
// //                 />
// //             </Paper>

// //             {/* Status Change Menu */}
// //             <Menu
// //                 anchorEl={anchorEl}
// //                 open={Boolean(anchorEl)}
// //                 onClose={handleMenuClose}
// //             >
// //                 {/* <MenuItem onClick={() => handleStatusChange(currentUserId, STATUS_OPTIONS.ACTIVE)}>
// //                     <ListItemIcon>
// //                         <PowerSettingsNewIcon color="success" />
// //                     </ListItemIcon>
// //                     Set as Active
// //                 </MenuItem> */}
// //                 <MenuItem onClick={() => handleStatusChange(currentUserId, STATUS_OPTIONS.INACTIVE)}>
// //                     <ListItemIcon>
// //                         <PowerSettingsNewIcon color="warning" />
// //                     </ListItemIcon>
// //                     Unblock User
// //                 </MenuItem>
// //                 <MenuItem onClick={() => handleStatusChange(currentUserId, STATUS_OPTIONS.BLOCKED)}>
// //                     <ListItemIcon>
// //                         <BlockIcon color="error" />
// //                     </ListItemIcon>
// //                     Block User
// //                 </MenuItem>
// //                 <MenuItem onClick={() => {
// //                     const user = users.find(u => u._id === currentUserId);
// //                     handleOpenDeleteDialog(user);
// //                     handleMenuClose();
// //                 }}>
// //                     <ListItemIcon>
// //                         <DeleteIcon color="error" />
// //                     </ListItemIcon>
// //                     Delete User
// //                 </MenuItem>
// //             </Menu>

// //             {/* Delete Confirmation Dialog */}
// //             <Dialog
// //                 open={openDeleteDialog}
// //                 onClose={handleCloseDeleteDialog}
// //                 aria-labelledby="alert-dialog-title"
// //                 aria-describedby="alert-dialog-description"
// //             >
// //                 <DialogTitle id="alert-dialog-title">
// //                     {"Confirm User Deletion"}
// //                 </DialogTitle>
// //                 <DialogContent>
// //                     <DialogContentText id="alert-dialog-description">
// //                         Are you sure you want to delete user {selectedUser?.userName}? This action cannot be undone.
// //                     </DialogContentText>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={handleCloseDeleteDialog} color="primary">
// //                         Cancel
// //                     </Button>
// //                     <Button onClick={deleteUser} color="error" autoFocus>
// //                         Delete
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>
// //         </Box>
// //     );
// // };

// // export default UserDetails;

// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { 
//   TextField, 
//   Paper, 
//   Typography, 
//   Box, 
//   Button, 
//   Dialog, 
//   DialogTitle, 
//   DialogContent, 
//   DialogContentText, 
//   DialogActions,
//   IconButton,
//   Avatar,
//   Tooltip,
//   Chip,
//   Menu,
//   MenuItem,
//   ListItemIcon,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import BlockIcon from '@mui/icons-material/Block';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useNavigate } from 'react-router-dom';

// const UserDetails = () => {
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [currentUserId, setCurrentUserId] = useState(null);
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//     const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

//     // Status options
//     const STATUS_OPTIONS = {
//         ACTIVE: 'active',
//         INACTIVE: 'inactive',
//         BLOCKED: 'blocked'
//     };

//     // Responsive column configuration
//     const getColumns = () => {
//         const baseColumns = [
//             { 
//                 field: "profilePic", 
//                 headerName: "Photo", 
//                 width: 80,
//                 renderCell: (params) => (
//                     <Avatar 
//                         src={`http://localhost:3000/${params.value}` || "https://via.placeholder.com/150"} 
//                         alt="Profile" 
//                         sx={{ width: 40, height: 40 }}
//                     />
//                 ),
//                 sortable: false,
//                 filterable: false
//             },
//             { 
//                 field: "userName", 
//                 headerName: "User Name", 
//                 width: isSmallScreen ? 120 : 180 
//             },
//             { 
//                 field: "email", 
//                 headerName: "Email", 
//                 width: isSmallScreen ? 150 : isMediumScreen ? 200 : 250,
//                 renderCell: (params) => (
//                     <Box sx={{ 
//                         whiteSpace: 'nowrap',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         width: '100%'
//                     }}>
//                         {params.value}
//                     </Box>
//                 )
//             },
//             { 
//                 field: "contact", 
//                 headerName: "Contact", 
//                 width: isSmallScreen ? 120 : 160,
//                 hide: isSmallScreen
//             },
//             { 
//                 field: "status", 
//                 headerName: "Status", 
//                 width: 100,
//                 renderCell: (params) => {
//                     const status = params.row.status;
//                     let statusText, statusColor;
                    
//                     switch(status) {
//                         case STATUS_OPTIONS.ACTIVE:
//                             statusText = "Active";
//                             statusColor = "success";
//                             break;
//                         case STATUS_OPTIONS.INACTIVE:
//                             statusText = "Inactive";
//                             statusColor = "warning";
//                             break;
//                         case STATUS_OPTIONS.BLOCKED:
//                             statusText = "Blocked";
//                             statusColor = "error";
//                             break;
//                         default:
//                             statusText = "Unknown";
//                             statusColor = "default";
//                     }
                    
//                     return (
//                         <Chip 
//                             label={isSmallScreen ? statusText.substring(0, 1) : statusText} 
//                             color={statusColor} 
//                             size="small"
//                             sx={{
//                                 width: isSmallScreen ? 30 : 'auto'
//                             }}
//                         />
//                     );
//                 }
//             },
//             {
//                 field: "actions",
//                 headerName: "Actions",
//                 width: isSmallScreen ? 100 : 150,
//                 renderCell: (params) => (
//                     <Box>
//                         <Tooltip title="View User">
//                             <IconButton
//                                 color="primary"
//                                 onClick={() => navigate(`/admin/userdetails/${params.row._id}`)}
//                                 size="small"
//                             >
//                                 <VisibilityIcon fontSize={isSmallScreen ? "small" : "medium"} />
//                             </IconButton>
//                         </Tooltip>
//                         <Tooltip title="More actions">
//                             <IconButton
//                                 onClick={(e) => {
//                                     setAnchorEl(e.currentTarget);
//                                     setCurrentUserId(params.row._id);
//                                 }}
//                                 size="small"
//                             >
//                                 <MoreVertIcon fontSize={isSmallScreen ? "small" : "medium"} />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 ),
//                 sortable: false,
//                 filterable: false
//             }
//         ];

//         return baseColumns;
//     };

//     // Fetch users from API
//     const getAllUsers = async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get("/users/getallusers");
//             // Ensure status is properly set for each user
//             const usersWithStatus = res.data.data.map(user => ({
//                 ...user,
//                 status: user.status || STATUS_OPTIONS.INACTIVE
//             }));
//             setUsers(usersWithStatus);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle status change
//     const handleStatusChange = async (userId, newStatus) => {
//         try {
//             await axios.put(`/users/getuserbyidandupdate/${userId}`, {
//                 status: newStatus
//             });
//             getAllUsers(); // Refresh the list
//             setAnchorEl(null); // Close the menu
//         } catch (error) {
//             console.error("Error changing user status:", error);
//         }
//     };

//     // Delete user function
//     const deleteUser = async () => {
//         try {
//             await axios.delete(`/users/deleteuser/${selectedUser._id}`);
//             getAllUsers(); // Refresh the list
//             setOpenDeleteDialog(false);
//         } catch (error) {
//             console.error("Error deleting user:", error);
//         }
//     };

//     const handleOpenDeleteDialog = (user) => {
//         setSelectedUser(user);
//         setOpenDeleteDialog(true);
//     };

//     const handleCloseDeleteDialog = () => {
//         setOpenDeleteDialog(false);
//         setSelectedUser(null);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setCurrentUserId(null);
//     };

//     useEffect(() => {
//         getAllUsers();
//     }, []);

//     // Filter users based on search input
//     const filteredUsers = users.filter(user =>
//         user.userName?.toLowerCase().includes(search.toLowerCase()) ||
//         user.email?.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <Box 
//             sx={{ 
//                 width: '100%',
//                 maxWidth: isSmallScreen ? '100%' : '95%',
//                 margin: 'auto', 
//                 mt: isSmallScreen ? 2 : 5, 
//                 p: isSmallScreen ? 1 : 3,
//                 background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)", 
//                 borderRadius: 2,
//                 boxSizing: 'border-box'
//             }}
//         >
//             <Paper elevation={5} 
//                 sx={{ 
//                     p: isSmallScreen ? 1 : 3, 
//                     borderRadius: 2, 
//                     backgroundColor: "#ffffff", 
//                     boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
//                     width: '100%',
//                     overflow: 'hidden'
//                 }}
//             >
//                 <Typography 
//                     variant={isSmallScreen ? "h5" : "h4"} 
//                     align="center" 
//                     gutterBottom 
//                     sx={{ 
//                         fontWeight: "bold", 
//                         color: "#1565c0",
//                         fontSize: isSmallScreen ? '1.5rem' : '2rem',
//                         mb: isSmallScreen ? 1 : 2
//                     }}
//                 >
//                     User Management
//                 </Typography>

//                 {/* Search Bar */}
//                 <TextField
//                     label="Search Users..."
//                     variant="outlined"
//                     fullWidth
//                     size={isSmallScreen ? "small" : "medium"}
//                     sx={{ 
//                         mb: 2, 
//                         bgcolor: "#f5f5f5", 
//                         borderRadius: 1 
//                     }}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />

//                 {/* Data Grid */}
//                 <Box sx={{ 
//                     width: '100%',
//                     height: isSmallScreen ? 400 : 500,
//                     '& .MuiDataGrid-cell': {
//                         fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
//                     },
//                     '& .MuiDataGrid-columnHeader': {
//                         fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
//                     }
//                 }}>
//                     <DataGrid
//                         rows={filteredUsers}
//                         columns={getColumns()}
//                         pageSize={5}
//                         rowsPerPageOptions={[5]}
//                         loading={loading}
//                         getRowId={(row) => row._id}
//                         sx={{
//                             height: '100%',
//                             border: "2px solid #64b5f6",
//                             borderRadius: "8px",
//                             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//                             "& .MuiDataGrid-row": {
//                                 backgroundColor: "#ffffff",
//                                 "&:nth-of-type(odd)": { backgroundColor: "#f1f8ff" },
//                                 "&:hover": { backgroundColor: "#e3f2fd" },
//                             },
//                             "& .MuiDataGrid-columnHeaders": {
//                                 backgroundColor: "#1565c0",
//                                 color: "white",
//                                 fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
//                                 fontWeight: "bold",
//                             },
//                             "& .MuiDataGrid-cell": {
//                                 color: "#333",
//                             },
//                         }}
//                     />
//                 </Box>
//             </Paper>

//             {/* Status Change Menu */}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 PaperProps={{
//                     style: {
//                         width: isSmallScreen ? 150 : 200,
//                     },
//                 }}
//             >
//                 <MenuItem onClick={() => handleStatusChange(currentUserId, STATUS_OPTIONS.INACTIVE)}>
//                     <ListItemIcon>
//                         <PowerSettingsNewIcon color="warning" fontSize={isSmallScreen ? "small" : "medium"} />
//                     </ListItemIcon>
//                     <Typography variant="body2">Unblock User</Typography>
//                 </MenuItem>
//                 <MenuItem onClick={() => handleStatusChange(currentUserId, STATUS_OPTIONS.BLOCKED)}>
//                     <ListItemIcon>
//                         <BlockIcon color="error" fontSize={isSmallScreen ? "small" : "medium"} />
//                     </ListItemIcon>
//                     <Typography variant="body2">Block User</Typography>
//                 </MenuItem>
//                 <MenuItem onClick={() => {
//                     const user = users.find(u => u._id === currentUserId);
//                     handleOpenDeleteDialog(user);
//                     handleMenuClose();
//                 }}>
//                     <ListItemIcon>
//                         <DeleteIcon color="error" fontSize={isSmallScreen ? "small" : "medium"} />
//                     </ListItemIcon>
//                     <Typography variant="body2">Delete User</Typography>
//                 </MenuItem>
//             </Menu>

//             {/* Delete Confirmation Dialog */}
//             <Dialog
//                 open={openDeleteDialog}
//                 onClose={handleCloseDeleteDialog}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//                 fullWidth
//                 maxWidth="xs"
//             >
//                 <DialogTitle id="alert-dialog-title">
//                     {"Confirm User Deletion"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Are you sure you want to delete user {selectedUser?.userName}? This action cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseDeleteDialog} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={deleteUser} color="error" autoFocus>
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default UserDetails;

import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { 
  TextField, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions,
  IconButton,
  Avatar,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Status options
    const STATUS_OPTIONS = {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        BLOCKED: 'blocked'
    };

    // Responsive column configuration
    const getColumns = () => {
        const baseColumns = [
            { 
                field: "profilePic", 
                headerName: "Photo", 
                width: 100,
                renderCell: (params) => (
                    <Avatar 
                        src={`http://localhost:3000/${params.value}` || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        sx={{ width: 45, height: 42 }}
                    />
                ),
                sortable: false,
                filterable: false
            },
            { 
                field: "userName", 
                headerName: "User Name", 
                width: isSmallScreen ? 150 : 180,
                flex: isSmallScreen ? 0 : 1
            },
            { 
                field: "email", 
                headerName: "Email", 
                width: isSmallScreen ? 200 : 300,
                flex: 1,
                renderCell: (params) => (
                    <Box sx={{ 
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%'
                    }}>
                        {params.value}
                    </Box>
                )
            },
            { 
                field: "contact", 
                headerName: "Contact", 
                width: 160,
                hide: isSmallScreen
            },
            { 
                field: "status", 
                headerName: "Status", 
                width: 140,
                renderCell: (params) => {
                    const status = params.row.status;
                    let statusText, statusColor;
                    
                    switch(status) {
                        case STATUS_OPTIONS.ACTIVE:
                            statusText = "Active";
                            statusColor = "success";
                            break;
                        case STATUS_OPTIONS.INACTIVE:
                            statusText = "Inactive";
                            statusColor = "warning";
                            break;
                        case STATUS_OPTIONS.BLOCKED:
                            statusText = "Blocked";
                            statusColor = "error";
                            break;
                        default:
                            statusText = "Unknown";
                            statusColor = "default";
                    }
                    
                    return (
                        <Chip 
                            label={statusText} 
                            color={statusColor} 
                            size="small"
                        />
                    );
                }
            },
            {
                field: "actions",
                headerName: "Actions",
                width: 150,
                renderCell: (params) => (
                    <Box>
                        <Tooltip title="View User">
                            <IconButton
                                color="primary"
                                onClick={() => navigate(`/admin/userdetails/${params.row._id}`)}
                                size="small"
                            >
                                <VisibilityIcon fontSize={isSmallScreen ? "small" : "medium"} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="More actions">
                            <IconButton
                                onClick={(e) => {
                                    setAnchorEl(e.currentTarget);
                                    setCurrentUserId(params.row._id);
                                }}
                                size="small"
                            >
                                <MoreVertIcon fontSize={isSmallScreen ? "small" : "medium"} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
                sortable: false,
                filterable: false
            }
        ];

        return baseColumns;
    };

    // Fetch users from API
    const getAllUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/users/getallusers");
            // Ensure status is properly set for each user
            const usersWithStatus = res.data.data.map(user => ({
                ...user,
                status: user.status || STATUS_OPTIONS.INACTIVE
            }));
            setUsers(usersWithStatus);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle status change
    const handleStatusChange = async (userId, newStatus) => {
        try {
            await axios.put(`/users/getuserbyidandupdate/${userId}`, {
                status: newStatus
            });
            getAllUsers(); // Refresh the list
            setAnchorEl(null); // Close the menu
        } catch (error) {
            console.error("Error changing user status:", error);
        }
    };

    // Delete user function
    const deleteUser = async () => {
        try {
            await axios.delete(`/users/deleteuser/${selectedUser._id}`);
            getAllUsers(); // Refresh the list
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleOpenDeleteDialog = (user) => {
        setSelectedUser(user);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedUser(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentUserId(null);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    // Filter users based on search input
    const filteredUsers = users.filter(user =>
        user.userName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box 
            sx={{ 
                width: '100%',
                padding: isSmallScreen ? 1 : 3,
                background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)", 
                boxSizing: 'border-box',
                minHeight: '100vh'
            }}
        >
            <Paper 
                elevation={5} 
                sx={{ 
                    p: isSmallScreen ? 1 : 3, 
                    borderRadius: 2, 
                    backgroundColor: "#ffffff", 
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                    width: '100%',
                    maxWidth: '100%',
                    margin: '0 auto'
                }}
            >
                <Typography 
                    variant={isSmallScreen ? "h5" : "h4"} 
                    align="center" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: "bold", 
                        color: "#1565c0",
                        fontSize: isSmallScreen ? '1.5rem' : '2rem',
                        mb: isSmallScreen ? 1 : 2
                    }}
                >
                    User Management
                </Typography>

                {/* Search Bar */}
                <TextField
                    label="Search Users..."
                    variant="outlined"
                    fullWidth
                    size={isSmallScreen ? "small" : "medium"}
                    sx={{ 
                        mb: 2, 
                        bgcolor: "#f5f5f5", 
                        borderRadius: 1 
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* Data Grid */}
                <Box sx={{ 
                    width: '100%',
                    height: 'calc(100vh - 200px)',
                    minHeight: 400,
                    '& .MuiDataGrid-cell': {
                        fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                    }
                }}>
                    <DataGrid
                        rows={filteredUsers}
                        columns={getColumns()}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 20]}
                        loading={loading}
                        getRowId={(row) => row._id}
                        sx={{
                            width: '100%',
                            height: '100%',
                            border: "2px solid #64b5f6",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                            "& .MuiDataGrid-row": {
                                backgroundColor: "#ffffff",
                                "&:nth-of-type(odd)": { backgroundColor: "#f1f8ff" },
                                "&:hover": { backgroundColor: "#e3f2fd" },
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#1565c0",
                                color: "black",
                                fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
                                fontWeight: "bold",
                            },
                            "& .MuiDataGrid-cell": {
                                color: "#333",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                overflowX: 'hidden'
                            }
                        }}
                    />
                </Box>
            </Paper>

            {/* Status Change Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        width: isSmallScreen ? 150 : 200,
                    },
                }}
            >
                <MenuItem onClick={() => handleStatusChange(currentUserId, STATUS_OPTIONS.INACTIVE)}>
                    <ListItemIcon>
                        <PowerSettingsNewIcon color="warning" fontSize={isSmallScreen ? "small" : "medium"} />
                    </ListItemIcon>
                    <Typography variant="body2">Unblock User</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleStatusChange(currentUserId, STATUS_OPTIONS.BLOCKED)}>
                    <ListItemIcon>
                        <BlockIcon color="error" fontSize={isSmallScreen ? "small" : "medium"} />
                    </ListItemIcon>
                    <Typography variant="body2">Block User</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    const user = users.find(u => u._id === currentUserId);
                    handleOpenDeleteDialog(user);
                    handleMenuClose();
                }}>
                    <ListItemIcon>
                        <DeleteIcon color="error" fontSize={isSmallScreen ? "small" : "medium"} />
                    </ListItemIcon>
                    <Typography variant="body2">Delete User</Typography>
                </MenuItem>
            </Menu>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm User Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete user {selectedUser?.userName}? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteUser} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserDetails;