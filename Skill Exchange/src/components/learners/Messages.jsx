

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//     Box,
//     Container,
//     Typography,
//     Card,
//     CardContent,
//     Avatar,
//     Divider,
//     CircularProgress,
//     Alert,
//     Button,
//     Chip,
//     Tabs,
//     Tab,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Rating,
//     IconButton,
//     Snackbar
// } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';
// import StarIcon from '@mui/icons-material/Star';
// import CloseIcon from '@mui/icons-material/Close';
// import Footer from '../common/Footer';

// const Messages = () => {
//     const [matches, setMatches] = useState([]);
//     const [completedExchanges, setCompletedExchanges] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [userLoading, setUserLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState(0);
//     const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
//     const [selectedExchange, setSelectedExchange] = useState(null);
//     const [rating, setRating] = useState({
//         userRating: 0,
//         skillRating: 0
//     });
//     const [feedback, setFeedback] = useState('');
//     const [ratingLoading, setRatingLoading] = useState(false);
//     const [ratingError, setRatingError] = useState(null);
//     const [userReviews, setUserReviews] = useState([]);
//     const [reviewsForCurrentUser, setReviewsForCurrentUser] = useState([]);
//     const [reviewsLoading, setReviewsLoading] = useState(true);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const userData = JSON.parse(localStorage.getItem('user'));
//         if (userData && userData._id) {
//             const fetchUserData = async () => {
//                 try {
//                     setUserLoading(true);
//                     const response = await axios.get(`/users/getuserbyid/${userData._id}`);
//                     setCurrentUser(response.data.data);
//                 } catch (err) {
//                     console.error('Error fetching user data:', err);
//                     setError('Failed to load user data');
//                 } finally {
//                     setUserLoading(false);
//                 }
//             };
//             fetchUserData();
//         }
//     }, []);

//     useEffect(() => {
//         const fetchUserReviews = async () => {
//             try {
//                 if (!currentUser?._id) return;

//                 // Fetch reviews made by current user
//                 const reviewerResponse = await axios.get(`/review/review?reviewerId=${currentUser._id}`);
//                 setUserReviews(reviewerResponse.data.data || []);

//                 // Fetch reviews about current user
//                 const reviewedResponse = await axios.get(`/review/review?reviewedId=${currentUser._id}`);
//                 setReviewsForCurrentUser(reviewedResponse.data.data || []);
//             } catch (err) {
//                 console.error('Error fetching user reviews:', err);
//             } finally {
//                 setReviewsLoading(false);
//             }
//         };

//         if (currentUser?._id) {
//             fetchUserReviews();
//         }
//     }, [currentUser]);

//     useEffect(() => {
//         const fetchMatches = async () => {
//             try {
//                 setLoading(true);
//                 setError(null);

//                 if (!currentUser?._id) return;

//                 const activeResponse = await axios.get(`/messages/matches/${currentUser._id}`);
//                 setMatches(activeResponse.data.data || activeResponse.data);

//                 const completedResponse = await axios.get(`/messages/completed/${currentUser._id}`);
//                 setCompletedExchanges(completedResponse.data.data || completedResponse.data);
//             } catch (err) {
//                 console.error('Error fetching matches:', err);
//                 setError(err.response?.data?.message || 'Failed to load matches. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (currentUser?._id) {
//             fetchMatches();
//         }
//     }, [currentUser]);

//     const handleStartChat = (matchId, otherUserId, match) => {
//         navigate(`/user/chats/${matchId}`, {
//             state: {
//                 otherUserId,
//                 matchDetails: match
//             }
//         });
//     };

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const handleOpenRatingDialog = (exchange) => {
//         setSelectedExchange(exchange);
//         setRating({ userRating: 0, skillRating: 0 });
//         setFeedback('');
//         setRatingError(null);
//         setRatingDialogOpen(true);
//     };

//     const handleCloseRatingDialog = () => {
//         setRatingDialogOpen(false);
//         setSelectedExchange(null);
//     };

//     const handleSnackbarClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setSnackbarOpen(false);
//     };

//     const showSnackbar = (message, severity = 'success') => {
//         setSnackbarMessage(message);
//         setSnackbarSeverity(severity);
//         setSnackbarOpen(true);
//     };

//     const hasRatedExchange = (exchange) => {
//         if (!exchange || !currentUser) return false;

//         const otherUser = exchange.requester._id === currentUser._id
//             ? exchange.receiver
//             : exchange.requester;

//         const skillTaught = exchange.requester._id === currentUser._id
//             ? exchange.receiverSkillOffered
//             : exchange.requesterSkillOffered;

//         return userReviews.some(review =>
//             review.reviewedId._id === otherUser._id &&
//             review.subcategoryId.name === skillTaught
//         );
//     };

//     const getExchangeRating = (exchange) => {
//         if (!exchange || !currentUser) return null;

//         const otherUser = exchange.requester._id === currentUser._id
//             ? exchange.receiver
//             : exchange.requester;

//         const skillTaught = exchange.requester._id === currentUser._id
//             ? exchange.receiverSkillOffered
//             : exchange.requesterSkillOffered;

//         const review = userReviews.find(r =>
//             r.reviewedId._id === otherUser._id &&
//             r.subcategoryId.name === skillTaught
//         );

//         return review ? {
//             userRating: review.userRating,
//             skillRating: review.skillRating
//         } : null;
//     };

//     const getOtherUserRating = (exchange) => {
//         if (!exchange || !currentUser) return null;

//         const otherUser = exchange.requester._id === currentUser._id
//             ? exchange.receiver
//             : exchange.requester;

//         const skillTaught = exchange.requester._id === currentUser._id
//             ? exchange.requesterSkillOffered
//             : exchange.receiverSkillOffered;

//         const review = reviewsForCurrentUser.find(r =>
//             r.reviewerId._id === otherUser._id &&
//             r.subcategoryId.name === skillTaught
//         );

//         return review ? {
//             userRating: review.userRating,
//             skillRating: review.skillRating,
//             feedback: review.feedback
//         } : null;
//     };

//     const handleSubmitRating = async () => {
//         try {
//             setRatingLoading(true);
//             setRatingError(null);

//             if (!selectedExchange || !currentUser) {
//                 throw new Error('Invalid data for review');
//             }

//             const otherUser = selectedExchange.requester._id === currentUser._id
//                 ? selectedExchange.receiver
//                 : selectedExchange.requester;

//             const skillTaught = selectedExchange.requester._id === currentUser._id
//                 ? selectedExchange.receiverSkillOffered
//                 : selectedExchange.requesterSkillOffered;

//             const reviewData = {
//                 reviewerId: currentUser._id,
//                 reviewedId: otherUser._id,
//                 skillName: skillTaught,
//                 userRating: rating.userRating,
//                 skillRating: rating.skillRating,
//                 feedback: feedback
//             };

//             const response = await axios.post('/review/review', reviewData);

//             if (response.data && response.data.message === "Review added successfully") {
//                 const updatedReviews = [...userReviews, response.data.data];
//                 setUserReviews(updatedReviews);

//                 handleCloseRatingDialog();
//                 showSnackbar('Review submitted successfully!');

//                 const completedResponse = await axios.get(`/messages/completed/${currentUser._id}`);
//                 setCompletedExchanges(completedResponse.data.data || completedResponse.data);
//             } else {
//                 throw new Error('Failed to submit review');
//             }
//         } catch (err) {
//             console.error('Error submitting review:', err);
//             setRatingError(err.response?.data?.message || 'Failed to submit review. Please try again.');
//             showSnackbar('Failed to submit review. Please try again.', 'error');
//         } finally {
//             setRatingLoading(false);
//         }
//     };

//     if (userLoading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     const styles = {
//         skillChip: {
//             margin: '0.5rem',
//             padding: '0.5rem 1rem',
//             fontWeight: '600'
//         },
//         completedBadge: {
//             position: 'absolute',
//             top: 16,
//             right: 16,
//             backgroundColor: '#4caf50',
//             color: 'white',
//             padding: '4px 8px',
//             borderRadius: '4px',
//             fontSize: '0.75rem',
//             fontWeight: 'bold'
//         },
//         ratingDisplay: {
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             backgroundColor: '#f5f5f5',
//             padding: '8px 16px',
//             borderRadius: '4px',
//             gap: '4px'
//         },
//         otherUserRating: {
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             backgroundColor: '#e3f2fd',
//             padding: '8px 16px',
//             borderRadius: '4px',
//             gap: '4px',
//             marginTop: '8px'
//         }
//     };

//     const Ribbon = ({ children }) => (
//         <Box
//             sx={{
//                 position: 'absolute',
//                 top: 21,
//                 right: -24,
//                 width: 125,
//                 backgroundColor: '#4caf50',
//                 color: '#1a237e',
//                 textAlign: 'center',
//                 lineHeight: '30px',
//                 letterSpacing: '1px',
//                 transform: 'rotate(45deg)',
//                 boxShadow: '0 0 3px rgba(0,0,0,.3)',
//                 '&:before, &:after': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     borderTop: '15px solid transparent',
//                     borderBottom: '15px solid transparent',
//                 },
//                 '&:before': {
//                     left: -15,
//                     borderRight: '15px solid #4caf50',
//                 },
//                 '&:after': {
//                     right: -15,
//                     borderLeft: '15px solid #4caf50',
//                 }
//             }}
//         >
//             {children}
//         </Box>
//     );

//     return (
//         <div>
//             <Box
//                 sx={{
//                     minHeight: '91vh',
//                     width: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     background: '#f5f7fa',
//                     padding: '40px 20px'
//                 }}
//             >
//                 <Container maxWidth="md">
//                     <Typography
//                         variant="h4"
//                         align="center"
//                         gutterBottom
//                         sx={{
//                             fontWeight: 'bold',
//                             color: '#2d3748',
//                             mb: 6,
//                             fontSize: { xs: '1.8rem', sm: '2.2rem' }
//                         }}
//                     >
//                         Your Skill Exchange Matches
//                     </Typography>

//                     <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
//                         <Tabs value={activeTab} onChange={handleTabChange} centered>
//                             <Tab label="Active Exchanges" />
//                             <Tab label="Completed Exchanges" />
//                         </Tabs>
//                     </Box>

//                     {loading ? (
//                         <Box display="flex" justifyContent="center" my={4}>
//                             <CircularProgress />
//                         </Box>
//                     ) : error ? (
//                         <Alert severity="error" sx={{ mb: 3 }}>
//                             {error}
//                         </Alert>
//                     ) : activeTab === 0 ? (
//                         matches.length === 0 ? (
//                             <Typography variant="body1" color="textSecondary" align="center">
//                                 You don't have any active matches yet. Keep connecting with others!
//                             </Typography>
//                         ) : (
//                             <Box>
//                                 {matches.map((match) => {
//                                     const otherUser = match.requester._id === currentUser._id ? match.receiver : match.requester;
//                                     const currentUserSkill = match.requester._id === currentUser._id
//                                         ? match.requesterSkillOffered
//                                         : match.receiverSkillOffered;
//                                     const otherUserSkill = match.requester._id === currentUser._id
//                                         ? match.receiverSkillOffered
//                                         : match.requesterSkillOffered;
//                                     return (
//                                         <Card
//                                             key={match._id}
//                                             sx={{
//                                                 mb: 4,
//                                                 borderRadius: '12px',
//                                                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                                                 border: '1px solid #e2e8f0',
//                                                 position: 'relative'
//                                             }}
//                                         >
//                                             <CardContent>
//                                                 <Box sx={{ textAlign: 'center', mb: 3 }}>
//                                                     <Typography
//                                                         variant="h5"
//                                                         sx={{
//                                                             color: '#4caf50',
//                                                             fontWeight: '600',
//                                                             mb: 2
//                                                         }}
//                                                     >
//                                                         🎉 Congratulations, you found a match!
//                                                     </Typography>
//                                                     <Typography variant="body1" sx={{ mb: 3 }}>
//                                                         You'll be exchanging skills with each other
//                                                     </Typography>
//                                                 </Box>

//                                                 <Divider sx={{ my: 2 }} />

//                                                 <Box sx={{
//                                                     textAlign: 'center',
//                                                     mb: 3,
//                                                     p: 2,
//                                                     backgroundColor: '#f5f5f5',
//                                                     borderRadius: '8px'
//                                                 }}>
//                                                     <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
//                                                         Skill Exchange Details
//                                                     </Typography>
//                                                     <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
//                                                         <Box>
//                                                             <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
//                                                                 You will teach:
//                                                             </Typography>
//                                                             <Chip
//                                                                 label={currentUserSkill}
//                                                                 color="primary"
//                                                                 sx={{ mt: 1 }}
//                                                             />
//                                                         </Box>
//                                                         <Box>
//                                                             <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
//                                                                 {otherUser.userName} will teach:
//                                                             </Typography>
//                                                             <Chip
//                                                                 label={otherUserSkill}
//                                                                 color="secondary"
//                                                                 sx={{ mt: 1 }}
//                                                             />
//                                                         </Box>
//                                                     </Box>
//                                                 </Box>

//                                                 <Box
//                                                     sx={{
//                                                         display: 'flex',
//                                                         flexDirection: { xs: 'column', sm: 'row' },
//                                                         alignItems: 'center',
//                                                         justifyContent: 'space-around',
//                                                         gap: 4,
//                                                         p: 2
//                                                     }}
//                                                 >
//                                                     <Box sx={{ textAlign: 'center' }}>
//                                                         <Avatar
//                                                             src={`http://localhost:3000/${currentUser.profilePic}`}
//                                                             sx={{
//                                                                 width: 80,
//                                                                 height: 80,
//                                                                 mb: 2,
//                                                                 mx: 'auto'
//                                                             }}
//                                                         />
//                                                         <Typography variant="h6" sx={{ fontWeight: '600' }}>
//                                                             {currentUser?.userName || 'You'}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Box sx={{ textAlign: 'center' }}>
//                                                         <Typography variant="h6" sx={{ my: 2 }}>
//                                                             ↔️
//                                                         </Typography>
//                                                         <Typography variant="body2">
//                                                             Matched on {new Date(match.matchedAt).toLocaleDateString()}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Box sx={{ textAlign: 'center' }}>
//                                                         <Avatar
//                                                             src={`http://localhost:3000/${otherUser.profilePic}`}
//                                                             sx={{
//                                                                 width: 80,
//                                                                 height: 80,
//                                                                 mb: 2,
//                                                                 mx: 'auto'
//                                                             }}
//                                                         />
//                                                         <Typography variant="h6" sx={{ fontWeight: '600' }}>
//                                                             {otherUser?.userName || 'Unknown User'}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>

//                                                 <Box sx={{ textAlign: 'center', mt: 3 }}>
//                                                     <Button
//                                                         variant="contained"
//                                                         color="primary"
//                                                         onClick={() => handleStartChat(match._id, otherUser._id, match)}
//                                                         sx={{
//                                                             backgroundColor: '#4caf50',
//                                                             '&:hover': {
//                                                                 backgroundColor: '#3d8b40'
//                                                             }
//                                                         }}
//                                                     >
//                                                         Start Skill Exchange
//                                                     </Button>
//                                                 </Box>
//                                             </CardContent>
//                                         </Card>
//                                     );
//                                 })}
//                             </Box>
//                         )
//                     ) : (
//                         completedExchanges.length === 0 ? (
//                             <Typography variant="body1" color="textSecondary" align="center">
//                                 You haven't completed any skill exchanges yet.
//                             </Typography>
//                         ) : (
//                             <Box>
//                                 {completedExchanges.map((exchange) => {
//                                     const otherUser = exchange.requester._id === currentUser._id ? exchange.receiver : exchange.requester;
//                                     const currentUserSkill = exchange.requester._id === currentUser._id
//                                         ? exchange.requesterSkillOffered
//                                         : exchange.receiverSkillOffered;
//                                     const otherUserSkill = exchange.requester._id === currentUser._id
//                                         ? exchange.receiverSkillOffered
//                                         : exchange.requesterSkillOffered;

//                                     const exchangeRating = getExchangeRating(exchange);
//                                     const otherUserRating = getOtherUserRating(exchange);

//                                     return (
//                                         <Card
//                                             key={exchange._id}
//                                             sx={{
//                                                 mb: 4,
//                                                 borderRadius: '12px',
//                                                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//                                                 border: '1px solid #e2e8f0',
//                                                 position: 'relative'
//                                             }}
//                                         >
//                                             <Ribbon>Completed</Ribbon>
//                                             <CardContent>
//                                                 <Box sx={{ textAlign: 'center', mb: 3 }}>
//                                                     <Typography
//                                                         variant="h5"
//                                                         sx={{
//                                                             color: '#4caf50',
//                                                             fontWeight: '600',
//                                                             mb: 2
//                                                         }}
//                                                     >
//                                                         ✅ Skill Exchange Completed
//                                                     </Typography>
//                                                     <Typography variant="body1" sx={{ mb: 3 }}>
//                                                         You successfully exchanged skills with {otherUser.userName}
//                                                     </Typography>
//                                                 </Box>

//                                                 <Divider sx={{ my: 2 }} />

//                                                 <Box sx={{
//                                                     textAlign: 'center',
//                                                     mb: 3,
//                                                     p: 2,
//                                                     backgroundColor: '#f5f5f5',
//                                                     borderRadius: '8px'
//                                                 }}>
//                                                     <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
//                                                         Exchange Details
//                                                     </Typography>
//                                                     <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
//                                                         <Box>
//                                                             <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
//                                                                 You taught:
//                                                             </Typography>
//                                                             <Chip
//                                                                 label={currentUserSkill}
//                                                                 color="primary"
//                                                                 sx={{ mt: 1 }}
//                                                             />
//                                                         </Box>
//                                                         <Box>
//                                                             <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
//                                                                 {otherUser.userName} taught:
//                                                             </Typography>
//                                                             <Chip
//                                                                 label={otherUserSkill}
//                                                                 color="secondary"
//                                                                 sx={{ mt: 1 }}
//                                                             />
//                                                         </Box>
//                                                     </Box>
//                                                 </Box>

//                                                 <Box
//                                                     sx={{
//                                                         display: 'flex',
//                                                         flexDirection: { xs: 'column', sm: 'row' },
//                                                         alignItems: 'center',
//                                                         justifyContent: 'space-around',
//                                                         gap: 4,
//                                                         p: 2
//                                                     }}
//                                                 >
//                                                     <Box sx={{ textAlign: 'center' }}>
//                                                         <Avatar
//                                                             src={`http://localhost:3000/${currentUser.profilePic}`}
//                                                             sx={{
//                                                                 width: 80,
//                                                                 height: 80,
//                                                                 mb: 2,
//                                                                 mx: 'auto'
//                                                             }}
//                                                         />
//                                                         <Typography variant="h6" sx={{ fontWeight: '600' }}>
//                                                             {currentUser?.userName || 'You'}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Box sx={{ textAlign: 'center' }}>
//                                                         <Typography variant="h6" sx={{ my: 2 }}>
//                                                             ↔️
//                                                         </Typography>
//                                                         <Typography variant="body2">
//                                                             Completed on {new Date(exchange.completedAt).toLocaleDateString()}
//                                                         </Typography>
//                                                     </Box>

//                                                     <Box sx={{ textAlign: 'center' }}>
//                                                         <Avatar
//                                                             src={`http://localhost:3000/${otherUser.profilePic}`}
//                                                             sx={{
//                                                                 width: 80,
//                                                                 height: 80,
//                                                                 mb: 2,
//                                                                 mx: 'auto'
//                                                             }}
//                                                         />
//                                                         <Typography variant="h6" sx={{ fontWeight: '600' }}>
//                                                             {otherUser?.userName || 'Unknown User'}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>

//                                                 <Box sx={{ textAlign: 'center', mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
//                                                     <Button
//                                                         variant="outlined"
//                                                         color="primary"
//                                                         onClick={() => handleStartChat(exchange._id, otherUser._id, exchange)}
//                                                     >
//                                                         View Chat History
//                                                     </Button>
//                                                     {hasRatedExchange(exchange) ? (
//                                                         <Box sx={styles.ratingDisplay}>
//                                                             <Typography variant="body2">
//                                                                 Your Ratings:
//                                                             </Typography>
//                                                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                 <Typography variant="body2" sx={{ mr: 1 }}>
//                                                                     User:
//                                                                 </Typography>
//                                                                 <Rating
//                                                                     value={exchangeRating.userRating}
//                                                                     readOnly
//                                                                     precision={0.5}
//                                                                     size="small"
//                                                                     emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                                                 />
//                                                             </Box>
//                                                             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                                 <Typography variant="body2" sx={{ mr: 1 }}>
//                                                                     Skill:
//                                                                 </Typography>
//                                                                 <Rating
//                                                                     value={exchangeRating.skillRating}
//                                                                     readOnly
//                                                                     precision={0.5}
//                                                                     size="small"
//                                                                     emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                                                 />
//                                                             </Box>
//                                                         </Box>
//                                                     ) : (
//                                                         <Button
//                                                             variant="contained"
//                                                             color="secondary"
//                                                             onClick={() => handleOpenRatingDialog(exchange)}
//                                                         >
//                                                             Rate Experience
//                                                         </Button>
//                                                     )}
//                                                     {otherUserRating && (
//                                                     <Box sx={styles.otherUserRating}>
//                                                         <Typography variant="body2">
//                                                             {otherUser.userName}'s Rating of You:
//                                                         </Typography>
//                                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                             <Typography variant="body2" sx={{ mr: 1 }}>
//                                                                 User:
//                                                             </Typography>
//                                                             <Rating
//                                                                 value={otherUserRating.userRating}
//                                                                 readOnly
//                                                                 precision={0.5}
//                                                                 size="small"
//                                                                 emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                                             />
//                                                         </Box>
//                                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                             <Typography variant="body2" sx={{ mr: 1 }}>
//                                                                 Skill:
//                                                             </Typography>
//                                                             <Rating
//                                                                 value={otherUserRating.skillRating}
//                                                                 readOnly
//                                                                 precision={0.5}
//                                                                 size="small"
//                                                                 emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                                             />
//                                                         </Box>
//                                                         {otherUserRating.feedback && (
//                                                             <Box sx={{ mt: 1, textAlign: 'center' }}>
//                                                                 {/* <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
//                                                                     Feedback: "{otherUserRating.feedback}"
//                                                                 </Typography> */}
//                                                             </Box>
//                                                         )}
//                                                     </Box>
//                                                 )}
//                                                 </Box>

                                                
//                                             </CardContent>
//                                         </Card>
//                                     );
//                                 })}
//                             </Box>
//                         )
//                     )}
//                 </Container>
//             </Box>

//             {/* Rating Dialog */}
//             <Dialog open={ratingDialogOpen} onClose={handleCloseRatingDialog} fullWidth maxWidth="sm">
//                 <DialogTitle>
//                     Rate Your Experience
//                     <IconButton
//                         aria-label="close"
//                         onClick={handleCloseRatingDialog}
//                         sx={{
//                             position: 'absolute',
//                             right: 8,
//                             top: 8,
//                             color: (theme) => theme.palette.grey[500],
//                         }}
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent dividers>
//                     {selectedExchange && (
//                         <>
//                             <Typography variant="h6" gutterBottom>
//                                 How would you rate your experience learning from {selectedExchange.requester._id === currentUser._id
//                                     ? selectedExchange.receiver.userName
//                                     : selectedExchange.requester.userName}?
//                             </Typography>

//                             <Typography variant="subtitle1" sx={{ mb: 2 }}>
//                                 Skill: {selectedExchange.requester._id === currentUser._id
//                                     ? selectedExchange.receiverSkillOffered
//                                     : selectedExchange.requesterSkillOffered}
//                             </Typography>

//                             {/* User Rating */}
//                             <Box sx={{ mb: 3 }}>
//                                 <Typography variant="subtitle1" sx={{ mb: 1 }}>Rate the user:</Typography>
//                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                     <Rating
//                                         name="user-rating"
//                                         value={rating.userRating}
//                                         onChange={(event, newValue) => setRating(prev => ({ ...prev, userRating: newValue }))}
//                                         precision={1}
//                                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                     />
//                                     <Typography sx={{ ml: 2 }}>{rating.userRating || 0}/5</Typography>
//                                 </Box>
//                             </Box>

//                             {/* Skill Rating */}
//                             <Box sx={{ mb: 3 }}>
//                                 <Typography variant="subtitle1" sx={{ mb: 1 }}>Rate the skill you learned:</Typography>
//                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                     <Rating
//                                         name="skill-rating"
//                                         value={rating.skillRating}
//                                         onChange={(event, newValue) => setRating(prev => ({ ...prev, skillRating: newValue }))}
//                                         precision={1}
//                                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                                     />
//                                     <Typography sx={{ ml: 2 }}>{rating.skillRating || 0}/5</Typography>
//                                 </Box>
//                             </Box>

//                             <TextField
//                                 label="Feedback (optional)"
//                                 multiline
//                                 rows={4}
//                                 fullWidth
//                                 variant="outlined"
//                                 value={feedback}
//                                 onChange={(e) => setFeedback(e.target.value)}
//                                 sx={{ mt: 2 }}
//                             />

//                             {ratingError && (
//                                 <Alert severity="error" sx={{ mt: 2 }}>
//                                     {ratingError}
//                                 </Alert>
//                             )}
//                         </>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseRatingDialog}>Cancel</Button>
//                     <Button
//                         onClick={handleSubmitRating}
//                         variant="contained"
//                         color="primary"
//                         disabled={ratingLoading || !rating.userRating || !rating.skillRating}
//                     >
//                         {ratingLoading ? <CircularProgress size={24} /> : 'Submit Review'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={4000}
//                 onClose={handleSnackbarClose}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//                 <MuiAlert
//                     elevation={6}
//                     variant="filled"
//                     onClose={handleSnackbarClose}
//                     severity={snackbarSeverity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarMessage}
//                 </MuiAlert>
//             </Snackbar>

//             <Footer fullWidth={false} />
//         </div>
//     );
// };

// export default Messages;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Avatar,
    Divider,
    CircularProgress,
    Alert,
    Button,
    Chip,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Rating,
    IconButton,
    Snackbar,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import Footer from '../common/Footer';

const Messages = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    const [matches, setMatches] = useState([]);
    const [completedExchanges, setCompletedExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
    const [selectedExchange, setSelectedExchange] = useState(null);
    const [rating, setRating] = useState({
        userRating: 0,
        skillRating: 0
    });
    const [feedback, setFeedback] = useState('');
    const [ratingLoading, setRatingLoading] = useState(false);
    const [ratingError, setRatingError] = useState(null);
    const [userReviews, setUserReviews] = useState([]);
    const [reviewsForCurrentUser, setReviewsForCurrentUser] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData._id) {
            const fetchUserData = async () => {
                try {
                    setUserLoading(true);
                    const response = await axios.get(`/users/getuserbyid/${userData._id}`);
                    setCurrentUser(response.data.data);
                } catch (err) {
                    console.error('Error fetching user data:', err);
                    setError('Failed to load user data');
                } finally {
                    setUserLoading(false);
                }
            };
            fetchUserData();
        }
    }, []);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                if (!currentUser?._id) return;

                // Fetch reviews made by current user
                const reviewerResponse = await axios.get(`/review/review?reviewerId=${currentUser._id}`);
                setUserReviews(reviewerResponse.data.data || []);

                // Fetch reviews about current user
                const reviewedResponse = await axios.get(`/review/review?reviewedId=${currentUser._id}`);
                setReviewsForCurrentUser(reviewedResponse.data.data || []);
            } catch (err) {
                console.error('Error fetching user reviews:', err);
            } finally {
                setReviewsLoading(false);
            }
        };

        if (currentUser?._id) {
            fetchUserReviews();
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                setError(null);

                if (!currentUser?._id) return;

                const activeResponse = await axios.get(`/messages/matches/${currentUser._id}`);
                setMatches(activeResponse.data.data || activeResponse.data);

                const completedResponse = await axios.get(`/messages/completed/${currentUser._id}`);
                setCompletedExchanges(completedResponse.data.data || completedResponse.data);
            } catch (err) {
                console.error('Error fetching matches:', err);
                setError(err.response?.data?.message || 'Failed to load matches. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?._id) {
            fetchMatches();
        }
    }, [currentUser]);

    const handleStartChat = (matchId, otherUserId, match) => {
        navigate(`/user/chats/${matchId}`, {
            state: {
                otherUserId,
                matchDetails: match
            }
        });
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleOpenRatingDialog = (exchange) => {
        setSelectedExchange(exchange);
        setRating({ userRating: 0, skillRating: 0 });
        setFeedback('');
        setRatingError(null);
        setRatingDialogOpen(true);
    };

    const handleCloseRatingDialog = () => {
        setRatingDialogOpen(false);
        setSelectedExchange(null);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const hasRatedExchange = (exchange) => {
        if (!exchange || !currentUser) return false;

        const otherUser = exchange.requester._id === currentUser._id
            ? exchange.receiver
            : exchange.requester;

        const skillTaught = exchange.requester._id === currentUser._id
            ? exchange.receiverSkillOffered
            : exchange.requesterSkillOffered;

        return userReviews.some(review =>
            review.reviewedId._id === otherUser._id &&
            review.subcategoryId.name === skillTaught
        );
    };

    const getExchangeRating = (exchange) => {
        if (!exchange || !currentUser) return null;

        const otherUser = exchange.requester._id === currentUser._id
            ? exchange.receiver
            : exchange.requester;

        const skillTaught = exchange.requester._id === currentUser._id
            ? exchange.receiverSkillOffered
            : exchange.requesterSkillOffered;

        const review = userReviews.find(r =>
            r.reviewedId._id === otherUser._id &&
            r.subcategoryId.name === skillTaught
        );

        return review ? {
            userRating: review.userRating,
            skillRating: review.skillRating
        } : null;
    };

    const getOtherUserRating = (exchange) => {
        if (!exchange || !currentUser) return null;

        const otherUser = exchange.requester._id === currentUser._id
            ? exchange.receiver
            : exchange.requester;

        const skillTaught = exchange.requester._id === currentUser._id
            ? exchange.requesterSkillOffered
            : exchange.receiverSkillOffered;

        const review = reviewsForCurrentUser.find(r =>
            r.reviewerId._id === otherUser._id &&
            r.subcategoryId.name === skillTaught
        );

        return review ? {
            userRating: review.userRating,
            skillRating: review.skillRating,
            feedback: review.feedback
        } : null;
    };

    const handleSubmitRating = async () => {
        try {
            setRatingLoading(true);
            setRatingError(null);

            if (!selectedExchange || !currentUser) {
                throw new Error('Invalid data for review');
            }

            const otherUser = selectedExchange.requester._id === currentUser._id
                ? selectedExchange.receiver
                : selectedExchange.requester;

            const skillTaught = selectedExchange.requester._id === currentUser._id
                ? selectedExchange.receiverSkillOffered
                : selectedExchange.requesterSkillOffered;

            const reviewData = {
                reviewerId: currentUser._id,
                reviewedId: otherUser._id,
                skillName: skillTaught,
                userRating: rating.userRating,
                skillRating: rating.skillRating,
                feedback: feedback
            };

            const response = await axios.post('/review/review', reviewData);

            if (response.data && response.data.message === "Review added successfully") {
                const updatedReviews = [...userReviews, response.data.data];
                setUserReviews(updatedReviews);

                handleCloseRatingDialog();
                showSnackbar('Review submitted successfully!');

                const completedResponse = await axios.get(`/messages/completed/${currentUser._id}`);
                setCompletedExchanges(completedResponse.data.data || completedResponse.data);
            } else {
                throw new Error('Failed to submit review');
            }
        } catch (err) {
            console.error('Error submitting review:', err);
            setRatingError(err.response?.data?.message || 'Failed to submit review. Please try again.');
            showSnackbar('Failed to submit review. Please try again.', 'error');
        } finally {
            setRatingLoading(false);
        }
    };

    if (userLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const styles = {
        skillChip: {
            margin: '0.5rem',
            padding: '0.5rem 1rem',
            fontWeight: '600'
        },
        completedBadge: {
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 'bold'
        },
        ratingDisplay: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            padding: '8px 16px',
            borderRadius: '4px',
            gap: '4px',
            margin: isSmallScreen ? '8px 0' : '0 8px'
        },
        otherUserRating: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#e3f2fd',
            padding: '8px 16px',
            borderRadius: '4px',
            gap: '4px',
            margin: isSmallScreen ? '8px 0' : '0 8px'
        },
        actionButtonsContainer: {
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mt: 3,
            width: '100%'
        },
        userInfoContainer: {
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: isSmallScreen ? 2 : 4,
            p: 2
        },
        skillExchangeContainer: {
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'space-around',
            gap: isSmallScreen ? 2 : 0
        }
    };

    const Ribbon = ({ children }) => (
        <Box
            sx={{
                position: 'absolute',
                top: isSmallScreen ? 10 : 21,
                right: isSmallScreen ? -34 : -24,
                width: 125,
                backgroundColor: '#4caf50',
                color: '#1a237e',
                textAlign: 'center',
                lineHeight: '30px',
                letterSpacing: '1px',
                transform: 'rotate(45deg)',
                boxShadow: '0 0 3px rgba(0,0,0,.3)',
                fontSize: isSmallScreen ? '0.8rem' : '1rem',
                '&:before, &:after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    borderTop: '15px solid transparent',
                    borderBottom: '15px solid transparent',
                },
                '&:before': {
                    left: -15,
                    borderRight: '15px solid #4caf50',
                },
                '&:after': {
                    right: -15,
                    borderLeft: '15px solid #4caf50',
                }
            }}
        >
            {children}
        </Box>
    );

    return (
        <div>
            <Box
                sx={{
                    minHeight: '91vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f5f7fa',
                    padding: isSmallScreen ? '20px 10px' : '40px 20px'
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: '#2d3748',
                            mb: isSmallScreen ? 4 : 6,
                            fontSize: isSmallScreen ? '1.5rem' : isMediumScreen ? '1.8rem' : '2.2rem'
                        }}
                    >
                        Your Skill Exchange Matches
                    </Typography>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                        <Tabs 
                            value={activeTab} 
                            onChange={handleTabChange} 
                            centered
                            variant={isSmallScreen ? 'fullWidth' : 'standard'}
                        >
                            <Tab label={isSmallScreen ? "Active" : "Active Exchanges"} />
                            <Tab label={isSmallScreen ? "Completed" : "Completed Exchanges"} />
                        </Tabs>
                    </Box>

                    {loading ? (
                        <Box display="flex" justifyContent="center" my={4}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    ) : activeTab === 0 ? (
                        matches.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center">
                                You don't have any active matches yet. Keep connecting with others!
                            </Typography>
                        ) : (
                            <Box>
                                {matches.map((match) => {
                                    const otherUser = match.requester._id === currentUser._id ? match.receiver : match.requester;
                                    const currentUserSkill = match.requester._id === currentUser._id
                                        ? match.requesterSkillOffered
                                        : match.receiverSkillOffered;
                                    const otherUserSkill = match.requester._id === currentUser._id
                                        ? match.receiverSkillOffered
                                        : match.requesterSkillOffered;
                                    return (
                                        <Card
                                            key={match._id}
                                            sx={{
                                                mb: 4,
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                border: '1px solid #e2e8f0',
                                                position: 'relative'
                                            }}
                                        >
                                            <CardContent>
                                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                                    <Typography
                                                        variant={isSmallScreen ? "h6" : "h5"}
                                                        sx={{
                                                            color: '#4caf50',
                                                            fontWeight: '600',
                                                            mb: 2
                                                        }}
                                                    >
                                                        🎉 Congratulations, you found a match!
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ mb: 3 }}>
                                                        You'll be exchanging skills with each other
                                                    </Typography>
                                                </Box>

                                                <Divider sx={{ my: 2 }} />

                                                <Box sx={{
                                                    textAlign: 'center',
                                                    mb: 3,
                                                    p: 2,
                                                    backgroundColor: '#f5f5f5',
                                                    borderRadius: '8px'
                                                }}>
                                                    <Typography variant={isSmallScreen ? "subtitle1" : "h6"} sx={{ mb: 2, fontWeight: 'bold' }}>
                                                        Skill Exchange Details
                                                    </Typography>
                                                    <Box sx={styles.skillExchangeContainer}>
                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                                                You will teach:
                                                            </Typography>
                                                            <Chip
                                                                label={currentUserSkill}
                                                                color="primary"
                                                                sx={{ mt: 1 }}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                                                {otherUser.userName} will teach:
                                                            </Typography>
                                                            <Chip
                                                                label={otherUserSkill}
                                                                color="secondary"
                                                                sx={{ mt: 1 }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Box sx={styles.userInfoContainer}>
                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Avatar
                                                            src={`http://localhost:3000/${currentUser.profilePic}`}
                                                            sx={{
                                                                width: isSmallScreen ? 60 : 80,
                                                                height: isSmallScreen ? 60 : 80,
                                                                mb: 2,
                                                                mx: 'auto'
                                                            }}
                                                        />
                                                        <Typography variant={isSmallScreen ? "subtitle1" : "h6"} sx={{ fontWeight: '600' }}>
                                                            {currentUser?.userName || 'You'}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Typography variant="h6" sx={{ my: 2 }}>
                                                            ↔️
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Matched on {new Date(match.matchedAt).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Avatar
                                                            src={`http://localhost:3000/${otherUser.profilePic}`}
                                                            sx={{
                                                                width: isSmallScreen ? 60 : 80,
                                                                height: isSmallScreen ? 60 : 80,
                                                                mb: 2,
                                                                mx: 'auto'
                                                            }}
                                                        />
                                                        <Typography variant={isSmallScreen ? "subtitle1" : "h6"} sx={{ fontWeight: '600' }}>
                                                            {otherUser?.userName || 'Unknown User'}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ textAlign: 'center', mt: 3 }}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleStartChat(match._id, otherUser._id, match)}
                                                        sx={{
                                                            backgroundColor: '#4caf50',
                                                            '&:hover': {
                                                                backgroundColor: '#3d8b40'
                                                            },
                                                            width: isSmallScreen ? '100%' : 'auto'
                                                        }}
                                                        size={isSmallScreen ? 'medium' : 'large'}
                                                    >
                                                        Start Skill Exchange
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Box>
                        )
                    ) : (
                        completedExchanges.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center">
                                You haven't completed any skill exchanges yet.
                            </Typography>
                        ) : (
                            <Box>
                                {completedExchanges.map((exchange) => {
                                    const otherUser = exchange.requester._id === currentUser._id ? exchange.receiver : exchange.requester;
                                    const currentUserSkill = exchange.requester._id === currentUser._id
                                        ? exchange.requesterSkillOffered
                                        : exchange.receiverSkillOffered;
                                    const otherUserSkill = exchange.requester._id === currentUser._id
                                        ? exchange.receiverSkillOffered
                                        : exchange.requesterSkillOffered;

                                    const exchangeRating = getExchangeRating(exchange);
                                    const otherUserRating = getOtherUserRating(exchange);

                                    return (
                                        <Card
                                            key={exchange._id}
                                            sx={{
                                                mb: 4,
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                border: '1px solid #e2e8f0',
                                                position: 'relative'
                                            }}
                                        >
                                            <Ribbon>Completed</Ribbon>
                                            <CardContent>
                                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                                    <Typography
                                                        variant={isSmallScreen ? "h6" : "h5"}
                                                        sx={{
                                                            color: '#4caf50',
                                                            fontWeight: '600',
                                                            mb: 2
                                                        }}
                                                    >
                                                        ✅ Skill Exchange Completed
                                                    </Typography>
                                                    <Typography variant="body1" sx={{ mb: 3 }}>
                                                        You successfully exchanged skills with {otherUser.userName}
                                                    </Typography>
                                                </Box>

                                                <Divider sx={{ my: 2 }} />

                                                <Box sx={{
                                                    textAlign: 'center',
                                                    mb: 3,
                                                    p: 2,
                                                    backgroundColor: '#f5f5f5',
                                                    borderRadius: '8px'
                                                }}>
                                                    <Typography variant={isSmallScreen ? "subtitle1" : "h6"} sx={{ mb: 2, fontWeight: 'bold' }}>
                                                        Exchange Details
                                                    </Typography>
                                                    <Box sx={styles.skillExchangeContainer}>
                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                                                You taught:
                                                            </Typography>
                                                            <Chip
                                                                label={currentUserSkill}
                                                                color="primary"
                                                                sx={{ mt: 1 }}
                                                            />
                                                        </Box>
                                                        <Box>
                                                            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                                                                {otherUser.userName} taught:
                                                            </Typography>
                                                            <Chip
                                                                label={otherUserSkill}
                                                                color="secondary"
                                                                sx={{ mt: 1 }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                <Box sx={styles.userInfoContainer}>
                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Avatar
                                                            src={`http://localhost:3000/${currentUser.profilePic}`}
                                                            sx={{
                                                                width: isSmallScreen ? 60 : 80,
                                                                height: isSmallScreen ? 60 : 80,
                                                                mb: 2,
                                                                mx: 'auto'
                                                            }}
                                                        />
                                                        <Typography variant={isSmallScreen ? "subtitle1" : "h6"} sx={{ fontWeight: '600' }}>
                                                            {currentUser?.userName || 'You'}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Typography variant="h6" sx={{ my: 2 }}>
                                                            ↔️
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Completed on {new Date(exchange.completedAt).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Avatar
                                                            src={`http://localhost:3000/${otherUser.profilePic}`}
                                                            sx={{
                                                                width: isSmallScreen ? 60 : 80,
                                                                height: isSmallScreen ? 60 : 80,
                                                                mb: 2,
                                                                mx: 'auto'
                                                            }}
                                                        />
                                                        <Typography variant={isSmallScreen ? "subtitle1" : "h6"} sx={{ fontWeight: '600' }}>
                                                            {otherUser?.userName || 'Unknown User'}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={styles.actionButtonsContainer}>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={() => handleStartChat(exchange._id, otherUser._id, exchange)}
                                                        sx={{ width: isSmallScreen ? '100%' : 'auto' }}
                                                        size={isSmallScreen ? 'medium' : 'large'}
                                                    >
                                                        View Chat History
                                                    </Button>
                                                    {hasRatedExchange(exchange) ? (
                                                        <Box sx={styles.ratingDisplay}>
                                                            <Typography variant="body2">
                                                                Your Ratings:
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography variant="body2" sx={{ mr: 1 }}>
                                                                    User:
                                                                </Typography>
                                                                <Rating
                                                                    value={exchangeRating.userRating}
                                                                    readOnly
                                                                    precision={0.5}
                                                                    size="small"
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography variant="body2" sx={{ mr: 1 }}>
                                                                    Skill:
                                                                </Typography>
                                                                <Rating
                                                                    value={exchangeRating.skillRating}
                                                                    readOnly
                                                                    precision={0.5}
                                                                    size="small"
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    ) : (
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => handleOpenRatingDialog(exchange)}
                                                            sx={{ width: isSmallScreen ? '100%' : 'auto' }}
                                                            size={isSmallScreen ? 'medium' : 'large'}
                                                        >
                                                            Rate Experience
                                                        </Button>
                                                    )}
                                                    {otherUserRating && (
                                                        <Box sx={styles.otherUserRating}>
                                                            <Typography variant="body2">
                                                                {otherUser.userName}'s Rating of You:
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography variant="body2" sx={{ mr: 1 }}>
                                                                    User:
                                                                </Typography>
                                                                <Rating
                                                                    value={otherUserRating.userRating}
                                                                    readOnly
                                                                    precision={0.5}
                                                                    size="small"
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />
                                                            </Box>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography variant="body2" sx={{ mr: 1 }}>
                                                                    Skill:
                                                                </Typography>
                                                                <Rating
                                                                    value={otherUserRating.skillRating}
                                                                    readOnly
                                                                    precision={0.5}
                                                                    size="small"
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Box>
                        )
                    )}
                </Container>
            </Box>

            {/* Rating Dialog */}
            <Dialog 
                open={ratingDialogOpen} 
                onClose={handleCloseRatingDialog} 
                fullWidth 
                maxWidth="sm"
                fullScreen={isSmallScreen}
            >
                <DialogTitle>
                    Rate Your Experience
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseRatingDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {selectedExchange && (
                        <>
                            <Typography variant={isSmallScreen ? "subtitle1" : "h6"} gutterBottom>
                                How would you rate your experience learning from {selectedExchange.requester._id === currentUser._id
                                    ? selectedExchange.receiver.userName
                                    : selectedExchange.requester.userName}?
                            </Typography>

                            <Typography variant={isSmallScreen ? "body1" : "subtitle1"} sx={{ mb: 2 }}>
                                Skill: {selectedExchange.requester._id === currentUser._id
                                    ? selectedExchange.receiverSkillOffered
                                    : selectedExchange.requesterSkillOffered}
                            </Typography>

                            {/* User Rating */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant={isSmallScreen ? "body1" : "subtitle1"} sx={{ mb: 1 }}>Rate the user:</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Rating
                                        name="user-rating"
                                        value={rating.userRating}
                                        onChange={(event, newValue) => setRating(prev => ({ ...prev, userRating: newValue }))}
                                        precision={1}
                                        size={isSmallScreen ? "medium" : "large"}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <Typography sx={{ ml: 2 }}>{rating.userRating || 0}/5</Typography>
                                </Box>
                            </Box>

                            {/* Skill Rating */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant={isSmallScreen ? "body1" : "subtitle1"} sx={{ mb: 1 }}>Rate the skill you learned:</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Rating
                                        name="skill-rating"
                                        value={rating.skillRating}
                                        onChange={(event, newValue) => setRating(prev => ({ ...prev, skillRating: newValue }))}
                                        precision={1}
                                        size={isSmallScreen ? "medium" : "large"}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <Typography sx={{ ml: 2 }}>{rating.skillRating || 0}/5</Typography>
                                </Box>
                            </Box>

                            <TextField
                                label="Feedback (optional)"
                                multiline
                                rows={isSmallScreen ? 3 : 4}
                                fullWidth
                                variant="outlined"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                sx={{ mt: 2 }}
                            />

                            {ratingError && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {ratingError}
                                </Alert>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseRatingDialog}
                        size={isSmallScreen ? "medium" : "large"}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmitRating}
                        variant="contained"
                        color="primary"
                        disabled={ratingLoading || !rating.userRating || !rating.skillRating}
                        size={isSmallScreen ? "medium" : "large"}
                    >
                        {ratingLoading ? <CircularProgress size={24} /> : 'Submit Review'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>

            <Footer fullWidth={false} />
        </div>
    );
};

export default Messages;