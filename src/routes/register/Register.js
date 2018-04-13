import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { register, reset } from '../../actions/register';

import './Register.css';

class Register extends Component {

  state = {
    username: '',
    password: '',
    name: '',
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
    const { username, password, name } = this.state;

    dispatch(register(username, password, name));
  }

  handleReset = (e) => {
    const { dispatch } = this.props;
    dispatch(reset());
  }
  
  render() {
    const { username, password, name } = this.state;
    const { isRequesting, isDone, message } = this.props;

    if (isDone) {
      return (
        <p>Click here to return to <Link to="/login" onClick={this.handleReset}>login</Link></p>
      );
    }

    if (isRequesting) {
      return (
        <p>Please wait while creating new user</p>
      );
    }

    return (
      <div>
        { message && (
          <p>{message}</p>
        )}
        
        <h2 className="login__header">Nýskráning</h2>

        <form onSubmit={this.handleSubmit}>

          <div className="form__login">
            <div className="left__form">
              <label htmlFor="username">Notendanafn:</label>
              <label htmlFor="password">Lykilorð:</label>
              <label htmlFor="name">Nafn:</label>
            </div>

            <div className="right__form">
              <input required id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
              <input required id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
              <input required id="name" type="text" name="name" value={name} onChange={this.handleInputChange} />
            </div>
          </div>

          <button className="login__button">Nýskrá</button>

          <p><Link to='/login'>Innskráning</Link></p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isRequesting: state.register.isRequesting,
    isDone: state.register.isDone,
    message: state.register.message,
  }
}

export default connect(mapStateToProps)(Register);
