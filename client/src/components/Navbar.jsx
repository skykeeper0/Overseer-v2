import React from 'react';
import { IndexLink, Link } from 'react-router';

const Navbar = ({ isLoggedIn }) => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <IndexLink className="navbar-brand" to="/">ProgressWatch</IndexLink>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        {isLoggedIn && <ul className="nav navbar-nav">
          <li><Link to='/dashboard'>Dashboard</Link></li>
        </ul>}
        {!isLoggedIn && <ul className="nav navbar-nav navbar-right">
          <li><Link to='/signup'>Sign up</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>}

      </div>
    </div>
  </nav>
);

export default Navbar;
