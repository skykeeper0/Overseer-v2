import React from 'react';

const Login = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="well">
          <fieldset>
            <legend>Login</legend>
            <form onSubmit={props.handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" className="form-control" name="username" placeholder="Username" autoFocus />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-control" name="password" placeholder="Password" />
              </div>

              <button className="btn btn-block btn-primary" type="submit">Log In</button>
            </form>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
