//to,from,subject,text
const mailer = require('nodemailer');

///function

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"lakshyapaliwal2003@gmail.com",
            pass:"hzmembtnnpvxbvgq"
        }
    })

    const mailOptions = {
        from: 'lakshyapaliwal2003@gmail.com',
        to: to,
        subject: subject,
        html: text
        //html:"<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

// Add this function to MailUtils.js
const sendInactiveUserNotification = async (to, userName, matches) => {
    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: "lakshyapaliwal2003@gmail.com",
        pass: "hzmembtnnpvxbvgq"
      }
    });
  
    // Create HTML content for all matches
    const matchesHtml = matches.map(match => `
      <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
        <h3>${match.skillsExchanged.join(' ↔ ')}</h3>
        <p>With: ${match.partnerName}</p>
        <p>Status: ${match.status}</p>
        <p>Matched on: ${new Date(match.matchedAt).toLocaleDateString()}</p>
      </div>
    `).join('');
  
    const mailOptions = {
      from: 'lakshyapaliwal2003@gmail.com',
      to: to,
      subject: 'Continue Your Skill Exchange Journey',
      html: `
        <html>
          <body style="font-family: Arial, sans-serif;">
            <h2>Hi ${userName},</h2>
            <p>We noticed you haven't been active for a while, but you have skill exchanges waiting for you!</p>
            
            <h3>Your Active Exchanges:</h3>
            ${matchesHtml}
            
            <p>Please log in to continue your learning experience and complete your skill exchanges.</p>
            <p>Happy Learning!</p>
            
            <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
              <p>The Skill Exchange Team</p>
            </footer>
          </body>
        </html>
      `
    };
  
    return await transporter.sendMail(mailOptions);
  };
  
  // module.exports = {
  //   sendingMail,
  //   sendInactiveUserNotification
  // };
//  sendingMail("ythakkar142@yopmail.com","Test Mail","this is test mail")

// Add these functions to MailUtils.js
const sendMatchCreatedNotification = async (to, userName, partnerName, skillYouTeach, skillYouLearn) => {
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: "lakshyapaliwal2003@gmail.com",
      pass: "hzmembtnnpvxbvgq"
    }
  });

  const mailOptions = {
    from: 'lakshyapaliwal2003@gmail.com',
    to: to,
    subject: 'New Skill Exchange Match Created!',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>Hi ${userName},</h2>
          <p>Congratulations! You have a new skill exchange match with ${partnerName}.</p>
          
          <h3>Exchange Details:</h3>
          <p>You will teach: <strong>${skillYouTeach}</strong></p>
          <p>You will learn: <strong>${skillYouLearn}</strong></p>
          
          <p>Please log in to start your skill exchange journey.</p>
          <p>Happy Learning!</p>
          
          <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
            <p>The Skill Exchange Team</p>
          </footer>
        </body>
      </html>
    `
  };

  return await transporter.sendMail(mailOptions);
};

const sendMatchCompletedNotification = async (to, userName, partnerName, skillYouTaught, skillYouLearned) => {
  const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: "lakshyapaliwal2003@gmail.com",
      pass: "hzmembtnnpvxbvgq"
    }
  });

  const mailOptions = {
    from: 'lakshyapaliwal2003@gmail.com',
    to: to,
    subject: 'Skill Exchange Completed Successfully!',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif;">
          <h2>Hi ${userName},</h2>
          <p>Congratulations! You have successfully completed your skill exchange with ${partnerName}.</p>
          
          <h3>Exchange Details:</h3>
          <p>You taught: <strong>${skillYouTaught}</strong></p>
          <p>You learned: <strong>${skillYouLearned}</strong></p>
          
          <p>We hope you had a great learning experience. Don't forget to leave a review for your partner!</p>
          <p>Happy Learning!</p>
          
          <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
            <p>The Skill Exchange Team</p>
          </footer>
        </body>
      </html>
    `
  };

  return await transporter.sendMail(mailOptions);
};

// module.exports = {
//   sendingMail,
//   sendInactiveUserNotification,
//   sendMatchCreatedNotification,
//   sendMatchCompletedNotification
// };

// Add to MailUtils.js
const sendRatingNotification = async (to, userName, reviewerName, skillName, userRating, skillRating, feedback) => {
  const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
          user: "lakshyapaliwal2003@gmail.com",
          pass: "hzmembtnnpvxbvgq"
      }
  });

  const mailOptions = {
      from: 'lakshyapaliwal2003@gmail.com',
      to: to,
      subject: `New Rating Received for ${skillName}`,
      html: `
          <html>
              <body style="font-family: Arial, sans-serif;">
                  <h2>Hi ${userName},</h2>
                  <p>You have received a new rating from ${reviewerName} for your skill exchange in <strong>${skillName}</strong>.</p>
                  
                  <h3>Rating Details:</h3>
                  <p>User Rating: ${userRating}/5</p>
                  <p>Skill Rating: ${skillRating}/5</p>
                  ${feedback ? `<p>Feedback: "${feedback}"</p>` : ''}
                  
                  <p>Thank you for being part of our skill exchange community!</p>
                  <p>Happy Learning!</p>
                  
                  <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #eee;">
                      <p>The Skill Exchange Team</p>
                  </footer>
              </body>
          </html>
      `
  };

  return await transporter.sendMail(mailOptions);
};

// Don't forget to add it to the exports at the bottom of MailUtils.js:
module.exports = {
  sendingMail,
  sendInactiveUserNotification,
  sendMatchCreatedNotification,
  sendMatchCompletedNotification,
  sendRatingNotification
};
