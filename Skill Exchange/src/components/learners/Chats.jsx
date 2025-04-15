// // // import React, { useEffect, useState, useRef } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import axios from 'axios';
// // // import io from 'socket.io-client';
// // // import {
// // //     Box, Container, Typography, Avatar, Divider, CircularProgress,
// // //     Alert, Button, TextField, Paper, IconButton, List, ListItem,
// // //     Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
// // // } from '@mui/material';
// // // import SendIcon from '@mui/icons-material/Send';
// // // import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// // // import VideocamIcon from '@mui/icons-material/Videocam';
// // // import { styled } from '@mui/material/styles';
// // // import { format } from 'date-fns';

// // // const StyledMessageBox = styled(Box, {
// // //     shouldForwardProp: (prop) => prop !== 'isCurrentUser'
// // // })(({ theme, isCurrentUser }) => ({
// // //     maxWidth: '70%',
// // //     padding: theme.spacing(1.5),
// // //     marginBottom: theme.spacing(1),
// // //     marginLeft: isCurrentUser ? 'auto' : theme.spacing(1),
// // //     marginRight: isCurrentUser ? theme.spacing(1) : 'auto',
// // //     borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
// // //     backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.grey[200],
// // //     color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
// // //     wordBreak: 'break-word',
// // //     boxShadow: theme.shadows[1]
// // // }));

// // // const StyledTimestamp = styled(Typography)(({ theme }) => ({
// // //     fontSize: '0.75rem',
// // //     color: theme.palette.text.secondary,
// // //     textAlign: 'right',
// // //     marginTop: theme.spacing(0.5)
// // // }));

// // // const Chats = () => {
// // //     const { matchId } = useParams();
// // //     const navigate = useNavigate();
// // //     const [messages, setMessages] = useState([]);
// // //     const [newMessage, setNewMessage] = useState('');
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);
// // //     const [otherUser, setOtherUser] = useState(null);
// // //     const [matchDetails, setMatchDetails] = useState(null);
// // //     const messagesEndRef = useRef(null);
// // //     const [socket, setSocket] = useState(null);
// // //     const [otherUserTyping, setOtherUserTyping] = useState(false);
// // //     const typingTimeout = useRef();
// // //     const [socketConnected, setSocketConnected] = useState(false);
// // //     const [zoomLink, setZoomLink] = useState('');
// // //     const [videoCallDialogOpen, setVideoCallDialogOpen] = useState(false);

// // //     // Skill exchange states
// // //     const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
// // //     const [completionDialog, setCompletionDialog] = useState({
// // //         open: false,
// // //         isInitiator: false,
// // //         isConfirmed: false
// // //     });

// // //     const currentUser = JSON.parse(localStorage.getItem('user'));
// // //     const isExchangeCompleted = matchDetails?.status === 'completed';

// // //     // Initialize socket connection
// // //     useEffect(() => {
// // //         const newSocket = io('http://localhost:3001', {
// // //             withCredentials: true,
// // //             transports: ['websocket'],
// // //             reconnection: true,
// // //             reconnectionAttempts: 5,
// // //             reconnectionDelay: 1000,
// // //             reconnectionDelayMax: 5000
// // //         });

// // //         newSocket.on('connect', () => {
// // //             console.log('Socket connected');
// // //             setSocketConnected(true);
// // //         });

// // //         newSocket.on('disconnect', () => {
// // //             console.log('Socket disconnected');
// // //             setSocketConnected(false);
// // //         });

// // //         newSocket.on('connect_error', (err) => {
// // //             console.error('Socket connection error:', err);
// // //             setSocketConnected(false);
// // //             setTimeout(() => newSocket.connect(), 5000);
// // //         });

// // //         newSocket.on('reconnect_attempt', (attempt) => {
// // //             console.log(`Reconnection attempt ${attempt}`);
// // //         });

// // //         newSocket.on('reconnect_failed', () => {
// // //             console.error('Socket reconnection failed');
// // //             setError('Connection lost. Please refresh the page.');
// // //         });

// // //         setSocket(newSocket);

// // //         return () => {
// // //             newSocket.disconnect();
// // //         };
// // //     }, []);

// // //     // Setup socket event listeners
// // //     useEffect(() => {
// // //         if (!socket || !matchId || !socketConnected) return;

// // //         socket.emit('joinMatchRoom', matchId);

// // //         // Message handling
// // //         socket.on('newMessage', (message) => {
// // //             setMessages(prev => [...prev, {
// // //                 ...message,
// // //                 isCurrentUser: message.sender._id === currentUser._id
// // //             }]);
// // //         });

// // //         // Typing indicators
// // //         socket.on('userTyping', (data) => {
// // //             if (data.userId === otherUser?._id) {
// // //                 setOtherUserTyping(data.isTyping);
// // //             }
// // //         });

// // //         // Skill exchange completion
// // //         socket.on('skillExchangeCompletionRequest', (data) => {
// // //             if (data.initiatorId !== currentUser._id && !isExchangeCompleted) {
// // //                 setCompletionDialog({
// // //                     open: true,
// // //                     isInitiator: false,
// // //                     isConfirmed: false
// // //                 });
// // //             }
// // //         });

// // //         socket.on('skillExchangeConfirmed', (data) => {
// // //             setCompletionDialog(prev => ({
// // //                 ...prev,
// // //                 isConfirmed: true,
// // //                 open: false
// // //             }));
// // //             fetchMatchDetails();
// // //         });

// // //         return () => {
// // //             socket.off('newMessage');
// // //             socket.off('userTyping');
// // //             socket.off('skillExchangeCompletionRequest');
// // //             socket.off('skillExchangeConfirmed');
// // //         };
// // //     }, [socket, matchId, currentUser._id, otherUser?._id, isExchangeCompleted, socketConnected]);

// // //     // Video call placeholder function
// // //     const handleVideoCallClick = () => {
// // //         setVideoCallDialogOpen(true);
// // //     };

// // //     // Fetch match details and messages
// // //     const fetchMatchDetails = async () => {
// // //         try {
// // //             const matchRes = await axios.get(`/messages/match/${matchId}`);
// // //             setMatchDetails(matchRes.data.data);
// // //             setOtherUser(matchRes.data.data.requester._id === currentUser._id
// // //                 ? matchRes.data.data.receiver
// // //                 : matchRes.data.data.requester);
// // //         } catch (err) {
// // //             console.error('Error fetching match details:', err);
// // //         }
// // //     };

// // //     const fetchMessages = async () => {
// // //         try {
// // //             const messagesRes = await axios.get(`/chats/${matchId}`);
// // //             setMessages(messagesRes.data.data.map(msg => ({
// // //                 ...msg,
// // //                 isCurrentUser: msg.sender._id === currentUser._id
// // //             })));
// // //         } catch (err) {
// // //             console.error('Error fetching messages:', err);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 setLoading(true);
// // //                 await Promise.all([fetchMatchDetails(), fetchMessages()]);
// // //             } catch (err) {
// // //                 setError(err.response?.data?.message || 'Failed to load chat.');
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchData();
// // //     }, [matchId, currentUser._id]);

// // //     const handleSendMessage = async () => {
// // //         if (!newMessage.trim()) return;

// // //         try {
// // //             if (typingTimeout.current) {
// // //                 clearTimeout(typingTimeout.current);
// // //                 typingTimeout.current = null;
// // //             }

// // //             if (socketConnected) {
// // //                 socket.emit('typing', {
// // //                     matchId,
// // //                     userId: currentUser._id,
// // //                     isTyping: false
// // //                 });
// // //             }

// // //             await axios.post('/chats/send', {
// // //                 matchId,
// // //                 senderId: currentUser._id,
// // //                 receiverId: otherUser._id,
// // //                 content: newMessage
// // //             });

// // //             setNewMessage('');
// // //         } catch (err) {
// // //             console.error('Error sending message:', err);
// // //             setError('Failed to send message. Please try again.');
// // //         }
// // //     };

// // //     const handleConfirmSkillExchange = async () => {
// // //         try {
// // //             await axios.post('/messages/complete', {
// // //                 matchId,
// // //                 userId: currentUser._id
// // //             });

// // //             if (completionDialog.isInitiator) {
// // //                 setOpenConfirmDialog(false);
// // //                 setCompletionDialog(prev => ({ ...prev, open: false }));
// // //             } else {
// // //                 setCompletionDialog(prev => ({
// // //                     ...prev,
// // //                     isConfirmed: true,
// // //                     open: false
// // //                 }));
// // //                 fetchMatchDetails();
// // //             }
// // //         } catch (err) {
// // //             console.error('Error completing skill exchange:', err);
// // //             setError('Failed to complete skill exchange. Please try again.');
// // //         }
// // //     };

// // //     const scrollToBottom = () => {
// // //         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // //     };

// // //     useEffect(() => {
// // //         scrollToBottom();
// // //     }, [messages]);

// // //     if (loading) {
// // //         return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// // //             <CircularProgress />
// // //         </Box>;
// // //     }

// // //     if (error) {
// // //         return <Container maxWidth="md" sx={{ py: 4 }}>
// // //             <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
// // //             <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
// // //         </Container>;
// // //     }

// // //     return (
// // //         <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f7fa' }}>
// // //             {/* Header */}
// // //             <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
// // //                 <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}><ArrowBackIcon /></IconButton>
// // //                 <Avatar src={otherUser?.profilePic ? `http://localhost:3000/${otherUser.profilePic}` : '/default-avatar.png'} sx={{ width: 48, height: 48, mr: 2 }} />
// // //                 <Box>
// // //                     <Typography variant="h6" fontWeight="600">{otherUser?.userName || 'Unknown User'}</Typography>
// // //                     <Typography variant="body2" color="textSecondary">
// // //                         {otherUser?.status ? 'Online' : 'Offline'}
// // //                         {!socketConnected && ' • Connecting...'}
// // //                     </Typography>
// // //                 </Box>

// // //                 {/* Video Call Button */}
// // //                 <IconButton
// // //                     color="primary"
// // //                     sx={{ ml: 2 }}
// // //                     onClick={handleVideoCallClick}
// // //                     disabled={isExchangeCompleted || !socketConnected}
// // //                 >
// // //                     <VideocamIcon />
// // //                 </IconButton>

// // //                 <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'block' } }}>
// // //                     <Chip label={`You teach: ${matchDetails?.requester._id === currentUser._id ? matchDetails?.requesterSkillOffered : matchDetails?.receiverSkillOffered}`} color="primary" size="small" sx={{ mr: 1 }} />
// // //                     <Chip label={`Learn: ${matchDetails?.requester._id === currentUser._id ? matchDetails?.receiverSkillOffered : matchDetails?.requesterSkillOffered}`} color="secondary" size="small" />
// // //                 </Box>

// // //                 {!isExchangeCompleted ? (
// // //                     <Button variant="contained" color="success" onClick={() => {
// // //                         setCompletionDialog({ open: true, isInitiator: true, isConfirmed: false });
// // //                         setOpenConfirmDialog(true);
// // //                     }} sx={{ ml: 2, whiteSpace: 'nowrap', display: { xs: 'none', md: 'block' } }}>
// // //                         Skill Exchange Completed
// // //                     </Button>
// // //                 ) : (
// // //                     <Chip label="Exchange Completed" color="success" sx={{ ml: 2, whiteSpace: 'nowrap', display: { xs: 'none', md: 'flex' } }} />
// // //                 )}
// // //             </Paper>

// // //             {/* Messages area */}
// // //             <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
// // //                 {messages.length === 0 ? (
// // //                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', textAlign: 'center' }}>
// // //                         <Typography variant="h6" color="textSecondary" gutterBottom>No messages yet</Typography>
// // //                         <Typography variant="body1" color="textSecondary">Start your skill exchange by sending your first message!</Typography>
// // //                     </Box>
// // //                 ) : (
// // //                     <>
// // //                         <List sx={{ width: '100%' }}>
// // //                             {messages.map((message) => (
// // //                                 <ListItem key={message._id} sx={{ display: 'flex', flexDirection: 'column', alignItems: message.isCurrentUser ? 'flex-end' : 'flex-start', px: 0, width: '100%' }}>
// // //                                     <StyledMessageBox isCurrentUser={message.isCurrentUser}>
// // //                                         <Typography>{message.content}</Typography>
// // //                                         <StyledTimestamp>{format(new Date(message.createdAt), 'h:mm a · MMM d')}</StyledTimestamp>
// // //                                     </StyledMessageBox>
// // //                                 </ListItem>
// // //                             ))}
// // //                             <div ref={messagesEndRef} />
// // //                         </List>
// // //                         {otherUserTyping && (
// // //                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 1 }}>
// // //                                 <Typography variant="caption" color="textSecondary" style={{ fontSize: "large" }}>
// // //                                     {otherUser?.userName} is typing...
// // //                                 </Typography>
// // //                             </Box>
// // //                         )}
// // //                     </>
// // //                 )}
// // //             </Box>

// // //             {/* Message input */}
// // //             <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
// // //                 <TextField
// // //                     fullWidth
// // //                     variant="outlined"
// // //                     placeholder="Type your message..."
// // //                     multiline
// // //                     maxRows={4}
// // //                     value={newMessage}
// // //                     onChange={(e) => {
// // //                         setNewMessage(e.target.value);
// // //                         if (socketConnected) {
// // //                             if (typingTimeout.current) clearTimeout(typingTimeout.current);
// // //                             socket.emit('typing', { matchId, userId: currentUser._id, isTyping: true });
// // //                             typingTimeout.current = setTimeout(() => {
// // //                                 socket.emit('typing', { matchId, userId: currentUser._id, isTyping: false });
// // //                             }, 2000);
// // //                         }
// // //                     }}
// // //                     onKeyPress={(e) => {
// // //                         if (e.key === 'Enter' && !e.shiftKey) {
// // //                             e.preventDefault();
// // //                             handleSendMessage();
// // //                         }
// // //                     }}
// // //                     sx={{ mr: 2, '& .MuiOutlinedInput-root': { borderRadius: '24px', backgroundColor: '#f5f5f5' } }}
// // //                 />
// // //                 <IconButton
// // //                     color="primary"
// // //                     onClick={handleSendMessage}
// // //                     disabled={!newMessage.trim()}
// // //                     sx={{
// // //                         backgroundColor: '#4caf50',
// // //                         color: 'white',
// // //                         '&:hover': { backgroundColor: '#3d8b40' },
// // //                         '&:disabled': { backgroundColor: '#e0e0e0', color: '#9e9e9e' }
// // //                     }}
// // //                 >
// // //                     <SendIcon />
// // //                 </IconButton>
// // //             </Paper>

// // //             {/* Video Call Dialog */}
// // //             <Dialog open={videoCallDialogOpen} onClose={() => setVideoCallDialogOpen(false)}>
// // //                 <DialogTitle>Video Call Feature Coming Soon</DialogTitle>
// // //                 <DialogContent>
// // //                     <DialogContentText>
// // //                         The video call functionality is currently under development. You'll be able to use it soon!
// // //                     </DialogContentText>
// // //                     <DialogContentText sx={{ mt: 2 }}>
// // //                         In the meantime, you can use Zoom or another video conferencing tool to communicate live with each other.
// // //                     </DialogContentText>
// // //                     {/* <TextField
// // //                         fullWidth
// // //                         variant="outlined"
// // //                         label="Zoom Meeting Link"
// // //                         placeholder="Paste your Zoom meeting link here"
// // //                         value={zoomLink}
// // //                         onChange={(e) => setZoomLink(e.target.value)}
// // //                         sx={{ mt: 2 }}
// // //                     /> */}
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setVideoCallDialogOpen(false)}>Close</Button>
// // //                     {/* <Button 
// // //                         onClick={() => {
// // //                             if (zoomLink) {
// // //                                 window.open(zoomLink, '_blank');
// // //                             }
// // //                         }}
// // //                         color="primary"
// // //                         variant="contained"
// // //                         disabled={!zoomLink}
// // //                     >
// // //                         Join Zoom Meeting
// // //                     </Button> */}
// // //                 </DialogActions>
// // //             </Dialog>

// // //             {/* Skill Exchange Dialogs */}
// // //             <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
// // //                 <DialogTitle>Confirm Skill Exchange Completion</DialogTitle>
// // //                 <DialogContent>
// // //                     <DialogContentText>
// // //                         Are you sure you've successfully exchanged skills with {otherUser?.userName || 'this user'}?
// // //                         The other user will need to confirm as well.
// // //                     </DialogContentText>
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
// // //                     <Button onClick={handleConfirmSkillExchange} color="success" variant="contained" autoFocus>
// // //                         Confirm
// // //                     </Button>
// // //                 </DialogActions>
// // //             </Dialog>

// // //             <Dialog open={completionDialog.open && !completionDialog.isInitiator} onClose={() => setCompletionDialog(prev => ({ ...prev, open: false }))}>
// // //                 <DialogTitle>Skill Exchange Completion Request</DialogTitle>
// // //                 <DialogContent>
// // //                     <DialogContentText>
// // //                         {otherUser?.userName} has marked the skill exchange as completed.
// // //                         Do you confirm that the skill exchange is completed?
// // //                     </DialogContentText>
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setCompletionDialog(prev => ({ ...prev, open: false }))}>No</Button>
// // //                     <Button onClick={handleConfirmSkillExchange} color="primary" variant="contained">
// // //                         Yes, Confirm
// // //                     </Button>
// // //                 </DialogActions>
// // //             </Dialog>

// // //             <Dialog open={completionDialog.isConfirmed} onClose={() => setCompletionDialog(prev => ({ ...prev, isConfirmed: false }))}>
// // //                 <DialogTitle>Skill Exchange Completed</DialogTitle>
// // //                 <DialogContent>
// // //                     <DialogContentText>
// // //                         The skill exchange has been successfully marked as completed by both parties.
// // //                     </DialogContentText>
// // //                 </DialogContent>
// // //                 <DialogActions>
// // //                     <Button onClick={() => setCompletionDialog(prev => ({ ...prev, isConfirmed: false }))} color="primary" variant="contained">
// // //                         OK
// // //                     </Button>
// // //                 </DialogActions>
// // //             </Dialog>
// // //         </Box>
// // //     );
// // // };

// // // export default Chats;

// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import io from 'socket.io-client';
// import {
//     Box, Container, Typography, Avatar, Divider, CircularProgress,
//     Alert, Button, TextField, Paper, IconButton, List, ListItem,
//     Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import { styled } from '@mui/material/styles';
// import { format } from 'date-fns';

// const StyledMessageBox = styled(Box, {
//     shouldForwardProp: (prop) => prop !== 'isCurrentUser'
// })(({ theme, isCurrentUser }) => ({
//     maxWidth: '70%',
//     padding: theme.spacing(1.5),
//     marginBottom: theme.spacing(1),
//     marginLeft: isCurrentUser ? 'auto' : theme.spacing(1),
//     marginRight: isCurrentUser ? theme.spacing(1) : 'auto',
//     borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
//     backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.grey[200],
//     color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
//     wordBreak: 'break-word',
//     boxShadow: theme.shadows[1]
// }));

// const StyledTimestamp = styled(Typography)(({ theme }) => ({
//     fontSize: '0.75rem',
//     color: theme.palette.text.secondary,
//     textAlign: 'right',
//     marginTop: theme.spacing(0.5)
// }));

// const Chats = () => {
//     const { matchId } = useParams();
//     const navigate = useNavigate();
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [otherUser, setOtherUser] = useState(null);
//     const [matchDetails, setMatchDetails] = useState(null);
//     const messagesEndRef = useRef(null);
//     const [socket, setSocket] = useState(null);
//     const [socketConnected, setSocketConnected] = useState(false);
//     const [videoCallDialogOpen, setVideoCallDialogOpen] = useState(false);
//     const [otherUserTyping, setOtherUserTyping] = useState(false);
//     const typingTimeout = useRef();

//     // Skill exchange states
//     const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//     const [completionDialog, setCompletionDialog] = useState({
//         open: false,
//         isInitiator: false,
//         isConfirmed: false
//     });

//     const currentUser = JSON.parse(localStorage.getItem('user'));
//     const isExchangeCompleted = matchDetails?.status === 'completed';

//     // Initialize socket connection
//     useEffect(() => {
//         const newSocket = io('http://localhost:3001', {
//             withCredentials: true,
//             transports: ['websocket'],
//             reconnection: true,
//             reconnectionAttempts: 5,
//             reconnectionDelay: 1000,
//             reconnectionDelayMax: 5000
//         });

//         newSocket.on('connect', () => {
//             console.log('Socket connected');
//             setSocketConnected(true);
//         });

//         newSocket.on('disconnect', () => {
//             console.log('Socket disconnected');
//             setSocketConnected(false);
//         });

//         newSocket.on('connect_error', (err) => {
//             console.error('Socket connection error:', err);
//             setSocketConnected(false);
//             setTimeout(() => newSocket.connect(), 5000);
//         });

//         newSocket.on('reconnect_attempt', (attempt) => {
//             console.log(`Reconnection attempt ${attempt}`);
//         });

//         newSocket.on('reconnect_failed', () => {
//             console.error('Socket reconnection failed');
//             setError('Connection lost. Please refresh the page.');
//         });

//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     // Setup socket event listeners
//     useEffect(() => {
//         if (!socket || !matchId || !socketConnected) return;

//         socket.emit('joinMatchRoom', matchId);

//         // Message handling
//         socket.on('newMessage', (message) => {
//             setMessages(prev => [...prev, {
//                 ...message,
//                 isCurrentUser: message.sender._id === currentUser._id
//             }]);
//         });

//         // Typing indicators
//     socket.on('userTyping', (data) => {
//         if (data.userId === otherUser?._id) {
//             setOtherUserTyping(data.isTyping);
//         }
//     });

//         // Skill exchange completion
//         socket.on('skillExchangeCompletionRequest', (data) => {
//             if (data.initiatorId !== currentUser._id && !isExchangeCompleted) {
//                 setCompletionDialog({
//                     open: true,
//                     isInitiator: false,
//                     isConfirmed: false
//                 });
//             }
//         });

//         socket.on('skillExchangeConfirmed', (data) => {
//             setCompletionDialog(prev => ({
//                 ...prev,
//                 isConfirmed: true,
//                 open: false
//             }));
//             fetchMatchDetails();
//         });

//         return () => {
//             socket.off('newMessage');
//             socket.off('userTyping');
//             socket.off('skillExchangeCompletionRequest');
//             socket.off('skillExchangeConfirmed');
//         };
//     }, [socket, matchId, currentUser._id, otherUser?._id, isExchangeCompleted, socketConnected]);

//     // Video call placeholder function
//     const handleVideoCallClick = () => {
//         setVideoCallDialogOpen(true);
//     };

//     // Fetch match details and messages
//     const fetchMatchDetails = async () => {
//         try {
//             const matchRes = await axios.get(`/messages/match/${matchId}`);
//             setMatchDetails(matchRes.data.data);
//             setOtherUser(matchRes.data.data.requester._id === currentUser._id
//                 ? matchRes.data.data.receiver
//                 : matchRes.data.data.requester);
//         } catch (err) {
//             console.error('Error fetching match details:', err);
//         }
//     };

//     const fetchMessages = async () => {
//         try {
//             const messagesRes = await axios.get(`/chats/${matchId}`);
//             setMessages(messagesRes.data.data.map(msg => ({
//                 ...msg,
//                 isCurrentUser: msg.sender._id === currentUser._id
//             })));
//         } catch (err) {
//             console.error('Error fetching messages:', err);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 await Promise.all([fetchMatchDetails(), fetchMessages()]);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load chat.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [matchId, currentUser._id]);

//     const handleSendMessage = async () => {
//         if (!newMessage.trim()) return;

//         try {
//             await axios.post('/chats/send', {
//                 matchId,
//                 senderId: currentUser._id,
//                 receiverId: otherUser._id,
//                 content: newMessage
//             });

//             setNewMessage('');
//         } catch (err) {
//             console.error('Error sending message:', err);
//             setError('Failed to send message. Please try again.');
//         }
//     };

//     const handleConfirmSkillExchange = async () => {
//         try {
//             const response = await axios.post('/messages/complete', {
//                 matchId,
//                 userId: currentUser._id
//             });

//             if (completionDialog.isInitiator) {
//                 setOpenConfirmDialog(false);
//                 setCompletionDialog(prev => ({ ...prev, open: false }));
//             } else {
//                 setCompletionDialog(prev => ({
//                     ...prev,
//                     isConfirmed: true,
//                     open: false
//                 }));
//                 fetchMatchDetails();
//             }
//         } catch (err) {
//             console.error('Error completing skill exchange:', err);
//             setError('Failed to complete skill exchange. Please try again.');
//         }
//     };

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//             <CircularProgress />
//         </Box>;
//     }

//     if (error) {
//         return <Container maxWidth="md" sx={{ py: 4 }}>
//             <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
//             <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
//         </Container>;
//     }

//     return (
//         <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f7fa' }}>
//             {/* Header */}
//             <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
//                 <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}><ArrowBackIcon /></IconButton>
//                 <Avatar src={otherUser?.profilePic ? `http://localhost:3000/${otherUser.profilePic}` : '/default-avatar.png'} sx={{ width: 48, height: 48, mr: 2 }} />
//                 <Box>
//                     <Typography variant="h6" fontWeight="600">{otherUser?.userName || 'Unknown User'}</Typography>
//                     <Typography variant="body2" color="textSecondary">
//                         {otherUser?.status ? 'Online' : 'Offline'}
//                         {!socketConnected && ' • Connecting...'}
//                     </Typography>
//                 </Box>

//                 {/* Video Call Button */}
//                 <IconButton
//                     color="primary"
//                     sx={{ ml: 2 }}
//                     onClick={handleVideoCallClick}
//                     disabled={isExchangeCompleted || !socketConnected}
//                 >
//                     <VideocamIcon />
//                 </IconButton>

//                 <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'block' } }}>
//                     <Chip label={`You teach: ${matchDetails?.requester._id === currentUser._id ? matchDetails?.requesterSkillOffered : matchDetails?.receiverSkillOffered}`} color="primary" size="small" sx={{ mr: 1 }} />
//                     <Chip label={`Learn: ${matchDetails?.requester._id === currentUser._id ? matchDetails?.receiverSkillOffered : matchDetails?.requesterSkillOffered}`} color="secondary" size="small" />
//                 </Box>

//                 {!isExchangeCompleted ? (
//                     <Button variant="contained" color="success" onClick={() => {
//                         setCompletionDialog({ open: true, isInitiator: true, isConfirmed: false });
//                         setOpenConfirmDialog(true);
//                     }} sx={{ ml: 2, whiteSpace: 'nowrap', display: { xs: 'none', md: 'block' } }}>
//                         Skill Exchange Completed
//                     </Button>
//                 ) : (
//                     <Chip label="Exchange Completed" color="success" sx={{ ml: 2, whiteSpace: 'nowrap', display: { xs: 'none', md: 'flex' } }} />
//                 )}
//             </Paper>

//             {/* Messages area */}
//             <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
//                 {messages.length === 0 ? (
//                     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', textAlign: 'center' }}>
//                         <Typography variant="h6" color="textSecondary" gutterBottom>No messages yet</Typography>
//                         <Typography variant="body1" color="textSecondary">Start your skill exchange by sending your first message!</Typography>
//                     </Box>
//                 ) : (
//                     <>
//                         <List sx={{ width: '100%' }}>
//                             {messages.map((message) => (
//                                 <ListItem key={message._id} sx={{ display: 'flex', flexDirection: 'column', alignItems: message.isCurrentUser ? 'flex-end' : 'flex-start', px: 0, width: '100%' }}>
//                                     <StyledMessageBox isCurrentUser={message.isCurrentUser}>
//                                         <Typography>{message.content}</Typography>
//                                         <StyledTimestamp>{format(new Date(message.createdAt), 'h:mm a · MMM d')}</StyledTimestamp>
//                                     </StyledMessageBox>
//                                 </ListItem>
//                             ))}
//                             <div ref={messagesEndRef} />
//                         </List>
//                         {otherUserTyping && (
//                             <Box sx={{ 
//                                 display: 'flex', 
//                                 alignItems: 'center', 
//                                 mb: 1, 
//                                 ml: 1,
//                                 height: '24px' // Ensure consistent height
//                             }}>
//                                 <Typography 
//                                     variant="caption" 
//                                     color="textSecondary" 
//                                     sx={{ 
//                                         fontSize: '0.875rem',
//                                         fontStyle: 'italic'
//                                     }}
//                                 >
//                                     {otherUser?.userName || 'User'} is typing...
//                                 </Typography>
//                             </Box>
//                         )}
//                     </>
//                 )}
//             </Box>

//             {/* Message input */}
//             <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="Type your message..."
//                     multiline
//                     maxRows={4}
//                     value={newMessage}
//                     onChange={(e) => {
//                         setNewMessage(e.target.value);
//                         if (socketConnected) {
//                             if (typingTimeout.current) clearTimeout(typingTimeout.current);
//                             socket.emit('typing', {
//                                 matchId,
//                                 userId: currentUser._id,
//                                 isTyping: true
//                             });
//                             typingTimeout.current = setTimeout(() => {
//                                 socket.emit('typing', {
//                                     matchId,
//                                     userId: currentUser._id,
//                                     isTyping: false
//                                 });
//                             }, 2000);
//                         }
//                     }}
//                     //    onChange={(e) => {
//                     //                                 setNewMessage(e.target.value);
//                     //                                 if (socketConnected) {
//                     //                                     if (typingTimeout.current) clearTimeout(typingTimeout.current);
//                     //                                     socket.emit('typing', { matchId, userId: currentUser._id, isTyping: true });
//                     //                                     typingTimeout.current = setTimeout(() => {
//                     //                                         socket.emit('typing', { matchId, userId: currentUser._id, isTyping: false });
//                     //                                     }, 2000);
//                     //                                 }
//                     // }}
//                     onKeyPress={(e) => {
//                         if (e.key === 'Enter' && !e.shiftKey) {
//                             e.preventDefault();
//                             handleSendMessage();
//                         }
//                     }}
//                     sx={{ mr: 2, '& .MuiOutlinedInput-root': { borderRadius: '24px', backgroundColor: '#f5f5f5' } }}
//                 />
//                 <IconButton
//                     color="primary"
//                     onClick={handleSendMessage}
//                     disabled={!newMessage.trim()}
//                     sx={{
//                         backgroundColor: '#4caf50',
//                         color: 'white',
//                         '&:hover': { backgroundColor: '#3d8b40' },
//                         '&:disabled': { backgroundColor: '#e0e0e0', color: '#9e9e9e' }
//                     }}
//                 >
//                     <SendIcon />
//                 </IconButton>
//             </Paper>

//             {/* Video Call Dialog */}
//             <Dialog open={videoCallDialogOpen} onClose={() => setVideoCallDialogOpen(false)}>
//                 <DialogTitle>Video Call Feature Coming Soon</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         The video call functionality is currently under development. You'll be able to use it soon!
//                     </DialogContentText>
//                     <DialogContentText sx={{ mt: 2 }}>
//                         In the meantime, you can use Zoom or another video conferencing tool to communicate live with each other.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setVideoCallDialogOpen(false)}>Close</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Skill Exchange Dialogs */}
//             <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
//                 <DialogTitle>Confirm Skill Exchange Completion</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you've successfully exchanged skills with {otherUser?.userName || 'this user'}?
//                         The other user will need to confirm as well.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
//                     <Button onClick={handleConfirmSkillExchange} color="success" variant="contained" autoFocus>
//                         Confirm
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={completionDialog.open && !completionDialog.isInitiator} onClose={() => setCompletionDialog(prev => ({ ...prev, open: false }))}>
//                 <DialogTitle>Skill Exchange Completion Request</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         {otherUser?.userName} has marked the skill exchange as completed.
//                         Do you confirm that the skill exchange is completed?
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setCompletionDialog(prev => ({ ...prev, open: false }))}>No</Button>
//                     <Button onClick={handleConfirmSkillExchange} color="primary" variant="contained">
//                         Yes, Confirm
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={completionDialog.isConfirmed} onClose={() => setCompletionDialog(prev => ({ ...prev, isConfirmed: false }))}>
//                 <DialogTitle>Skill Exchange Completed</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         The skill exchange has been successfully marked as completed by both parties.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setCompletionDialog(prev => ({ ...prev, isConfirmed: false }))} color="primary" variant="contained">
//                         OK
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Chats;

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import {
    Box, Container, Typography, Avatar, Divider, CircularProgress,
    Alert, Button, TextField, Paper, IconButton, List, ListItem,
    Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';

const StyledMessageBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isCurrentUser'
})(({ theme, isCurrentUser }) => ({
    maxWidth: '70%',
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    marginLeft: isCurrentUser ? 'auto' : theme.spacing(1),
    marginRight: isCurrentUser ? theme.spacing(1) : 'auto',
    borderRadius: isCurrentUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
    backgroundColor: isCurrentUser ? theme.palette.primary.main : theme.palette.grey[200],
    color: isCurrentUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
    wordBreak: 'break-word',
    boxShadow: theme.shadows[1]
}));

const StyledTimestamp = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    textAlign: 'right',
    marginTop: theme.spacing(0.5)
}));

const Chats = () => {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [otherUser, setOtherUser] = useState(null);
    const [matchDetails, setMatchDetails] = useState(null);
    const messagesEndRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [videoCallDialogOpen, setVideoCallDialogOpen] = useState(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const typingTimeout = useRef();
    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null);

    // Skill exchange states
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [completionDialog, setCompletionDialog] = useState({
        open: false,
        isInitiator: false,
        isConfirmed: false
    });

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const isExchangeCompleted = matchDetails?.status === 'completed';

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io('http://localhost:3001', {
            withCredentials: true,
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000
        });

        newSocket.on('connect', () => {
            console.log('Socket connected');
            setSocketConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
            setSocketConnected(false);
        });

        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
            setSocketConnected(false);
            setTimeout(() => newSocket.connect(), 5000);
        });

        newSocket.on('reconnect_attempt', (attempt) => {
            console.log(`Reconnection attempt ${attempt}`);
        });

        newSocket.on('reconnect_failed', () => {
            console.error('Socket reconnection failed');
            setError('Connection lost. Please refresh the page.');
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Setup socket event listeners
    useEffect(() => {
        if (!socket || !matchId || !socketConnected) return;

        socket.emit('joinMatchRoom', matchId);

        // Message handling
        socket.on('newMessage', (message) => {
            setMessages(prev => [...prev, {
                ...message,
                isCurrentUser: message.sender._id === currentUser._id
            }]);
        });

        // Typing indicators
        socket.on('userTyping', (data) => {
            if (data.userId === otherUser?._id) {
                setOtherUserTyping(data.isTyping);
            }
        });

        // Skill exchange completion
        socket.on('skillExchangeCompletionRequest', (data) => {
            if (data.initiatorId !== currentUser._id && !isExchangeCompleted) {
                setCompletionDialog({
                    open: true,
                    isInitiator: false,
                    isConfirmed: false
                });
            }
        });

        socket.on('skillExchangeConfirmed', (data) => {
            setCompletionDialog(prev => ({
                ...prev,
                isConfirmed: true,
                open: false
            }));
            fetchMatchDetails();
        });

        return () => {
            socket.off('newMessage');
            socket.off('userTyping');
            socket.off('skillExchangeCompletionRequest');
            socket.off('skillExchangeConfirmed');
        };
    }, [socket, matchId, currentUser._id, otherUser?._id, isExchangeCompleted, socketConnected]);

    // Add this useEffect hook to check user status periodically
    useEffect(() => {
        if (!otherUser?._id) return;

        const checkStatus = async () => {
            try {
                const response = await axios.get(`/users/check-status/${otherUser._id}`);
                // Update your state based on the response
                // You might want to add a status field to your otherUser state
                setOtherUser(prev => ({
                    ...prev,
                    online: response.data.online,
                    lastActive: new Date(response.data.lastActive)
                }));
            } catch (err) {
                console.error("Error checking user status:", err);
            }
        };

        // Check immediately
        checkStatus();

        // Then check every 30 seconds
        const interval = setInterval(checkStatus, 30000);

        return () => clearInterval(interval);
    }, [otherUser?._id]);

    // Also update your socket connection to handle status updates
    useEffect(() => {
        if (!socket || !socketConnected) return;

        socket.on('userStatusChange', (data) => {
            if (data.userId === otherUser?._id) {
                // Update the status in your UI
                setOtherUser(prev => ({
                    ...prev,
                    status: data.status,
                    lastActive: new Date(data.lastActive)
                }));
            }
        });

        return () => {
            socket.off('userStatusChange');
        };
    }, [socket,  otherUser?._id]);

    // Register user with socket when component mounts
useEffect(() => {
    if (socket && socketConnected && currentUser?._id) {
        socket.emit('registerUser', currentUser._id);
    }

    return () => {
        // Clean up on unmount if needed
    };
}, [socket, socketConnected, currentUser?._id]);


    // Video call placeholder function
    const handleVideoCallClick = () => {
        setVideoCallDialogOpen(true);
    };

    // File attachment handlers
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(files);
    };

    const handleRemoveAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    // Fetch match details and messages
    const fetchMatchDetails = async () => {
        try {
            const matchRes = await axios.get(`/messages/match/${matchId}`);
            setMatchDetails(matchRes.data.data);
            setOtherUser(matchRes.data.data.requester._id === currentUser._id
                ? matchRes.data.data.receiver
                : matchRes.data.data.requester);
        } catch (err) {
            console.error('Error fetching match details:', err);
        }
    };

    const fetchMessages = async () => {
        try {
            const messagesRes = await axios.get(`/chats/${matchId}`);
            setMessages(messagesRes.data.data.map(msg => ({
                ...msg,
                isCurrentUser: msg.sender._id === currentUser._id
            })));
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([fetchMatchDetails(), fetchMessages()]);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load chat.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [matchId, currentUser._id]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() && attachments.length === 0) return;

        try {
            const formData = new FormData();
            formData.append('matchId', matchId);
            formData.append('senderId', currentUser._id);
            formData.append('receiverId', otherUser._id);
            if (newMessage.trim()) {
                formData.append('content', newMessage);
            }

            attachments.forEach((file, index) => {
                formData.append(`attachments`, file);
            });

            await axios.post('/chats/send', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setNewMessage('');
            setAttachments([]);
        } catch (err) {
            console.error('Error sending message:', err);
            setError('Failed to send message. Please try again.');
        }
    };

    const handleConfirmSkillExchange = async () => {
        try {
            const response = await axios.post('/messages/complete', {
                matchId,
                userId: currentUser._id
            });

            if (completionDialog.isInitiator) {
                setOpenConfirmDialog(false);
                setCompletionDialog(prev => ({ ...prev, open: false }));
            } else {
                setCompletionDialog(prev => ({
                    ...prev,
                    isConfirmed: true,
                    open: false
                }));
                fetchMatchDetails();
            }
        } catch (err) {
            console.error('Error completing skill exchange:', err);
            setError('Failed to complete skill exchange. Please try again.');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>;
    }

    if (error) {
        return <Container maxWidth="md" sx={{ py: 4 }}>
            <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
            <Button variant="contained" onClick={() => navigate(-1)}>Go Back</Button>
        </Container>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f7fa' }}>
            {/* Header */}
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}><ArrowBackIcon /></IconButton>
                <Avatar src={otherUser?.profilePic ? `http://localhost:3000/${otherUser.profilePic}` : '/default-avatar.png'} sx={{ width: 48, height: 48, mr: 2 }} />
                <Box>
                    <Typography variant="h6" fontWeight="600">{otherUser?.userName || 'Unknown User'}</Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                        {otherUser?.status ? 'Online' : 'Offline'}
                        {!socketConnected && ' • Connecting...'}
                    </Typography> */}
                    <Typography variant="body2" color="textSecondary">
                        {otherUser?.status === 'active' &&
                            (new Date() - new Date(otherUser?.lastActive)) < (5 * 60 * 1000)
                            ? 'Online'
                            : 'Offline'}
                        {!socketConnected && ' • Connecting...'}
                    </Typography>
                </Box>

                {/* Video Call Button */}
                <IconButton
                    color="primary"
                    sx={{ ml: 2 }}
                    onClick={handleVideoCallClick}
                    disabled={isExchangeCompleted || !socketConnected}
                >
                    <VideocamIcon />
                </IconButton>

                <Box sx={{ ml: 'auto', display: { xs: 'none', sm: 'block' } }}>
                    <Chip label={`You teach: ${matchDetails?.requester._id === currentUser._id ? matchDetails?.requesterSkillOffered : matchDetails?.receiverSkillOffered}`} color="primary" size="small" sx={{ mr: 1 }} />
                    <Chip label={`Learn: ${matchDetails?.requester._id === currentUser._id ? matchDetails?.receiverSkillOffered : matchDetails?.requesterSkillOffered}`} color="secondary" size="small" />
                </Box>

                {!isExchangeCompleted ? (
                    <Button variant="contained" color="success" onClick={() => {
                        setCompletionDialog({ open: true, isInitiator: true, isConfirmed: false });
                        setOpenConfirmDialog(true);
                    }} sx={{ ml: 2, whiteSpace: 'nowrap', display: { xs: 'none', md: 'block' } }}>
                        Skill Exchange Completed
                    </Button>
                ) : (
                    <Chip label="Exchange Completed" color="success" sx={{ ml: 2, whiteSpace: 'nowrap', display: { xs: 'none', md: 'flex' } }} />
                )}
            </Paper>

            {/* Messages area */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                {messages.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60%', textAlign: 'center' }}>
                        <Typography variant="h6" color="textSecondary" gutterBottom>No messages yet</Typography>
                        <Typography variant="body1" color="textSecondary">Start your skill exchange by sending your first message!</Typography>
                    </Box>
                ) : (
                    <>
                        <List sx={{ width: '100%' }}>
                            {messages.map((message) => (
                                <ListItem key={message._id} sx={{ display: 'flex', flexDirection: 'column', alignItems: message.isCurrentUser ? 'flex-end' : 'flex-start', px: 0, width: '100%' }}>
                                    <StyledMessageBox isCurrentUser={message.isCurrentUser}>
                                        {message.content && <Typography>{message.content}</Typography>}
                                        {message.attachments && message.attachments.length > 0 && (
                                            <Box sx={{ mt: 1 }}>
                                                {message.attachments.map((attachment, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            mt: 1,
                                                            p: 1,
                                                            border: '1px solid #e0e0e0',
                                                            borderRadius: 1,
                                                            backgroundColor: message.isCurrentUser ? 'rgba(255,255,255,0.2)' : 'white'
                                                        }}
                                                    >
                                                        <a
                                                            href={`http://localhost:3000${attachment.url}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                textDecoration: 'none',
                                                                color: message.isCurrentUser ? 'white' : 'inherit'
                                                            }}
                                                        >
                                                            {attachment.fileType.startsWith('image/') ? (
                                                                <ImageIcon sx={{ mr: 1 }} />
                                                            ) : (
                                                                <InsertDriveFileIcon sx={{ mr: 1 }} />
                                                            )}
                                                            <Typography variant="body2">{attachment.fileName}</Typography>
                                                        </a>
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                        <StyledTimestamp>{format(new Date(message.createdAt), 'h:mm a · MMM d')}</StyledTimestamp>
                                    </StyledMessageBox>
                                </ListItem>
                            ))}
                            <div ref={messagesEndRef} />
                        </List>
                        {otherUserTyping && (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1,
                                ml: 1,
                                height: '24px'
                            }}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    sx={{
                                        fontSize: '0.875rem',
                                        fontStyle: 'italic'
                                    }}
                                >
                                    {otherUser?.userName || 'User'} is typing...
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Box>

            {/* Message input */}
            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
                <IconButton
                    onClick={() => fileInputRef.current.click()}
                    sx={{ mr: 1 }}
                >
                    <AttachFileIcon />
                </IconButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                />

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    multiline
                    maxRows={4}
                    value={newMessage}
                    onChange={(e) => {
                        setNewMessage(e.target.value);
                        if (socketConnected) {
                            if (typingTimeout.current) clearTimeout(typingTimeout.current);
                            socket.emit('typing', {
                                matchId,
                                userId: currentUser._id,
                                isTyping: true
                            });
                            typingTimeout.current = setTimeout(() => {
                                socket.emit('typing', {
                                    matchId,
                                    userId: currentUser._id,
                                    isTyping: false
                                });
                            }, 2000);
                        }
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    sx={{ mr: 2, '& .MuiOutlinedInput-root': { borderRadius: '24px', backgroundColor: '#f5f5f5' } }}
                />
                <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() && attachments.length === 0}
                    sx={{
                        backgroundColor: '#4caf50',
                        color: 'white',
                        '&:hover': { backgroundColor: '#3d8b40' },
                        '&:disabled': { backgroundColor: '#e0e0e0', color: '#9e9e9e' }
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Paper>

            {/* Selected attachments preview */}
            {attachments.length > 0 && (
                <Box sx={{ p: 1, backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}>
                    {attachments.map((file, index) => (
                        <Box key={index} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            p: 1,
                            backgroundColor: 'white',
                            borderRadius: 1,
                            boxShadow: 1
                        }}>
                            {file.type.startsWith('image/') ? (
                                <ImageIcon color="primary" sx={{ mr: 1 }} />
                            ) : (
                                <InsertDriveFileIcon color="primary" sx={{ mr: 1 }} />
                            )}
                            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                                {file.name}
                            </Typography>
                            <IconButton size="small" onClick={() => handleRemoveAttachment(index)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Video Call Dialog */}
            <Dialog open={videoCallDialogOpen} onClose={() => setVideoCallDialogOpen(false)}>
                <DialogTitle>Video Call Feature Coming Soon</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The video call functionality is currently under development. You'll be able to use it soon!
                    </DialogContentText>
                    <DialogContentText sx={{ mt: 2 }}>
                        In the meantime, you can use Zoom or another video conferencing tool to communicate live with each other.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setVideoCallDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Skill Exchange Dialogs */}
            <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
                <DialogTitle>Confirm Skill Exchange Completion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you've successfully exchanged skills with {otherUser?.userName || 'this user'}?
                        The other user will need to confirm as well.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
                    <Button onClick={handleConfirmSkillExchange} color="success" variant="contained" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={completionDialog.open && !completionDialog.isInitiator} onClose={() => setCompletionDialog(prev => ({ ...prev, open: false }))}>
                <DialogTitle>Skill Exchange Completion Request</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {otherUser?.userName} has marked the skill exchange as completed.
                        Do you confirm that the skill exchange is completed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCompletionDialog(prev => ({ ...prev, open: false }))}>No</Button>
                    <Button onClick={handleConfirmSkillExchange} color="primary" variant="contained">
                        Yes, Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={completionDialog.isConfirmed} onClose={() => setCompletionDialog(prev => ({ ...prev, isConfirmed: false }))}>
                <DialogTitle>Skill Exchange Completed</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The skill exchange has been successfully marked as completed by both parties.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCompletionDialog(prev => ({ ...prev, isConfirmed: false }))} color="primary" variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Chats;