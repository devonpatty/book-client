import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';

import Button from '../button';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  search = () => {
    
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
        <div>
          <input onChange={evt => {this.setState({inputValue: evt.target.value})} } type="text" name="search"/>
          <Button onClick={this.search}>
            <Link to={{
              pathname:"/books?search=" + this.state.inputValue,
            }}>Leita</Link>
          </Button>
        </div>
        

        <div className="profile__header">
          { pic ? <div className="profile__pic"></div> : null }
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
  }
}

export default connect(mapStateToProps)(Header);