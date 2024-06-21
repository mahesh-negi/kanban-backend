const List = require('../models/List');
const Board = require('../models/Board');

exports.createList = async (req, res) => {
    try {
        const { name, boardId } = req.body;
        const list = new List({ name, board: boardId });
        await list.save();

        const board = await Board.findById(boardId);
        board.lists.push(list);
        await board.save();

        res.status(201).json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteList = async (req, res) => {
    try {
        await List.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
