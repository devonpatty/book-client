import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './BookEdit.css';

import Button from "../../components/button/index";

const baseurl = process.env.REACT_APP_SERVICE_URL;

class BookEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, 
      id: this.props.location.state.book.bookid,
      title: this.props.location.state.book.title,
      isbn13: this.props.location.state.book.isbn13,
      author: this.props.location.state.book.author,
      description: this.props.location.state.book.description,
      category: this.props.location.state.book.category,
      isbn10: this.props.location.state.book.isbn10,
      published: this.props.location.state.book.published,
      pagecount: this.props.location.state.book.pagecount,
      language: this.props.location.state.book.language,
      allCategories: {},
    };

    this.changeTitle = this.changeTitle.bind(this);
    this.changeIsbn13 = this.changeIsbn13.bind(this);
    this.changeAuthor = this.changeAuthor.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.changeIsbn10 = this.changeIsbn10.bind(this);
    this.changePublished = this.changePublished.bind(this);
    this.changePagecount = this.changePagecount.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ loading: false, allCategories: data});
    } catch(err) {
      console.error(err);
    }
  }

  async fetchData() {
    const response = await axios.get(
      `${baseurl}categories`,
    )
    return response;
  }

  changeTitle(event) {
    this.setState({title: event.target.value});
  }
  changeIsbn13(event) {
    this.setState({isbn13: event.target.value});
  }
  changeAuthor(event) {
    this.setState({author: event.target.value});
  }
  changeDescription(event) {
    this.setState({description: event.target.value});
  }
  changeCategory(event) {
    this.setState({category: event.target.value});
  }
  changeIsbn10(event) {
    this.setState({isbn10: event.target.value});
  }
  changePublished(event) {
    this.setState({published: event.target.value});
  }
  changePagecount(event) {
    this.setState({pagecount: event.target.value});
  }
  changeLanguage(event) {
    this.setState({language: event.target.value});
  }

  getCategories(categories) {
    const cat = categories.data.map((category) => 
      <option key={category.cateid} value={category.cateid}> {category.name} </option>
    )
    return cat;
  }

  handleSubmit(event) {
    const { book } = this.props.location.state;
    const token = window.localStorage.getItem('token');
    const parsedToken = JSON.parse(token);
    
    const {
      bookid,
      title,
      isbn13,
      author,
      description,
      category,
      isbn10,
      published,
      pagecount,
      language,
  } = this.state;

  axios({
    method: 'PATCH',
    url: `${baseurl}books/${book.bookid}`,
    data: {
      bookid,
      title,
      isbn13,
      author,
      description,
      category,
      isbn10,
      published,
      pagecount,
      language,
    },
    headers: { Authorization: `Bearer ${parsedToken}` },
  })
  .then((response) => {
    alert("Bók hefur verið breytt");
    this.props.history.push('/books');
  })
  .catch((err) => {
    if (err.response) {
      alert(err.response.data.error);
    }
  });

  }

  onClick() {
    this.props.history.push('/books');
  }

  render() {

    const {
      loading,
        title,
        isbn13,
        author,
        description,
        category,
        isbn10,
        published,
        pagecount,
        language,
        allCategories,
    } = this.state

    if (loading) {
      return (<div>Hleð inn gögnum...</div>);
    }

    return (
      <div>
        <h2 className="margin_div">Breyta Bók</h2>
        <div className="change_div">
          <form>
            <div className="margin_div">
              <label  className="book_edit_label">
                <div>
                  Titill:
                </div> 
                <div>
                  <input className="book_edit_input" type='text' value={title} onChange={this.changeTitle}/>
                </div>                
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label">
                <div>
                  Höfundur:
                </div>
                <div>
                  <input className="book_edit_input" type='text' value={author} onChange={this.changeAuthor}/>                  
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label> 
                <div>
                  Lýsing:  
                </div>
                <div>
                  <textarea className="book_edit_desc" type='text' value={description} onChange={this.changeDescription}/> 
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label> 
                <div>
                  Flokkur:  
                </div>
                <div>
                  <select name="category" value={category} onChange={this.changeCategory}>
                    { this.getCategories(allCategories) }
                  </select>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label"> 
                <div>
                  ISBN10:  
                </div>
                <div>
                  <input className="book_edit_input" type='text' value={isbn10} onChange={this.changeIsbn10}/>  
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label"> 
                <div>
                  ISBN13:
                </div>
                <div>
                  <input className="book_edit_input" type='text' value={isbn13} onChange={this.changeIsbn13}/>
                </div>  
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label"> 
                <div>
                  Útgefin:
                </div>
                <div>
                  <input className="book_edit_input" type='text' value={published} onChange={this.changePublished}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label"> 
                <div>
                  Fjöldi síðna: 
                </div>
                <div>
                  <input className="book_edit_input" type='text' value={pagecount} onChange={this.changePagecount}/> 
                </div>
              </label>           
            </div>
            <div className="margin_div">
              <label className="book_edit_label"> 
                <div>
                  Tungumál:
                </div>
                <div>
                  <input className="book_edit_input" type='text' value={language} onChange={this.changeLanguage}/>
                </div>
              </label>
            </div>
          </form>
          <Button className="btn_save" onClick={this.handleSubmit}>Vista</Button>
        </div>
        <div>
          <Button>
            <Link to={{
              pathname:`/books/${ this.props.location.state.book.bookid}`,
              state: { book:  this.props.location.state.book }
            }}> Til baka! </Link>
          </Button>
        </div>
      </div>
    );
  }
}
export default BookEdit;
  