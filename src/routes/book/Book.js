import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const url = 'djbook.herokuapp.com/';

class Book extends Component {
  
  render() {
    const { book } = this.props.location.state;
    return (
      <div>
        <h3>{book.title}</h3>
        <p> Eftir {book.author}</p>
        <p> {book.isbn13} </p>
        <p> {book.category} </p>
        <p> {book.description} </p>
        <p> {book.pagecount} </p>
        <p> {book.language} </p>
        <Link to={{
          pathname: '/books/'+book.bookid+'/edit',
          state: { book: book}
        }}>Breyta bók! </Link>
      </div>
    );
  }
}
export default Book;
  