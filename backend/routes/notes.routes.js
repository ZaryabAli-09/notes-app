import express from "express";
import {
  createNotes,
  getNotes,
  getSpecificNotes,
  editNotes,
  deleteNotes,
} from "../controllers/notes.controllers.js";
import { verifyUser } from "../middlewares/verify.middleware.js";

const router = express.Router();

router.post("/create", verifyUser, createNotes);
router.get("/get-notes/:createdBy", verifyUser, getNotes);
router.get("/get-specific-note/:noteId", verifyUser, getSpecificNotes);
router.put("/edit-note/:noteId", verifyUser, editNotes);
router.delete("/delete-note/:noteId", verifyUser, deleteNotes);
export default router;
