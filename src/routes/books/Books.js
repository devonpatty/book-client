import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchBooks, goToHref } from '../../actions/search';
import querystring from 'querystring';

import PropTypes from 'prop-types';

import Button from "../../components/button/index";

import './Books.css';

class Books extends Component {

  componentDidMount = () => {
    const { dispatch, books } = this.props;
    dispatch(searchBooks(''));
  }

  nextPage = () => {
    const { books, query, dispatch, changePage, history } = this.props;
    const { links } = books.data;

    const nextAc = 'next';
    dispatch((goToHref(links.next.href, query, changePage, nextAc)));
    history.push(this.queryString(query, changePage+1));
  }

  prevPage = () => {
    const { books, query, dispatch, changePage, history } = this.props;
    const { links } = books.data;
    
    const prevAc = 'prev';
    dispatch((goToHref(links.prev.href, query, changePage, prevAc)));
    history.push(this.queryString(query, changePage-1));
  }

  queryString = (query = '', page = 1) => {
    const str = querystring.stringify({ search: query, page });
    return `/books?${str}`;
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
        <h2 className="books_title">Bókaleit: {query}</h2>

          { books && (books.data.items.map((book) => 
            <div className="books_div" key={book.bookid}>
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
        <div className="button_flex">
          <div>
            { changePage > 1 ? <Button onClick={this.prevPage}>{`<`} Fyrri síða</Button> : null }
          </div>
          <div>
            <p className="page_number">Síða {actualPage}</p>
          </div>
          <div>
            { show ? <Button onClick={this.nextPage}>Næsta síða {`>`}</Button> : null }
          </div>
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
