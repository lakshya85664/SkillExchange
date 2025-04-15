// // const socketIO = require('socket.io');

// // let io;

// // const initializeSocket = (server) => {
// //     io = socketIO(server, {
// //         cors: {
// //             origin: "http://localhost:5173", // Your frontend URL
// //             methods: ["GET", "POST"]
// //         }
// //     });

// //     io.on('connection', (socket) => {
// //         console.log('New client connected:', socket.id);

// //         // Join a room based on matchId
// //         socket.on('joinMatchRoom', (matchId) => {
// //             socket.join(matchId);
// //             console.log(`User joined room: ${matchId}`);
// //         });

// //         socket.on('disconnect', () => {
// //             console.log('Client disconnected:', socket.id);
// //         });

// //         socket.on('typing', (data) => {
// //             socket.to(data.matchId).emit('userTyping', {
// //                 userId: data.userId,
// //                 isTyping: data.isTyping
// //             });
// //         });
// //     });

// //     return io;
// // };

// // const getIO = () => {
// //     if (!io) {
// //         throw new Error('Socket.io not initialized');
// //     }
// //     return io;
// // };

// // module.exports = {
// //     initializeSocket,
// //     getIO
// // };

// const socketIO = require('socket.io');

// let io;

// const initializeSocket = (server) => {
//     io = socketIO(server, {
//         cors: {
//             origin: "http://localhost:5173", // Make sure this matches your frontend URL
//             methods: ["GET", "POST"],
//             credentials: true
//         }
//     });

//     io.on('connection', (socket) => {
//         console.log('New client connected:', socket.id);

//         // Store user ID when client connects
//         const userId = socket.handshake.query.userId;
//         if (userId) {
//             socket.join(`user_${userId}`);
//             console.log(`User ${userId} connected`);
//         }

//         // Join a room based on matchId
//         socket.on('joinMatchRoom', (matchId) => {
//             socket.join(matchId);
//             console.log(`User joined room: ${matchId}`);
//         });

//         // Handle typing events
//         socket.on('typing', (data) => {
//             // Broadcast to all in the room except sender
//             socket.to(data.matchId).emit('userTyping', {
//                 userId: data.userId,
//                 isTyping: data.isTyping
//             });
//             console.log(`User ${data.userId} is ${data.isTyping ? 'typing' : 'not typing'}`);
//         });

//         // When user logs in
//         socket.on('userOnline', (userId) => {
//             UserModel.findByIdAndUpdate(userId, {
//                 status: 'active',
//                 lastActive: new Date()
//             }).then(() => {
//                 io.emit('userStatusChange', {
//                     userId,
//                     status: 'active',
//                     lastActive: new Date()
//                 });
//             });
//         });

//         // When user logs out
//         socket.on('userOffline', (userId) => {
//             UserModel.findByIdAndUpdate(userId, {
//                 status: 'inactive',
//                 lastActive: new Date()
//             }).then(() => {
//                 io.emit('userStatusChange', {
//                     userId,
//                     status: 'inactive',
//                     lastActive: new Date()
//                 });
//             });
//         });

//         socket.on('disconnect', () => {
//             console.log('Client disconnected:', socket.id);
//         });
//     });

//     return io;
// };

// // Helper function to emit events to specific users
// const emitToUser = (userId, event, data) => {
//     io.to(`user_${userId}`).emit(event, data);
// };

// const getIO = () => {
//     if (!io) {
//         throw new Error('Socket.io not initialized');
//     }
//     return io;
// };

// module.exports = {
//     initializeSocket,
//     getIO,
//     emitToUser
// };

const socketIO = require('socket.io');
const UserModel = require('./models/UserModel'); // Add this at the top

let io;

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    // Track connected users
    const connectedUsers = new Map();

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // When a user connects with their ID
        socket.on('registerUser', async (userId) => {
            try {
                // Update user status in DB
                const updatedUser = await UserModel.findByIdAndUpdate(
                    userId,
                    { 
                        status: 'active',
                        lastActive: new Date() 
                    },
                    { new: true }
                );

                // Store the socket connection
                connectedUsers.set(userId, socket.id);
                socket.join(`user_${userId}`);
                
                // Broadcast the new status to all relevant clients
                io.emit('userStatusChange', {
                    userId,
                    status: 'active',
                    lastActive: updatedUser.lastActive
                });

                console.log(`User ${userId} connected`);
            } catch (error) {
                console.error('Error registering user:', error);
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log('Client disconnected:', socket.id);
            
            // Find which user disconnected
            for (let [userId, socketId] of connectedUsers.entries()) {
                if (socketId === socket.id) {
                    try {
                        // Update user status in DB
                        const updatedUser = await UserModel.findByIdAndUpdate(
                            userId,
                            { 
                                status: 'inactive',
                                lastActive: new Date() 
                            },
                            { new: true }
                        );

                        // Remove from connected users
                        connectedUsers.delete(userId);
                        
                        // Broadcast the new status
                        io.emit('userStatusChange', {
                            userId,
                            status: 'inactive',
                            lastActive: updatedUser.lastActive
                        });

                        console.log(`User ${userId} disconnected`);
                    } catch (error) {
                        console.error('Error updating disconnected user:', error);
                    }
                    break;
                }
            }
        });

        // Join a room based on matchId
        socket.on('joinMatchRoom', (matchId) => {
            socket.join(matchId);
            console.log(`User joined room: ${matchId}`);
        });

        // Handle typing events
        socket.on('typing', (data) => {
            socket.to(data.matchId).emit('userTyping', {
                userId: data.userId,
                isTyping: data.isTyping
            });
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = {
    initializeSocket,
    getIO
};