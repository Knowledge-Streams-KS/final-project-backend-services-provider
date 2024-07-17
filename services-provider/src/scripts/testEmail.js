import "dotenv/config"; // Ensure this line is at the top
import sendEmail from "../utils/email.js";

const testSendEmail = async () => {
  try {
    await sendEmail(
      "waqas.ch16@gmail.com",
      "Test Email",
      "<p>This is a test email.</p>"
    );
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);

testSendEmail();
