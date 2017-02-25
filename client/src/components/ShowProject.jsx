import React, { Component } from 'react';
import { Link } from 'react-router';
import ProgressBar from './ProgressBar.jsx';

class ShowProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        tasks: []
      },
      incomplete: 0,
      complete: 0,
      total: 0,
    };

    this.changeTask = this.changeTask.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.toggleCompletionAndUpdateProgress = this.toggleCompletionAndUpdateProgress.bind(this);
  }

  toggleCompletionAndUpdateProgress(id, e) {
    e.preventDefault();
    fetch(`/update_project/${this.props.params.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        taskId: id
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((project) => {
      // console.log(project);
      this.setState({ project }, () => {
        console.log('state updated');
      });
    })
    .catch((err) => {
      console.log('ERROR');
      console.log(err);
    })
  }

  deleteProject(e) {
    e.preventDefault();
    fetch(`/delete_project/${this.props.params.id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.ok) {
        this.props.router.push('/dashboard');
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  changeTask(event) {
    event.preventDefault();
    // console.log(event.target.value);
    this.setState({newTask: event.target.value});
  }

  submitTask(event) {
    const body = {
      name: event.target.newTask.value,
      projectId: this.state.project.id,
    };
    event.preventDefault();
    event.persist();
    fetch('/add_task', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => {
      return res.json();
    }).then((newProject) => {
      event.target.newTask.value = '';

      this.setState({
        project: newProject,
      });
    })
  }

  fetchTasks() {
    fetch(`/get_project_info/${this.props.params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((project) => {
        this.setState({ project });
        // console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.fetchTasks();
  }

  render() {
    let tasks = [];

    if (this.state.project.tasks) {
      tasks = this.state.project.tasks.map((task, index) => {
        return (
          <li key={task.id} className="list-group-item">
            <form>

              <input type="checkbox" onChange={this.toggleCompletionAndUpdateProgress.bind(null, task.id)} checked={task.completed} /><label>{task.name}</label>

            </form>
          </li>
        )
      });
    }


    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <h1>{this.state.project.name}</h1>
            <ProgressBar progress={this.state.project.percentProgress} />
            <h3>Tasks:</h3>
            <ul className="list-group">
              {tasks}
            </ul>
            <form onSubmit={this.submitTask}>
              <div className="form-group">
                <div className="input-group">
                  <input type="text" name="newTask" className="form-control" placeholder="New Task" />
                  <span className="input-group-btn">

                    <input type="submit" className="btn btn-default" value="Add Task" />
                  </span>
                </div>
              </div>
            </form>
            <button className="btn btn-danger" onClick={this.deleteProject}>Delete Project</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowProject;
