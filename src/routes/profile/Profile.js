import React, { Component } from 'react';
import ReadBooks from '../readBooks';

import api from '../../api';
import { connect } from 'react-redux';

import { upload } from '../../actions/upload';

class Profile extends Component {

  state = {
    picUrl: null,
    username: '',
    password: '',
    passwordCheck: '',
    readBooks: null,
  }

  componentDidMount = async () => {
    let readBooks;
    try {
      readBooks = await api.getMeRead();
      const { data } = readBooks;
      this.setState({ readBooks: data });
    } catch (error) {
      console.log(error);
    }

  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleUpdateName = async (e) => {
    e.preventDefault();
    const { username, passwordCheck } = this.state;
    
    let updateUser;
    try {
      updateUser = await api.updateName(username, passwordCheck);
    } catch (error) {
      
    }
  }

  handleUploadPic = async (e) => {
    e.preventDefault();

    const { picUrl } = this.state;
    const { dispatch } = this.props;

    const formData = new FormData();
    formData.append('file', picUrl.name);
    formData.append('url', picUrl);

    dispatch(upload(formData));
  }

  handleFileChanged = (e) => {
    this.setState({
      picUrl: e.target.files[0],
    });
  }

  handleDelete = async (bookId, book) => {
    let del;
    try {
      del = await api.deleteBook(bookId);
    } catch (error) {
      console.log(error);
    } finally {
      const newReadBooks = this.state.readBooks.filter((item) => {
        return item != book;
      });
      this.setState({ readBooks: newReadBooks });
    }
  }

  render() {

    const { username, password, passwordCheck, readBooks } = this.state;

    return (
      <div>
        <h2>Upplýsingar</h2>

        <form encType="multipart/form-data" onSubmit={this.handleUploadPic}>
          <input required type="file" name="picture" accept="image/*" multiple={false} onChange={this.handleFileChanged}/>
          
          <button>Uppfæra mynd</button>
        </form>

        <form onSubmit={this.handleUpdateName}>
          <label htmlFor="username">Nafn:</label>
          <input required type="text" id="username" name="username" value={username} onChange={this.handleInputChange} />
          
          <label html="password">Lykilorð:</label>
          <input required type="password" id="password" name="password" value={password} onChange={this.handleInputChange} />

          <label html="passwordCheck">Lykilorð, aftur:</label>
          <input required type="password" id="passwordCheck" name="passwordCheck" value={passwordCheck} onChange={this.handleInputChange} />
          
          <button>Uppfæra</button>
        </form>
        <h2>Lesnar bækur</h2>
        { readBooks && (
          <ReadBooks 
            books={readBooks}
            handleDelete={this.handleDelete.bind(this)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUploading: state.upload.isUploading,
  }
}

export default connect(mapStateToProps)(Profile);