const express = require("express");
const {
  createBoard,
  getBoards,
  deleteBoard,
} = require("../controllers/boardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);
router.delete("/:id", authMiddleware, deleteBoard);

module.exports = router;
