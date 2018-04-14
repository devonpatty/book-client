import React, { Component } from 'react';

export default class Profile extends Component {

  state = {

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

  render() {

    const { username, password, passwordCheck } = this.state;

    return (
      <div>
        <h2>Upplýsingar</h2>

        <form>
          <input type="file" name="picture" accept="image/*"/>
          
          <button>Uppfæra mynd</button>
        </form>

        <form>
          <label htmlFor="username">Nafn:</label>
          <input required type="text" id="username" name="username" value={username} onChange={this.handleInputChange} />
          
          <button>Uppfæra nafn</button>
        </form>

        <form>
          <label html="password">Lykilorð:</label>
          <input required type="text" id="password" name="password" value={password} onChange={this.handleInputChange} />

          <label html="passwordCheck">Lykilorð, aftur:</label>
          <input required type="password" id="passwordCheck" name="passwordCheck"  value={passwordCheck} onChange={this.handleInputChange} />
          
          <button>Uppfæra lykilorð</button>
        </form>

        <h2>Lesnar bækur</h2>
      </div>
    );
  }
}
