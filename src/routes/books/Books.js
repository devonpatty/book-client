import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Books extends Component {

  render() {
    const { isSearching, isCompleted, books } = this.props;

    if (isSearching) {
      return (<p>Hlaða niður bækur...</p>);
    }

    return (
      <div>
        {/* þarf að senda search key words hér*/}
        <h2>Bókaleit: </h2>
        <ul>
          { books && (books.data.items.map((book) => 
            <li key={book.bookid}>
              <span>{book.title}</span>
              <span>Eftir {book.author}, gefin út {book.published}</span>
            </li>
          )) }
        </ul>
        <div>
          {/*líklega conditional render hérna fyrir next og previous page*/}
          {/*á eftir að útfæra next og previous button*/}
          <button>{`<`} Fyrri síða</button>
          <button>Næsta síða {`>`}</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSearching: state.search.isSearching,
    isCompleted: state.search.isCompleted,
    books: state.search.books,
  }
}

export default connect(mapStateToProps)(Books);
