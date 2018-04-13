import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Books extends Component {

  state = {
    title: this.props.location.state.title,
    data: null,
    loading: true,
    error: false,
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
              <li key={book.id}> 
                {book.title} eftir {book.author}
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
