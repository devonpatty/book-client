import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Book.css';

import Button from "../../components/button/index";

const url = 'djbook.herokuapp.com/';

class Book extends Component {
  
  render() {
    const { book } = this.props.location.state;
    return (
      <div>
        <div className="book_div">
          <h3>{book.title}</h3>
          <p> Eftir {book.author}</p>
          <p> ISBN13: {book.isbn13} </p>
          <p> {book.category} </p>
          <p> {book.description} </p>
          <p> {book.pagecount} síður</p>
          <p> Gefin út {book.published}</p>
          <p> Tungumál: {book.language} </p>
          <Link to={{
            pathname: '/books/'+book.bookid+'/edit',
            state: { book: book}
          }}>Breyta bók! </Link>
        </div>
        <div>
          <Button className="read_book">Lesin bók</Button>
        </div>
        <div>
          <Button>Til baka</Button>
        </div>
      </div>

      
    );
  }
}
export default Book;
  