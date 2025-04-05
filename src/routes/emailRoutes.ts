import { Router } from "express";
import { agenda } from "../config/agenda";

const router = Router();

router.post("/schedule-email", async (req, res) => {
  const { to, subject, text, delayInMinutes } = req.body;

  if (!to || !subject || !text || !delayInMinutes) {
    res.status(400).json({ error: "All fields are required" });
  }

  try {
    const when = new Date(Date.now() + delayInMinutes * 60 * 1000);

    await agenda.schedule(when, "send-email", { to, subject, text });

    res.status(200).json({ message: `Email scheduled for ${to}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to schedule email" });
  }
});

export default router;
