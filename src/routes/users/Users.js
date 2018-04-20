import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/auth';
import api from '../../api';

import './Users.css';

class Users extends Component {

  state = {
    users: null,
    loading: true,
    error: false,
  }

  componentDidMount = async () => {
    await this.getUsers();
  }
    
  getUsers = async () => {
    const { dispatch, history } = this.props;
    
    let users;
    try {
      users = await api.getUsers();
      if (users.error) {
        dispatch(logoutUser());
        history.push('/login?tokenExpired');
      } else {
        const { data } = users;
        this.setState({ users: data, loading: false });
      }
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  }

  render() {
    const { users, loading, error } = this.state;

    if (loading) {
      return (<p>Hleðum inn ...</p>);
    }

    if (error) {
      return (<p>Villa kom upp!!</p>);
    }

    return (
      <div>
        { users && (users.map((user, i) => 
          <p key={i}>{user.username}</p>
        )) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Users);
