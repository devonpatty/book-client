import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { getPic } from '../../actions/upload';
import axios from 'axios';

import Search from '../search';
import Button from '../button';

import './Header.css';

class Header extends Component {

  state = { searchValue: '', };

  onClick = (e) => {
    console.log('leita');
  }

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  searchBook = (bookName) => {
    this.searchValue = bookName.search;
    axios.get(`https://djbook.herokuapp.com/books/?search=${this.searchValue}`)
    .then((data) => {
      console.log(data);
    });
  }

  render() {
    const { 
      isAuthenticated, 
      user, 
      url, 
    } = this.props;

    let defaultImg = url === null ? "/profile.jpg" : url;

    return (
      <header className="header">
        <h1 className="header__heading">
          <NavLink to="/" className="header__homepage">Bókasafnið</NavLink>
        </h1>

        <Search onSubmit={this.searchBook} />

        <div className="profile__header">
          { isAuthenticated ? 
            <img src={defaultImg} className="profile__pic"></img> 
            : 
            null 
          }
          <div className="profile__container_right">
            { user ? <p><Link to="/profile">{user}</Link></p> : null }
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
    url: state.upload.url,
  }
}

export default connect(mapStateToProps)(Header);