import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/auth';
import api from '../../api';
import axios from 'axios';


import './User.css';
const baseurl = process.env.REACT_APP_SERVICE_URL;

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      loading: true,
      error: false,
      errMessage: '', 
    }

  }

  async componentDidMount() {
    await this.getUser();
  }
    
  async getUser() {
    let wow;
    try {
      wow = await this.getuser();
      console.log(wow);
      if (wow.data.hasOwnProperty('error')) {
        this.setState({ loading: false, error: true, errMessage: wow.data.error });
      } else {
        this.setState({ data: wow, loading: false });
      }
    } catch (error) {

    }
  }

  getuser = () => {
    return new Promise((resolve, reject) => {
      const { id } = this.props.location.state;
      const token = window.localStorage.getItem('token');
      const parsedToken = JSON.parse(token);
      axios.get(
        `${baseurl}users/${id}/read`,
        {
          headers: { Authorization: `Bearer ${parsedToken}` },
        },
      )
      .then((response) => {
        const { data } = response;
        return resolve({ data });
      })
      .catch((err) => {
        if (err.response) {
          const { error } = err.response.data;
          return resolve({ error });
        }
      });
    });
  }

  getBooks(books) {    
    const cat = books.data.map((book, i) =>
      <div key={i}> 
        <p>{book.bookid}</p>
        <p>{book.title}</p>
        <p>{book.star}</p>
        <p>{book.review}</p> 
      </div>
    )
    return cat;

  }

  render() {
    const { data, loading, error, errMessage } = this.state;
    if (loading) {
      return (<p>Hleðum inn ...</p>);
    }

    if (error) {
      return (<p>{errMessage}</p>);
    }

    return (
      <div>
        {this.getBooks(data)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(User);
