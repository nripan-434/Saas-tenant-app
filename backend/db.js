import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ DB Connected");
    console.log("Database Name:", mongoose.connection.db.databaseName);
    console.log("Host:", mongoose.connection.host);

  } catch (err) {
    console.error("Mongo Connection Error:", err);
    process.exit(1);
  }
};