import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchBooks, goToHref } from '../../actions/search';
import PropTypes from 'prop-types';

class Books extends Component {

  componentDidMount = () => {
    const { dispatch, books } = this.props;
    dispatch(searchBooks(''));
  }

  nextPage = () => {
    const { books, query, dispatch, changePage } = this.props;
    const { links } = books.data;

    const nextAc = 'next';
    dispatch((goToHref(links.next.href, query, changePage, nextAc)));

  }

  prevPage = () => {
    const { books, query, dispatch, changePage } = this.props;
    const { links } = books.data;
    
    const prevAc = 'prev';
    dispatch((goToHref(links.prev.href, query, changePage, prevAc)));
  }

  render() {
    const { isSearching, isCompleted, books, query, changePage, resetPage, search, show } = this.props;

    let actualPage = search == true ? resetPage : changePage;

    if (isSearching) {
      return (<p>Hlaða niður bækur...</p>);
    }

    return (
      <div>
        {/* þarf að senda search key words hér*/}
        <h2>Bókaleit: {query}</h2>
        <ul>
          { books && (books.data.items.map((book) => 
            <li key={book.bookid}>
              <span>{book.title}</span>
              <span>Eftir {book.author}, gefin út {book.published}</span>
            </li>
          )) }
        </ul>
        <div>
          { changePage > 1 ? <button onClick={this.prevPage}>{`<`} Fyrri síða</button> : null }
          <p>Síða {actualPage}</p>
          { show ? <button onClick={this.nextPage}>Næsta síða {`>`}</button> : null }
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
    query: state.search.query,
    changePage: state.search.changePage,
    resetPage: state.search.resetPage,
    search: state.search.search,
    show: state.search.show,
  }
}

export default connect(mapStateToProps)(Books);
