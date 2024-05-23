import express from "express";
import {
  createNotes,
  getNotes,
  editNotes,
} from "../controllers/notes.controllers.js";

const router = express.Router();

router.post("/create", createNotes);
router.get("/get-notes/:createdBy", getNotes);
router.put("/edit/:userId", editNotes);
export default router;
