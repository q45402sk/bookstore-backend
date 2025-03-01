import express from "express";
import connectDB from "./database";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
