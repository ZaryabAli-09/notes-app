import express from "express";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { dbConnection } from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import todosRoutes from "./routes/todos.routes.js";
import cors from "cors";
dotenv.config();
const app = express();

// kyzy lkjx jjdm ttjb
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "khanzaryab249@gmail.com",
//     pass: "kyzylkjxjjdmttjb",
//   },
// });
// built in middlewares
app.use(
  cors({
    origin: "https://notes-keep-app.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// app.use(urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Notes api is working");
});
// routes
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/todos", todosRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT} port `);
  dbConnection();
});
