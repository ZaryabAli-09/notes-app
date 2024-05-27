import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { dbConnection } from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import todosRoutes from "./routes/todos.routes.js";
dotenv.config();
const app = express();

// built in middlewares
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/todos", todosRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT} port `);
  dbConnection();
});
