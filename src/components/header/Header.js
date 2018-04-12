import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

import Button from '../button';

import './Header.css';

class Header extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  render() {
    return (
      <header className="header">
        <h1 className="header__heading">
          <NavLink to="/" className="header__homepage">Bókasafnið</NavLink>
        </h1>

        {/* ætti samt frekar heima í sér component */}
        <Button onClick={this.onClick}>Leita</Button>

        <NavLink to="/login">Innskráning</NavLink>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header);