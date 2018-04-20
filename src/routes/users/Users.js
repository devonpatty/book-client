import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { register, reset } from '../../actions/register';

import './Users.css';

const baseurl = process.env.REACT_APP_SERVICE_URL;

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: null, 
      loading: true, 
      error: false,
    };
    this.getUsers = this.getUsers.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
    } catch(err) {
      console.error(err);
      this.setState({ error: true, loading: false });
    }
  }
    
  async fetchData() {
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    axios({
        method: 'GET',
        url: `${baseurl}users`,
        headers: { Authorization: `Bearer ${parsedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ data: response.data, loading: false});
      })
  }

  getUsers(data) {
    const cat = data.map((user) => 
      <div>
        <p>{user.username}</p>
      </div>
    )
    return cat;
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (<div>Hleð inn gögnum...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    return (
      <div>
          { this.getUsers(data) }
      </div>
    );
  }
}

export default Users;
