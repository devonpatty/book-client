import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchBooks } from '../../actions/search';
import PropTypes from 'prop-types';

import Button from "../../components/button/index";

import './Books.css';

class Books extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(searchBooks(''));
  }

  render() {
    const { isSearching, isCompleted, books } = this.props;

    if (isSearching) {
      return (<p>Hlaða niður bækur...</p>);
    }

    return (
      <div>
        {/* þarf að senda search key words hér*/}
        <h2 className="books_title">Bókaleit: </h2>
          { books && (books.data.items.map((book) => 
            <div className="book_div" key={book.bookid}>
              <Link className="book_title"
                to={{
                  pathname: "/books/" + book.bookid,
                  state: { book: book }
                }}
              >
                <h3>{book.title}</h3>
              </Link>
              <span>Eftir {book.author}, gefin út {book.published}</span>
            </div>
          )) }
        <div>
          {/*líklega conditional render hérna fyrir next og previous page*/}
          {/*á eftir að útfæra next og previous button*/}
          <Button>{`<`} Fyrri síða</Button>
          <Button>Næsta síða {`>`}</Button>
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
