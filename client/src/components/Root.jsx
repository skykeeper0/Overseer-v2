import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import App from './App.jsx';
import Navbar from './Navbar.jsx';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoggedIn: false,
      projects: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.submitProject = this.submitProject.bind(this);
  }

  fetchProjects() {
    // axios.get('/get_projects', {
    //   withCredentials: true,
    // })
    // .then((response) => {
    //   console.log(response);
    //   this.setState({ projects: response.data });
    // })
    // .catch((err) => {
    //   throw err;
    // });
    fetch('/get_projects', {
      credentials: 'include',
      origin: 'http://localhost:3000'
    })
      .then((response) => {
        return response.json()
      })
      .then((projects) => {
        this.setState({ projects });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  submitProject(event) {
    const body = {
      name: event.target.newProject.value,
    };
    event.preventDefault();
    event.target.newProject.value = '';
    fetch('/add_project', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body),
    }).then(res => res.json()).then(newProject => {
      const newProjects = this.state.projects.concat(newProject);

      this.setState({
        projects: newProjects
      });
    })
  }
  handleLogin(e) {
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    e.target.password.value = '';
    e.target.username.autoFocus = true;
    fetch('/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      return res.json();
    }).then((data) => {
      // console.log(data);
      this.setState({
        user: data.userName,
        isLoggedIn: true
      });
      browserHistory.push('/dashboard');
    }).catch((err) => {
      browserHistory.push('/login');
    })
    e.preventDefault();
  }

  handleSubmit(e) {
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const email = e.target.elements.email.value;
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    this.setState({ firstName, lastName, email, username, password }, () => {
      fetch('/signup', {
        method: 'post',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password
        }),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert('Please enter valid fields.');
          browserHistory.push('/signup');
        }
      }).then((user) => {
        this.setState({ user, isLoggedIn: true }, () => {
          browserHistory.push('/dashboard');
        })
      }).catch((res) => {
        alert('Please enter valid fields.');
        browserHistory.push('/signup');
      })
    });
    e.preventDefault();
  }

  render() {
    const theProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        handleSubmit: this.handleSubmit,
        handleLogin: this.handleLogin,
        fetchProjects: this.fetchProjects,
        submitProject: this.submitProject,
        appState: this.state
      });
    });

    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} />
        {theProps}
      </div>
    )
  }
}

export default Root;
