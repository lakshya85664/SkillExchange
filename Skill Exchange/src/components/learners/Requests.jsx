// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//     Container,
//     Typography,
//     Box,
//     Card,
//     List,
//     ListItem,
//     ListItemText,
//     Chip,
//     ButtonGroup,
//     Button,
//     CircularProgress,
//     Alert,
//     Divider,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Paper,
//     useTheme,
//     useMediaQuery
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { motion } from 'framer-motion';

// const RootPaper = styled(Paper)(({ theme }) => ({
//     background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
//     minHeight: '100vh',
//     padding: theme.spacing(4)
// }));

// const HeaderTypography = styled(Typography)(({ theme }) => ({
//     marginBottom: theme.spacing(4),
//     textAlign: 'center',
//     color: theme.palette.primary.main,
//     fontWeight: 700,
//     textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
// }));

// const StyledCard = styled(Card)(({ theme }) => ({
//     borderRadius: '12px',
//     boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
//     marginBottom: theme.spacing(4),
//     overflow: 'hidden',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     '&:hover': {
//         transform: 'translateY(-5px)',
//         boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
//     }
// }));

// const CardHeaderBox = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(2),
//     color: 'white',
//     background: 'linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)'
// }));

// const ReceivedCardHeaderBox = styled(CardHeaderBox)({
//     background: 'linear-gradient(45deg, #4caf50 0%, #8bc34a 100%)'
// });

// const StyledListItem = styled(ListItem)(({ theme }) => ({
//     padding: theme.spacing(2),
//     transition: 'background-color 0.2s',
//     '&:hover': {
//         backgroundColor: 'rgba(0,0,0,0.03)'
//     }
// }));

// const SkillButton = styled(Button)(({ theme }) => ({
//     marginLeft: theme.spacing(2),
//     fontWeight: 600,
//     textTransform: 'none',
//     borderRadius: '8px'
// }));

// const StatusChip = styled(Chip)(({ theme }) => ({
//     fontWeight: 600,
//     borderRadius: '8px',
//     marginLeft: theme.spacing(2)
// }));

// const EmptyStateBox = styled(Box)(({ theme }) => ({
//     padding: theme.spacing(4),
//     textAlign: 'center',
//     color: theme.palette.text.secondary
// }));

// const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
//     fontWeight: 700,
//     color: theme.palette.text.primary,
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     paddingBottom: theme.spacing(2)
// }));

// const SkillListItem = styled(ListItem)(({ theme }) => ({
//     borderBottom: `1px solid ${theme.palette.divider}`,
//     '&:last-child': {
//         borderBottom: 'none'
//     }
// }));

// const YourSkillChip = styled(Chip)(({ theme }) => ({
//     marginLeft: theme.spacing(2),
//     fontWeight: 600
// }));

// const Requests = () => {
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
//     const [sentRequests, setSentRequests] = useState([]);
//     const [receivedRequests, setReceivedRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [viewingSkills, setViewingSkills] = useState(null);
//     const [userSkills, setUserSkills] = useState([]);
//     const [skillsDialogOpen, setSkillsDialogOpen] = useState(false);
//     const [skillsLoading, setSkillsLoading] = useState(false);
//     const [connectDialogOpen, setConnectDialogOpen] = useState(false);
//     const [selectedSkill, setSelectedSkill] = useState(null);
//     const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//     const [selectedRequest, setSelectedRequest] = useState(null);
//     const [rejectionReason, setRejectionReason] = useState('');
    
//     // Get current user ID properly
//     const userData = localStorage.getItem('user');
//     const currentUser = userData ? JSON.parse(userData) : null;
//     const currentUserId = currentUser?._id?.toString();

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     const fetchRequests = async () => {
//         try {
//             setLoading(true);
//             setError(null);

//             const [sentRes, receivedRes] = await Promise.all([
//                 axios.get(`/request/sender/${currentUserId}`),
//                 axios.get(`/request/receiver/${currentUserId}`)
//             ]);

//             setSentRequests(sentRes.data.data || []);
//             setReceivedRequests(receivedRes.data.data || []);
//         } catch (error) {
//             console.error("Error fetching requests:", error);
//             setError("Failed to fetch requests. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleStatusUpdate = async (requestId, newStatus, reason = '') => {
//         try {
//             await axios.put(`/request/${requestId}/status`, { 
//                 status: newStatus,
//                 rejectionReason: reason 
//             });
    
//             if (newStatus === 'Accepted') {
//                 try {
//                     const response = await axios.post('/messages/check-match', { requestId });
                    
//                     if (response.data.data) {
//                         toast.success('🎉 Congratulations! A new skill exchange match has been created!');
//                     } else {
//                         toast.info('Request accepted! When the other user also requests one of your skills, a match will be created.');
//                     }
                    
//                     await fetchRequests();
//                 } catch (matchError) {
//                     console.error('Error checking for match:', matchError);
//                     toast.error('Request was accepted but there was an error checking for matches.');
//                     await fetchRequests();
//                 }
//             } else {
//                 await fetchRequests();
//             }
//         } catch (error) {
//             console.error("Error updating request status:", error);
//             toast.error("Failed to update request status.");
//             setError("Failed to update request status.");
//         }
//     };

//     const handleViewSkills = async (userId, userName) => {
//         try {
//             setSkillsLoading(true);
//             setViewingSkills(userName);
            
//             // Fetch both the viewed user's skills and current user's skills
//             const [viewedSkillsRes, currentUserSkillsRes] = await Promise.all([
//                 axios.get(`/skill/getskillsbyuserid/${userId}`),
//                 currentUserId ? axios.get(`/skill/getskillsbyuserid/${currentUserId}`) : Promise.resolve({data: {data: []}})
//             ]);

//             const viewedSkills = viewedSkillsRes.data?.data || [];
//             const currentUserSkills = currentUserSkillsRes.data?.data || [];

//             // Create a Set of skill names that belong to current user
//             const currentUserSkillNames = new Set(
//                 currentUserSkills.map(skill => skill.name?.toLowerCase())
//             );

//             // Mark skills that belong to current user
//             const processedSkills = viewedSkills.map(skill => ({
//                 ...skill,
//                 isCurrentUserSkill: currentUserSkillNames.has(skill.name?.toLowerCase())
//             }));

//             setUserSkills(processedSkills);
//             setSkillsDialogOpen(true);
//         } catch (error) {
//             console.error("Error fetching user skills:", error);
//             setError("Failed to fetch user skills.");
//         } finally {
//             setSkillsLoading(false);
//         }
//     };

//     const handleCloseSkillsDialog = () => {
//         setSkillsDialogOpen(false);
//         setUserSkills([]);
//         setViewingSkills(null);
//     };

//     const handleConnectClick = (skill) => {
//         setSelectedSkill(skill);
//         setConnectDialogOpen(true);
//     };

//     const handleCloseConnectDialog = () => {
//         setConnectDialogOpen(false);
//         setSelectedSkill(null);
//     };

//     const handleOpenCancelDialog = (request) => {
//         setSelectedRequest(request);
//         setCancelDialogOpen(true);
//     };

//     const handleCloseCancelDialog = () => {
//         setCancelDialogOpen(false);
//         setSelectedRequest(null);
//         setRejectionReason('');
//     };

//     const handleConfirmCancel = () => {
//         if (!rejectionReason.trim()) {
//             toast.warning("Please provide a reason for cancellation");
//             return;
//         }
//         handleStatusUpdate(selectedRequest._id, 'Rejected', rejectionReason);
//         handleCloseCancelDialog();
//     };

//     const handleConfirmRequest = async () => {
//         try {
//             if (!currentUser || !currentUserId) {
//                 toast.error("Invalid user data. Please login again.");
//                 return;
//             }

//             if (!viewingSkills || !selectedSkill) {
//                 toast.error("Invalid request data");
//                 return;
//             }

//             const response = await axios.post('/request/send', {
//                 senderId: currentUserId,
//                 receiverId: selectedSkill.userId,
//                 skillName: selectedSkill.name
//             });

//             toast.success(`📩 Request sent to ${viewingSkills} for learning ${selectedSkill.name}`);
//             setConnectDialogOpen(false);
//             setSelectedSkill(null);
//             fetchRequests();
//         } catch (error) {
//             console.error("Error sending request:", error);
//             toast.error("Failed to send request. Please try again.");
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'Accepted': return 'success';
//             case 'Rejected': return 'error';
//             default: return 'warning';
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0 }
//     };

//     return (
//         <RootPaper elevation={0}>
//             <Container maxWidth="md">
//                 <ToastContainer
//                     position="top-right"
//                     autoClose={5000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="colored"
//                 />
                
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <HeaderTypography variant="h3" gutterBottom>
//                         My Requests
//                     </HeaderTypography>
//                 </motion.div>

//                 {loading ? (
//                     <Box display="flex" justifyContent="center" my={4}>
//                         <CircularProgress size={60} thickness={4} />
//                     </Box>
//                 ) : error ? (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                     >
//                         <Alert severity="error" sx={{ mb: 3 }}>
//                             {error}
//                         </Alert>
//                     </motion.div>
//                 ) : (
//                     <>
//                         {/* Sent Requests */}
//                         <motion.div
//                             initial="hidden"
//                             animate="visible"
//                             variants={itemVariants}
//                             transition={{ duration: 0.4 }}
//                         >
//                             <StyledCard>
//                                 <CardHeaderBox>
//                                     <Typography variant="h5">Sent Requests</Typography>
//                                 </CardHeaderBox>
//                                 <Box p={isMobile ? 1 : 2}>
//                                     {sentRequests.length > 0 ? (
//                                         <List>
//                                             {sentRequests.map((req, index) => (
//                                                 <motion.div
//                                                     key={req._id}
//                                                     variants={itemVariants}
//                                                     transition={{ delay: index * 0.05 }}
//                                                 >
//                                                     <StyledListItem>
//                                                         <ListItemText
//                                                             primary={
//                                                                 <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
//                                                                     <Typography component="span" variant="subtitle1" fontWeight="600">
//                                                                         To: {req.receiverName}
//                                                                     </Typography>
//                                                                     <SkillButton
//                                                                         variant="outlined"
//                                                                         size="small"
//                                                                         onClick={() => handleViewSkills(req.receiverId, req.receiverName)}
//                                                                     >
//                                                                         View Skills
//                                                                     </SkillButton>
//                                                                 </Box>
//                                                             }
//                                                             secondary={
//                                                                 <>
//                                                                     <Typography component="span" display="block" variant="body2">
//                                                                         Skill: <strong>{req.skillName}</strong>
//                                                                     </Typography>
//                                                                     <Typography component="span" variant="body2" color="textSecondary">
//                                                                         Sent: {new Date(req.createdAt).toLocaleString()}
//                                                                     </Typography>
//                                                                     {req.rejectionReason && req.status === 'Rejected' && (
//                                                                         <Typography component="span" variant="body2" color="error.main" display="block">
//                                                                             Reason: {req.rejectionReason}
//                                                                         </Typography>
//                                                                     )}
//                                                                 </>
//                                                             }
//                                                         />
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
//                                                             <StatusChip
//                                                                 label={req.status}
//                                                                 color={getStatusColor(req.status)}
//                                                             />
//                                                             {(req.status === 'Pending' || req.status === 'Accepted') && (
//                                                                 <Button
//                                                                     variant="outlined"
//                                                                     size="small"
//                                                                     color="error"
//                                                                     sx={{ ml: 2 }}
//                                                                     onClick={() => handleOpenCancelDialog(req)}
//                                                                 >
//                                                                     Cancel
//                                                                 </Button>
//                                                             )}
//                                                         </Box>
//                                                     </StyledListItem>
//                                                     {index < sentRequests.length - 1 && <Divider />}
//                                                 </motion.div>
//                                             ))}
//                                         </List>
//                                     ) : (
//                                         <EmptyStateBox>
//                                             <Typography variant="body1">
//                                                 You haven't sent any requests yet.
//                                             </Typography>
//                                             <Typography variant="body2" color="textSecondary" mt={1}>
//                                                 View other users' profiles to send skill exchange requests.
//                                             </Typography>
//                                         </EmptyStateBox>
//                                     )}
//                                 </Box>
//                             </StyledCard>
//                         </motion.div>

//                         {/* Received Requests */}
//                         <motion.div
//                             initial="hidden"
//                             animate="visible"
//                             variants={itemVariants}
//                             transition={{ duration: 0.4, delay: 0.1 }}
//                         >
//                             <StyledCard>
//                                 <ReceivedCardHeaderBox>
//                                     <Typography variant="h5">Received Requests</Typography>
//                                 </ReceivedCardHeaderBox>
//                                 <Box p={isMobile ? 1 : 2}>
//                                     {receivedRequests.length > 0 ? (
//                                         <List>
//                                             {receivedRequests.map((req, index) => (
//                                                 <motion.div
//                                                     key={req._id}
//                                                     variants={itemVariants}
//                                                     transition={{ delay: index * 0.05 }}
//                                                 >
//                                                     <StyledListItem>
//                                                         <ListItemText
//                                                             primary={
//                                                                 <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
//                                                                     <Typography component="span" variant="subtitle1" fontWeight="600">
//                                                                         From: {req.senderName}
//                                                                     </Typography>
//                                                                     <SkillButton
//                                                                         variant="outlined"
//                                                                         size="small"
//                                                                         onClick={() => handleViewSkills(req.senderId, req.senderName)}
//                                                                     >
//                                                                         View Skills
//                                                                     </SkillButton>
//                                                                 </Box>
//                                                             }
//                                                             secondary={
//                                                                 <>
//                                                                     <Typography component="span" display="block" variant="body2">
//                                                                         Skill: <strong>{req.skillName}</strong>
//                                                                     </Typography>
//                                                                     <Typography component="span" variant="body2" color="textSecondary">
//                                                                         Received: {new Date(req.createdAt).toLocaleString()}
//                                                                     </Typography>
//                                                                     {req.rejectionReason && req.status === 'Rejected' && (
//                                                                         <Typography component="span" variant="body2" color="error.main" display="block">
//                                                                             Reason: {req.rejectionReason}
//                                                                         </Typography>
//                                                                     )}
//                                                                 </>
//                                                             }
//                                                         />
//                                                         {req.status === 'Pending' ? (
//                                                             <ButtonGroup variant="contained" size={isMobile ? "small" : "medium"}>
//                                                                 <Button
//                                                                     color="success"
//                                                                     onClick={() => handleStatusUpdate(req._id, 'Accepted')}
//                                                                 >
//                                                                     Accept
//                                                                 </Button>
//                                                                 <Button
//                                                                     color="error"
//                                                                     onClick={() => handleOpenCancelDialog(req)}
//                                                                 >
//                                                                     Reject
//                                                                 </Button>
//                                                             </ButtonGroup>
//                                                         ) : (
//                                                             <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
//                                                                 <StatusChip
//                                                                     label={req.status}
//                                                                     color={getStatusColor(req.status)}
//                                                                 />
//                                                                 {req.status === 'Accepted' && (
//                                                                     <Button
//                                                                         variant="outlined"
//                                                                         size="small"
//                                                                         color="error"
//                                                                         sx={{ ml: 2 }}
//                                                                         onClick={() => handleOpenCancelDialog(req)}
//                                                                     >
//                                                                         Cancel
//                                                                     </Button>
//                                                                 )}
//                                                             </Box>
//                                                         )}
//                                                     </StyledListItem>
//                                                     {index < receivedRequests.length - 1 && <Divider />}
//                                                 </motion.div>
//                                             ))}
//                                         </List>
//                                     ) : (
//                                         <EmptyStateBox>
//                                             <Typography variant="body1">
//                                                 You haven't received any requests yet.
//                                             </Typography>
//                                             <Typography variant="body2" color="textSecondary" mt={1}>
//                                                 As you add more skills to your profile, others can request to learn from you.
//                                             </Typography>
//                                         </EmptyStateBox>
//                                     )}
//                                 </Box>
//                             </StyledCard>
//                         </motion.div>

//                         {/* Skills Dialog */}
//                         <Dialog 
//                             open={skillsDialogOpen} 
//                             onClose={handleCloseSkillsDialog} 
//                             maxWidth="sm" 
//                             fullWidth
//                             PaperProps={{
//                                 sx: {
//                                     borderRadius: '16px',
//                                     background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)'
//                                 }
//                             }}
//                         >
//                             <DialogTitleStyled>
//                                 {viewingSkills}'s Skills
//                             </DialogTitleStyled>
//                             <DialogContent>
//                                 {skillsLoading ? (
//                                     <Box display="flex" justifyContent="center" my={4}>
//                                         <CircularProgress size={60} />
//                                     </Box>
//                                 ) : userSkills.length > 0 ? (
//                                     <List>
//                                         {userSkills.map((skill, index) => {
//                                             const isCurrentUserSkill = skill.isCurrentUserSkill;
//                                             return (
//                                                 <SkillListItem 
//                                                     key={index}
//                                                     secondaryAction={
//                                                         !isCurrentUserSkill && (
//                                                             <Button
//                                                                 variant="contained"
//                                                                 color="primary"
//                                                                 size="small"
//                                                                 onClick={() => handleConnectClick(skill)}
//                                                             >
//                                                                 Request
//                                                             </Button>
//                                                         )
//                                                     }
//                                                 >
//                                                     <ListItemText
//                                                         primary={
//                                                             <Typography fontWeight="600">
//                                                                 {skill.name}
//                                                             </Typography>
//                                                         }
//                                                         secondary={
//                                                             isCurrentUserSkill ? "Your Skill" : null
//                                                         }
//                                                     />
//                                                     {isCurrentUserSkill && (
//                                                         <YourSkillChip 
//                                                             label="Your Skill" 
//                                                             color="success" 
//                                                             size="small"
//                                                         />
//                                                     )}
//                                                 </SkillListItem>
//                                             );
//                                         })}
//                                     </List>
//                                 ) : (
//                                     <EmptyStateBox>
//                                         <Typography variant="body1">
//                                             No skills found for this user
//                                         </Typography>
//                                     </EmptyStateBox>
//                                 )}
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button 
//                                     onClick={handleCloseSkillsDialog}
//                                     sx={{
//                                         fontWeight: 600,
//                                         borderRadius: '8px',
//                                         padding: '8px 16px'
//                                     }}
//                                 >
//                                     Close
//                                 </Button>
//                             </DialogActions>
//                         </Dialog>

//                         {/* Connect Confirmation Dialog */}
//                         <Dialog
//                             open={connectDialogOpen}
//                             onClose={handleCloseConnectDialog}
//                             PaperProps={{
//                                 sx: {
//                                     borderRadius: "16px",
//                                     padding: "16px",
//                                     background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)'
//                                 }
//                             }}
//                         >
//                             <DialogTitleStyled>
//                                 Confirm Connection Request
//                             </DialogTitleStyled>
//                             <DialogContent>
//                                 <Typography sx={{ mt: 2 }}>
//                                     Do you want to send a connection request to <strong>{viewingSkills} </strong>
//                                     for learning <strong>{selectedSkill?.name}</strong>?
//                                 </Typography>
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button
//                                     onClick={handleCloseConnectDialog}
//                                     sx={{
//                                         color: theme.palette.text.secondary,
//                                         fontWeight: "600",
//                                         borderRadius: '8px',
//                                         padding: '8px 16px',
//                                         "&:hover": {
//                                             backgroundColor: "rgba(113, 128, 150, 0.1)"
//                                         }
//                                     }}
//                                 >
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     onClick={handleConfirmRequest}
//                                     variant="contained"
//                                     color="primary"
//                                     sx={{
//                                         fontWeight: "600",
//                                         borderRadius: '8px',
//                                         padding: '8px 16px',
//                                         boxShadow: 'none',
//                                         "&:hover": {
//                                             boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
//                                         }
//                                     }}
//                                 >
//                                     Send Request
//                                 </Button>
//                             </DialogActions>
//                         </Dialog>

//                         {/* Cancel/Reject Request Dialog */}
//                         <Dialog
//                             open={cancelDialogOpen}
//                             onClose={handleCloseCancelDialog}
//                             PaperProps={{
//                                 sx: {
//                                     borderRadius: "16px",
//                                     padding: "16px",
//                                     background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)'
//                                 }
//                             }}
//                         >
//                             <DialogTitleStyled>
//                                 {selectedRequest?.status === 'Accepted' ? 'Cancel Request' : 'Reject Request'}
//                             </DialogTitleStyled>
//                             <DialogContent>
//                                 <Typography sx={{ mb: 2 }}>
//                                     Are you sure you want to {selectedRequest?.status === 'Accepted' ? 'cancel' : 'reject'} this request?
//                                 </Typography>
//                                 <TextField
//                                     fullWidth
//                                     multiline
//                                     rows={3}
//                                     variant="outlined"
//                                     label="Reason for cancellation/rejection"
//                                     value={rejectionReason}
//                                     onChange={(e) => setRejectionReason(e.target.value)}
//                                     sx={{ mt: 2 }}
//                                 />
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button
//                                     onClick={handleCloseCancelDialog}
//                                     sx={{
//                                         color: theme.palette.text.secondary,
//                                         fontWeight: "600",
//                                         borderRadius: '8px',
//                                         padding: '8px 16px',
//                                         "&:hover": {
//                                             backgroundColor: "rgba(113, 128, 150, 0.1)"
//                                         }
//                                     }}
//                                 >
//                                     Back
//                                 </Button>
//                                 <Button
//                                     onClick={handleConfirmCancel}
//                                     variant="contained"
//                                     color="error"
//                                     sx={{
//                                         fontWeight: "600",
//                                         borderRadius: '8px',
//                                         padding: '8px 16px',
//                                         boxShadow: 'none',
//                                         "&:hover": {
//                                             boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
//                                         }
//                                     }}
//                                 >
//                                     Confirm
//                                 </Button>
//                             </DialogActions>
//                         </Dialog>
//                     </>
//                 )}
//             </Container>
//         </RootPaper>
//     );
// };

// export default Requests;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Container,
    Typography,
    Box,
    Card,
    List,
    ListItem,
    ListItemText,
    Chip,
    ButtonGroup,
    Button,
    CircularProgress,
    Alert,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Paper,
    Tabs,
    Tab,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Footer from '../common/Footer';

const RootPaper = styled(Paper)(({ theme }) => ({
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
    minHeight: '100vh',
    padding: theme.spacing(4)
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontWeight: 700,
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
}));

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    marginBottom: theme.spacing(4),
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
    }
}));

const CardHeaderBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    color: 'white',
    background: 'linear-gradient(45deg, #3f51b5 0%, #2196f3 100%)'
}));

const ReceivedCardHeaderBox = styled(CardHeaderBox)({
    background: 'linear-gradient(45deg, #4caf50 0%, #8bc34a 100%)'
});

const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(2),
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.03)'
    }
}));

const SkillButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: '8px'
}));

const StatusChip = styled(Chip)(({ theme }) => ({
    fontWeight: 600,
    borderRadius: '8px',
    marginLeft: theme.spacing(2)
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(2)
}));

const SkillListItem = styled(ListItem)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none'
    }
}));

const YourSkillChip = styled(Chip)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    fontWeight: 600
}));

const Requests = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [sentRequests, setSentRequests] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [viewingSkills, setViewingSkills] = useState(null);
    const [userSkills, setUserSkills] = useState([]);
    const [skillsDialogOpen, setSkillsDialogOpen] = useState(false);
    const [skillsLoading, setSkillsLoading] = useState(false);
    const [connectDialogOpen, setConnectDialogOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    
    // Get current user ID properly
    const userData = localStorage.getItem('user');
    const currentUser = userData ? JSON.parse(userData) : null;
    const currentUserId = currentUser?._id?.toString();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            setError(null);

            const [sentRes, receivedRes] = await Promise.all([
                axios.get(`/request/sender/${currentUserId}`),
                axios.get(`/request/receiver/${currentUserId}`)
            ]);

            setSentRequests(sentRes.data.data || []);
            setReceivedRequests(receivedRes.data.data || []);
        } catch (error) {
            console.error("Error fetching requests:", error);
            setError("Failed to fetch requests. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (requestId, newStatus, reason = '') => {
        try {
            await axios.put(`/request/${requestId}/status`, { 
                status: newStatus,
                rejectionReason: reason 
            });
    
            if (newStatus === 'Accepted') {
                try {
                    const response = await axios.post('/messages/check-match', { requestId });
                    
                    if (response.data.data) {
                        toast.success('🎉 Congratulations! A new skill exchange match has been created!');
                    } else {
                        toast.info('Request accepted! When the other user also requests one of your skills, a match will be created.');
                    }
                    
                    await fetchRequests();
                } catch (matchError) {
                    console.error('Error checking for match:', matchError);
                    toast.error('Request was accepted but there was an error checking for matches.');
                    await fetchRequests();
                }
            } else {
                await fetchRequests();
            }
        } catch (error) {
            console.error("Error updating request status:", error);
            toast.error("Failed to update request status.");
            setError("Failed to update request status.");
        }
    };

    const handleViewSkills = async (userId, userName) => {
        try {
            setSkillsLoading(true);
            setViewingSkills(userName);
            
            // Fetch both the viewed user's skills and current user's skills
            const [viewedSkillsRes, currentUserSkillsRes] = await Promise.all([
                axios.get(`/skill/getskillsbyuserid/${userId}`),
                currentUserId ? axios.get(`/skill/getskillsbyuserid/${currentUserId}`) : Promise.resolve({data: {data: []}})
            ]);

            const viewedSkills = viewedSkillsRes.data?.data || [];
            const currentUserSkills = currentUserSkillsRes.data?.data || [];

            // Create a Set of skill names that belong to current user
            const currentUserSkillNames = new Set(
                currentUserSkills.map(skill => skill.name?.toLowerCase())
            );

            // Mark skills that belong to current user
            const processedSkills = viewedSkills.map(skill => ({
                ...skill,
                isCurrentUserSkill: currentUserSkillNames.has(skill.name?.toLowerCase())
            }));

            setUserSkills(processedSkills);
            setSkillsDialogOpen(true);
        } catch (error) {
            console.error("Error fetching user skills:", error);
            setError("Failed to fetch user skills.");
        } finally {
            setSkillsLoading(false);
        }
    };

    const handleCloseSkillsDialog = () => {
        setSkillsDialogOpen(false);
        setUserSkills([]);
        setViewingSkills(null);
    };

    const handleConnectClick = (skill) => {
        setSelectedSkill(skill);
        setConnectDialogOpen(true);
    };

    const handleCloseConnectDialog = () => {
        setConnectDialogOpen(false);
        setSelectedSkill(null);
    };

    const handleOpenCancelDialog = (request) => {
        setSelectedRequest(request);
        setCancelDialogOpen(true);
    };

    const handleCloseCancelDialog = () => {
        setCancelDialogOpen(false);
        setSelectedRequest(null);
        setRejectionReason('');
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleConfirmCancel = () => {
        if (!rejectionReason.trim()) {
            toast.warning("Please provide a reason for cancellation");
            return;
        }
        handleStatusUpdate(selectedRequest._id, 'Rejected', rejectionReason);
        handleCloseCancelDialog();
    };

    const handleConfirmRequest = async () => {
        try {
            if (!currentUser || !currentUserId) {
                toast.error("Invalid user data. Please login again.");
                return;
            }

            if (!viewingSkills || !selectedSkill) {
                toast.error("Invalid request data");
                return;
            }

            const response = await axios.post('/request/send', {
                senderId: currentUserId,
                receiverId: selectedSkill.userId,
                skillName: selectedSkill.name
            });

            toast.success(`📩 Request sent to ${viewingSkills} for learning ${selectedSkill.name}`);
            setConnectDialogOpen(false);
            setSelectedSkill(null);
            fetchRequests();
        } catch (error) {
            console.error("Error sending request:", error);
            toast.error("Failed to send request. Please try again.");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Accepted': return 'success';
            case 'Rejected': return 'error';
            default: return 'warning';
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div>
        <RootPaper elevation={0}>
            <Container maxWidth="md">
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
                
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <HeaderTypography variant="h3" gutterBottom>
                        My Requests
                    </HeaderTypography>
                </motion.div>

                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Sent Requests" />
                        <Tab label="Received Requests" />
                    </Tabs>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress size={60} thickness={4} />
                    </Box>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    </motion.div>
                ) : (
                    <>
                        {/* Sent Requests Tab */}
                        {activeTab === 0 ? (
                            <StyledCard>
                                <CardHeaderBox>
                                    <Typography variant="h5">Sent Requests</Typography>
                                </CardHeaderBox>
                                <Box p={isMobile ? 1 : 2}>
                                    {sentRequests.length > 0 ? (
                                        <List>
                                            {sentRequests.map((req, index) => (
                                                <motion.div
                                                    key={req._id}
                                                    variants={itemVariants}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <StyledListItem>
                                                        <ListItemText
                                                            primary={
                                                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                                    <Typography component="span" variant="subtitle1" fontWeight="600">
                                                                        To: {req.receiverName}
                                                                    </Typography>
                                                                    <SkillButton
                                                                        variant="outlined"
                                                                        size="small"
                                                                        onClick={() => handleViewSkills(req.receiverId, req.receiverName)}
                                                                    >
                                                                        View Skills
                                                                    </SkillButton>
                                                                </Box>
                                                            }
                                                            secondary={
                                                                <>
                                                                    <Typography component="span" display="block" variant="body2">
                                                                        Skill: <strong>{req.skillName}</strong>
                                                                    </Typography>
                                                                    <Typography component="span" variant="body2" color="textSecondary">
                                                                        Sent: {new Date(req.createdAt).toLocaleString()}
                                                                    </Typography>
                                                                    {req.rejectionReason && req.status === 'Rejected' && (
                                                                        <Typography component="span" variant="body2" color="error.main" display="block">
                                                                            Reason: {req.rejectionReason}
                                                                        </Typography>
                                                                    )}
                                                                </>
                                                            }
                                                        />
                                                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                            <StatusChip
                                                                label={req.status}
                                                                color={getStatusColor(req.status)}
                                                            />
                                                            {(req.status === 'Pending' || req.status === 'Accepted') && (
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    color="error"
                                                                    sx={{ ml: 2 }}
                                                                    onClick={() => handleOpenCancelDialog(req)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            )}
                                                        </Box>
                                                    </StyledListItem>
                                                    {index < sentRequests.length - 1 && <Divider />}
                                                </motion.div>
                                            ))}
                                        </List>
                                    ) : (
                                        <EmptyStateBox>
                                            <Typography variant="body1">
                                                You haven't sent any requests yet.
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" mt={1}>
                                                View other users' profiles to send skill exchange requests.
                                            </Typography>
                                        </EmptyStateBox>
                                    )}
                                </Box>
                            </StyledCard>
                        ) : (
                            /* Received Requests Tab */
                            <StyledCard>
                                <ReceivedCardHeaderBox>
                                    <Typography variant="h5">Received Requests</Typography>
                                </ReceivedCardHeaderBox>
                                <Box p={isMobile ? 1 : 2}>
                                    {receivedRequests.length > 0 ? (
                                        <List>
                                            {receivedRequests.map((req, index) => (
                                                <motion.div
                                                    key={req._id}
                                                    variants={itemVariants}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <StyledListItem>
                                                        <ListItemText
                                                            primary={
                                                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                                    <Typography component="span" variant="subtitle1" fontWeight="600">
                                                                        From: {req.senderName}
                                                                    </Typography>
                                                                    <SkillButton
                                                                        variant="outlined"
                                                                        size="small"
                                                                        onClick={() => handleViewSkills(req.senderId, req.senderName)}
                                                                    >
                                                                        View Skills
                                                                    </SkillButton>
                                                                </Box>
                                                            }
                                                            secondary={
                                                                <>
                                                                    <Typography component="span" display="block" variant="body2">
                                                                        Skill: <strong>{req.skillName}</strong>
                                                                    </Typography>
                                                                    <Typography component="span" variant="body2" color="textSecondary">
                                                                        Received: {new Date(req.createdAt).toLocaleString()}
                                                                    </Typography>
                                                                    {req.rejectionReason && req.status === 'Rejected' && (
                                                                        <Typography component="span" variant="body2" color="error.main" display="block">
                                                                            Reason: {req.rejectionReason}
                                                                        </Typography>
                                                                    )}
                                                                </>
                                                            }
                                                        />
                                                        {req.status === 'Pending' ? (
                                                            <ButtonGroup variant="contained" size={isMobile ? "small" : "medium"}>
                                                                <Button
                                                                    color="success"
                                                                    onClick={() => handleStatusUpdate(req._id, 'Accepted')}
                                                                >
                                                                    Accept
                                                                </Button>
                                                                <Button
                                                                    color="error"
                                                                    onClick={() => handleOpenCancelDialog(req)}
                                                                >
                                                                    Reject
                                                                </Button>
                                                            </ButtonGroup>
                                                        ) : (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                                <StatusChip
                                                                    label={req.status}
                                                                    color={getStatusColor(req.status)}
                                                                />
                                                                {req.status === 'Accepted' && (
                                                                    <Button
                                                                        variant="outlined"
                                                                        size="small"
                                                                        color="error"
                                                                        sx={{ ml: 2 }}
                                                                        onClick={() => handleOpenCancelDialog(req)}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                        )}
                                                    </StyledListItem>
                                                    {index < receivedRequests.length - 1 && <Divider />}
                                                </motion.div>
                                            ))}
                                        </List>
                                    ) : (
                                        <EmptyStateBox>
                                            <Typography variant="body1">
                                                You haven't received any requests yet.
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" mt={1}>
                                                As you add more skills to your profile, others can request to learn from you.
                                            </Typography>
                                        </EmptyStateBox>
                                    )}
                                </Box>
                            </StyledCard>
                        )}
                    </>
                )}

                {/* Skills Dialog */}
                <Dialog 
                    open={skillsDialogOpen} 
                    onClose={handleCloseSkillsDialog} 
                    maxWidth="sm" 
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: '16px',
                            background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)'
                        }
                    }}
                >
                    <DialogTitleStyled>
                        {viewingSkills}'s Skills
                    </DialogTitleStyled>
                    <DialogContent>
                        {skillsLoading ? (
                            <Box display="flex" justifyContent="center" my={4}>
                                <CircularProgress size={60} />
                            </Box>
                        ) : userSkills.length > 0 ? (
                            <List>
                                {userSkills.map((skill, index) => {
                                    const isCurrentUserSkill = skill.isCurrentUserSkill;
                                    return (
                                        <SkillListItem 
                                            key={index}
                                            secondaryAction={
                                                !isCurrentUserSkill && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => handleConnectClick(skill)}
                                                    >
                                                        Request
                                                    </Button>
                                                )
                                            }
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography fontWeight="600">
                                                        {skill.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    isCurrentUserSkill ? "Your Skill" : null
                                                }
                                            />
                                            {isCurrentUserSkill && (
                                                <YourSkillChip 
                                                    label="Your Skill" 
                                                    color="success" 
                                                    size="small"
                                                />
                                            )}
                                        </SkillListItem>
                                    );
                                })}
                            </List>
                        ) : (
                            <EmptyStateBox>
                                <Typography variant="body1">
                                    No skills found for this user
                                </Typography>
                            </EmptyStateBox>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={handleCloseSkillsDialog}
                            sx={{
                                fontWeight: 600,
                                borderRadius: '8px',
                                padding: '8px 16px'
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Connect Confirmation Dialog */}
                <Dialog
                    open={connectDialogOpen}
                    onClose={handleCloseConnectDialog}
                    PaperProps={{
                        sx: {
                            borderRadius: "16px",
                            padding: "16px",
                            background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)'
                        }
                    }}
                >
                    <DialogTitleStyled>
                        Confirm Connection Request
                    </DialogTitleStyled>
                    <DialogContent>
                        <Typography sx={{ mt: 2 }}>
                            Do you want to send a connection request to <strong>{viewingSkills} </strong>
                            for learning <strong>{selectedSkill?.name}</strong>?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseConnectDialog}
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: "600",
                                borderRadius: '8px',
                                padding: '8px 16px',
                                "&:hover": {
                                    backgroundColor: "rgba(113, 128, 150, 0.1)"
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmRequest}
                            variant="contained"
                            color="primary"
                            sx={{
                                fontWeight: "600",
                                borderRadius: '8px',
                                padding: '8px 16px',
                                boxShadow: 'none',
                                "&:hover": {
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }
                            }}
                        >
                            Send Request
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Cancel/Reject Request Dialog */}
                <Dialog
                    open={cancelDialogOpen}
                    onClose={handleCloseCancelDialog}
                    PaperProps={{
                        sx: {
                            borderRadius: "16px",
                            padding: "16px",
                            background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)'
                        }
                    }}
                >
                    <DialogTitleStyled>
                        {selectedRequest?.status === 'Accepted' ? 'Cancel Request' : 'Reject Request'}
                    </DialogTitleStyled>
                    <DialogContent>
                        <Typography sx={{ mb: 2 }}>
                            Are you sure you want to {selectedRequest?.status === 'Accepted' ? 'cancel' : 'reject'} this request?
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            label="Reason for cancellation/rejection"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            sx={{ mt: 2 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseCancelDialog}
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: "600",
                                borderRadius: '8px',
                                padding: '8px 16px',
                                "&:hover": {
                                    backgroundColor: "rgba(113, 128, 150, 0.1)"
                                }
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleConfirmCancel}
                            variant="contained"
                            color="error"
                            sx={{
                                fontWeight: "600",
                                borderRadius: '8px',
                                padding: '8px 16px',
                                boxShadow: 'none',
                                "&:hover": {
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </Container>
            
        </RootPaper>
        <Footer fullWidth={false} />
        </div>
    );
};

export default Requests;