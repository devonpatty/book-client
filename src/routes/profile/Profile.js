import React, { Component } from 'react';
import ReadBooks from '../readBooks';

import api from '../../api';
import { connect } from 'react-redux';

import { upload } from '../../actions/upload';
import { logoutUser, updateNameProfile } from '../../actions/auth';

import Button from "../../components/button/index";

import './Profile.css';

class Profile extends Component {

  state = {
    picUrl: null,
    username: '',
    password: '',
    passwordCheck: '',
    readBooks: null,
  }

  componentDidMount = async () => {
    await this.setData();
  }

  setData = async () => {
    let readBooks;
    const { dispatch, history } = this.props;
    try {
      readBooks = await api.getMeRead();
      if (readBooks.error) {
        dispatch(logoutUser());
        history.push('/login?tokenExpired');
      } else {
        const { data } = readBooks;
        this.setState({ readBooks: data });
      }
    } catch (error) {
    
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
    const { username } = this.state;
    const { dispatch, history } = this.props;

    let updateUser;
    try {
      updateUser = await api.updateName(username);
      if (updateUser.error) {
        dispatch(logoutUser());
        history.push('/login?tokenExpired');
      } else {
        const { name } = updateUser;
        dispatch(updateNameProfile(name));
      }
    } catch (error) {
      
    }
  }

  handleUpdatePass = async (e) => {
    e.preventDefault();
    const { passwordCheck } = this.state;
    const { dispatch, history } = this.props;

    let updatePass;
    try {
      updatePass = await api.updatePass(passwordCheck);
      if (updatePass.error) {
        dispatch(logoutUser());
        history.push('/login?tokenExpired');
      }
    } catch (error) {

    }
  }

  handleUploadPic = async (e) => {
    e.preventDefault();

    const { picUrl } = this.state;
    const { dispatch, history, message } = this.props;

    const formData = new FormData();
    formData.append('file', picUrl.name);
    formData.append('url', picUrl);
    console.log(message);
    if (message) {
      dispatch(logoutUser());
      history.push('/login?tokenExpired');
    } else {
      dispatch(upload(formData));
    }
  }

  handleFileChanged = (e) => {
    this.setState({
      picUrl: e.target.files[0],
    });
  }

  handleDelete = async (bookId, book) => {
    const { dispatch, history } = this.props;

    let del;
    try {
      del = await api.deleteBook(bookId);
      if (del.error) {
        dispatch(logoutUser());
        history.push('/login?tokenExpired');
      } else {
        const newReadBooks = this.state.readBooks.filter((item) => {
          return item != book;
        });
        this.setState({ readBooks: newReadBooks });
      }
    } catch (error) {
      
    }
  }

  render() {

    const { username, password, passwordCheck, readBooks } = this.state;

    return (
      <div className="edit_user">
        <h1 className="edit_user_heading">Upplýsingar</h1>
        <div className="edit_user_margin">
          <form encType="multipart/form-data" onSubmit={this.handleUploadPic}>
            <input required type="file" name="picture" accept="image/*" multiple={false} onChange={this.handleFileChanged}/>
            
            <Button>Uppfæra mynd</Button>
          </form>
        </div>
        <div className="edit_user_margin">
          <form onSubmit={this.handleUpdateName}>
            <div className="edit_user_div">
              <div>
                <label htmlFor="username">Nafn:</label>
              </div>
              <div>
                <input required type="text" id="username" name="username" className="edit_input_user" value={username} onChange={this.handleInputChange} />
              </div>             
            </div>
            <Button>Uppfæra nafn</Button>
          </form>
        </div>
        <div className="edit_user_margin">
          <form onSubmit={this.handleUpdatePass}>
            <div className="edit_user_div">
              <label html="password">Lykilorð:</label>
              <input required type="password" id="password" name="password" className="edit_input_user" value={password} onChange={this.handleInputChange} />
            </div>
            <div className="edit_user_div">
              <label html="passwordCheck">Lykilorð, aftur:</label>
              <input required type="password" id="passwordCheck" name="passwordCheck" className="edit_input_user" value={passwordCheck} onChange={this.handleInputChange} />
            </div>
            <Button>Uppfæra lykilorð</Button>
          </form>
        </div>
        <div className="edit_user_margin">
          <div className="edit_user_heading">
            <h1>Lesnar bækur</h1>
          </div>
          <div>
            { readBooks && (
              <ReadBooks 
                books={readBooks}
                handleDelete={this.handleDelete.bind(this)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUploading: state.upload.isUploading,
    message: state.upload.message,
  }
}

export default connect(mapStateToProps)(Profile);