import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(userData) {
  console.log(userData);
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "skodawebsite2023@gmail.com", // generated ethereal user
        pass: "lbmcakepdikmpink", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Skoda Website" <foo@example.com>', // sender address
      to: userData.emailContact, // list of receivers
      subject: `Hello ${userData.nameContact} ${userData.prenumeContact}`, // Subject line
      //   text: userData.textareaContact,
      html: `<p>${userData.textareaContact}</p><img src="https://www.shutterstock.com/image-vector/hi-hello-banner-speech-bubble-260nw-1568270164.jpg" />`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log("error", error);
  }
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
}

// sendEmail().catch(console.error);

export { sendEmail };
