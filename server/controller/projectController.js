const Project = require('../models/project');
const Models = require('../models');

const projectController = {};

projectController.addProject = (req, res) => {
  Project.create({
    name: req.body.name
  }).then((result) => {
    // return res.send('Project created');
    return res.json(result);
  }).catch((err) => {
    throw err;
  });
};

projectController.getProjects = (req, res) => {
  Project.findAll({
    // where: { userId: req.user.id }
  })
    .then((projects) => {
      res.json(projects);
    }).catch((err) => {
      throw err;
    });
};

projectController.getProjectInformation = (req, res) => {
  Models.Project.findById(req.params.id, {
    include: [
      {
        model: Models.Task,
      }
    ]
  }).then((project) => {
    res.json(project);
  }).catch((err) => {
    res.send(err);
  });
}

projectController.updateProgress = (req, res) => {
  Models.Task.findAll({
    where: {
      projectId: req.params.projectId
    },
  }).then((tasks) => {
    const completed = tasks.filter((task) => {
      return task.dataValues.completed;
    });
    const percentProgress = Math.floor((completed.length/tasks.length) * 100);
    Project.findById(req.params.projectId)
      .then((project) => {
        project.update({
          percentProgress
        }).then((result) => {
          res.json(result);
        })
      })

  })
}

projectController.updateProject = (req, res) => {
  Models.Task.findById(req.body.taskId)
    .then((task) => {
      console.log(task);
      task.completed = !task.completed;
      return task.save();
    })
    .then(() => {
      console.log('saved');
      return Models.Project.findById(req.params.id, { include: [ Models.Task ]})
    })
    .then((project) => {
      const completed = project.tasks.filter((task) => {
        return task.completed;
      });
      percentProgress = (completed.length/project.tasks.length) * 100;

      project.percentProgress = percentProgress;
      return project.save();
    })
    .then((project) => {
      res.json(project)
    })
    .catch((err) => {
      res.json(err);
    });
}

projectController.deleteProject = (req, res) => {
  Models.Task.destroy({
    where: { 'projectId': req.params.id }
  })
  .then(() => {
    return Models.Project.destroy({
      where: {
        id: req.params.id
      }
    });
  })
  .then(() => {
    res.status(200).end();
  })
  .catch((err) => {
    res.json(err);
  })

}

module.exports = projectController;
