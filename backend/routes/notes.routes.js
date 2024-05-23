import express from "express";
import { createNotes, getNotes } from "../controllers/notes.controllers.js";

const router = express.Router();

router.post("/create", createNotes);
router.get("/get-notes/:createdBy", getNotes);

export default router;
