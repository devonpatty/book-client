import React, { Component } from 'react';

import api from '../../api';

class ReadBooks extends Component {

  render() {
    const { books, handleDelete } = this.props;

    return (
      <ul>
        { books && (books.map((book, i) =>
          <li key={book.bookid}>
            <p>{book.title}</p>
            <p>Einkunn: {book.star}</p>
            <p>{book.review}</p>
            <button onClick={handleDelete.bind(this, book.bookid, book)}>Eyða</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ReadBooks;