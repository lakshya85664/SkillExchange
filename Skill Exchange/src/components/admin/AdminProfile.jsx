// // import React, { useEffect, useState } from "react";
// // import {
// //     Box,
// //     Typography,
// //     Button,
// //     Paper,
// //     Grid,
// //     Avatar,
// //     Container,
// //     CircularProgress,
// //     Tabs,
// //     Tab
// // } from "@mui/material";
// // import { useNavigate } from "react-router-dom";
// // import {
// //     ManageAccounts as ManageAccountsIcon,
// //     ListAlt as ListAltIcon,
// //     ReportProblem as ReportProblemIcon,
// //     BarChart as BarChartIcon,
// //     PieChart as PieChartIcon,
// //     Timeline as TimelineIcon,
// //     Edit as EditIcon,
// //     AdminPanelSettings as AdminPanelSettingsIcon,
// //     Category as CategoryIcon,
// //     Star as StarIcon,
// //     Equalizer as EqualizerIcon,
// //     Refresh as RefreshIcon
// // } from "@mui/icons-material";
// // import axios from "axios";
// // import Footer from "../common/Footer";
// // import {
// //     BarChart,
// //     Bar,
// //     XAxis,
// //     YAxis,
// //     CartesianGrid,
// //     Tooltip,
// //     Legend,
// //     ResponsiveContainer,
// //     PieChart,
// //     Pie,
// //     Cell,
// //     LineChart,
// //     Line
// // } from "recharts";

// // const AdminProfile = () => {
// //     const navigate = useNavigate();
// //     const [admin, setAdmin] = useState({});
// //     const [stats, setStats] = useState({
// //         monthlyUsers: [],
// //         userStatus: [],
// //         activityTrend: [],
// //         skillCategories: [],
// //         popularSkills: []
// //     });
// //     const [loading, setLoading] = useState(true);
// //     const [tabValue, setTabValue] = useState(0);
// //     const [error, setError] = useState(null);

// //     // Color palette
// //     const colors = {
// //         primary: "#1976d2",
// //         secondary: "#9c27b0",
// //         error: "#d32f2f",
// //         background: "#f5f5f5",
// //         cardBackground: "#ffffff",
// //         textPrimary: "#212121",
// //         textSecondary: "#757575"
// //     };

// //     const chartColors = ['#1976d2', '#9c27b0', '#d32f2f', '#ff9800', '#4caf50','#6d4c41','#e91e63','#757575'];

// //     // const fetchData = async () => {
// //     //     try {
// //     //         setLoading(true);
// //     //         setError(null);
// //     //         const [adminRes, statsRes, skillsRes] = await Promise.all([
// //     //             axios.get(`/admin/getadminbyid/${localStorage.getItem("id")}`),
// //     //             axios.get('/admin/stats'),
// //     //             axios.get('/skill/getallskills')
// //     //         ]);

// //     //         if (adminRes.data?.data) setAdmin(adminRes.data.data);

// //     //         if (statsRes.data) {
// //     //             // Process user status to combine duplicate inactive entries
// //     //             const processedUserStatus = statsRes.data.userStatus?.reduce((acc, item) => {
// //     //                 const existing = acc.find(i => i.name === item.name);
// //     //                 if (existing) {
// //     //                     existing.value += item.value;
// //     //                 } else {
// //     //                     acc.push(item);
// //     //                 }
// //     //                 return acc;
// //     //             }, []) || [];

// //     //             setStats(prev => ({
// //     //                 ...prev,
// //     //                 monthlyUsers: statsRes.data.monthlyUsers || [],
// //     //                 userStatus: processedUserStatus,
// //     //                 activityTrend: statsRes.data.activityTrend || []
// //     //             }));
// //     //         }

// //     //         // Process skill data for charts
// //     //         if (skillsRes.data?.data) {
// //     //             const skillsData = skillsRes.data.data;

// //     //             // Skill categories distribution
// //     //             const categoryCounts = {};
// //     //             skillsData.forEach(skill => {
// //     //                 const categoryName = skill.categoryId?.name || 'Uncategorized';
// //     //                 categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
// //     //             });
// //     //             const skillCategories = Object.keys(categoryCounts).map(name => ({
// //     //                 name,
// //     //                 value: categoryCounts[name]
// //     //             }));

// //     //             // Popular skills (top 5)
// //     //             const skillNameCounts = {};
// //     //             skillsData.forEach(skill => {
// //     //                 skillNameCounts[skill.name] = (skillNameCounts[skill.name] || 0) + 1;
// //     //             });
// //     //             const popularSkills = Object.entries(skillNameCounts)
// //     //                 .sort((a, b) => b[1] - a[1])
// //     //                 .slice(0, 5)
// //     //                 .map(([name, count]) => ({ name, count }));

// //     //             setStats(prev => ({
// //     //                 ...prev,
// //     //                 skillCategories,
// //     //                 popularSkills
// //     //             }));
// //     //         }

// //     //         setLoading(false);
// //     //     } catch (err) {
// //     //         console.error("Error fetching data:", err);
// //     //         setError("Failed to load data. Please try again.");
// //     //         setLoading(false);
// //     //     }
// //     // };

// //     const fetchData = async () => {
// //         try {
// //             setLoading(true);
// //             setError(null);
// //             const [adminRes, statsRes, skillsRes] = await Promise.all([
// //                 axios.get(`/admin/getadminbyid/${localStorage.getItem("id")}`),
// //                 axios.get('/admin/stats'),
// //                 axios.get('/skill/getallskills')
// //             ]);
    
// //             if (adminRes.data?.data) setAdmin(adminRes.data.data);
    
// //             if (statsRes.data) {
// //                 // Process user status to ensure we have all possible statuses with correct counts
// //                 const statusCounts = {
// //                     active: 0,
// //                     inactive: 0,
// //                     blocked: 0
// //                 };
    
// //                 // Count each status from the backend data
// //                 statsRes.data.userStatus?.forEach(item => {
// //                     if (item.name === 'active') statusCounts.active = item.value;
// //                     else if (item.name === 'inactive') statusCounts.inactive = item.value;
// //                     else if (item.name === 'blocked') statusCounts.blocked = item.value;
// //                 });
    
// //                 // Convert to array format for the pie chart
// //                 const processedUserStatus = [
// //                     { name: 'Active', value: statusCounts.active },
// //                     { name: 'Inactive', value: statusCounts.inactive },
// //                     { name: 'Blocked', value: statusCounts.blocked }
// //                 ];
    
// //                 setStats(prev => ({
// //                     ...prev,
// //                     monthlyUsers: statsRes.data.monthlyUsers || [],
// //                     userStatus: processedUserStatus,
// //                     activityTrend: statsRes.data.activityTrend || []
// //                 }));
// //             }
    
// //             // Rest of your existing code for skill data processing...
// //             if (skillsRes.data?.data) {
// //                 const skillsData = skillsRes.data.data;
    
// //                 // Skill categories distribution
// //                 const categoryCounts = {};
// //                 skillsData.forEach(skill => {
// //                     const categoryName = skill.categoryId?.name || 'Uncategorized';
// //                     categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
// //                 });
// //                 const skillCategories = Object.keys(categoryCounts).map(name => ({
// //                     name,
// //                     value: categoryCounts[name]
// //                 }));
    
// //                 // Popular skills (top 5)
// //                 const skillNameCounts = {};
// //                 skillsData.forEach(skill => {
// //                     skillNameCounts[skill.name] = (skillNameCounts[skill.name] || 0) + 1;
// //                 });
// //                 const popularSkills = Object.entries(skillNameCounts)
// //                     .sort((a, b) => b[1] - a[1])
// //                     .slice(0, 5)
// //                     .map(([name, count]) => ({ name, count }));
    
// //                 setStats(prev => ({
// //                     ...prev,
// //                     skillCategories,
// //                     popularSkills
// //                 }));
// //             }
    
// //             setLoading(false);
// //         } catch (err) {
// //             console.error("Error fetching data:", err);
// //             setError("Failed to load data. Please try again.");
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchData();

// //         // Set up polling for real-time updates (every 5 minutes)
// //         const interval = setInterval(fetchData, 300000);
// //         return () => clearInterval(interval);
// //     }, []);

// //     const handleFileChange = async (event) => {
// //         const file = event.target.files[0];
// //         if (!file) return;

// //         const formData = new FormData();
// //         formData.append("profilePic", file);

// //         try {
// //             await axios.put(`/admin/getadminbyidandupdatepic/${localStorage.getItem("id")}`, formData, {
// //                 headers: { "Content-Type": "multipart/form-data" }
// //             });
// //             const response = await axios.get(`/admin/getadminbyid/${localStorage.getItem("id")}`);
// //             setAdmin(response.data.data);
// //         } catch (error) {
// //             console.error("Error updating profile picture:", error);
// //             setError("Failed to update profile picture. Please try again.");
// //         }
// //     };

// //     const handleTabChange = (event, newValue) => {
// //         setTabValue(newValue);
// //     };

// //     const handleRefresh = () => {
// //         fetchData();
// //     };

// //     if (loading && !stats.monthlyUsers.length) {
// //         return (
// //             <Box sx={{
// //                 display: 'flex',
// //                 justifyContent: 'center',
// //                 alignItems: 'center',
// //                 height: '100vh',
// //                 backgroundColor: colors.background
// //             }}>
// //                 <CircularProgress />
// //             </Box>
// //         );
// //     }

// //     return (
// //         <div style={{maxWidth: "100vw"}}>
// //         <Box sx={{
// //             minHeight: '100vh',
// //             backgroundColor: colors.background,
// //             pb: 4,
// //             mb: 0,
// //             maxWidth: "100vw"
// //         }}>
// //             <Container maxWidth="lg" sx={{ pt: 4 }}>
// //                 {/* Profile Section */}
// //                 <Paper elevation={3} sx={{
// //                     mb: 4,
// //                     ml: 35,
// //                     maxWidth: 600,
// //                     display: 'flex',
// //                     justifyContent: 'center',
// //                     alignItems: 'center',
// //                     p: 4,
// //                     borderRadius: 2,
// //                     backgroundColor: colors.cardBackground,
// //                     backgroundImage: 'linear-gradient(to right, rgba(25, 118, 210, 0.1), rgba(255, 255, 255, 1))'
// //                 }}>
// //                     <Grid container spacing={4} alignItems="center">
// //                         <Grid item xs={12} md={3} ml={8} sx={{ display: 'flex', justifyContent: 'center' }}>
// //                             <Box sx={{ position: 'relative' }}>
// //                                 <Avatar
// //                                     src={`http://localhost:3000/${admin.profilePic}`}
// //                                     sx={{
// //                                         width: 150,
// //                                         height: 150,
// //                                         border: `4px solid ${colors.primary}`,
// //                                         boxShadow: 3,
// //                                         '&:hover': {
// //                                             opacity: 0.8,
// //                                             cursor: 'pointer'
// //                                         }
// //                                     }}
// //                                     onClick={() => document.getElementById('profile-pic-upload').click()}
// //                                 />
// //                                 <input
// //                                     id="profile-pic-upload"
// //                                     type="file"
// //                                     accept="image/*"
// //                                     onChange={handleFileChange}
// //                                     style={{ display: 'none' }}
// //                                 />
// //                                 <Box sx={{
// //                                     position: 'absolute',
// //                                     bottom: 0,
// //                                     right: 0,
// //                                     backgroundColor: colors.primary,
// //                                     color: 'white',
// //                                     borderRadius: '50%',
// //                                     width: 40,
// //                                     height: 40,
// //                                     display: 'flex',
// //                                     alignItems: 'center',
// //                                     justifyContent: 'center',
// //                                     cursor: 'pointer',
// //                                     boxShadow: 2
// //                                 }}>
// //                                     <EditIcon fontSize="small" />
// //                                 </Box>
// //                             </Box>
// //                         </Grid>

// //                         <Grid item xs={12} md={6} ml={5}>
// //                             <Typography variant="h4" sx={{
// //                                 fontWeight: 'bold',
// //                                 color: colors.textPrimary,
// //                                 mb: 1
// //                             }}>
// //                                 {admin.adminName || 'Admin'}
// //                             </Typography>
// //                             <Typography variant="h6" sx={{
// //                                 color: colors.textSecondary,
// //                                 mb: 2
// //                             }}>
// //                                 {admin.email || 'admin@example.com'}
// //                             </Typography>
// //                             <Typography variant="body1" sx={{
// //                                 display: 'flex',
// //                                 alignItems: 'center',
// //                                 color: colors.primary
// //                             }}>
// //                                 <AdminPanelSettingsIcon sx={{ mr: 1 }} />
// //                                 Administrator
// //                             </Typography>
// //                         </Grid>
// //                     </Grid>
// //                 </Paper>

// //                 {/* Action Buttons */}
// //                 <Grid container spacing={3} sx={{ mb: 4 }}>
// //                     {[
// //                         {
// //                             label: 'Manage Users',
// //                             icon: <ManageAccountsIcon fontSize="large" />,
// //                             color: colors.primary,
// //                             onClick: () => navigate('/admin/userdetails')
// //                         },
// //                         {
// //                             label: 'Manage Skills',
// //                             icon: <ListAltIcon fontSize="large" />,
// //                             color: colors.secondary,
// //                             onClick: () => navigate('/admin/manageskills')
// //                         },
// //                         {
// //                             label: 'View Reports',
// //                             icon: <ReportProblemIcon fontSize="large" />,
// //                             color: colors.error,
// //                             onClick: () => navigate('/admin/reports')
// //                         }
// //                     ].map((action, index) => (
// //                         <Grid item xs={12} md={4} key={index}>
// //                             <Paper elevation={3} sx={{
// //                                 p: 2.5,
// //                                 borderRadius: 2,
// //                                 backgroundColor: colors.cardBackground,
// //                                 transition: 'all 0.3s ease',
// //                                 '&:hover': {
// //                                     transform: 'translateY(-5px)',
// //                                     boxShadow: 6
// //                                 }
// //                             }}>
// //                                 <Button
// //                                     fullWidth
// //                                     sx={{
// //                                         display: 'flex',
// //                                         flexDirection: 'column',
// //                                         height: '100%',
// //                                         color: action.color,
// //                                         '&:hover': {
// //                                             backgroundColor: 'transparent'
// //                                         }
// //                                     }}
// //                                     onClick={action.onClick}
// //                                 >
// //                                     <Box sx={{ mb: 2 }}>
// //                                         {action.icon}
// //                                     </Box>
// //                                     <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// //                                         {action.label}
// //                                     </Typography>
// //                                 </Button>
// //                             </Paper>
// //                         </Grid>
// //                     ))}
// //                 </Grid>

// //                 {/* Refresh Button */}
// //                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
// //                     <Button
// //                         variant="contained"
// //                         startIcon={<RefreshIcon />}
// //                         onClick={handleRefresh}
// //                         disabled={loading}
// //                     >
// //                         Refresh Data
// //                     </Button>
// //                 </Box>

// //                 {error && (
// //                     <Box sx={{ mb: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
// //                         <Typography color="error">{error}</Typography>
// //                     </Box>
// //                 )}

// //                 {/* Dashboard Section with Tabs */}
// //                 <Paper elevation={3} sx={{
// //                     p: 4,
// //                     mb: 5,
// //                     borderRadius: 2,
// //                     backgroundColor: colors.cardBackground
// //                 }}>
// //                     <Tabs
// //                         value={tabValue}
// //                         onChange={handleTabChange}
// //                         indicatorColor="primary"
// //                         textColor="primary"
// //                         centered
// //                         sx={{ mb: 4 }}
// //                     >
// //                         <Tab label="User Analytics" icon={<BarChartIcon />} />
// //                         <Tab label="Skill Analytics" icon={<EqualizerIcon />} />
// //                     </Tabs>

// //                     {tabValue === 0 && (
// //                         <Grid container spacing={4}>
// //                             {/* Monthly Active Users */}
// //                             <Grid item xs={12} md={6}>
// //                                 <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
// //                                     <Typography variant="h6" sx={{
// //                                         mb: 2,
// //                                         fontWeight: 'bold',
// //                                         color: colors.textPrimary,
// //                                         display: 'flex',
// //                                         alignItems: 'center'
// //                                     }}>
// //                                         <TimelineIcon sx={{ mr: 1, color: colors.primary }} />
// //                                         Monthly New Users
// //                                     </Typography>
// //                                     {stats.monthlyUsers.length === 0 ? (
// //                                         <Box sx={{
// //                                             display: 'flex',
// //                                             justifyContent: 'center',
// //                                             alignItems: 'center',
// //                                             height: 300
// //                                         }}>
// //                                             <Typography color="textSecondary">No data available</Typography>
// //                                         </Box>
// //                                     ) : (
// //                                         <ResponsiveContainer width="100%" height={300}>
// //                                             <BarChart data={stats.monthlyUsers}>
// //                                                 <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
// //                                                 <XAxis dataKey="month" stroke={colors.textSecondary} />
// //                                                 <YAxis stroke={colors.textSecondary} />
// //                                                 <Tooltip
// //                                                     contentStyle={{
// //                                                         backgroundColor: colors.cardBackground,
// //                                                         borderColor: colors.primary,
// //                                                         borderRadius: 4
// //                                                     }}
// //                                                 />
// //                                                 <Legend />
// //                                                 <Bar
// //                                                     dataKey="activeUsers"
// //                                                     fill={colors.primary}
// //                                                     radius={[4, 4, 0, 0]}
// //                                                     name="New Users"
// //                                                 />
// //                                             </BarChart>
// //                                         </ResponsiveContainer>
// //                                     )}
// //                                 </Paper>
// //                             </Grid>

// //                             {/* User Status Distribution */}
// //                             <Grid item xs={12} md={6}>
// //                                 <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
// //                                     <Typography variant="h6" sx={{
// //                                         mb: 2,
// //                                         fontWeight: 'bold',
// //                                         color: colors.textPrimary,
// //                                         display: 'flex',
// //                                         alignItems: 'center'
// //                                     }}>
// //                                         <PieChartIcon sx={{ mr: 1, color: colors.primary }} />
// //                                         User Status Distribution
// //                                     </Typography>
// //                                     {stats.userStatus.length === 0 ? (
// //                                         <Box sx={{
// //                                             display: 'flex',
// //                                             justifyContent: 'center',
// //                                             alignItems: 'center',
// //                                             height: 300
// //                                         }}>
// //                                             <Typography color="textSecondary">No data available</Typography>
// //                                         </Box>
// //                                     ) : (
// //                                         <ResponsiveContainer width="100%" height={300}>
// //                                             <PieChart>
// //                                                 <Pie
// //                                                     data={stats.userStatus}
// //                                                     cx="50%"
// //                                                     cy="50%"
// //                                                     labelLine={false}
// //                                                     outerRadius={80}
// //                                                     fill="#8884d8"
// //                                                     dataKey="value"
// //                                                     nameKey="name"
// //                                                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //                                                 >
// //                                                     {stats.userStatus.map((entry, index) => (
// //                                                         <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
// //                                                     ))}
// //                                                 </Pie>
// //                                                 <Tooltip
// //                                                     contentStyle={{
// //                                                         backgroundColor: colors.cardBackground,
// //                                                         borderColor: colors.primary,
// //                                                         borderRadius: 4
// //                                                     }}
// //                                                 />
// //                                                 <Legend />
// //                                             </PieChart>
// //                                         </ResponsiveContainer>
// //                                     )}
// //                                 </Paper>
// //                             </Grid>

// //                             {/* Activity Trend */}
// //                             <Grid item xs={12}>
// //                                 <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
// //                                     {/* <Typography variant="h6" sx={{
// //                                         mb: 2,
// //                                         fontWeight: 'bold',
// //                                         color: colors.textPrimary,
// //                                         display: 'flex',
// //                                         alignItems: 'center'
// //                                     }}>
// //                                         <TimelineIcon sx={{ mr: 1, color: colors.primary }} />
// //                                         Activity Trend (Last 7 Days)
// //                                     </Typography> */}
// //                                     <Typography variant="h6" sx={{
// //                                         mb: 2,
// //                                         fontWeight: 'bold',
// //                                         color: colors.textPrimary,
// //                                         display: 'flex',
// //                                         alignItems: 'center'
// //                                     }}>
// //                                         <TimelineIcon sx={{ mr: 1, color: colors.primary }} />
// //                                         Daily Matches (Last 7 Days) 
// //                                     </Typography>
// //                                     {stats.activityTrend.length === 0 ? (
// //                                         <Box sx={{
// //                                             display: 'flex',
// //                                             justifyContent: 'center',
// //                                             alignItems: 'center',
// //                                             height: 300
// //                                         }}>
// //                                             <Typography color="textSecondary">No data available</Typography>
// //                                         </Box>
// //                                     ) : (
// //                                         <ResponsiveContainer width="100%" height={300}>
// //                                             <LineChart data={stats.activityTrend}>
// //                                                 <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
// //                                                 <XAxis dataKey="date" stroke={colors.textSecondary} />
// //                                                 <YAxis stroke={colors.textSecondary} />
// //                                                 <Tooltip
// //                                                     contentStyle={{
// //                                                         backgroundColor: colors.cardBackground,
// //                                                         borderColor: colors.primary,
// //                                                         borderRadius: 4
// //                                                     }}
// //                                                 />
// //                                                 <Legend />
// //                                                 {/* <Line
// //                                                     type="monotone"
// //                                                     dataKey="logins"
// //                                                     stroke={colors.secondary}
// //                                                     strokeWidth={2}
// //                                                     dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
// //                                                     activeDot={{ r: 6, fill: colors.secondary }}
// //                                                     name="Daily Logins"
// //                                                 /> */}
// //                                                 <Line
// //                                                     type="monotone"
// //                                                     dataKey="matches"  // Changed from "logins" to "matches"
// //                                                     stroke={colors.secondary}
// //                                                     strokeWidth={2}
// //                                                     dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
// //                                                     activeDot={{ r: 6, fill: colors.secondary }}
// //                                                     name="Daily Matches"  // Updated label
// //                                                 />
// //                                             </LineChart>
// //                                         </ResponsiveContainer>
// //                                     )}
// //                                 </Paper>
// //                             </Grid>
// //                         </Grid>
// //                     )}

// //                     {tabValue === 1 && (
// //                         <Grid container spacing={4}>
// //                             {/* Skill Categories Distribution */}
// //                             <Grid item xs={12}>
// //                                 <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
// //                                     <Typography variant="h6" sx={{
// //                                         mb: 2,
// //                                         fontWeight: 'bold',
// //                                         color: colors.textPrimary,
// //                                         display: 'flex',
// //                                         alignItems: 'center'
// //                                     }}>
// //                                         <CategoryIcon sx={{ mr: 1, color: colors.primary }} />
// //                                         Skill Categories Distribution
// //                                     </Typography>
// //                                     {stats.skillCategories.length === 0 ? (
// //                                         <Box sx={{
// //                                             display: 'flex',
// //                                             justifyContent: 'center',
// //                                             alignItems: 'center',
// //                                             height: 400
// //                                         }}>
// //                                             <Typography color="textSecondary">No data available</Typography>
// //                                         </Box>
// //                                     ) : (
// //                                         <ResponsiveContainer width="100%" height={400}>
// //                                             <PieChart>
// //                                                 <Pie
// //                                                     data={stats.skillCategories}
// //                                                     cx="50%"
// //                                                     cy="50%"
// //                                                     labelLine={false}
// //                                                     outerRadius={150}
// //                                                     fill="#8884d8"
// //                                                     dataKey="value"
// //                                                     nameKey="name"
// //                                                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //                                                 >
// //                                                     {stats.skillCategories.map((entry, index) => (
// //                                                         <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
// //                                                     ))}
// //                                                 </Pie>
// //                                                 <Tooltip
// //                                                     contentStyle={{
// //                                                         backgroundColor: colors.cardBackground,
// //                                                         borderColor: colors.primary,
// //                                                         borderRadius: 4
// //                                                     }}
// //                                                 />
// //                                                 <Legend />
// //                                             </PieChart>
// //                                         </ResponsiveContainer>
// //                                     )}
// //                                 </Paper>
// //                             </Grid>

// //                             {/* Popular Skills */}
// //                             <Grid item xs={12}>
// //                                 <Paper elevation={2} sx={{
// //                                     p: 3,
// //                                     borderRadius: 2,
// //                                     maxWidth: 800,
// //                                     margin: '0 auto'
// //                                 }}>
// //                                     <Typography variant="h6" sx={{
// //                                         mb: 2,
// //                                         fontWeight: 'bold',
// //                                         color: colors.textPrimary,
// //                                         display: 'flex',
// //                                         alignItems: 'center'
// //                                     }}>
// //                                         <StarIcon sx={{ mr: 1, color: colors.primary }} />
// //                                         Most Popular Skills
// //                                     </Typography>
// //                                     {stats.popularSkills.length === 0 ? (
// //                                         <Box sx={{
// //                                             display: 'flex',
// //                                             justifyContent: 'center',
// //                                             alignItems: 'center',
// //                                             height: 400
// //                                         }}>
// //                                             <Typography color="textSecondary">No data available</Typography>
// //                                         </Box>
// //                                     ) : (
// //                                         <ResponsiveContainer width="100%" height={400}>
// //                                             <BarChart
// //                                                 data={stats.popularSkills}
// //                                                 layout="vertical"
// //                                                 margin={{ top: 5, right: 30, left: 69, bottom: 5 }}
// //                                             >
// //                                                 <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
// //                                                 <XAxis type="number" stroke={colors.textSecondary} />
// //                                                 <YAxis dataKey="name" type="category" stroke={colors.textSecondary} />
// //                                                 <Tooltip
// //                                                     contentStyle={{
// //                                                         backgroundColor: colors.cardBackground,
// //                                                         borderColor: colors.primary,
// //                                                         borderRadius: 4
// //                                                     }}
// //                                                 />
// //                                                 <Legend />
// //                                                 <Bar
// //                                                     dataKey="count"
// //                                                     fill={colors.secondary}
// //                                                     radius={[0, 4, 4, 0]}
// //                                                     name="Users with Skill"
// //                                                 />
// //                                             </BarChart>
// //                                         </ResponsiveContainer>
// //                                     )}
// //                                 </Paper>
// //                             </Grid>
// //                         </Grid>
// //                     )}
// //                 </Paper>
// //             </Container>

            
// //         </Box>
// //         <Footer fullWidth={false} style={{padding:"-20px"}}></Footer>
// //         </div>
// //     );
// // };

// // export default AdminProfile;

import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Avatar,
    Container,
    CircularProgress,
    Tabs,
    Tab,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    ManageAccounts as ManageAccountsIcon,
    ListAlt as ListAltIcon,
    ReportProblem as ReportProblemIcon,
    BarChart as BarChartIcon,
    PieChart as PieChartIcon,
    Timeline as TimelineIcon,
    Edit as EditIcon,
    AdminPanelSettings as AdminPanelSettingsIcon,
    Category as CategoryIcon,
    Star as StarIcon,
    Equalizer as EqualizerIcon,
    Refresh as RefreshIcon
} from "@mui/icons-material";
import axios from "axios";
import Footer from "../common/Footer";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from "recharts";

const AdminProfile = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [admin, setAdmin] = useState({});
    const [stats, setStats] = useState({
        monthlyUsers: [],
        userStatus: [],
        activityTrend: [],
        skillCategories: [],
        popularSkills: []
    });
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);
    const [error, setError] = useState(null);

    // Color palette
    const colors = {
        primary: "#1976d2",
        secondary: "#9c27b0",
        error: "#d32f2f",
        background: "#f5f5f5",
        cardBackground: "#ffffff",
        textPrimary: "#212121",
        textSecondary: "#757575"
    };

    const chartColors = ['#1976d2', '#9c27b0', '#d32f2f', '#ff9800', '#4caf50','#6d4c41','#e91e63','#757575'];

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [adminRes, statsRes, skillsRes] = await Promise.all([
                axios.get(`/admin/getadminbyid/${localStorage.getItem("id")}`),
                axios.get('/admin/stats'),
                axios.get('/skill/getallskills')
            ]);
    
            if (adminRes.data?.data) setAdmin(adminRes.data.data);
    
            if (statsRes.data) {
                // Process user status to ensure we have all possible statuses with correct counts
                const statusCounts = {
                    active: 0,
                    inactive: 0,
                    blocked: 0
                };
    
                // Count each status from the backend data
                statsRes.data.userStatus?.forEach(item => {
                    if (item.name === 'active') statusCounts.active = item.value;
                    else if (item.name === 'inactive') statusCounts.inactive = item.value;
                    else if (item.name === 'blocked') statusCounts.blocked = item.value;
                });
    
                // Convert to array format for the pie chart
                const processedUserStatus = [
                    { name: 'Active', value: statusCounts.active },
                    { name: 'Inactive', value: statusCounts.inactive },
                    { name: 'Blocked', value: statusCounts.blocked }
                ];
    
                setStats(prev => ({
                    ...prev,
                    monthlyUsers: statsRes.data.monthlyUsers || [],
                    userStatus: processedUserStatus,
                    activityTrend: statsRes.data.activityTrend || []
                }));
            }
    
            // Rest of your existing code for skill data processing...
            if (skillsRes.data?.data) {
                const skillsData = skillsRes.data.data;
    
                // Skill categories distribution
                const categoryCounts = {};
                skillsData.forEach(skill => {
                    const categoryName = skill.categoryId?.name || 'Uncategorized';
                    categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
                });
                const skillCategories = Object.keys(categoryCounts).map(name => ({
                    name,
                    value: categoryCounts[name]
                }));
    
                // Popular skills (top 5)
                const skillNameCounts = {};
                skillsData.forEach(skill => {
                    skillNameCounts[skill.name] = (skillNameCounts[skill.name] || 0) + 1;
                });
                const popularSkills = Object.entries(skillNameCounts)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([name, count]) => ({ name, count }));
    
                setStats(prev => ({
                    ...prev,
                    skillCategories,
                    popularSkills
                }));
            }
    
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data. Please try again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Set up polling for real-time updates (every 5 minutes)
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePic", file);

        try {
            await axios.put(`/admin/getadminbyidandupdatepic/${localStorage.getItem("id")}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            const response = await axios.get(`/admin/getadminbyid/${localStorage.getItem("id")}`);
            setAdmin(response.data.data);
        } catch (error) {
            console.error("Error updating profile picture:", error);
            setError("Failed to update profile picture. Please try again.");
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleRefresh = () => {
        fetchData();
    };

    if (loading && !stats.monthlyUsers.length) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: colors.background
            }}>
                <CircularProgress />
            </Box>
        );
    }

    // Responsive chart height calculations
    const getChartHeight = () => {
        if (isMobile) return 250;
        if (isTablet) return 300;
        return 350;
    };

    const getPieChartHeight = () => {
        if (isMobile) return 250;
        if (isTablet) return 300;
        return 350;
    };

    const getAvatarSize = () => {
        if (isMobile) return 100;
        if (isTablet) return 120;
        return 150;
    };

    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            <Box sx={{
                minHeight: '100vh',
                backgroundColor: colors.background,
                pb: 4,
                mb: 0,
                width: '100%'
            }}>
                <Container maxWidth="lg" sx={{ pt: 4, px: isMobile ? 2 : 4 }}>
                    {/* Profile Section */}
                    <Paper elevation={3} sx={{
                        mb: 4,
                        mx: isMobile ? 0 : 'auto',
                        width: '100%',
                        maxWidth: isMobile ? '100%' : 600,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: isMobile ? 2 : 4,
                        borderRadius: 2,
                        backgroundColor: colors.cardBackground,
                        backgroundImage: 'linear-gradient(to right, rgba(25, 118, 210, 0.1), rgba(255, 255, 255, 1))'
                    }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ position: 'relative' }}>
                                    <Avatar
                                        src={`http://localhost:3000/${admin.profilePic}`}
                                        sx={{
                                            width: getAvatarSize(),
                                            height: getAvatarSize(),
                                            border: `4px solid ${colors.primary}`,
                                            boxShadow: 3,
                                            '&:hover': {
                                                opacity: 0.8,
                                                cursor: 'pointer'
                                            }
                                        }}
                                        onClick={() => document.getElementById('profile-pic-upload').click()}
                                    />
                                    <input
                                        id="profile-pic-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: colors.primary,
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: isMobile ? 30 : 40,
                                        height: isMobile ? 30 : 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: 2
                                    }}>
                                        <EditIcon fontSize={isMobile ? "small" : "medium"} />
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8} sx={{ 
                                textAlign: isMobile ? 'center' : 'left',
                                pl: isMobile ? 0 : 3
                            }}>
                                <Typography variant={isMobile ? "h5" : "h4"} sx={{
                                    fontWeight: 'bold',
                                    color: colors.textPrimary,
                                    mb: 1
                                }}>
                                    {admin.adminName || 'Admin'}
                                </Typography>
                                <Typography variant={isMobile ? "body1" : "h6"} sx={{
                                    color: colors.textSecondary,
                                    mb: 2
                                }}>
                                    {admin.email || 'admin@example.com'}
                                </Typography>
                                <Typography variant="body1" sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isMobile ? 'center' : 'flex-start',
                                    color: colors.primary
                                }}>
                                    <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                                    Administrator
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Action Buttons */}
                    <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: 4 }}>
                        {[
                            {
                                label: 'Manage Users',
                                icon: <ManageAccountsIcon fontSize={isMobile ? "medium" : "large"} />,
                                color: colors.primary,
                                onClick: () => navigate('/admin/userdetails')
                            },
                            {
                                label: 'Manage Skills',
                                icon: <ListAltIcon fontSize={isMobile ? "medium" : "large"} />,
                                color: colors.secondary,
                                onClick: () => navigate('/admin/manageskills')
                            },
                            {
                                label: 'View Reports',
                                icon: <ReportProblemIcon fontSize={isMobile ? "medium" : "large"} />,
                                color: colors.error,
                                onClick: () => navigate('/admin/reports')
                            }
                        ].map((action, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper elevation={3} sx={{
                                    p: isMobile ? 1.5 : 2.5,
                                    borderRadius: 2,
                                    backgroundColor: colors.cardBackground,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6
                                    }
                                }}>
                                    <Button
                                        fullWidth
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            color: action.color,
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                        onClick={action.onClick}
                                    >
                                        <Box sx={{ mb: isMobile ? 1 : 2 }}>
                                            {action.icon}
                                        </Box>
                                        <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: 'bold' }}>
                                            {action.label}
                                        </Typography>
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Refresh Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button
                            variant="contained"
                            size={isMobile ? "small" : "medium"}
                            startIcon={<RefreshIcon />}
                            onClick={handleRefresh}
                            disabled={loading}
                        >
                            {isMobile ? 'Refresh' : 'Refresh Data'}
                        </Button>
                    </Box>

                    {error && (
                        <Box sx={{ mb: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
                            <Typography color="error">{error}</Typography>
                        </Box>
                    )}

                    {/* Dashboard Section with Tabs */}
                    <Paper elevation={3} sx={{
                        p: isMobile ? 2 : 4,
                        mb: 5,
                        borderRadius: 2,
                        backgroundColor: colors.cardBackground
                    }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            sx={{ mb: 4 }}
                            variant={isMobile ? "scrollable" : "standard"}
                            scrollButtons="auto"
                        >
                            <Tab label={isMobile ? "Users" : "User Analytics"} icon={<BarChartIcon />} />
                            <Tab label={isMobile ? "Skills" : "Skill Analytics"} icon={<EqualizerIcon />} />
                        </Tabs>

                        {tabValue === 0 && (
                            <Grid container spacing={isMobile ? 2 : 4}>
                                {/* Monthly Active Users */}
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={2} sx={{ p: isMobile ? 1.5 : 3, borderRadius: 2 }}>
                                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            color: colors.textPrimary,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TimelineIcon sx={{ mr: 1, color: colors.primary }} />
                                            Monthly New Users
                                        </Typography>
                                        {stats.monthlyUsers.length === 0 ? (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: getChartHeight()
                                            }}>
                                                <Typography color="textSecondary">No data available</Typography>
                                            </Box>
                                        ) : (
                                            <ResponsiveContainer width="100%" height={getChartHeight()}>
                                                <BarChart data={stats.monthlyUsers}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                                    <XAxis dataKey="month" stroke={colors.textSecondary} />
                                                    <YAxis stroke={colors.textSecondary} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: colors.cardBackground,
                                                            borderColor: colors.primary,
                                                            borderRadius: 4
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="activeUsers"
                                                        fill={colors.primary}
                                                        radius={[4, 4, 0, 0]}
                                                        name="New Users"
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        )}
                                    </Paper>
                                </Grid>

                                {/* User Status Distribution */}
                                <Grid item xs={12} md={6}>
                                    <Paper elevation={2} sx={{ p: isMobile ? 1.5 : 3, borderRadius: 2 }}>
                                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            color: colors.textPrimary,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <PieChartIcon sx={{ mr: 1, color: colors.primary }} />
                                            User Status
                                        </Typography>
                                        {stats.userStatus.length === 0 ? (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: getPieChartHeight()
                                            }}>
                                                <Typography color="textSecondary">No data available</Typography>
                                            </Box>
                                        ) : (
                                            <ResponsiveContainer width="100%" height={getPieChartHeight()}>
                                                <PieChart>
                                                    <Pie
                                                        data={stats.userStatus}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={isMobile ? 70 : 80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        nameKey="name"
                                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {stats.userStatus.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: colors.cardBackground,
                                                            borderColor: colors.primary,
                                                            borderRadius: 4
                                                        }}
                                                    />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        )}
                                    </Paper>
                                </Grid>

                                {/* Activity Trend */}
                                <Grid item xs={12}>
                                    <Paper elevation={2} sx={{ p: isMobile ? 1.5 : 3, borderRadius: 2 }}>
                                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            color: colors.textPrimary,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <TimelineIcon sx={{ mr: 1, color: colors.primary }} />
                                            Daily Matches (Last 7 Days)
                                        </Typography>
                                        {stats.activityTrend.length === 0 ? (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: getChartHeight()
                                            }}>
                                                <Typography color="textSecondary">No data available</Typography>
                                            </Box>
                                        ) : (
                                            <ResponsiveContainer width="100%" height={getChartHeight()}>
                                                <LineChart data={stats.activityTrend}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                                    <XAxis dataKey="date" stroke={colors.textSecondary} />
                                                    <YAxis stroke={colors.textSecondary} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: colors.cardBackground,
                                                            borderColor: colors.primary,
                                                            borderRadius: 4
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="matches"
                                                        stroke={colors.secondary}
                                                        strokeWidth={2}
                                                        dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
                                                        activeDot={{ r: 6, fill: colors.secondary }}
                                                        name="Daily Matches"
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )}
                                    </Paper>
                                </Grid>
                            </Grid>
                        )}

                        {tabValue === 1 && (
                            <Grid container spacing={isMobile ? 2 : 4}>
                                {/* Skill Categories Distribution */}
                                <Grid item xs={12}>
                                    <Paper elevation={2} sx={{ p: isMobile ? 1.5 : 3, borderRadius: 2 }}>
                                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            color: colors.textPrimary,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <CategoryIcon sx={{ mr: 1, color: colors.primary }} />
                                            Skill Categories
                                        </Typography>
                                        {stats.skillCategories.length === 0 ? (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: getPieChartHeight()
                                            }}>
                                                <Typography color="textSecondary">No data available</Typography>
                                            </Box>
                                        ) : (
                                            <ResponsiveContainer width="100%" height={getPieChartHeight()}>
                                                <PieChart>
                                                    <Pie
                                                        data={stats.skillCategories}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        outerRadius={isMobile ? 100 : 120}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        nameKey="name"
                                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {stats.skillCategories.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: colors.cardBackground,
                                                            borderColor: colors.primary,
                                                            borderRadius: 4
                                                        }}
                                                    />
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        )}
                                    </Paper>
                                </Grid>

                                {/* Popular Skills */}
                                <Grid item xs={12}>
                                    <Paper elevation={2} sx={{
                                        p: isMobile ? 1.5 : 3,
                                        borderRadius: 2,
                                        width: '100%'
                                    }}>
                                        <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
                                            mb: 2,
                                            fontWeight: 'bold',
                                            color: colors.textPrimary,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <StarIcon sx={{ mr: 1, color: colors.primary }} />
                                            Popular Skills
                                        </Typography>
                                        {stats.popularSkills.length === 0 ? (
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: getChartHeight()
                                            }}>
                                                <Typography color="textSecondary">No data available</Typography>
                                            </Box>
                                        ) : (
                                            <ResponsiveContainer width="100%" height={getChartHeight()}>
                                                <BarChart
                                                    data={stats.popularSkills}
                                                    layout="vertical"
                                                    margin={{ 
                                                        top: 5, 
                                                        right: isMobile ? 10 : 30, 
                                                        left: isMobile ? 50 : 69, 
                                                        bottom: 5 
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                                                    <XAxis type="number" stroke={colors.textSecondary} />
                                                    <YAxis 
                                                        dataKey="name" 
                                                        type="category" 
                                                        stroke={colors.textSecondary} 
                                                        width={isMobile ? 80 : 100}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: colors.cardBackground,
                                                            borderColor: colors.primary,
                                                            borderRadius: 4
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="count"
                                                        fill={colors.secondary}
                                                        radius={[0, 4, 4, 0]}
                                                        name="Users with Skill"
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        )}
                                    </Paper>
                                </Grid>
                            </Grid>
                        )}
                    </Paper>
                </Container>
            </Box>

        </Box>
    );
};

export default AdminProfile;

// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Typography,
//     Button,
//     Paper,
//     Grid,
//     Avatar,
//     Container,
//     CircularProgress,
//     Tabs,
//     Tab,
//     useMediaQuery,
//     useTheme
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//     ManageAccounts as ManageAccountsIcon,
//     ListAlt as ListAltIcon,
//     ReportProblem as ReportProblemIcon,
//     BarChart as BarChartIcon,
//     PieChart as PieChartIcon,
//     Timeline as TimelineIcon,
//     Edit as EditIcon,
//     AdminPanelSettings as AdminPanelSettingsIcon,
//     Category as CategoryIcon,
//     Star as StarIcon,
//     Equalizer as EqualizerIcon,
//     Refresh as RefreshIcon
// } from "@mui/icons-material";
// import axios from "axios";
// import Footer from "../common/Footer";
// import {
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend,
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     Cell,
//     LineChart,
//     Line
// } from "recharts";

// const AdminProfile = () => {
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//     const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//     const [admin, setAdmin] = useState({});
//     const [stats, setStats] = useState({
//         monthlyUsers: [],
//         userStatus: [],
//         activityTrend: [],
//         skillCategories: [],
//         popularSkills: []
//     });
//     const [loading, setLoading] = useState(true);
//     const [tabValue, setTabValue] = useState(0);
//     const [error, setError] = useState(null);

//     // Color palette
//     const colors = {
//         primary: "#1976d2",
//         secondary: "#9c27b0",
//         error: "#d32f2f",
//         background: "#f5f5f5",
//         cardBackground: "#ffffff",
//         textPrimary: "#212121",
//         textSecondary: "#757575"
//     };

//     const chartColors = ['#1976d2', '#9c27b0', '#d32f2f', '#ff9800', '#4caf50','#6d4c41','#e91e63','#757575'];

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             setError(null);
//             const [adminRes, statsRes, skillsRes] = await Promise.all([
//                 axios.get(`/admin/getadminbyid/${localStorage.getItem("id")}`),
//                 axios.get('/admin/stats'),
//                 axios.get('/skill/getallskills')
//             ]);
    
//             if (adminRes.data?.data) setAdmin(adminRes.data.data);
    
//             if (statsRes.data) {
//                 // Process user status to ensure we have all possible statuses with correct counts
//                 const statusCounts = {
//                     active: 0,
//                     inactive: 0,
//                     blocked: 0
//                 };
    
//                 // Count each status from the backend data
//                 statsRes.data.userStatus?.forEach(item => {
//                     if (item.name === 'active') statusCounts.active = item.value;
//                     else if (item.name === 'inactive') statusCounts.inactive = item.value;
//                     else if (item.name === 'blocked') statusCounts.blocked = item.value;
//                 });
    
//                 // Convert to array format for the pie chart
//                 const processedUserStatus = [
//                     { name: 'Active', value: statusCounts.active },
//                     { name: 'Inactive', value: statusCounts.inactive },
//                     { name: 'Blocked', value: statusCounts.blocked }
//                 ];
    
//                 setStats(prev => ({
//                     ...prev,
//                     monthlyUsers: statsRes.data.monthlyUsers || [],
//                     userStatus: processedUserStatus,
//                     activityTrend: statsRes.data.activityTrend || []
//                 }));
//             }
    
//             // Process skill data
//             if (skillsRes.data?.data) {
//                 const skillsData = skillsRes.data.data;
    
//                 // Skill categories distribution - truncate long names
//                 const categoryCounts = {};
//                 skillsData.forEach(skill => {
//                     let categoryName = skill.categoryId?.name || 'Uncategorized';
//                     // Truncate long category names
//                     if (categoryName.length > 20) {
//                         categoryName = categoryName.substring(0, 17) + '...';
//                     }
//                     categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1;
//                 });
//                 const skillCategories = Object.keys(categoryCounts).map(name => ({
//                     name,
//                     value: categoryCounts[name]
//                 }));
    
//                 // Popular skills (top 5)
//                 const skillNameCounts = {};
//                 skillsData.forEach(skill => {
//                     skillNameCounts[skill.name] = (skillNameCounts[skill.name] || 0) + 1;
//                 });
//                 const popularSkills = Object.entries(skillNameCounts)
//                     .sort((a, b) => b[1] - a[1])
//                     .slice(0, 5)
//                     .map(([name, count]) => ({ name, count }));
    
//                 setStats(prev => ({
//                     ...prev,
//                     skillCategories,
//                     popularSkills
//                 }));
//             }
    
//             setLoading(false);
//         } catch (err) {
//             console.error("Error fetching data:", err);
//             setError("Failed to load data. Please try again.");
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();

//         // Set up polling for real-time updates (every 5 minutes)
//         const interval = setInterval(fetchData, 300000);
//         return () => clearInterval(interval);
//     }, []);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append("profilePic", file);

//         try {
//             await axios.put(`/admin/getadminbyidandupdatepic/${localStorage.getItem("id")}`, formData, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             });
//             const response = await axios.get(`/admin/getadminbyid/${localStorage.getItem("id")}`);
//             setAdmin(response.data.data);
//         } catch (error) {
//             console.error("Error updating profile picture:", error);
//             setError("Failed to update profile picture. Please try again.");
//         }
//     };

//     const handleTabChange = (event, newValue) => {
//         setTabValue(newValue);
//     };

//     const handleRefresh = () => {
//         fetchData();
//     };

//     if (loading && !stats.monthlyUsers.length) {
//         return (
//             <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100vh',
//                 backgroundColor: colors.background
//             }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     // Responsive chart height calculations
//     const getChartHeight = () => {
//         if (isMobile) return 250;
//         if (isTablet) return 300;
//         return 350;
//     };

//     const getPieChartHeight = () => {
//         if (isMobile) return 300;  // Increased height for mobile
//         if (isTablet) return 350;
//         return 400;
//     };

//     const getAvatarSize = () => {
//         if (isMobile) return 100;
//         if (isTablet) return 120;
//         return 150;
//     };

//     // Custom label renderer for pie chart
//     const renderCustomizedLabel = ({
//         cx,
//         cy,
//         midAngle,
//         innerRadius,
//         outerRadius,
//         percent,
//         index,
//         name
//     }) => {
//         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
//         const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

//         return (
//             <text
//                 x={x}
//                 y={y}
//                 fill="white"
//                 textAnchor="middle"
//                 dominantBaseline="central"
//                 fontSize={isMobile ? 10 : 12}
//             >
//                 {`${(percent * 100).toFixed(0)}%`}
//             </text>
//         );
//     };

//     return (
//         <Box sx={{ width: '100%', overflowX: 'hidden' }}>
//             <Box sx={{
//                 minHeight: '100vh',
//                 backgroundColor: colors.background,
//                 pb: 4,
//                 mb: 0,
//                 width: '100%'
//             }}>
//                 <Container maxWidth="lg" sx={{ pt: 4, px: isMobile ? 2 : 4 }}>
//                     {/* Profile Section */}
//                     <Paper elevation={3} sx={{
//                         mb: 4,
//                         mx: isMobile ? 0 : 'auto',
//                         width: '100%',
//                         maxWidth: isMobile ? '100%' : 600,
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         p: isMobile ? 2 : 4,
//                         borderRadius: 2,
//                         backgroundColor: colors.cardBackground,
//                         backgroundImage: 'linear-gradient(to right, rgba(25, 118, 210, 0.1), rgba(255, 255, 255, 1))'
//                     }}>
//                         <Grid container spacing={2} alignItems="center">
//                             <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
//                                 <Box sx={{ position: 'relative' }}>
//                                     <Avatar
//                                         src={`http://localhost:3000/${admin.profilePic}`}
//                                         sx={{
//                                             width: getAvatarSize(),
//                                             height: getAvatarSize(),
//                                             border: `4px solid ${colors.primary}`,
//                                             boxShadow: 3,
//                                             '&:hover': {
//                                                 opacity: 0.8,
//                                                 cursor: 'pointer'
//                                             }
//                                         }}
//                                         onClick={() => document.getElementById('profile-pic-upload').click()}
//                                     />
//                                     <input
//                                         id="profile-pic-upload"
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleFileChange}
//                                         style={{ display: 'none' }}
//                                     />
//                                     <Box sx={{
//                                         position: 'absolute',
//                                         bottom: 0,
//                                         right: 0,
//                                         backgroundColor: colors.primary,
//                                         color: 'white',
//                                         borderRadius: '50%',
//                                         width: isMobile ? 30 : 40,
//                                         height: isMobile ? 30 : 40,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         cursor: 'pointer',
//                                         boxShadow: 2
//                                     }}>
//                                         <EditIcon fontSize={isMobile ? "small" : "medium"} />
//                                     </Box>
//                                 </Box>
//                             </Grid>

//                             <Grid item xs={12} sm={8} sx={{ 
//                                 textAlign: isMobile ? 'center' : 'left',
//                                 pl: isMobile ? 0 : 3
//                             }}>
//                                 <Typography variant={isMobile ? "h5" : "h4"} sx={{
//                                     fontWeight: 'bold',
//                                     color: colors.textPrimary,
//                                     mb: 1
//                                 }}>
//                                     {admin.adminName || 'Admin'}
//                                 </Typography>
//                                 <Typography variant={isMobile ? "body1" : "h6"} sx={{
//                                     color: colors.textSecondary,
//                                     mb: 2
//                                 }}>
//                                     {admin.email || 'admin@example.com'}
//                                 </Typography>
//                                 <Typography variant="body1" sx={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: isMobile ? 'center' : 'flex-start',
//                                     color: colors.primary
//                                 }}>
//                                     <AdminPanelSettingsIcon sx={{ mr: 1 }} />
//                                     Administrator
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                     </Paper>

//                     {/* Action Buttons */}
//                     <Grid container spacing={isMobile ? 1 : 3} sx={{ mb: 4 }}>
//                         {[
//                             {
//                                 label: 'Manage Users',
//                                 icon: <ManageAccountsIcon fontSize={isMobile ? "medium" : "large"} />,
//                                 color: colors.primary,
//                                 onClick: () => navigate('/admin/userdetails')
//                             },
//                             {
//                                 label: 'Manage Skills',
//                                 icon: <ListAltIcon fontSize={isMobile ? "medium" : "large"} />,
//                                 color: colors.secondary,
//                                 onClick: () => navigate('/admin/manageskills')
//                             },
//                             {
//                                 label: 'View Reports',
//                                 icon: <ReportProblemIcon fontSize={isMobile ? "medium" : "large"} />,
//                                 color: colors.error,
//                                 onClick: () => navigate('/admin/reports')
//                             }
//                         ].map((action, index) => (
//                             <Grid item xs={12} sm={4} key={index}>
//                                 <Paper elevation={3} sx={{
//                                     p: isMobile ? 1.5 : 2.5,
//                                     borderRadius: 2,
//                                     backgroundColor: colors.cardBackground,
//                                     transition: 'all 0.3s ease',
//                                     '&:hover': {
//                                         transform: 'translateY(-5px)',
//                                         boxShadow: 6
//                                     }
//                                 }}>
//                                     <Button
//                                         fullWidth
//                                         sx={{
//                                             display: 'flex',
//                                             flexDirection: 'column',
//                                             height: '100%',
//                                             color: action.color,
//                                             '&:hover': {
//                                                 backgroundColor: 'transparent'
//                                             }
//                                         }}
//                                         onClick={action.onClick}
//                                     >
//                                         <Box sx={{ mb: isMobile ? 1 : 2 }}>
//                                             {action.icon}
//                                         </Box>
//                                         <Typography variant={isMobile ? "body1" : "h6"} sx={{ fontWeight: 'bold' }}>
//                                             {action.label}
//                                         </Typography>
//                                     </Button>
//                                 </Paper>
//                             </Grid>
//                         ))}
//                     </Grid>

//                     {/* Refresh Button */}
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//                         <Button
//                             variant="contained"
//                             size={isMobile ? "small" : "medium"}
//                             startIcon={<RefreshIcon />}
//                             onClick={handleRefresh}
//                             disabled={loading}
//                         >
//                             {isMobile ? 'Refresh' : 'Refresh Data'}
//                         </Button>
//                     </Box>

//                     {error && (
//                         <Box sx={{ mb: 2, p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
//                             <Typography color="error">{error}</Typography>
//                         </Box>
//                     )}

//                     {/* Dashboard Section with Tabs */}
//                     <Paper elevation={3} sx={{
//                         p: isMobile ? 2 : 4,
//                         mb: 5,
//                         borderRadius: 2,
//                         backgroundColor: colors.cardBackground
//                     }}>
//                         <Tabs
//                             value={tabValue}
//                             onChange={handleTabChange}
//                             indicatorColor="primary"
//                             textColor="primary"
//                             centered
//                             sx={{ mb: 4 }}
//                             variant={isMobile ? "scrollable" : "standard"}
//                             scrollButtons="auto"
//                         >
//                             <Tab label={isMobile ? "Users" : "User Analytics"} icon={<BarChartIcon />} />
//                             <Tab label={isMobile ? "Skills" : "Skill Analytics"} icon={<EqualizerIcon />} />
//                         </Tabs>

//                         {tabValue === 0 && (
//                             <Grid container spacing={isMobile ? 2 : 4}>
//                                 {/* Monthly Active Users */}
//                                 <Grid item xs={12} md={6}>
//                                     <Paper elevation={2} sx={{ p: isMobile ? 1.5 : 3, borderRadius: 2 }}>
//                                         <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
//                                             mb: 2,
//                                             fontWeight: 'bold',
//                                             color: colors.textPrimary,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center'
//                                         }}>
//                                             <TimelineIcon sx={{ mr: 1, color: colors.primary }} />
//                                             Monthly New Users
//                                         </Typography>
//                                         {stats.monthlyUsers.length === 0 ? (
//                                             <Box sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 height: getChartHeight()
//                                             }}>
//                                                 <Typography color="textSecondary">No data available</Typography>
//                                             </Box>
//                                         ) : (
//                                             <ResponsiveContainer width="100%" height={getChartHeight()}>
//                                                 <BarChart data={stats.monthlyUsers}>
//                                                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                                                     <XAxis dataKey="month" stroke={colors.textSecondary} />
//                                                     <YAxis stroke={colors.textSecondary} />
//                                                     <Tooltip
//                                                         contentStyle={{
//                                                             backgroundColor: colors.cardBackground,
//                                                             borderColor: colors.primary,
//                                                             borderRadius: 4
//                                                         }}
//                                                     />
//                                                     <Legend />
//                                                     <Bar
//                                                         dataKey="activeUsers"
//                                                         fill={colors.primary}
//                                                         radius={[4, 4, 0, 0]}
//                                                         name="New Users"
//                                                     />
//                                                 </BarChart>
//                                             </ResponsiveContainer>
//                                         )}
//                                     </Paper>
//                                 </Grid>

//                                 {/* User Status Distribution */}
//                                 <Grid item xs={12} md={6}>
//                                     <Paper elevation={2} sx={{ p: isMobile ? 1.5 : 3, borderRadius: 2 }}>
//                                         <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
//                                             mb: 2,
//                                             fontWeight: 'bold',
//                                             color: colors.textPrimary,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center'
//                                         }}>
//                                             <PieChartIcon sx={{ mr: 1, color: colors.primary }} />
//                                             User Status
//                                         </Typography>
//                                         {stats.userStatus.length === 0 ? (
//                                             <Box sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 height: getPieChartHeight()
//                                             }}>
//                                                 <Typography color="textSecondary">No data available</Typography>
//                                             </Box>
//                                         ) : (
//                                             <ResponsiveContainer width="100%" height={getPieChartHeight()}>
//                                                 <PieChart>
//                                                     <Pie
//                                                         data={stats.userStatus}
//                                                         cx="50%"
//                                                         cy="50%"
//                                                         labelLine={false}
//                                                         outerRadius={isMobile ? 70 : 80}
//                                                         fill="#8884d8"
//                                                         dataKey="value"
//                                                         nameKey="name"
//                                                         label={renderCustomizedLabel}
//                                                     >
//                                                         {stats.userStatus.map((entry, index) => (
//                                                             <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
//                                                         ))}
//                                                     </Pie>
//                                                     <Tooltip
//                                                         contentStyle={{
//                                                             backgroundColor: colors.cardBackground,
//                                                             borderColor: colors.primary,
//                                                             borderRadius: 4
//                                                         }}
//                                                         formatter={(value, name, props) => [
//                                                             value,
//                                                             props.payload.name
//                                                         ]}
//                                                     />
//                                                     <Legend />
//                                                 </PieChart>
//                                             </ResponsiveContainer>
//                                         )}
//                                     </Paper>
//                                 </Grid>

//                                 {/* Activity Trend */}
//                                 <Grid item xs={12}>
//                                     <Paper elevation={2} sx={{ p: isMobile ? 1.5 : 3, borderRadius: 2 }}>
//                                         <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
//                                             mb: 2,
//                                             fontWeight: 'bold',
//                                             color: colors.textPrimary,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center'
//                                         }}>
//                                             <TimelineIcon sx={{ mr: 1, color: colors.primary }} />
//                                             Daily Matches (Last 7 Days)
//                                         </Typography>
//                                         {stats.activityTrend.length === 0 ? (
//                                             <Box sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 height: getChartHeight()
//                                             }}>
//                                                 <Typography color="textSecondary">No data available</Typography>
//                                             </Box>
//                                         ) : (
//                                             <ResponsiveContainer width="100%" height={getChartHeight()}>
//                                                 <LineChart data={stats.activityTrend}>
//                                                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                                                     <XAxis dataKey="date" stroke={colors.textSecondary} />
//                                                     <YAxis stroke={colors.textSecondary} />
//                                                     <Tooltip
//                                                         contentStyle={{
//                                                             backgroundColor: colors.cardBackground,
//                                                             borderColor: colors.primary,
//                                                             borderRadius: 4
//                                                         }}
//                                                     />
//                                                     <Legend />
//                                                     <Line
//                                                         type="monotone"
//                                                         dataKey="matches"
//                                                         stroke={colors.secondary}
//                                                         strokeWidth={2}
//                                                         dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
//                                                         activeDot={{ r: 6, fill: colors.secondary }}
//                                                         name="Daily Matches"
//                                                     />
//                                                 </LineChart>
//                                             </ResponsiveContainer>
//                                         )}
//                                     </Paper>
//                                 </Grid>
//                             </Grid>
//                         )}

//                         {tabValue === 1 && (
//                             <Grid container spacing={isMobile ? 2 : 4}>
//                                 {/* Skill Categories Distribution */}
//                                 <Grid item xs={12}>
//                                     <Paper elevation={2} sx={{ 
//                                         p: isMobile ? 1.5 : 3, 
//                                         borderRadius: 2,
//                                         overflow: 'hidden' // Prevent content from overflowing
//                                     }}>
//                                         <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
//                                             mb: 2,
//                                             fontWeight: 'bold',
//                                             color: colors.textPrimary,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center'
//                                         }}>
//                                             <CategoryIcon sx={{ mr: 1, color: colors.primary }} />
//                                             Skill Categories
//                                         </Typography>
//                                         {stats.skillCategories.length === 0 ? (
//                                             <Box sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 height: getPieChartHeight()
//                                             }}>
//                                                 <Typography color="textSecondary">No data available</Typography>
//                                             </Box>
//                                         ) : (
//                                             <Box sx={{ 
//                                                 width: '100%', 
//                                                 height: getPieChartHeight(),
//                                                 position: 'relative'
//                                             }}>
//                                                 <ResponsiveContainer width="100%" height="100%">
//                                                     <PieChart>
//                                                         <Pie
//                                                             data={stats.skillCategories}
//                                                             cx="50%"
//                                                             cy="50%"
//                                                             labelLine={false}
//                                                             outerRadius={isMobile ? '70%' : '80%'}
//                                                             innerRadius={isMobile ? '30%' : '40%'}
//                                                             fill="#8884d8"
//                                                             dataKey="value"
//                                                             nameKey="name"
//                                                             label={renderCustomizedLabel}
//                                                         >
//                                                             {stats.skillCategories.map((entry, index) => (
//                                                                 <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
//                                                             ))}
//                                                         </Pie>
//                                                         <Tooltip
//                                                             contentStyle={{
//                                                                 backgroundColor: colors.cardBackground,
//                                                                 borderColor: colors.primary,
//                                                                 borderRadius: 4
//                                                             }}
//                                                             formatter={(value, name, props) => [
//                                                                 value,
//                                                                 props.payload.name
//                                                             ]}
//                                                         />
//                                                         <Legend 
//                                                             layout={isMobile ? "horizontal" : "vertical"}
//                                                             verticalAlign={isMobile ? "bottom" : "middle"}
//                                                             align="right"
//                                                             wrapperStyle={{
//                                                                 paddingTop: isMobile ? 10 : 0,
//                                                                 paddingLeft: isMobile ? 0 : 10
//                                                             }}
//                                                         />
//                                                     </PieChart>
//                                                 </ResponsiveContainer>
//                                             </Box>
//                                         )}
//                                     </Paper>
//                                 </Grid>

//                                 {/* Popular Skills */}
//                                 <Grid item xs={12}>
//                                     <Paper elevation={2} sx={{
//                                         p: isMobile ? 1.5 : 3,
//                                         borderRadius: 2,
//                                         width: '100%'
//                                     }}>
//                                         <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{
//                                             mb: 2,
//                                             fontWeight: 'bold',
//                                             color: colors.textPrimary,
//                                             display: 'flex',
//                                             alignItems: 'center',
//                                             justifyContent: 'center'
//                                         }}>
//                                             <StarIcon sx={{ mr: 1, color: colors.primary }} />
//                                             Popular Skills
//                                         </Typography>
//                                         {stats.popularSkills.length === 0 ? (
//                                             <Box sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                                 alignItems: 'center',
//                                                 height: getChartHeight()
//                                             }}>
//                                                 <Typography color="textSecondary">No data available</Typography>
//                                             </Box>
//                                         ) : (
//                                             <ResponsiveContainer width="100%" height={getChartHeight()}>
//                                                 <BarChart
//                                                     data={stats.popularSkills}
//                                                     layout="vertical"
//                                                     margin={{ 
//                                                         top: 5, 
//                                                         right: isMobile ? 10 : 30, 
//                                                         left: isMobile ? 50 : 69, 
//                                                         bottom: 5 
//                                                     }}
//                                                 >
//                                                     <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//                                                     <XAxis type="number" stroke={colors.textSecondary} />
//                                                     <YAxis 
//                                                         dataKey="name" 
//                                                         type="category" 
//                                                         stroke={colors.textSecondary} 
//                                                         width={isMobile ? 80 : 100}
//                                                     />
//                                                     <Tooltip
//                                                         contentStyle={{
//                                                             backgroundColor: colors.cardBackground,
//                                                             borderColor: colors.primary,
//                                                             borderRadius: 4
//                                                         }}
//                                                     />
//                                                     <Legend />
//                                                     <Bar
//                                                         dataKey="count"
//                                                         fill={colors.secondary}
//                                                         radius={[0, 4, 4, 0]}
//                                                         name="Users with Skill"
//                                                     />
//                                                 </BarChart>
//                                             </ResponsiveContainer>
//                                         )}
//                                     </Paper>
//                                 </Grid>
//                             </Grid>
//                         )}
//                     </Paper>
//                 </Container>
//             </Box>
//             <Footer fullWidth={false} style={{ padding: "0" }} />
//         </Box>
//     );
// };

// export default AdminProfile;