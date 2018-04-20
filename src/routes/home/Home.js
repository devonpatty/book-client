import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Home.css';

class Home extends Component {

  render() {

    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */
    const { isAuthenticated, isFetching } = this.props;

    if (isFetching) {
      return (<p>loading...</p>);
    }

    return (
      <div>
        <h2 className="home_header">Velkomin á bókasafnið</h2>
    
        { !isAuthenticated ? 
          <p>Til að njóta bókasafnsins til fullnustu mælum við með að <Link to="/login">skrá sig inn</Link>.
          Þangað til getur þú skoðað 
          <Link to={{
            pathname:"/books",
            state: { title:  "https://djbook.herokuapp.com/books" }
          }}> allar bækurnar</Link>.
          </p>
          :
          <p>Þú ert skráður notandi og getur því <Link to="/books">skráð bækur</Link> og breytt <Link to="/books">þeim sem til eru </Link>
          . Einnig getur þú skoðað <Link to="/users">aðra notendur.</Link></p>
        }
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    isFetching: state.auth.isFetching,
  }
}

export default connect(mapStateToProps)(Home);
