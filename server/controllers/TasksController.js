import Tasks from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      where: { assignedTo: req.userId },
    });

    if (tasks) {
      return res.status(200).json({ tasks });
    } else {
      return res.status(400).json({ error: "Getting tasks error" });
    }
    
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log("tasks err", err)
  }
};

export const completeTask = async (req, res) => {
    const taskId = req.params.id
    try {
        const [affectedRows] = await Tasks.update(
          {
            completed: true,
          },
          {
            where: {
              id: taskId,
            },
          }
        );
    
        if (affectedRows > 0)
          return res.status(200).json({
            message: "Task completed successfully!",
          });
        else
          return res
            .status(400)
            .json({ error: "Error completing the task, no rows are affected" });
      } catch (err) {
        console.error("Error completing the task:", err);
        res.status(400).json({ error: "Internal server error" });
      }
}