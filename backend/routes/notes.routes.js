import express from "express";
import {
  createNotes,
  getNotes,
  getSpecificNotes,
  editNotes,
  deleteNotes,
} from "../controllers/notes.controllers.js";

const router = express.Router();

router.post("/create", createNotes);
router.get("/get-notes/:createdBy", getNotes);
router.get("/get-specific-note/:noteId", getSpecificNotes);
router.put("/edit-note/:noteId", editNotes);
router.delete("/delete-note/:noteId", deleteNotes);
export default router;
