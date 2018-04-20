import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/auth';
import api from '../../api';
import axios from 'axios';


import './User.css';
const baseurl = 'https://djbook.herokuapp.com';

class User extends Component {
  constructor(props) {
    super(props);

  this.state = {
    data: null,
    loading: true,
    error: null,
  }
  this.getBooks = this.getBooks.bind(this);


  }

  async componentDidMount() {
    await this.getUser();
  }
    
  async getUser() {
    const { i } = this.props.location.state;
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    await axios.get(
      `${baseurl}${this.props.location.pathname}/read`,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      },
    )
    .then((data) => {
      console.log(data.data);
      this.setState({data, loading: false})
    })
    .catch((error) => {
      this.setState({error, loading: false});
    });

  }

  getBooks(Books) {
    const cat =Books.map((bookid, title, star, review, i) =>
      <div key={i}> 
        <p>{bookid}</p>
        <p>{title}</p>
        <p>{star}</p>
        <p>{review}</p> 
      </div>
    )
    return cat;
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return (<p>Hleðum inn ...</p>);
    }

    if (error) {
      return (<p> Error </p>);
    }


    return (
      <div>
        {this.getBooks(data.data)}
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
