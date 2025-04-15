const UserModel = require("../models/UserModel");
const MessageModel = require("../models/MessageModel");
const mailUtil = require("../utils/MailUtils");

const checkInactiveUsersWithMatches = async () => {
  try {
    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    console.log(`Checking for inactive users since ${sevenDaysAgo}...`);

    // Find inactive users who haven't logged in for 7 days
    const inactiveUsers = await UserModel.find({
      status: 'inactive',
      lastActive: { $lt: sevenDaysAgo }
    });

    console.log(`Found ${inactiveUsers.length} inactive users`);

    for (const user of inactiveUsers) {
      // Check if user has any accepted or completed matches
      const userMatches = await MessageModel.find({
        $or: [
          { requester: user._id, status: { $in: ['accepted', 'completed'] } },
          { receiver: user._id, status: { $in: ['accepted', 'completed'] } }
        ]
      })
      .populate('requester', 'userName email')
      .populate('receiver', 'userName email');

      if (userMatches.length > 0) {
        // Prepare match details for email
        const matchesForEmail = userMatches.map(match => ({
          skillsExchanged: match.skillsExchanged || [],
          partnerName: match.requester._id.equals(user._id) 
            ? match.receiver.userName 
            : match.requester.userName,
          status: match.status,
          matchedAt: match.matchedAt
        }));

        try {
          await mailUtil.sendInactiveUserNotification(
            user.email,
            user.userName,
            matchesForEmail
          );
          console.log(`Notification sent to ${user.email} about ${userMatches.length} matches`);
        } catch (emailError) {
          console.error(`Failed to send email to ${user.email}:`, emailError);
        }
      }
    }
  } catch (error) {
    console.error("Error in inactive user notification task:", error);
  }
};

module.exports = checkInactiveUsersWithMatches;