import React, { Component } from 'react';


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
    const { history } = this.props;

    this.props.onSubmit(this.state);

    this.setState({
      search: '',
    });
    history.push(`/books?search=${this.state.search}&page=1`);
  }

  render() {
    const { search } = this.state;
    return (
      <form >
        <input
          id="search" 
          type="text" 
          placeholder="Bókarleita" 
          name="search" value={search} 
          onChange={this.handleInputSearch} />
        <Button onClick={this.handleSubmitSearch}className="button">Leita</Button>
      </form>
    );
  }
}

export default Search;