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

    if (!createdBy) {
      return res.status(401).json({
        message: "Error occur while trying to fetch notes.try again!!  ",
      });
    }
    const userNotes = await Notes.find({ createdBy });

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

const getSpecificNotes = async (req, res) => {
  try {
    const { noteId } = req.params;
    if (!noteId) {
      return res.status(401).json({
        message: "Error occur while trying to update notes.try again!! ",
      });
    }
    const userNotes = await Notes.findById(noteId);
    if (!userNotes) {
      return res.status(401).json({
        message: "Error occur while trying to update notes.try again!! ",
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
export { createNotes, getNotes, getSpecificNotes };
