const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const board = new Board({ user: req.user._id, name });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id }).populate("lists");
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
