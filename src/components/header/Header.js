import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';

import Button from '../button';

import './Header.css';

class Header extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { isAuthenticated, user } = this.props;
    
    /* gervi boolean fyrir profile picture */
    const pic = true;

    return (
      <header className="header">
        <h1 className="header__heading">
          <NavLink to="/" className="header__homepage">Bókasafnið</NavLink>
        </h1>

        {/* ætti samt frekar heima í sér component */}
        <Button onClick={this.onClick}>Leita</Button>

        <div className="profile__header">
          { pic ? <div className="profile__pic"></div> : null }
          <div className="profile__container_right">
            { user ? <p>{user}</p> : null }
            { !isAuthenticated ? 
              <NavLink to="/login">Innskráning</NavLink> 
              : 
              <button onClick={this.handleLogout} className="header__button">Logout</button>}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Header);