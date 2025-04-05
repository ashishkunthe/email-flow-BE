import { Agenda } from "agenda";
import dotenv from "dotenv";

dotenv.config();

const mongoConnection = process.env.MONGO_URI as string;

export const agenda = new Agenda({
  db: { address: mongoConnection, collection: "email-sheduler" },
});
