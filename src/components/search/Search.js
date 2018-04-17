import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

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
    
    this.props.onSubmit(this.state);

    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;
    return (
      <form onSubmit={this.handleSubmitSearch}>
        <input id="search" type="text" placeholder="Bókarleita" name="search" value={search} onChange={this.handleInputSearch} />
        <Button className="button">
          Leita
        </Button>
      </form>
    );
  }
}

export default Search;