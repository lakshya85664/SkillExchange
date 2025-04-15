// // import React, { useState, useEffect } from 'react';
// // import { io } from 'socket.io-client';
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const Notifications = () => {
// //     const [notifications, setNotifications] = useState([]);
// //     const [socket, setSocket] = useState(null);
// //     const [currentUserId, setCurrentUserId] = useState(null);

// //     useEffect(() => {
// //         // Get user ID from localStorage
// //         const userData = localStorage.getItem('user');
// //         if (userData) {
// //             const user = JSON.parse(userData);
// //             setCurrentUserId(user._id);
// //         }
// //     }, []);

// //     // Styles
// //     const containerStyle = {
// //         position: 'fixed',
// //         top: '58px',
// //         right: '20px',
// //         width: '350px',
// //         maxHeight: '80vh',
// //         overflowY: 'auto',
// //         backgroundColor: 'white',
// //         borderRadius: '8px',
// //         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
// //         padding: '15px',
// //         zIndex: '1000'
// //     };

// //     const headerStyle = {
// //         marginTop: '0',
// //         paddingBottom: '10px',
// //         borderBottom: '1px solid #eee'
// //     };

// //     const listStyle = {
// //         listStyle: 'none',
// //         padding: '0',
// //         margin: '0'
// //     };

// //     const getNotificationStyle = (type) => {
// //         const baseStyle = {
// //             display: 'flex',
// //             alignItems: 'flex-start',
// //             padding: '10px',
// //             marginBottom: '10px',
// //             borderRadius: '5px',
// //             backgroundColor: '#f8f9fa',
// //             transition: 'background-color 0.2s'
// //         };

// //         const borderColor = {
// //             message: '#007bff',
// //             request: '#28a745',
// //             completion: '#17a2b8',
// //             completionRequest: '#ffc107'
// //         }[type] || '#6c757d';

// //         return {
// //             ...baseStyle,
// //             borderLeft: `3px solid ${borderColor}`
// //         };
// //     };

// //     const iconStyle = {
// //         fontSize: '1.5rem',
// //         marginRight: '10px'
// //     };

// //     const contentStyle = {
// //         flex: '1'
// //     };

// //     const textStyle = {
// //         margin: '0 0 5px 0'
// //     };

// //     const timeStyle = {
// //         color: '#6c757d',
// //         fontSize: '0.8rem'
// //     };

// //     const clearButtonStyle = {
// //         background: 'none',
// //         border: 'none',
// //         fontSize: '1.2rem',
// //         color: '#6c757d',
// //         cursor: 'pointer',
// //         padding: '0 5px'
// //     };

// //     useEffect(() => {
// //         if (!currentUserId) return;

// //         // Initialize socket connection
// //         const newSocket = io('http://localhost:3001', {
// //             query: { userId: currentUserId }
// //         });
// //         setSocket(newSocket);

// //         // Set up event listeners
// //         newSocket.on('connect', () => {
// //             console.log('Connected to notifications server');
// //         });

// //         // Listen for new messages
// //         newSocket.on('newMessage', (message) => {
// //             if (message.receiver._id === currentUserId || message.sender._id === currentUserId) {
// //                 const notification = {
// //                     type: 'message',
// //                     content: `New message from ${message.sender.userName}`,
// //                     data: message,
// //                     timestamp: new Date()
// //                 };
// //                 setNotifications(prev => [notification, ...prev]);
// //                 toast.info(`New message from ${message.sender.userName}`);
// //             }
// //         });

// //         // Listen for new match requests
// //         newSocket.on('newRequest', (request) => {
// //             if (request.receiverId === currentUserId) {
// //                 const notification = {
// //                     type: 'request',
// //                     content: `New skill exchange request from ${request.senderName}`,
// //                     data: request,
// //                     timestamp: new Date()
// //                 };
// //                 setNotifications(prev => [notification, ...prev]);
// //                 toast.info(`New request: ${request.skillName} exchange from ${request.senderName}`);
// //             }
// //         });

// //         // Listen for skill exchange completion
// //         newSocket.on('skillExchangeConfirmed', ({ matchId, confirmedBy }) => {
// //             const notification = {
// //                 type: 'completion',
// //                 content: `Skill exchange completed!`,
// //                 data: { matchId, confirmedBy },
// //                 timestamp: new Date()
// //             };
// //             setNotifications(prev => [notification, ...prev]);
// //             toast.success('Skill exchange successfully completed!');
// //         });

// //         // Listen for skill exchange completion requests
// //         newSocket.on('skillExchangeCompletionRequest', ({ matchId, initiatorId }) => {
// //             if (initiatorId !== currentUserId) {
// //                 const notification = {
// //                     type: 'completionRequest',
// //                     content: `The other user marked the skill exchange as complete. Confirm to finish.`,
// //                     data: { matchId, initiatorId },
// //                     timestamp: new Date()
// //                 };
// //                 setNotifications(prev => [notification, ...prev]);
// //                 toast.warning('Confirm skill exchange completion?', {
// //                     onClick: () => handleConfirmCompletion(matchId),
// //                     closeButton: (
// //                         <button 
// //                             style={{ 
// //                                 background: 'none',
// //                                 border: 'none',
// //                                 color: '#fff',
// //                                 cursor: 'pointer'
// //                             }} 
// //                             onClick={() => handleConfirmCompletion(matchId)}
// //                         >
// //                             Confirm
// //                         </button>
// //                     ),
// //                     autoClose: false
// //                 });
// //             }
// //         });

// //         return () => {
// //             newSocket.disconnect();
// //         };
// //     }, [currentUserId]);

// //     const handleConfirmCompletion = async (matchId) => {
// //         try {
// //             const userToken = localStorage.getItem('token');
// //             const response = await fetch('/chat/complete', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                     'Authorization': `Bearer ${userToken}`
// //                 },
// //                 body: JSON.stringify({
// //                     matchId,
// //                     userId: currentUserId
// //                 })
// //             });

// //             if (!response.ok) {
// //                 throw new Error('Failed to confirm completion');
// //             }

// //             setNotifications(prev => prev.filter(n => 
// //                 !(n.type === 'completionRequest' && n.data.matchId === matchId)
// //             ));
// //         } catch (error) {
// //             console.error('Error confirming completion:', error);
// //             toast.error('Failed to confirm completion');
// //         }
// //     };

// //     const clearNotification = (index) => {
// //         setNotifications(prev => prev.filter((_, i) => i !== index));
// //     };

// //     const getNotificationIcon = (type) => {
// //         switch (type) {
// //             case 'message':
// //                 return '💬';
// //             case 'request':
// //                 return '✉️';
// //             case 'completion':
// //                 return '✅';
// //             case 'completionRequest':
// //                 return '🔄';
// //             default:
// //                 return '🔔';
// //         }
// //     };

// //     const handleMouseEnter = (e) => {
// //         e.currentTarget.style.backgroundColor = '#e9ecef';
// //     };

// //     const handleMouseLeave = (e) => {
// //         e.currentTarget.style.backgroundColor = '#f8f9fa';
// //     };

// //     const handleButtonMouseEnter = (e) => {
// //         e.currentTarget.style.color = '#dc3545';
// //     };

// //     const handleButtonMouseLeave = (e) => {
// //         e.currentTarget.style.color = '#6c757d';
// //     };

// //     return (
// //         <div style={containerStyle}>
// //             <h3 style={headerStyle}>Notifications</h3>
// //             {notifications.length === 0 ? (
// //                 <p>No new notifications</p>
// //             ) : (
// //                 <ul style={listStyle}>
// //                     {notifications.map((notification, index) => (
// //                         <li 
// //                             key={index} 
// //                             style={getNotificationStyle(notification.type)}
// //                             onMouseEnter={handleMouseEnter}
// //                             onMouseLeave={handleMouseLeave}
// //                         >
// //                             <span style={iconStyle}>
// //                                 {getNotificationIcon(notification.type)}
// //                             </span>
// //                             <div style={contentStyle}>
// //                                 <p style={textStyle}>{notification.content}</p>
// //                                 <small style={timeStyle}>
// //                                     {new Date(notification.timestamp).toLocaleTimeString()}
// //                                 </small>
// //                             </div>
// //                             <button 
// //                                 onClick={() => clearNotification(index)}
// //                                 style={clearButtonStyle}
// //                                 onMouseEnter={handleButtonMouseEnter}
// //                                 onMouseLeave={handleButtonMouseLeave}
// //                             >
// //                                 &times;
// //                             </button>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             )}
// //         </div>
// //     );
// // };

// // export default Notifications;

// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Notifications = () => {
//     const [notifications, setNotifications] = useState([]);
//     const [socket, setSocket] = useState(null);
//     const [currentUserId, setCurrentUserId] = useState(null);

//     useEffect(() => {
//         // Get user ID from localStorage
//         const userData = localStorage.getItem('user');
//         if (userData) {
//             const user = JSON.parse(userData);
//             setCurrentUserId(user._id);
//         }
//     }, []);

//     // Styles
//     const containerStyle = {
//         position: 'fixed',
//         top: '58px',
//         right: '20px',
//         width: '350px',
//         maxHeight: '80vh',
//         overflowY: 'auto',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         padding: '15px',
//         zIndex: '1000'
//     };

//     const headerStyle = {
//         marginTop: '0',
//         paddingBottom: '10px',
//         borderBottom: '1px solid #eee'
//     };

//     const listStyle = {
//         listStyle: 'none',
//         padding: '0',
//         margin: '0'
//     };

//     const getNotificationStyle = (type) => {
//         const baseStyle = {
//             display: 'flex',
//             alignItems: 'flex-start',
//             padding: '10px',
//             marginBottom: '10px',
//             borderRadius: '5px',
//             backgroundColor: '#f8f9fa',
//             transition: 'background-color 0.2s'
//         };

//         const borderColor = {
//             message: '#007bff',
//             request: '#28a745',
//             requestUpdate: '#6f42c1',
//             completion: '#17a2b8',
//             completionRequest: '#ffc107'
//         }[type] || '#6c757d';

//         return {
//             ...baseStyle,
//             borderLeft: `3px solid ${borderColor}`
//         };
//     };

//     const iconStyle = {
//         fontSize: '1.5rem',
//         marginRight: '10px'
//     };

//     const contentStyle = {
//         flex: '1'
//     };

//     const textStyle = {
//         margin: '0 0 5px 0'
//     };

//     const timeStyle = {
//         color: '#6c757d',
//         fontSize: '0.8rem'
//     };

//     const clearButtonStyle = {
//         background: 'none',
//         border: 'none',
//         fontSize: '1.2rem',
//         color: '#6c757d',
//         cursor: 'pointer',
//         padding: '0 5px'
//     };

//     const fetchInitialNotifications = async () => {
//         try {
//             const token = localStorage.getItem('token');
            
//             // Fetch initial messages
//             const messagesResponse = await fetch('/chat/messages', {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
            
//             // Fetch initial requests
//             const requestsResponse = await fetch(`/requests/receiver/${currentUserId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             const initialNotifications = [];

//             if (messagesResponse.ok) {
//                 const messagesData = await messagesResponse.json();
//                 messagesData.data.forEach(message => {
//                     initialNotifications.push({
//                         type: 'message',
//                         content: `Message from ${message.sender.userName}`,
//                         data: message,
//                         timestamp: new Date(message.createdAt)
//                     });
//                 });
//             }

//             if (requestsResponse.ok) {
//                 const requestsData = await requestsResponse.json();
//                 requestsData.data.forEach(request => {
//                     initialNotifications.push({
//                         type: 'request',
//                         content: `Skill exchange request for ${request.skillName} from ${request.senderName}`,
//                         data: request,
//                         timestamp: new Date(request.createdAt)
//                     });
//                 });
//             }

//             setNotifications(initialNotifications);
//         } catch (error) {
//             console.error('Error fetching initial notifications:', error);
//         }
//     };

//     useEffect(() => {
//         if (!currentUserId) return;

//         // Initialize socket connection
//         const newSocket = io('http://localhost:3001', {
//             query: { userId: currentUserId }
//         });
//         setSocket(newSocket);

//         // Set up event listeners
//         newSocket.on('connect', () => {
//             console.log('Connected to notifications server');
//             fetchInitialNotifications();
//         });

//         // Listen for new messages
//         newSocket.on('newMessage', (message) => {
//             if (message.receiver._id === currentUserId) {
//                 const notification = {
//                     type: 'message',
//                     content: `New message from ${message.sender.userName}: ${message.content.substring(0, 30)}${message.content.length > 30 ? '...' : ''}`,
//                     data: message,
//                     timestamp: new Date()
//                 };
//                 setNotifications(prev => [notification, ...prev]);
//                 toast.info(`New message from ${message.sender.userName}`, {
//                     onClick: () => {
//                         window.location.href = `/chat/${message.matchId}`;
//                     }
//                 });
//             }
//         });

//         // Listen for new match requests
//         newSocket.on('newRequest', (request) => {
//             if (request.receiverId === currentUserId) {
//                 const notification = {
//                     type: 'request',
//                     content: `New skill exchange request: ${request.skillName} from ${request.senderName}`,
//                     data: request,
//                     timestamp: new Date()
//                 };
//                 setNotifications(prev => [notification, ...prev]);
//                 toast.info(`New request: ${request.skillName} from ${request.senderName}`, {
//                     onClick: () => {
//                         window.location.href = '/requests';
//                     },
//                     closeButton: (
//                         <button 
//                             style={{ 
//                                 background: 'none',
//                                 border: 'none',
//                                 color: '#fff',
//                                 cursor: 'pointer'
//                             }} 
//                             onClick={() => window.location.href = '/requests'}
//                         >
//                             View
//                         </button>
//                     )
//                 });
//             }
//         });

//         // Listen for request status updates
//         newSocket.on('requestStatusUpdate', (update) => {
//             const notification = {
//                 type: 'requestUpdate',
//                 content: update.message,
//                 data: update,
//                 timestamp: new Date()
//             };
//             setNotifications(prev => [notification, ...prev]);
            
//             if (update.status === 'accepted') {
//                 toast.success(update.message, {
//                     onClick: () => {
//                         window.location.href = '/messages';
//                     }
//                 });
//             } else {
//                 toast.warning(update.message);
//             }
//         });

//         // Listen for skill exchange completion
//         newSocket.on('skillExchangeConfirmed', ({ matchId, confirmedBy }) => {
//             const notification = {
//                 type: 'completion',
//                 content: `Skill exchange completed!`,
//                 data: { matchId, confirmedBy },
//                 timestamp: new Date()
//             };
//             setNotifications(prev => [notification, ...prev]);
//             toast.success('Skill exchange successfully completed!');
//         });

//         // Listen for skill exchange completion requests
//         newSocket.on('skillExchangeCompletionRequest', ({ matchId, initiatorId }) => {
//             if (initiatorId !== currentUserId) {
//                 const notification = {
//                     type: 'completionRequest',
//                     content: `The other user marked the skill exchange as complete. Confirm to finish.`,
//                     data: { matchId, initiatorId },
//                     timestamp: new Date()
//                 };
//                 setNotifications(prev => [notification, ...prev]);
//                 toast.warning('Confirm skill exchange completion?', {
//                     onClick: () => handleConfirmCompletion(matchId),
//                     closeButton: (
//                         <button 
//                             style={{ 
//                                 background: 'none',
//                                 border: 'none',
//                                 color: '#fff',
//                                 cursor: 'pointer'
//                             }} 
//                             onClick={() => handleConfirmCompletion(matchId)}
//                         >
//                             Confirm
//                         </button>
//                     ),
//                     autoClose: false
//                 });
//             }
//         });

//         return () => {
//             newSocket.disconnect();
//         };
//     }, [currentUserId]);

//     const handleConfirmCompletion = async (matchId) => {
//         try {
//             const userToken = localStorage.getItem('token');
//             const response = await fetch('/chat/complete', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${userToken}`
//                 },
//                 body: JSON.stringify({
//                     matchId,
//                     userId: currentUserId
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to confirm completion');
//             }

//             setNotifications(prev => prev.filter(n => 
//                 !(n.type === 'completionRequest' && n.data.matchId === matchId)
//             ));
//         } catch (error) {
//             console.error('Error confirming completion:', error);
//             toast.error('Failed to confirm completion');
//         }
//     };

//     const clearNotification = (index) => {
//         setNotifications(prev => prev.filter((_, i) => i !== index));
//     };

//     const getNotificationIcon = (type) => {
//         switch (type) {
//             case 'message':
//                 return '💬';
//             case 'request':
//                 return '✉️';
//             case 'requestUpdate':
//                 return '🔄';
//             case 'completion':
//                 return '✅';
//             case 'completionRequest':
//                 return '🔄';
//             default:
//                 return '🔔';
//         }
//     };

//     const handleMouseEnter = (e) => {
//         e.currentTarget.style.backgroundColor = '#e9ecef';
//     };

//     const handleMouseLeave = (e) => {
//         e.currentTarget.style.backgroundColor = '#f8f9fa';
//     };

//     const handleButtonMouseEnter = (e) => {
//         e.currentTarget.style.color = '#dc3545';
//     };

//     const handleButtonMouseLeave = (e) => {
//         e.currentTarget.style.color = '#6c757d';
//     };

//     const handleNotificationClick = (notification) => {
//         switch (notification.type) {
//             case 'message':
//                 window.location.href = `/chat/${notification.data.matchId}`;
//                 break;
//             case 'request':
//             case 'requestUpdate':
//                 window.location.href = '/requests';
//                 break;
//             case 'completion':
//             case 'completionRequest':
//                 window.location.href = '/matches';
//                 break;
//             default:
//                 break;
//         }
//     };

//     return (
//         <div style={containerStyle}>
//             <h3 style={headerStyle}>Notifications</h3>
//             {notifications.length === 0 ? (
//                 <p>No new notifications</p>
//             ) : (
//                 <ul style={listStyle}>
//                     {notifications.map((notification, index) => (
//                         <li 
//                             key={index} 
//                             style={getNotificationStyle(notification.type)}
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                             onClick={() => handleNotificationClick(notification)}
//                         >
//                             <span style={iconStyle}>
//                                 {getNotificationIcon(notification.type)}
//                             </span>
//                             <div style={contentStyle}>
//                                 <p style={textStyle}>{notification.content}</p>
//                                 <small style={timeStyle}>
//                                     {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                 </small>
//                             </div>
//                             <button 
//                                 onClick={(e) => {
//                                     e.stopPropagation();
//                                     clearNotification(index);
//                                 }}
//                                 style={clearButtonStyle}
//                                 onMouseEnter={handleButtonMouseEnter}
//                                 onMouseLeave={handleButtonMouseLeave}
//                             >
//                                 &times;
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Notifications;

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = ({ onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [socket, setSocket] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        // Get user ID from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setCurrentUserId(user._id);
        }
    }, []);

    // Styles (unchanged)
    const containerStyle = {
        position: 'fixed',
        top: '58px',
        right: '20px',
        width: '350px',
        maxHeight: '80vh',
        overflowY: 'auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        zIndex: '1000'
    };

    const headerStyle = {
        marginTop: '0',
        paddingBottom: '10px',
        borderBottom: '1px solid #eee'
    };

    const listStyle = {
        listStyle: 'none',
        padding: '0',
        margin: '0'
    };

    const getNotificationStyle = (type) => {
        const baseStyle = {
            display: 'flex',
            alignItems: 'flex-start',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            backgroundColor: '#f8f9fa',
            transition: 'background-color 0.2s'
        };

        const borderColor = {
            message: '#007bff',
            request: '#28a745',
            requestUpdate: '#6f42c1',
            completion: '#17a2b8',
            completionRequest: '#ffc107'
        }[type] || '#6c757d';

        return {
            ...baseStyle,
            borderLeft: `3px solid ${borderColor}`
        };
    };

    const iconStyle = {
        fontSize: '1.5rem',
        marginRight: '10px'
    };

    const contentStyle = {
        flex: '1'
    };

    const textStyle = {
        margin: '0 0 5px 0'
    };

    const timeStyle = {
        color: '#6c757d',
        fontSize: '0.8rem'
    };

    const clearButtonStyle = {
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        color: '#6c757d',
        cursor: 'pointer',
        padding: '0 5px'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '1.2rem',
        color: '#6c757d',
        cursor: 'pointer',
        padding: '0 5px',
        zIndex: 1001
      };

    // const fetchInitialNotifications = async () => {
    //     try {
    //         if (!currentUserId) return;
            
    //         // Fetch initial messages
    //         // const messagesResponse = await fetch(`/chat/messages?userId=${currentUserId}`);
            
    //         // Fetch initial requests
    //         const requestsResponse = await fetch(`/requests/receiver/${currentUserId}`);

    //         const initialNotifications = [];

    //         // if (messagesResponse.ok) {
    //         //     const messagesData = await messagesResponse.json();
    //         //     if (messagesData.data) {
    //         //         messagesData.data.forEach(message => {
    //         //             initialNotifications.push({
    //         //                 type: 'message',
    //         //                 content: `Message from ${message.sender?.userName || 'Unknown'}`,
    //         //                 data: message,
    //         //                 timestamp: new Date(message.createdAt)
    //         //             });
    //         //         });
    //         //     }
    //         // }

    //         if (requestsResponse.ok) {
    //             const requestsData = await requestsResponse.json();
    //             if (requestsData.data) {
    //                 requestsData.data.forEach(request => {
    //                     initialNotifications.push({
    //                         type: 'request',
    //                         content: `Skill exchange request for ${request.skillName} from ${request.senderName}`,
    //                         data: request,
    //                         timestamp: new Date(request.createdAt)
    //                     });
    //                 });
    //             }
    //         }

    //         setNotifications(initialNotifications);
    //     } catch (error) {
    //         console.error('Error fetching initial notifications:', error);
    //     }
    // };

    // const fetchInitialNotifications = async () => {
    //     try {
    //         if (!currentUserId) {
    //             console.warn('No current user ID found');
    //             return;
    //         }
            
    //         // Get the user object from localStorage
    //         const userString = localStorage.getItem('user');
    //         if (!userString) {
    //             console.warn('No user data found in localStorage');
    //             toast.warn('Please log in to view notifications');
    //             return;
    //         }
    
    //         const user = JSON.parse(userString);
    //         const token = user.token; // Access token from user object
    
    //         if (!token) {
    //             console.warn('No authentication token found in user data');
    //             toast.warn('Please log in to view notifications');
    //             return;
    //         }
    
    //         const headers = {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         };
    
    //         const initialNotifications = [];
    
    //         // Fetch initial messages with better error handling
    //         try {
    //             const messagesResponse = await fetch(`/chat/messages`, { 
    //                 headers,
    //                 credentials: 'include' // Add if using cookies
    //             });
                
    //             if (!messagesResponse.ok) {
    //                 console.warn(`Messages fetch failed with status: ${messagesResponse.status}`);
    //                 if (messagesResponse.status === 401) {
    //                     toast.error('Session expired. Please log in again.');
    //                     // Optionally redirect to login
    //                     // window.location.href = '/login';
    //                 }
    //                 return;
    //             }
    
    //             const contentType = messagesResponse.headers.get('content-type');
    //             if (!contentType || !contentType.includes('application/json')) {
    //                 console.warn('Messages response is not JSON');
    //                 return;
    //             }
    
    //             const messagesData = await messagesResponse.json();
    //             if (messagesData?.data) {
    //                 messagesData.data.forEach(message => {
    //                     initialNotifications.push({
    //                         type: 'message',
    //                         content: `Message from ${message.sender?.userName || 'Unknown'}`,
    //                         data: message,
    //                         timestamp: new Date(message.createdAt)
    //                     });
    //                 });
    //             }
    //         } catch (messagesError) {
    //             console.error('Error fetching messages:', messagesError);
    //             toast.error('Failed to load messages');
    //         }
    
    //         // Fetch initial requests with better error handling
    //         try {
    //             const requestsResponse = await fetch(`/requests/receiver/${currentUserId}`, { 
    //                 headers,
    //                 credentials: 'include' // Add if using cookies
    //             });
                
    //             if (!requestsResponse.ok) {
    //                 console.warn(`Requests fetch failed with status: ${requestsResponse.status}`);
    //                 return;
    //             }
    
    //             const contentType = requestsResponse.headers.get('content-type');
    //             if (!contentType || !contentType.includes('application/json')) {
    //                 console.warn('Requests response is not JSON');
    //                 return;
    //             }
    
    //             const requestsData = await requestsResponse.json();
    //             if (requestsData?.data) {
    //                 requestsData.data.forEach(request => {
    //                     initialNotifications.push({
    //                         type: 'request',
    //                         content: `Skill exchange request for ${request.skillName} from ${request.senderName}`,
    //                         data: request,
    //                         timestamp: new Date(request.createdAt)
    //                     });
    //                 });
    //             }
    //         } catch (requestsError) {
    //             console.error('Error fetching requests:', requestsError);
    //             toast.error('Failed to load requests');
    //         }
    
    //         setNotifications(initialNotifications);
    //     } catch (error) {
    //         console.error('Error in fetchInitialNotifications:', error);
    //         toast.error('Failed to load notifications. Please try again later.');
    //     }
    // };

    const fetchInitialNotifications = async () => {
        try {
            if (!currentUserId) {
                console.warn('No current user ID found');
                return;
            }
            
            const userString = localStorage.getItem('user');
            if (!userString) {
                console.warn('No user data found in localStorage');
                toast.warn('Please log in to view notifications');
                return;
            }
        
            const user = JSON.parse(userString);
            const token = user.token;
        
            if (!token) {
                console.warn('No authentication token found in user data');
                toast.warn('Please log in to view notifications');
                return;
            }
        
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
        
            const initialNotifications = [];
        
            try {
                // 1. First fetch all match IDs for this user
                const matchesResponse = await fetch(`/chats/user/${currentUserId}`, { 
                    headers,
                    credentials: 'include'
                });
                
                if (!matchesResponse.ok) {
                    console.warn(`Matches fetch failed with status: ${matchesResponse.status}`);
                    return;
                }
                
                const matchesData = await matchesResponse.json();
                
                if (matchesData?.data && matchesData.data.length > 0) {
                    // 2. For each match ID, fetch the latest message
                    const messagePromises = matchesData.data.map(async matchId => {
                        try {
                            const messagesResponse = await fetch(`/chats/${matchId}?limit=1&sort=-createdAt`, {
                                headers,
                                credentials: 'include'
                            });
                            
                            if (messagesResponse.ok) {
                                const messagesData = await messagesResponse.json();
                                if (messagesData?.data && messagesData.data.length > 0) {
                                    return messagesData.data[0]; // Return the latest message
                                }
                            }
                            return null;
                        } catch (error) {
                            console.error(`Error fetching messages for match ${matchId}:`, error);
                            return null;
                        }
                    });
                    
                    // Wait for all message fetches to complete
                    const latestMessages = await Promise.all(messagePromises);
                    
                    // Create notifications for each message
                    latestMessages.filter(msg => msg !== null).forEach(message => {
                        initialNotifications.push({
                            type: 'message',
                            content: `Message from ${message.sender?.userName || 'Unknown'}: ${message.content.substring(0, 30)}${message.content.length > 30 ? '...' : ''}`,
                            data: message,
                            timestamp: new Date(message.createdAt)
                        });
                    });
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                toast.error('Failed to load messages');
            }
        
            // Also fetch requests if needed (keep your existing requests code here)
            try {
                const requestsResponse = await fetch(`/requests/receiver/${currentUserId}`, { 
                    headers,
                    credentials: 'include'
                });
                
                if (requestsResponse.ok) {
                    const requestsData = await requestsResponse.json();
                    if (requestsData?.data) {
                        requestsData.data.forEach(request => {
                            initialNotifications.push({
                                type: 'request',
                                content: `Skill exchange request for ${request.skillName} from ${request.senderName}`,
                                data: request,
                                timestamp: new Date(request.createdAt)
                            });
                        });
                    }
                }
            } catch (requestsError) {
                console.error('Error fetching requests:', requestsError);
                toast.error('Failed to load requests');
            }
        
            setNotifications(initialNotifications);
        } catch (error) {
            console.error('Error in fetchInitialNotifications:', error);
            toast.error('Failed to load notifications. Please try again later.');
        }
    };

    useEffect(() => {
        if (!currentUserId) return;

        // Initialize socket connection
        const newSocket = io('http://localhost:3001', {
            query: { userId: currentUserId }
        });
        setSocket(newSocket);

        // Set up event listeners
        newSocket.on('connect', () => {
            console.log('Connected to notifications server');
            fetchInitialNotifications();
        });

        // Listen for new messages
        newSocket.on('newMessage', (message) => {
            if (message.receiver._id === currentUserId) {
                const notification = {
                    type: 'message',
                    content: `New message from ${message.sender.userName}: ${message.content.substring(0, 30)}${message.content.length > 30 ? '...' : ''}`,
                    data: message,
                    timestamp: new Date()
                };
                setNotifications(prev => [notification, ...prev]);
                toast.info(`New message from ${message.sender.userName}`, {
                    onClick: () => {
                        window.location.href = `/chat/${message.matchId}`;
                    }
                });
            }
        });

        // Listen for new match requests
        newSocket.on('newRequest', (request) => {
            if (request.receiverId === currentUserId) {
                const notification = {
                    type: 'request',
                    content: `New skill exchange request: ${request.skillName} from ${request.senderName}`,
                    data: request,
                    timestamp: new Date()
                };
                setNotifications(prev => [notification, ...prev]);
                toast.info(`New request: ${request.skillName} from ${request.senderName}`, {
                    onClick: () => {
                        window.location.href = '/requests';
                    },
                    closeButton: (
                        <button 
                            style={{ 
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer'
                            }} 
                            onClick={() => window.location.href = '/requests'}
                        >
                            View
                        </button>
                    )
                });
            }
        });

        // Listen for request status updates
        newSocket.on('requestStatusUpdate', (update) => {
            const notification = {
                type: 'requestUpdate',
                content: update.message,
                data: update,
                timestamp: new Date()
            };
            setNotifications(prev => [notification, ...prev]);
            
            if (update.status === 'accepted') {
                toast.success(update.message, {
                    onClick: () => {
                        window.location.href = '/messages';
                    }
                });
            } else {
                toast.warning(update.message);
            }
        });

        // Listen for skill exchange completion
        newSocket.on('skillExchangeConfirmed', ({ matchId, confirmedBy }) => {
            const notification = {
                type: 'completion',
                content: `Skill exchange completed!`,
                data: { matchId, confirmedBy },
                timestamp: new Date()
            };
            setNotifications(prev => [notification, ...prev]);
            toast.success('Skill exchange successfully completed!');
        });

        // Listen for skill exchange completion requests
        newSocket.on('skillExchangeCompletionRequest', ({ matchId, initiatorId }) => {
            if (initiatorId !== currentUserId) {
                const notification = {
                    type: 'completionRequest',
                    content: `The other user marked the skill exchange as complete. Confirm to finish.`,
                    data: { matchId, initiatorId },
                    timestamp: new Date()
                };
                setNotifications(prev => [notification, ...prev]);
                toast.warning('Confirm skill exchange completion?', {
                    onClick: () => handleConfirmCompletion(matchId),
                    closeButton: (
                        <button 
                            style={{ 
                                background: 'none',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer'
                            }} 
                            onClick={() => handleConfirmCompletion(matchId)}
                        >
                            Confirm
                        </button>
                    ),
                    autoClose: false
                });
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [currentUserId]);

    const handleConfirmCompletion = async (matchId) => {
        try {
            const response = await fetch('/chat/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    matchId,
                    userId: currentUserId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to confirm completion');
            }

            setNotifications(prev => prev.filter(n => 
                !(n.type === 'completionRequest' && n.data.matchId === matchId)
            ));
        } catch (error) {
            console.error('Error confirming completion:', error);
            toast.error('Failed to confirm completion');
        }
    };

    const clearNotification = (index) => {
        setNotifications(prev => prev.filter((_, i) => i !== index));
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'message':
                return '💬';
            case 'request':
                return '✉️';
            case 'requestUpdate':
                return '🔄';
            case 'completion':
                return '✅';
            case 'completionRequest':
                return '🔄';
            default:
                return '🔔';
        }
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.backgroundColor = '#e9ecef';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
    };

    const handleButtonMouseEnter = (e) => {
        e.currentTarget.style.color = '#dc3545';
    };

    const handleButtonMouseLeave = (e) => {
        e.currentTarget.style.color = '#6c757d';
    };

    const handleNotificationClick = (notification) => {
        switch (notification.type) {
            case 'message':
                window.location.href = `/chat/${notification.data.matchId}`;
                break;
            case 'request':
            case 'requestUpdate':
                window.location.href = '/requests';
                break;
            case 'completion':
            case 'completionRequest':
                window.location.href = '/matches';
                break;
            default:
                break;
        }
    };

    // return (
    //     <div style={containerStyle}>
    //         <h3 style={headerStyle}>Notifications</h3>
    //         {notifications.length === 0 ? (
    //             <p>No new notifications</p>
    //         ) : (
    //             <ul style={listStyle}>
    //                 {notifications.map((notification, index) => (
    //                     <li 
    //                         key={index} 
    //                         style={getNotificationStyle(notification.type)}
    //                         onMouseEnter={handleMouseEnter}
    //                         onMouseLeave={handleMouseLeave}
    //                         onClick={() => handleNotificationClick(notification)}
    //                     >
    //                         <span style={iconStyle}>
    //                             {getNotificationIcon(notification.type)}
    //                         </span>
    //                         <div style={contentStyle}>
    //                             <p style={textStyle}>{notification.content}</p>
    //                             <small style={timeStyle}>
    //                                 {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    //                             </small>
    //                         </div>
    //                         <button 
    //                             onClick={(e) => {
    //                                 e.stopPropagation();
    //                                 clearNotification(index);
    //                             }}
    //                             style={clearButtonStyle}
    //                             onMouseEnter={handleButtonMouseEnter}
    //                             onMouseLeave={handleButtonMouseLeave}
    //                         >
    //                             &times;
    //                         </button>
    //                     </li>
    //                 ))}
    //             </ul>
    //         )}
    //     </div>
    // );

    return (
        <div style={containerStyle}>
          <div style={{ position: 'relative' }}>
            <h3 style={headerStyle}>Notifications</h3>
            <button 
              onClick={onClose} // This will be passed as a prop from UserSidebar
              style={closeButtonStyle}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              &times;
            </button>
          </div>
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            <ul style={listStyle}>
              {notifications.map((notification, index) => (
                <li 
                  key={index} 
                  style={getNotificationStyle(notification.type)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <span style={iconStyle}>
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div style={contentStyle}>
                    <p style={textStyle}>{notification.content}</p>
                    <small style={timeStyle}>
                      {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </small>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      clearNotification(index);
                    }}
                    style={clearButtonStyle}
                    onMouseEnter={handleButtonMouseEnter}
                    onMouseLeave={handleButtonMouseLeave}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );      
};

export default Notifications;