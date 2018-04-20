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
    const { dispatch, history } = this.props;
    dispatch(logoutUser());
    history.push('/login');
  }

  searchBook = (bookName) => {
    const { dispatch } = this.props;

    this.searchValue = bookName.search;
    dispatch(searchBooks(this.searchValue));
  }

  componentDidUpdate = (prevProps) => {
    const { dispatch, isAuthenticated, history, message } = this.props;
    if (isAuthenticated) {
      dispatch(getPic());
    } else {

    }
  }

  render() {
    const { 
      isAuthenticated, 
      user, 
      url,
      name,
      history,
    } = this.props;
    
    let defaultImg = url === null ? "/profile.jpg" : url;

    return (
      <header className="header">
        <div className="heading_div">
          <h1 className="header__heading">
            <NavLink to="/" className="header__homepage">Bókasafnið</NavLink>
          </h1>
        </div>

        <Search history={history} onSubmit={this.searchBook} />

        <div className="profile__header">
          { isAuthenticated ? 
            <img src={defaultImg} className="profile__pic"></img> 
            : 
            null 
          }
          <div className="profile__container_right">
            { isAuthenticated ? <p><Link to="/profile">{name}</Link></p> : null }
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
    name: state.auth.name,
    url: state.upload.url,
    message: state.upload.message,
  }
}

export default connect(mapStateToProps)(Header);