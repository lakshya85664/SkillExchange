const AdminModel = require("../models/AdminModel");
const UserModel = require("../models/UserModel");
const MessageModel = require("../models/MessageModel");
const bcrypt = require("bcrypt");
const cloudinaryUtil = require("../utils/CloudnaryUtil");
const mailUtil = require("../utils/MailUtils");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const secret = "secret";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  //fileFilter:
});

const getAllAdmins = async (req, res) => {
  const admin = await AdminModel.find().populate("roleId");
  res.json({
    message: "Admins found",
    data: admin
  });
};

const loginAdmin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const foundAdminFromEmail = await AdminModel.findOne({ email: email }).populate("roleId");
  console.log(foundAdminFromEmail);

  if (foundAdminFromEmail != null) {
    const isMatch = bcrypt.compareSync(password, foundAdminFromEmail.password);
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundAdminFromEmail
      });
    } else {
      res.status(404).json({
        message: "invalid credentials.."
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found",
    });
  }
}

const addAdmin = async (req, res) => {
  const savedAdmin = await AdminModel.create(req.body);
  res.json({
    message: "Admin created",
    data: savedAdmin
  });
};

const signup = async (req, res) => {
  try {
    //password encrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const savedAdmin = await AdminModel.create(req.body);
    res.status(201).json({
      message: "Admin created",
      data: savedAdmin
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err
    })
  }
};

const deleteAdmin = async (req, res) => {
  const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "Admin deleted successfully",
    data: deletedAdmin
  });
};

// const getAdminById = async (req, res) => {
//     const getAdmin = await AdminModel.findById(req.params.id);
//     res.json({
//         message: "Admin found",
//         data: getAdmin
//     });
// };
const getAdminById = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json({ message: "Admin found", data: admin });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin", error });
  }
};

const getAdminByIdandUpdate = async (req, res) => {
  try {
    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "User Profile updated successfully",
      data: updatedAdmin,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while update User Profile",
      err: err,
    });
  }
};

const getAdminByIdandUpdatePic = async (req, res) => {
  try {
    console.log("Received request to update profile pic");
    console.log("Request Params:", req.params);
    console.log("Request File:", req.file);

    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Missing required parameter - file" });
    }

    const adminId = req.params.id;
    const filePath = req.file.path; // Correct path reference

    // Update user profile with the new picture
    const updatedAdmin = await AdminModel.findByIdAndUpdate(adminId, { profilePic: filePath }, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Profile picture updated successfully", admin: updatedAdmin });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addAdminWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database


      req.body.profilePic = cloundinaryResponse.secure_url
      const savedAdmin = await AdminModel.create(req.body);

      res.status(200).json({
        message: "Admin saved successfully",
        data: savedAdmin
      });
    }
  });
};

// const getAdminStats = async (req, res) => {
//   try {
//     // Get current date and calculate date ranges
//     const now = new Date();
//     const last7Days = new Date(now);
//     last7Days.setDate(last7Days.getDate() - 7);

//     // Monthly active users (last 6 months)
//     const monthlyUsers = await UserModel.aggregate([
//       {
//         $match: {
//           createdAt: {
//             $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
//             $lte: now
//           }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           month: {
//             $let: {
//               vars: {
//                 monthsInString: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//               },
//               in: {
//                 $arrayElemAt: ["$$monthsInString", "$_id.month"]
//               }
//             }
//           },
//           activeUsers: "$count"
//         }
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1 } }
//     ]);


//     const userStatus = await UserModel.aggregate([
//       {
//         $group: {
//           _id: {
//             $cond: {
//               if: { $eq: ["$status", true] },
//               then: "Active",
//               else: "Inactive"
//             }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           name: "$_id",
//           value: "$count"
//         }
//       }
//     ]);

//     // Activity trend (last 7 days)
//     const activityTrend = await UserModel.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: last7Days, $lte: now }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           date: "$_id",
//           logins: "$count"
//         }
//       },
//       { $sort: { date: 1 } }
//     ]);

//     res.json({
//       monthlyUsers,
//       userStatus,
//       activityTrend
//     });
//   } catch (error) {
//     console.error("Error fetching admin stats:", error);
//     res.status(500).json({ message: "Error fetching statistics" });
//   }
// };

// const getAdminStats = async (req, res) => {
//   try {
//     const now = new Date();
//     const last7Days = new Date(now);
//     last7Days.setDate(last7Days.getDate() - 7);
//     const sixMonthsAgo = new Date(now);
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//     // Monthly Active Users (last 6 months)
//     const monthlyUsers = await UserModel.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: sixMonthsAgo, $lte: now }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           month: {
//             $let: {
//               vars: {
//                 monthsInString: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//               },
//               in: {
//                 $arrayElemAt: ["$$monthsInString", "$_id.month"]
//               }
//             }
//           },
//           activeUsers: "$count"
//         }
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1 } }
//     ]);

//     // Fill missing months with zero values
//     const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const currentMonth = now.getMonth();
//     const last6Months = allMonths.slice(currentMonth - 5, currentMonth + 1);

//     const filledMonthlyUsers = last6Months.map(month => {
//       const found = monthlyUsers.find(m => m.month === month);
//       return found || { month, activeUsers: 0 };
//     });

//     // User Status Distribution
//     const userStatus = await UserModel.aggregate([
//       {
//         $group: {
//           _id: {
//             $cond: {
//               if: { $eq: ["$status", true] },
//               then: "Active",
//               else: "Inactive"
//             }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           name: "$_id",
//           value: "$count"
//         }
//       }
//     ]);

//     // Activity Trend (last 7 days)
//     const activityTrend = await UserModel.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: last7Days, $lte: now }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
//           },
//           logins: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           date: "$_id",
//           logins: 1
//         }
//       },
//       { $sort: { date: 1 } }
//     ]);

//     // Fill in missing days for activity trend
//     const filledActivityTrend = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date(now);
//       date.setDate(date.getDate() - i);
//       const dateString = date.toISOString().split('T')[0];

//       const found = activityTrend.find(item => item.date === dateString);
//       filledActivityTrend.push({
//         date: dateString.split('-').slice(1).join('-'), // Format as MM-DD
//         logins: found ? found.logins : 0
//       });
//     }

//     res.json({
//       monthlyUsers: filledMonthlyUsers,
//       userStatus,
//       activityTrend: filledActivityTrend
//     });

//   } catch (error) {
//     console.error("Error fetching admin stats:", error);
//     res.status(500).json({ 
//       monthlyUsers: [],
//       userStatus: [],
//       activityTrend: [],
//       message: "Error fetching statistics" 
//     });
//   }
// };

// const getAdminStats = async (req, res) => {
//   try {
//     const now = new Date();
//     const last7Days = new Date(now);
//     last7Days.setDate(last7Days.getDate() - 7);
//     const sixMonthsAgo = new Date(now);
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

//     // Monthly Active Users (last 6 months)
//     const monthlyUsers = await UserModel.aggregate([
//       {
//         $match: {
//           createdAt: { 
//             $gte: sixMonthsAgo, 
//             $lte: now 
//           }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           month: {
//             $let: {
//               vars: {
//                 monthsInString: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//               },
//               in: {
//                 $arrayElemAt: ["$$monthsInString", "$_id.month"]
//               }
//             }
//           },
//           year: "$_id.year",
//           activeUsers: "$count"
//         }
//       },
//       { $sort: { "year": 1, "_id.month": 1 } }
//     ]);

//     // Fill missing months with zero values
//     const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const currentMonthIndex = now.getMonth(); // 0-11
//     const currentYear = now.getFullYear();

//     const filledMonthlyUsers = [];

//     // Generate data for last 6 months including current month
//     for (let i = 5; i >= 0; i--) {
//       const date = new Date(now);
//       date.setMonth(date.getMonth() - i);

//       const monthIndex = date.getMonth();
//       const monthName = allMonths[monthIndex];
//       const year = date.getFullYear();

//       const found = monthlyUsers.find(m => 
//         m.month === monthName && m.year === year
//       );

//       filledMonthlyUsers.push({
//         month: monthName,
//         activeUsers: found ? found.activeUsers : 0
//       });
//     }

//     // User Status Distribution
//     const userStatus = await UserModel.aggregate([
//       {
//         $group: {
//           _id: {
//             $cond: {
//               if: { $eq: ["$status", true] },
//               then: "Active",
//               else: "Inactive"
//             }
//           },
//           count: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           name: "$_id",
//           value: "$count"
//         }
//       }
//     ]);

//     // Activity Trend (last 7 days)
//     const activityTrend = await UserModel.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: last7Days, $lte: now }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
//           },
//           logins: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           date: "$_id",
//           logins: 1
//         }
//       },
//       { $sort: { date: 1 } }
//     ]);

//     // Fill in missing days for activity trend
//     const filledActivityTrend = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date(now);
//       date.setDate(date.getDate() - i);
//       const dateString = date.toISOString().split('T')[0];

//       const found = activityTrend.find(item => item.date === dateString);
//       filledActivityTrend.push({
//         date: dateString.split('-').slice(1).join('-'), // Format as MM-DD
//         logins: found ? found.logins : 0
//       });
//     }

//     res.json({
//       monthlyUsers: filledMonthlyUsers,
//       userStatus,
//       activityTrend: filledActivityTrend
//     });

//   } catch (error) {
//     console.error("Error fetching admin stats:", error);
//     res.status(500).json({ 
//       monthlyUsers: [],
//       userStatus: [],
//       activityTrend: [],
//       message: "Error fetching statistics" 
//     });
//   }
// };

const getAdminStats = async (req, res) => {
  try {
    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(last7Days.getDate() - 7);
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Monthly Active Users (last 6 months)
    const monthlyUsers = await UserModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: sixMonthsAgo,
            $lte: now
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          month: {
            $let: {
              vars: {
                monthsInString: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
              },
              in: {
                $arrayElemAt: ["$$monthsInString", "$_id.month"]
              }
            }
          },
          year: "$_id.year",
          activeUsers: "$count"
        }
      },
      { $sort: { "year": 1, "_id.month": 1 } }
    ]);

    // Fill missing months with zero values
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIndex = now.getMonth(); // 0-11
    const currentYear = now.getFullYear();

    const filledMonthlyUsers = [];

    // Generate data for last 6 months including current month
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);

      const monthIndex = date.getMonth();
      const monthName = allMonths[monthIndex];
      const year = date.getFullYear();

      const found = monthlyUsers.find(m =>
        m.month === monthName && m.year === year
      );

      filledMonthlyUsers.push({
        month: monthName,
        activeUsers: found ? found.activeUsers : 0
      });
    }

    const activeCount = await UserModel.countDocuments({ status: 'active' });
    const inactiveCount = await UserModel.countDocuments({ status: 'inactive' });
    const blockedCount = await UserModel.countDocuments({ status: 'blocked' });

    // User Status Distribution
    // const userStatus = await UserModel.aggregate([
    //   {
    //     $group: {
    //       _id: {
    //         $cond: {
    //           if: { $eq: ["$status", "active"] },
    //           then: "Active",
    //           if: { $eq: ["$status", "blocked"] },
    //           then: "Block",
    //           else: "Inactive"
    //         }
    //       },
    //       count: { $sum: 1 }
    //     }
    //   },
    //   {
    //     $project: {
    //       name: "$_id",
    //       value: "$count"
    //     }
    //   }
    // ]);

    // Daily Matches (last 7 days) - using MessageModel
    const dailyMatches = await MessageModel.aggregate([
      {
        $match: {
          matchedAt: { $gte: last7Days, $lte: now },
          status: 'accepted' // Only count accepted matches
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$matchedAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: "$_id",
          matches: "$count"
        }
      },
      { $sort: { date: 1 } }
    ]);

    // Fill in missing days for activity trend
    const filledActivityTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      const found = dailyMatches.find(item => item.date === dateString);
      filledActivityTrend.push({
        date: dateString.split('-').slice(1).join('-'), // Format as MM-DD
        matches: found ? found.matches : 0
      });
    }

    res.json({
      monthlyUsers: filledMonthlyUsers,
      userStatus: [
        { name: 'active', value: activeCount },
        { name: 'inactive', value: inactiveCount },
        { name: 'blocked', value: blockedCount }
    ],
      activityTrend: filledActivityTrend
    });

  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({
      monthlyUsers: [],
      userStatus: [],
      activityTrend: [],
      message: "Error fetching statistics"
    });
  }
};

module.exports = {
  getAllAdmins, addAdmin, deleteAdmin, getAdminById, signup, loginAdmin, getAdminByIdandUpdatePic, getAdminByIdandUpdate, addAdminWithFile, getAdminStats
}