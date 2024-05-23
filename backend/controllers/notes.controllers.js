import { Notes } from "../models/notes.model.js";

const createNotes = async (req, res) => {
  try {
    const { title, notesDescription, createdBy } = req.body;
    if (
      !title ||
      title === "" ||
      !notesDescription ||
      notesDescription === "" ||
      !createdBy ||
      createdBy === ""
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const savedNotes = Notes({
      title,
      notesDescription,
      createdBy,
    });
    await savedNotes.save();
    res.status(200).json({
      message: "Notes successfully created",
      Notes: savedNotes,
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const { createdBy } = req.params;
    console.log(createdBy);
    if (!createdBy) {
      return res
        .status(401)
        .json({ message: "Unable to fetch notes of current user " });
    }
    const userNotes = await Notes.find({ createdBy });
    console.log(userNotes);
    if (!userNotes) {
      return res.status(401).json({
        message: "No notes",
      });
    }
    res.status(200).json({
      notesData: userNotes,
    });
  } catch (error) {
    res.status(501).json({
      message: error.message,
    });
  }
};
export { createNotes, getNotes };
