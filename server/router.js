const passport = require('passport');
const userController = require('./controller/userController');
const seed = require('./db/seed');
const projectController = require('./controller/projectController');
const taskController = require('./controller/taskController');
const session = require('express-session');

module.exports = function(express) {
    const router = express.Router();
    const isAuthenticated = function(req, res, next) {
        // where is this middlewear being used? what is it going next to?
        if(req.isAuthenticated()) return next();
        // check these routes later
        else res.redirect('/');
    }

    router.post('/signup', userController.signup);

    // fix all of these routes
    // router.post('/', passport.authenticate('local',{
    //     successRedirect: '/dashboard',
    //     failureRedirect: '/rawr',
    //     // failureFlash: true
    // }));

    router.post('/', passport.authenticate('local'), (req, res) => {
        req.session.isLoggedIn = true;
        res.json({
            userName: req.user.username,
        });
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

    return router;

}
