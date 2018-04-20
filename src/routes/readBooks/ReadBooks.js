import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from "../../components/button/index";

import './ReadBooks.css';


class ReadBooks extends Component {

  render() {
    const { books, handleDelete } = this.props;

    return (
      <ul>
        { books && (books.map((book, i) =>
          <li key={book.bookid} className="read_book_margin">
            <div className="read_books">
              <Link
                  to={{
                    pathname: "/books/" + book.bookid,
                    state: { book: book }
                  }}
                >
                  <h3>{book.title}</h3>
              </Link>
            </div>
            <div className="read_books">
              <span>Einkunn: {book.star}. {book.review}</span>
            </div>
            <Button className="button_red" onClick={handleDelete.bind(this, book.bookid, book)}>Eyða</Button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ReadBooks;