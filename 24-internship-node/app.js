const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
// const scheduler = 
require('./src/email notification/Scheduler');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded images
const http = require('http');
const { initializeSocket } = require('./src/socketService');

mongoose.connect("mongodb://127.0.0.1:27017/25_internship_node").then(() => {
    console.log("database connected..");
});

const roleRoutes = require("./src/routes/RoleRoutes")
app.use("/roles",roleRoutes);

const userRoutes = require("./src/routes/UserRoute")
app.use("/users",userRoutes);

const adminRoutes = require("./src/routes/AdminRoutes")
app.use("/admin",adminRoutes);

const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes);

const subCategoryRoutes = require("./src/routes/SubCategoryRoutes")
app.use("/subcategory",subCategoryRoutes);

const reviewRoutes = require("./src/routes/ReviewRoute")
app.use("/review",reviewRoutes);

const skillRoutes = require("./src/routes/SkillRoutes")
app.use("/skill",skillRoutes);

const requestRoutes = require("./src/routes/RequestRoutes")
app.use("/request",requestRoutes);

const messageRoutes = require("./src/routes/MessageRoutes")
app.use("/messages",messageRoutes);

const reportRoutes = require("./src/routes/ReportRoutes")
app.use("/reports",reportRoutes);

const chatRoutes = require("./src/routes/ChatRoutes")
app.use("/chats",chatRoutes);

// const notificationRoutes = require("./src/routes/NotificationRoutes")
// app.use("/notifications",notificationRoutes);

const PORT = 3000;

app.get("/test",(req,res) => {
    console.log("test api called");
    res.send("hello, test api called");
});

app.get("/users",(req,res) => {
    res.json({
        message : "hello, user api called",
        data : ['ram', 'shyam', 'abcv']
    });
});

app.get("/employees",(req,res) => {
    res.json({
        message : "hello, employee api called",
        data : {
            Employee1 : [101,'abc'],
            Employee2 : [102,'bcd'],
            Employee3 : [103,'efg'],
            Employee4 : [104,'xyz'],
        }
    });
});

app.listen(PORT, () => {
    console.log("Server started on port",PORT);
});

// server.listen(PORT, ()=>{
//     console.log(`server started on port number ${PORT}`)
//     console.log(`Socket.io is running on http://localhost:${PORT}`) //socket connection
// })

const PORT2 = 3001; 

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT2, () => {
    console.log(`Server started on port ${PORT2}`);
    console.log(`Socket.io is running on http://localhost:${PORT2}`);
});