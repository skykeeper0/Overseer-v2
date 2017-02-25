const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/userController');
const projectController = require('../controller/projectController');
const taskController = require('../controller/taskController');

router.post('/signup', userController.signup);
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.locals.currUser = req.user;
  res.json(req.user);
});

router.get('/seed', (req, res) => {
  seed();
  res.send('seeded database');
});

router.get('/get_projects', projectController.getProjects);
router.post('/add_project', projectController.addProject);

router.get('/get_tasks/:id', taskController.getTasks);
router.post('/add_task', taskController.addTask, projectController.updateProgress);

router.get('/get_project_info/:id', projectController.getProjectInformation);

router.patch('/patch/:taskId/:projectId', taskController.toggleCompletion, projectController.updateProgress);

router.patch('/update_project/:id', projectController.updateProject);
router.delete('/delete_project/:id', projectController.deleteProject);

module.exports = router;
