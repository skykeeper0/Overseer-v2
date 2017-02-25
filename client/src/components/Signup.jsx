import React, { Component } from 'react';
import Dashboard from './Dashboard.jsx';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="well">
              <fieldset>
                <legend>Sign up</legend>
                  <form onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="firstName">First name</label>
                      <input type="text" id="firstName" className="form-control" name="firstName" placeholder="First name" autoFocus />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last name</label>
                      <input type="text" id="lastName" className="form-control" name="lastName" placeholder="Last name" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" className="form-control" name="email" placeholder="Email" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" id="username" className="form-control" name="username" placeholder="Username" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" className="form-control" name="password" placeholder="Password" />
                    </div>

                    <button className="btn btn-block btn-primary" type="submit">Sign up</button>
                  </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup;
