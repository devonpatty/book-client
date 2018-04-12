import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const url = 'djbook.herokuapp.com/books';

class Books extends Component {
  state = {
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

  async fetchData() {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  }

  render() {
      const { data, loading, error } = this.state;

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
              <li> 
                {book.title} eftir {book.author}
              </li>
          ))}
        </ul>
        <p><Link to={data.links.next.href}>Næsta síða</Link></p>
      </div>
    );
  }
}
export default Books;
