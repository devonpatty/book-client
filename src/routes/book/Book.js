import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import './Book.css';

import Button from "../../components/button/index";

const baseurl = process.env.REACT_APP_SERVICE_URL;

class Book extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.addToRead = this.addToRead.bind(this);
    this.textReview = this.textReview.bind(this);
    this.starReview = this.starReview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  state = {
    star: 1,
    review: '',
    edit: false,
    category: null,
    data: null, 
    loading: true, 
    error: false, 
    visible: false
  };

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false});
    } catch(err) {
      console.error(err);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData() {
    const { book } = this.props.location.state;
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    const response = await axios.get(
      `${baseurl}categories`,
      {
        headers: { Authorization: `Bearer ${parsedToken}` },
      },
    )
    response.data.map((cateid) => {
      if(book.category === cateid.cateid) {
        this.setState({category: cateid.name})
      }
      return null;
    }) 
  }

  onClick() {
    this.props.history.push('/books');
  }

  addToRead() {
    this.setState({ edit: true});
  }

  starReview(event) {
    this.setState({star: event.target.value});
  }

  textReview(event) {
    this.setState({review: event.target.value});
  }

  handleSubmit(event) {
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    const { book } = this.props.location.state;
    const { star, review } = this.state;
    console.log(book.bookid);
    console.log(star);
    console.log(review);
    axios({
      method: 'POST',
      url: `${baseurl}users/me/read`,
      data: {
      bookId: book.bookid,
      star,
      review,
    },
    headers: { Authorization: `Bearer ${parsedToken}` },
  })
  .then((response) => {
      alert("Skráning á lestri móttekin");
      this.setState({ edit: false});
  }).catch((err) => {
      alert(err);
      this.setState({ edit: false});
    });
  }

  handleCancel(event) {
    this.setState({ edit: false})
  }

  render() {
    const { book } = this.props.location.state;
    const { category, edit, star, review } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <div>
        <div className="book_div">
          <h3>{book.title}</h3>
          <p> Eftir {book.author}</p>
          <p> ISBN13: {book.isbn13} </p>
          <p>{category} </p>
          <p> {book.description} </p>
          <p> {book.pagecount} síður</p>
          <p> Gefin út {book.published}</p>
          <p> Tungumál: {book.language} </p>
          {isAuthenticated ? <Link to={{
            pathname: '/books/'+book.bookid+'/edit',
            state: { book: book}
          }}>Breyta bók! </Link> : null }
        </div>
        <div>
        { isAuthenticated ? 
          (!edit ? 
          <Button className="read_book" onClick={this.addToRead}> Lesin bók </Button> :
          <div>
            <div>
              <form>
                <div className="read_book_margin">
                  <label>Um bók:
                    <div>
                      <input className="about_book_input" type='text' value={review} onChange={this.textReview}/>
                    </div>
                  </label>
                </div>
                <div className="read_book_margin">
                  <label> Einkunn:
                    <div>
                      <select className="book_grade" name="star" value={star} onChange={this.starReview}>
                        <option key="1" value={1}> 1 </option>
                        <option key="2" value={2}> 2 </option>
                        <option key="3" value={3}> 3 </option>
                        <option key="4" value={4}> 4 </option>
                        <option key="5" value={5}> 5 </option>
                      </select>
                    </div>
                  </label>
                </div>
              </form>
            </div>
            <div className="read_btn_flex">
              <Button onClick={this.handleSubmit}>Vista</Button>
              <Button className="button_red" onClick={this.handleCancel}>Hætta við</Button>
            </div>
          </div>
          ) : null 
        }
        </div>
      <div>
        <Button onClick={this.onClick}>Til baka</Button>
      </div>
    </div>
    );
  }
}

const mapToStateProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapToStateProps)(Book);
  