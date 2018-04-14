import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from '../book'

class Books extends Component {
  constructor(props) {
    super(props);
  this.state = {
    title: this.props.location.state.title,
    data: null,
    loading: true,
    error: false,
  }
  this.onClickk = this.onClickk.bind(this);
}

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false});
    } catch (e) {
      console.error('Error fetching books', e);
      this.setState({ error: true, loading: false})
    }
  }

  async fetchData(url) {
      const { title } = this.state;
      const response = await fetch(title);
      const data = await response.json();
      return data;
  }

  onClickk = () => {
    const { data } = this.state;
    this.setState({ title:  data.links.self.href});
  }

  render() {
      const { data, loading, error, title } = this.state;

      if (loading) {
          return (<div> Hleð inn bókum </div>)
      }

      if (error) {
          return (<div> Villa við að hlaða inn bókum </div>)
      }
    
    return (
      <div>
        <p>Bækur!</p>
        <ul>
          {data.items.map((book) => (
              <li key={book.bookid}>
                <Link to={{
                  pathname: '/books/'+book.bookid,
                  state: { book: book}
                }}>
                {book.title}</Link>
                <p>eftir {book.author}</p>
              </li>
          ))}
        </ul>
        <p>
        <Link to={{
            pathname: '/books',
            state: { title: data.links.self.href }
        }}> Næsta Síða </Link>
        <div onClick={this.onClickk}>Næsta Síða</div>
        </p>
      </div>
    );
  }
}
export default Books;
