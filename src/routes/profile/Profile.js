import React, { Component } from 'react';
import api from '../../api';
import { connect } from 'react-redux';

import { upload } from '../../actions/upload';

class Profile extends Component {

  state = {
    picUrl: null,
    username: '',
    password: '',
    passwordCheck: '',
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
      console.log(updateUser);
    } catch (error) {
      console.log(error);
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

  render() {

    const { username, password, passwordCheck } = this.state;

    return (
      <div>
        <h2>Upplýsingar</h2>

        <form encType="multipart/form-data" onSubmit={this.handleUploadPic}>
          <input type="file" name="picture" accept="image/*" multiple={false} onChange={this.handleFileChanged}/>
          
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