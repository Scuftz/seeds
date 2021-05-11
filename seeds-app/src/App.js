import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import SubmitArticle from './components/SubmitArticle';
import ShowArticleList from './components/ShowArticleList';
import ShowArticleDetails from './components/ShowArticleDetails';
import UpdateArticleInfo from './components/UpdateArticleInfo';
import Analyst from './components/Analyst';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/moderation' component={ShowArticleList} />
          <Route path='/submit-article' component={SubmitArticle} />

          {/* <Route path='/' component={SearchArticle} /> */}
          <Route path='/analyst' component={Analyst} />

          <Route path='/edit-article/:id' component={UpdateArticleInfo} />
          <Route path='/show-article/:id' component={ShowArticleDetails} />
        </div>
      </Router>
    );
  }
}

export default App;