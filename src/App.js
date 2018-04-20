import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Books from './routes/books';
import Book from './routes/book';
import BookEdit from './routes/bookEdit';
import Register from './routes/register';
import Users from './routes/users';

/* todo fleiri routes */

import './App.css';

class App extends Component {

  render() {
    //const authenticated = true; /* vita hvort notandi sé innskráður */
    const { isAuthenticated } = this.props;

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header history={this.props.history} />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route exact path="/books" component={Books}/>
            <UserRoute path="/books/:id/edit" authenticated={isAuthenticated} component={BookEdit}/>
            <Route path="/books/:id/" component={Book}/>
            <Route path="/register" exact component={Register} />
            <UserRoute path="/profile" authenticated={isAuthenticated} component={Profile} />
            <UserRoute path="/users" authenticated={isAuthenticated} component={Users} />
            {/* todo fleiri route */}
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  /* todo stilla redux ef það er notað */
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(App));
