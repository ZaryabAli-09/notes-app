import express from "express";
import {
  createNotes,
  getNotes,
  getSpecificNotes,
} from "../controllers/notes.controllers.js";

const router = express.Router();

router.post("/create", createNotes);
router.get("/get-notes/:createdBy", getNotes);
router.get("/get-specific-note/:noteId", getSpecificNotes);
export default router;
