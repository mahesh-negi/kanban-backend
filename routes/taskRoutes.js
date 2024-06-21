const express = require("express");
const { createTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;
