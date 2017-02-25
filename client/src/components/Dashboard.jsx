import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import ProgressBar from './ProgressBar.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.appState.isLoggedIn) {
      this.props.router.push('/login');
    }
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    const projects = this.props.appState.projects.map((project, i) => {
      return <Link key={project.id} className="list-group-item" to={`/dashboard/projects/${project.id}`}>
        {project.name}
        <ProgressBar progress={project.percentProgress} />
      </Link>;
    });

    return (
      <div className="container">
        <div className="row">
          <div id="projects" className="col-md-8 col-md-offset-2">
            <h1>Dashboard</h1>
            <div className="list-group">
              {projects}
            </div>
            <form onSubmit={this.props.submitProject}>
              <div className="form-group">
                <div className="input-group">
                  <input type="text" name="newProject" className="form-control" placeholder="New Project" />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-default" value="Add Project" />
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
