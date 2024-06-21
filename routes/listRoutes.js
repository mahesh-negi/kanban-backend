const express = require("express");
const { createList, deleteList } = require("../controllers/listController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createList);
router.delete("/:id", authMiddleware, deleteList);

module.exports = router;
