import { Job } from "agenda";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export const sendEmailJob = (agendaInstance: any) => {
  agendaInstance.define("send-email", async (job: Job) => {
    const { to, subject, text } = job.attrs.data as {
      to: string;
      subject: string;
      text: string;
    };

    try {
      await transporter.sendMail({
        from: `"Email Flow App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
      });

      console.log(`✅ Email sent to ${to}`);
    } catch (error) {
      console.error("❌ Error sending email:", error);
    }
  });
};
