// // // const ReportModel = require("../models/ReportModel");
// // // const UserModel = require("../models/UserModel"); // Import UserModel

// // // module.exports = {
// // //   createReport: async (req, res) => {
// // //     try {
// // //       const { name, email, subject, customSubject, username, message } = req.body;
      
// // //       let userId = null;
      
// // //       // If username is provided (for report-user case), find the user
// // //       if (username) {
// // //         const reportedUser = await UserModel.findOne({ userName: username });
// // //         if (reportedUser) {
// // //           userId = reportedUser._id;
// // //         } else {
// // //           return res.status(404).json({
// // //             success: false,
// // //             message: "Reported user not found"
// // //           });
// // //         }
// // //       }

// // //       const newReport = new ReportModel({
// // //         name,
// // //         email,
// // //         subject,
// // //         customSubject,
// // //         username,
// // //         userId, // Store the user ID
// // //         message
// // //       });

// // //       await newReport.save();
      
// // //       res.status(201).json({
// // //         success: true,
// // //         message: "Your report has been submitted successfully!"
// // //       });
// // //     } catch (error) {
// // //       console.error("Error creating report:", error);
// // //       res.status(500).json({
// // //         success: false,
// // //         message: "Failed to submit report",
// // //         error: error.message
// // //       });
// // //     }
// // //   }
// // // }

// // const ReportModel = require("../models/ReportModel");
// // const UserModel = require("../models/UserModel");
// // const mailUtil = require("../utils/MailUtils");

// // module.exports = {
// //   createReport: async (req, res) => {
// //     try {
// //       console.log("Received report data:", req.body);
      
// //       const { name, email, subject, customSubject, username, message } = req.body;
      
// //       // Validate required fields
// //       if (!name || !email || !subject || !message) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "Missing required fields"
// //         });
// //       }

// //       let userId = null;
// //       let reportedUser = null;
      
// //       if (username) {
// //         reportedUser = await UserModel.findOne({ userName: username });
// //         if (!reportedUser) {
// //           return res.status(404).json({
// //             success: false,
// //             message: "Reported user not found"
// //           });
// //         }
// //         userId = reportedUser._id;
// //       }

// //       const newReport = new ReportModel({
// //         name,
// //         email,
// //         subject,
// //         customSubject: subject === "other" ? customSubject : undefined,
// //         username: subject === "report-user" ? username : undefined,
// //         userId,
// //         message
// //       });

// //       const savedReport = await newReport.save();
// //       console.log("Saved report:", savedReport);

// //       // Send email notification to admin
// //       const adminEmail = "admin@skillexchange.com";
// //       const emailSubject = "New Contact Form Submission";
// //       const emailContent = `
// //         <h3>New Contact Form Submission</h3>
// //         <p><strong>Name:</strong> ${name}</p>
// //         <p><strong>Email:</strong> ${email}</p>
// //         <p><strong>Subject:</strong> ${subject}</p>
// //         ${username ? `<p><strong>Reported User:</strong> ${username}</p>` : ''}
// //         ${customSubject ? `<p><strong>Custom Subject:</strong> ${customSubject}</p>` : ''}
// //         <p><strong>Message:</strong></p>
// //         <p>${message}</p>
// //       `;

// //       await mailUtil.sendingMail(adminEmail, emailSubject, emailContent);

// //       // Send confirmation email to user
// //       const userEmailContent = `
// //         <h3>Thank you for contacting us!</h3>
// //         <p>We've received your message and will get back to you soon.</p>
// //         <p><strong>Your message:</strong></p>
// //         <p>${message}</p>
// //       `;
// //       await mailUtil.sendingMail(email, "We've received your message", userEmailContent);
      
// //       res.status(201).json({
// //         success: true,
// //         message: "Your report has been submitted successfully!"
// //       });
// //     } catch (error) {
// //       console.error("Error creating report:", error);
// //       res.status(500).json({
// //         success: false,
// //         message: "Failed to submit report",
// //         error: error.message
// //       });
// //     }
// //   }
// // }

// const ReportModel = require("../models/ReportModel");
// const UserModel = require("../models/UserModel");
// const mailUtil = require("../utils/MailUtils");

// module.exports = {

// // In your ReportController.js
// getAllReports: async (req, res) => {
//   try {
//     const { page = 1, limit = 10, subject, search, startDate, endDate } = req.query;
    
//     const query = {};
//     if (subject) query.subject = subject;
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },
//         { email: { $regex: search, $options: 'i' } },
//         { username: { $regex: search, $options: 'i' } },
//         { message: { $regex: search, $options: 'i' } },
//       ];
//     }
//     if (startDate && endDate) {
//       query.createdAt = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     }
    
//     const options = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       sort: { createdAt: -1 },
//     };
    
//     const reports = await ReportModel.paginate(query, options);
    
//     res.json({
//       success: true,
//       data: reports.docs,
//       total: reports.totalDocs,
//     });
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch reports",
//       error: error.message,
//     });
//   }
// },
//   createReport: async (req, res) => {
//     try {
//       console.log("Received report data:", req.body);
      
//       const { name, email, subject, customSubject, username, message, reporterUserId} = req.body;
//     //   const reporterUserId = req.user?._id; // Assuming user is authenticated and user data is in req.user
      
//       // Validate required fields
//       if (!name || !email || !subject || !message) {
//         return res.status(400).json({
//           success: false,
//           message: "Missing required fields"
//         });
//       }

//       let reportedUserId = null;
//       let reportedUser = null;
      
//       if (username) {
//         reportedUser = await UserModel.findOne({ userName: username });
//         if (!reportedUser) {
//           return res.status(404).json({
//             success: false,
//             message: "Reported user not found"
//           });
//         }
//         reportedUserId = reportedUser._id;
//       }

//       const newReport = new ReportModel({
//         name,
//         email,
//         subject,
//         customSubject: subject === "other" ? customSubject : undefined,
//         username: subject === "report-user" ? username : undefined,
//         reportedUserId,
//         reporterUserId, // Store the reporter's user ID
//         message
//       });

//       const savedReport = await newReport.save();
//       console.log("Saved report:", savedReport);

//       // Send email notification to admin
//       const adminEmail = "admin@skillexchange.com";
//       const emailSubject = "New Contact Form Submission";
//       const emailContent = `
//         <h3>New Contact Form Submission</h3>
//         <p><strong>Reporter:</strong> ${name} (${email})</p>
//         ${reporterUserId ? `<p><strong>Reporter User ID:</strong> ${reporterUserId}</p>` : ''}
//         <p><strong>Subject:</strong> ${subject}</p>
//         ${username ? `<p><strong>Reported User:</strong> ${username}</p>` : ''}
//         ${reportedUserId ? `<p><strong>Reported User ID:</strong> ${reportedUserId}</p>` : ''}
//         ${customSubject ? `<p><strong>Custom Subject:</strong> ${customSubject}</p>` : ''}
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       `;

//       await mailUtil.sendingMail(adminEmail, emailSubject, emailContent);

//       // Send confirmation email to user
//       const userEmailContent = `
//         <h3>Thank you for contacting us!</h3>
//         <p>We've received your message and will get back to you soon.</p>
//         <p><strong>Your message:</strong></p>
//         <p>${message}</p>
//       `;
//       await mailUtil.sendingMail(email, "We've received your message", userEmailContent);
      
//       res.status(201).json({
//         success: true,
//         message: "Your report has been submitted successfully!"
//       });
//     } catch (error) {
//       console.error("Error creating report:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to submit report",
//         error: error.message
//       });
//     }
//   }
// }

const ReportModel = require("../models/ReportModel");
const UserModel = require("../models/UserModel");
const mailUtil = require("../utils/MailUtils");

module.exports = {
  getAllReports: async (req, res) => {
    try {
      const reports = await ReportModel.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .populate('reportedUserId', 'userName email') // Populate reported user info if needed
        .populate('reporterUserId', 'userName email'); // Populate reporter info if needed

      res.json({
        success: true,
        message: "Reports fetched successfully",
        data: reports
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch reports",
        error: error.message,
      });
    }
  },

  createReport: async (req, res) => {
    try {
      console.log("Received report data:", req.body);
      
      const { name, email, subject, customSubject, username, message, reporterUserId } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }

      let reportedUserId = null;
      let reportedUser = null;
      
      if (username) {
        reportedUser = await UserModel.findOne({ userName: username });
        if (!reportedUser) {
          return res.status(404).json({
            success: false,
            message: "Reported user not found"
          });
        }
        reportedUserId = reportedUser._id;
      }

      const newReport = new ReportModel({
        name,
        email,
        subject,
        customSubject: subject === "other" ? customSubject : undefined,
        username: subject === "report-user" ? username : undefined,
        reportedUserId,
        reporterUserId,
        message
      });

      const savedReport = await newReport.save();
      console.log("Saved report:", savedReport);

      // Send email notification to admin
      const adminEmail = "admin@skillexchange.com";
      const emailSubject = "New Contact Form Submission";
      const emailContent = `
        <h3>New Contact Form Submission</h3>
        <p><strong>Reporter:</strong> ${name} (${email})</p>
        ${reporterUserId ? `<p><strong>Reporter User ID:</strong> ${reporterUserId}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        ${username ? `<p><strong>Reported User:</strong> ${username}</p>` : ''}
        ${reportedUserId ? `<p><strong>Reported User ID:</strong> ${reportedUserId}</p>` : ''}
        ${customSubject ? `<p><strong>Custom Subject:</strong> ${customSubject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;

      await mailUtil.sendingMail(adminEmail, emailSubject, emailContent);

      // Send confirmation email to user
      const userEmailContent = `
        <h3>Thank you for contacting us!</h3>
        <p>We've received your message and will get back to you soon.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
      `;
      await mailUtil.sendingMail(email, "We've received your message", userEmailContent);
      
      res.status(201).json({
        success: true,
        message: "Your report has been submitted successfully!"
      });
    } catch (error) {
      console.error("Error creating report:", error);
      res.status(500).json({
        success: false,
        message: "Failed to submit report",
        error: error.message
      });
    }
  }
};