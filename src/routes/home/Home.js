import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

  render() {

    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */

    return (
      <div>
        <h2>Velkomin á bókasafnið</h2>
        <p>Til að njóta bókasafnsins til fullnustu mælum við með að <Link to="/login">skrá sig inn</Link>.
        Þangað til getur þú skoðað 
        <Link to={{
            pathname:"/books",
            state: { title:  "https://djbook.herokuapp.com/books" }
          }}>allar bækurnar</Link>.
        </p>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Home);
