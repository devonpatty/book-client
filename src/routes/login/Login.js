import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* todo sækja actions frá ./actions */
import { loginUser, logoutUser } from '../../actions/auth';

import './Login.css';

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch(loginUser(username, password));
  }

  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { username, password } = this.state;
    const { isFetching, isAuthenticated, message } = this.props;

    if (isAuthenticated) {
      return (
        <button onClick={this.handleLogout}>Útskrá</button>
      );
    }

    if (isFetching) {
      return (
        <p>Skrái inn <em>{username}</em>...</p>
      );
    }

    return (
      <div>
        {message && (
          <p>{message}</p>
        )}
        
        <h2 className="login__header">Innskráning</h2>

        <form onSubmit={this.handleSubmit}>

          <div className="form__login">
            <div className="left__form">
              <label htmlFor="username">Notendanafn:</label>
              <label htmlFor="password">Lykilorð:</label>
            </div>

            <div className="right__form">
              <input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
              <input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
            </div>
          </div>

          <button className="login__button" disabled={isFetching}>Innskrá</button>

          <p><Link to='/register'>Nýskráning</Link></p>
        </form>
      </div>
    );
  }
}

/* todo tengja við redux */
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Login);
