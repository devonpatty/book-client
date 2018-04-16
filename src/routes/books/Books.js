import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "../book";
import Button from "../../components/button/index";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state.title,
      data: null,
      loading: true,
      error: false,
      page: 0,
      limit: 10,
      prev: false,
    }
  }

  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    this.setState({ prev: this.state.page > 0 });
    try {
      const data = await this.fetchData(this.state.page);
      this.setState({ data, loading: false });
    }
    catch (e) {
      console.error("Error fetching books", e);
      this.setState({ error: true, loading: false });
    }

  }

  async fetchData(page) {
    const response = await fetch(this.state.title + "?offset=" + this.state.page * this.state.limit + "&limit=" + this.state.limit);
    const data = await response.json();
    return data;
  }

  nextPage = () => {
    this.setState({page: this.state.page + 1}, this.getData);

  };

  prevPage = () => {
    this.setState({page: this.state.page - 1}, this.getData);
  };


  render() {
    const { data, loading, error, title } = this.state;

    if (loading) {
      return <div> Hleð inn bókum </div>;
    }

    if (error) {
      return <div> Villa við að hlaða inn bókum </div>;
    }

    return (
      <div>
        <p>Bækur!</p>
        <ul>
          {data.items.map(book => (
            <li key={book.bookid}>
              <Link
                to={{
                  pathname: "/books/" + book.bookid,
                  state: { book: book }
                }}
              >
                {book.title}
              </Link>
              <p>eftir {book.author}</p>
            </li>
          ))}
        </ul>
        <div>
          { this.state.prev ? <Button onClick={this.prevPage}>Fyrri síða</Button> : null }
          <p>Síða {this.state.page + 1}</p>
          <Button onClick={this.nextPage}>Næsta Síða</Button>
        </div>
      </div>
    );
  }
}
export default Books;
