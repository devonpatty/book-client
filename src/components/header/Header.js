import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import { getPic } from '../../actions/upload';
import { searchBooks } from '../../actions/search';

import Search from '../search';

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
    const { dispatch } = this.props;

    this.searchValue = bookName.search;
    const page = 1;
    dispatch(searchBooks(this.searchValue, this.searchValue, page));
  }

  render() {
    const { 
      isAuthenticated, 
      user, 
      url, 
      history,
    } = this.props;

    let defaultImg = url === null ? "/profile.jpg" : url;

    return (
      <header className="header">
        <h1 className="header__heading">
          <NavLink to="/" className="header__homepage">Bókasafnið</NavLink>
        </h1>

        <Search history={history} onSubmit={this.searchBook} />

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