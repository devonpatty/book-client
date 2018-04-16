import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../button';

import './Search.css';

class Search extends Component {

  state = { search: '', };

  handleInputSearch = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmitSearch = (e) => {
    e.preventDefault();
    const { search } = this.state;
    axios.get(`https://djbook.herokuapp.com/books?search=${search}`)
    .then((response) => {
      console.log(response);
    });
  }

  render() {
    const { search } = this.state;
    return (
      <div>
        <input id="search" type="text" placeholder="Bókarleita" name="search" value={search} onChange={this.handleInputSearch} />
        <Button onClick={this.handleSubmitSearch} className="button">Leita</Button>
      </div>
    );
  }
}

export default Search;