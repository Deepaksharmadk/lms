import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["https://lms-git-main-deepaksharmadks-projects.vercel.app"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
//routes import
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/user", userRoutes);
app.listen(process.env.PORT, async () => {
  console.log(`server is running on ${process.env.PORT}`);
});
export default app;
