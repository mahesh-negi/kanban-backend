const Task = require("../models/Task");
const List = require("../models/List");

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, listId } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      list: listId,
    });
    await task.save();

    const list = await List.findById(listId);
    list.tasks.push(task);
    await list.save();

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
