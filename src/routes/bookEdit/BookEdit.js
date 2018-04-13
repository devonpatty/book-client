import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BookEdit extends Component {
  state = {
    id: this.props.location.state.book.bookid,
    title: this.props.location.state.book.title,
    isbn13: this.props.location.state.book.isbn13,
    author: this.props.location.state.book.author,
    description: this.props.location.state.book.description,
    category: this.props.location.state.book.category,
    isbn10: this.props.location.state.book.isbn10,
    published: this.props.location.state.book.published,
    pagecount: this.props.location.state.book.pagecount,
    language: this.props.location.state.book.language,
  };

  changeTitle(event) {
    this.setState({title: event.target.value});
  }
  changeIsbn13(event) {
    this.setState({isbn13: event.target.value});
  }
  changeAuthor(event) {
    this.setState({author: event.target.value});
  }
  changeDescription(event) {
    this.setState({description: event.target.value});
  }
  changeCategory(event) {
    this.setState({category: event.target.value});
  }
  changeIsbn10(event) {
    this.setState({isbn10: event.target.value});
  }
  changePublished(event) {
    this.setState({published: event.target.value});
  }
  changePagecount(event) {
    this.setState({pagecount: event.target.value});
  }
  changeLanguage(event) {
    this.setState({language: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.title);
    event.preventDefault();
  }

  render() {
    const { book } = this.props.location.state;
    const {
        bookid,
        title,
        isbn13,
        author,
        description,
        category,
        isbn10,
        published,
        pagecount,
        language,
    } = book

    const path = 'https://vefforritun2-2018-v4-synilausn.herokuapp.com/'+bookid;
    return (
      <div>
        <p>Breyta Bók!</p>
        {/*<form method='PATCH' action={path}>*/}
        <form onSubmit={this.handleSubmit}>
          <label> 
            Titill:
            <input type='text' value={title} onChange={this.changeTitle}/>
          </label>
          <label> 
            isbn13:
            <input type='text' value={isbn13} onChange={this.changeIsbn13}/>
          </label>
          <label> 
            Höfundur:
            <input type='text' value={author} onChange={this.changeAuthor}/>
          </label>
          <label> 
            Lýsing:
            <input type='text' value={description} onChange={this.changeDescription}/>
          </label>
          <label> 
            Flokkur:
            <input type='text' value={category} onChange={this.changeCategory}/>
          </label>
          <label> 
            isbn10:
            <input type='text' value={isbn10} onChange={this.changeIsbn10}/>
          </label>
          <label> 
            Gefið út:
            <input type='text' value={published} onChange={this.changePublished}/>
          </label>
          <label> 
            Blaðsíður:
            <input type='text' value={pagecount} onChange={this.changePagecount}/>
          </label>
          <label> 
            Tungumál:
            <input type='text' value={language} onChange={this.changeLanguage}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}
export default BookEdit;
  