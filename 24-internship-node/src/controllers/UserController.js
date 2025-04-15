const UserModel = require("../models/UserModel");
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

const getAllUsers = async (req, res) => {
  const users = await UserModel.find().populate("roleId");
  res.json({
    message: "Users found",
    data: users
  });
};

// const loginUser = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId");
//   console.log(foundUserFromEmail);

//   if (foundUserFromEmail != null) {
//     const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
//     if (isMatch == true) {
//       res.status(200).json({
//         message: "login success",
//         data: foundUserFromEmail
//       });
//     } else {
//       res.status(404).json({
//         message: "invalid credentials.."
//       });
//     }
//   } else {
//     res.status(404).json({
//       message: "Email not found",
//     });
//   }
// }

// const loginUser = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   try {
//     const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId");
    
//     if (!foundUserFromEmail) {
//       return res.status(404).json({
//         message: "Email not found",
//       });
//     }

//     const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
//     if (!isMatch) {
//       return res.status(404).json({
//         message: "Invalid credentials",
//       });
//     }

//     // Return all necessary user data including populated role
//     const userData = {
//       _id: foundUserFromEmail._id,
//       userName: foundUserFromEmail.userName,
//       email: foundUserFromEmail.email,
//       roleId: {
//         _id: foundUserFromEmail.roleId._id,
//         name: foundUserFromEmail.roleId.name
//       },
//       profilePic: foundUserFromEmail.profilePic,
//       status: foundUserFromEmail.status,
//       createdAt: foundUserFromEmail.createdAt
//     };

//     res.status(200).json({
//       message: "Login success",
//       data: userData
//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   try {
//     const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId");
    
//     if (!foundUserFromEmail) {
//       return res.status(404).json({
//         message: "Email not found",
//       });
//     }

//     const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
//     if (!isMatch) {
//       return res.status(404).json({
//         message: "Invalid credentials",
//       });
//     }

//     // Update user status to active
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       foundUserFromEmail._id,
//       { status: true },
//       { new: true }
//     ).populate("roleId");

//     // Return all necessary user data including populated role
//     const userData = {
//       _id: updatedUser._id,
//       userName: updatedUser.userName,
//       email: updatedUser.email,
//       roleId: {
//         _id: updatedUser.roleId._id,
//         name: updatedUser.roleId.name
//       },
//       profilePic: updatedUser.profilePic,
//       status: updatedUser.status,
//       createdAt: updatedUser.createdAt
//     };

//     res.status(200).json({
//       message: "Login success",
//       data: userData
//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   try {
//     const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId");
    
//     if (!foundUserFromEmail) {
//       return res.status(404).json({
//         message: "Email not found",
//       });
//     }

//     // Check if user is blocked
//     if (foundUserFromEmail.status === 'blocked') {
//       return res.status(403).json({
//         message: "Your account has been blocked. Please contact support.",
//       });
//     }

//     const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
//     if (!isMatch) {
//       return res.status(404).json({
//         message: "Invalid credentials",
//       });
//     }

//     // Update user status to active
//     const updatedUser = await UserModel.findByIdAndUpdate(
//       foundUserFromEmail._id,
//       // { status: 'active' },
//       { 
//         status: 'active',
//         lastActive: new Date() 
//       },
//       { new: true }
//     ).populate("roleId");

//     // Return all necessary user data including populated role
//     const userData = {
//       _id: updatedUser._id,
//       userName: updatedUser.userName,
//       email: updatedUser.email,
//       roleId: {
//         _id: updatedUser.roleId._id,
//         name: updatedUser.roleId.name
//       },
//       profilePic: updatedUser.profilePic,
//       status: updatedUser.status,
//       createdAt: updatedUser.createdAt
//     };

//     res.status(200).json({
//       message: "Login success",
//       data: userData
//     });

//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// };

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const foundUserFromEmail = await UserModel.findOne({ email: email }).populate("roleId");
    
    if (!foundUserFromEmail) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    // Check if user is blocked
    if (foundUserFromEmail.status === 'blocked') {
      return res.status(403).json({
        message: "Your account has been blocked. Please contact support.",
      });
    }

    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Invalid credentials",
      });
    }

    // Update user status to active
    const updatedUser = await UserModel.findByIdAndUpdate(
      foundUserFromEmail._id,
      { 
        status: 'active',
        lastActive: new Date() 
      },
      { new: true }
    ).populate("roleId");

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: updatedUser._id,
        email: updatedUser.email,
        role: updatedUser.roleId.name 
      },
      secret,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return all necessary user data including populated role
    const userData = {
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      roleId: {
        _id: updatedUser.roleId._id,
        name: updatedUser.roleId.name
      },
      profilePic: updatedUser.profilePic,
      status: updatedUser.status,
      createdAt: updatedUser.createdAt,
      token: token // Include the token in the response
    };

    res.status(200).json({
      message: "Login success",
      data: userData
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addUser = async (req, res) => {
  const savedUser = await UserModel.create(req.body);
  res.json({
    message: "User create",
    data: savedUser
  });
};

const signup = async (req, res) => {
  try {
    //password encrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const savedUser = await UserModel.create(req.body);

    // await mailUtil.sendingMail(savedUser.email, "Welcome to Skill Exchange", "this is welcome mail");

    const welcomeMessage = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2c3e50;">Welcome to Skill Exchange, ${savedUser.userName}!</h2>
        <p>We're thrilled to have you join our community of learners and teachers.</p>
        
        <h3 style="color: #3498db;">About Skill Exchange</h3>
        <p>Skill Exchange is a platform where you can:</p>
        <ul>
          <li>Teach skills you're passionate about</li>
          <li>Learn new skills from others in the community</li>
          <li>Connect with like-minded individuals</li>
          <li>Grow both personally and professionally</li>
        </ul>
        
        <h3 style="color: #3498db;">Getting Started</h3>
        <p>To begin your skill exchange journey:</p>
        <ol>
          <li>Complete your profile by adding your skills and interests</li>
          <li>Browse available skills or search for specific ones</li>
          <li>Connect with potential exchange partners</li>
          <li>Schedule your skill exchange sessions</li>
        </ol>
        
        <p>Our platform supports various skill categories including technology, arts, languages, and more!</p>
        
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
        
        <p style="margin-top: 30px;">Happy Learning & Teaching!</p>
        <p><strong>The Skill Exchange Team</strong></p>
        
        <footer style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 0.9em; color: #7f8c8d;">
          <p>© ${new Date().getFullYear()} Skill Exchange. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `;

  await mailUtil.sendingMail(savedUser.email, "Welcome to Skill Exchange!", welcomeMessage);

    res.status(201).json({
      message: "User created successfully",
      data: savedUser
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err
    })
  }
};

const deleteUser = async (req, res) => {
  const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "User deleted successfully",
    data: deletedUser
  });
};

const getUserById = async (req, res) => {
  try {
    const getUser = await UserModel.findById(req.params.id).populate("roleId");
    if (!getUser) {
      res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json({
        message: "User found successfully",
        data: getUser,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addUserWithFile = async (req, res) => {
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
      const savedUser = await UserModel.create(req.body);

      res.status(200).json({
        message: "User saved successfully",
        data: savedUser
      });
    }
  });
};

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await UserModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html>
                            <p>Click on the link below to reset your password!</p>
                            <a href ="${url}">Reset password</a>
                            </html>`;
    //email...
    await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
    res.json({
      message: "reset password link sent to mail.",
    });
  } else {
    res.json({
      message: "user not found register first..",
    });
  }
};

const resetpassword = async (req, res) => {
  const token = req.body.token; //decode --> email | id
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  //object -->email,id..
  //password encrypt...
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  const updatedUser = await UserModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPassword,
  });
  res.json({
    message: "Password updated successfully..",
  });
};

// const updateUser = async(req,res)=>{

//   try{
//     const updateUser = await UserModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {new:true}
//     )
//     res.status(200).json({
//       message:"User Updated Successfully",
//       data:updateUser
//     })

//   }catch(err){
//     res.status(500).json({
//       messgae:"error while updating user",
//       err:err,
//     })
//   }
//  }

//    const getUserByIdandUpdate = async (req, res) => {
//        //update tablename set  ? where id = ?
//        //update new data -->req.body
//        //id -->req.params.id

//        try {
//          const updatedUser = await UserModel.findByIdAndUpdate(
//            req.params.id,
//            req.body,
//            { new: true }
//          );
//          res.status(200).json({
//            message: "User updated successfully",
//            data: updatedUser
//          });
//        } catch (err) {
//          res.status(500).json({
//            message: "error while updating user",
//            err: err,
//          });
//        }
//      };

const getUserByIdandUpdate = async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "User Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while update User Profile",
      err: err,
    });
  }
};

// const getUserByIdandUpdatePic = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const updatedUser = await UserModel.findByIdAndUpdate(
//       id,
//       { profilePic: req.file.filename },  // Store only filename
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json({ message: "Profile picture updated", user: updatedUser });
//   } catch (error) {
//     console.error("Error updating profile picture:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const getUserByIdandUpdatePic = async (req, res) => {
  try {
      console.log("Received request to update profile pic");
      console.log("Request Params:", req.params);
      console.log("Request File:", req.file);

      const { id } = req.params;
      
      if (!req.file) {
        return res.status(400).json({ message: "Missing required parameter - file" });
    }

    const userId = req.params.id;
    const filePath = req.file.path; // Correct path reference

    // Update user profile with the new picture
    const updatedUser = await UserModel.findByIdAndUpdate(userId, { profilePic: filePath }, { new: true });

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile picture updated successfully", user: updatedUser });
} catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error" });
}
};


// const uploadProfilePic = upload.single("profilePic");

const uploadProfilePic = async (req, res, next) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
      }
      req.body.profilePic = req.file.path; // Ensure the correct file path is stored
      next();
  } catch (error) {
      res.status(500).json({ error: "Error processing image upload" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      // { status: 'inactive' },
      { 
        status: 'inactive',
        lastActive: new Date() // Update lastActive on logout too
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Logout successful",
      data: updatedUser
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getTopRatedUsers = async (req, res) => {
  try {
      const users = await UserModel.find({ reviewCount: { $gt: 0 } })
          .sort({ averageRating: -1 })
          .limit(10);
          
      res.json({
          message: "Top rated users",
          data: users
      });
  } catch (error) {
      console.error("Error getting top rated users:", error);
      res.status(500).json({
          message: "Internal server error",
      });
  }
};

// Add a new endpoint to check user status
const checkUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Consider user online if they were active in the last 5 minutes
    const isOnline = user.status === 'active' && 
                     (new Date() - new Date(user.lastActive)) < (5 * 60 * 1000);

    res.status(200).json({
      online: isOnline,
      lastActive: user.lastActive
    });
  } catch (error) {
    console.error("Error checking user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers, addUser, deleteUser, getUserById, signup, loginUser, addUserWithFile, forgotPassword, resetpassword, getUserByIdandUpdate, getUserByIdandUpdatePic, uploadProfilePic, logoutUser, getTopRatedUsers, checkUserStatus
}