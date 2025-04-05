import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { agenda } from "./config/agenda";
import { sendEmailJob } from "./jobs/sendEmailJob";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", emailRoutes);

sendEmailJob(agenda);

(async function () {
  await agenda.start();
  console.log("✅ Agenda started");
})();

export default app;
