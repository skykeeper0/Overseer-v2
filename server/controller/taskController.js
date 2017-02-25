const Models = require('../models');

const taskController = {};

taskController.getTasks = (req, res) => {
  Models.Task.findAll({ where: { projectId: req.params.id } })
    .then((tasks) => {
      res.json(tasks);
    }).catch((err) => {
      throw err;
    });
};

taskController.addTask = (req, res) => {
  console.log(req.body);
  Models.Task.create({
    name: req.body.name,
    projectId: req.body.projectId,
  }).then((result) => {
    return Models.Project.findById(req.body.projectId, {
      include: [ Models.Task ]
    });
  }).then((project) => {
    const completed = project.tasks.filter((task) => {
      return task.completed;
    });
    percentProgress = (completed.length/project.tasks.length) * 100;

    project.percentProgress = percentProgress;
    return project.save();
  }).then((project) => {
    res.json(project);
  }).catch((err) => {
    throw err;
  });
};

taskController.toggleCompletion = (req, res, next) => {
  Models.Task.findById(req.params.taskId)
    .then((task) => {
      task.update({
        completed : !task.completed
      }).then((result) => {
        next();
      })
    })
}
module.exports = taskController;
