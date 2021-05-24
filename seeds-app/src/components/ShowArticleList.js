import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';

class ShowArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/articles/PendingModeration') //Get all articles pending moderation
      .then(res => {
        this.setState({
          articles: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowArticleList');
      })
  };


  render() {
    const articles = this.state.articles;
    let articleList;

    if(!articles) {
      articleList = "there is no article record!";
    } else {
      articleList = articles.map((article, k) =>
        <ArticleCard article={article} key={k} />
      );
    }

    return (
      <div className="ShowArticleList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Moderator</h2>
              <br/>
            </div>

            {/* Navigation Bar */}
            <div className="rowC">
                <Link to="/submit-article" className="btn btn-outline-warning">
                  Submit An Article
                </Link>

                <Link to="/" className="btn btn-outline-warning">
                  Search for Article
                </Link>

                <Link to="/moderation" className="btn btn-outline-warning">
                  Moderation
                </Link>

                <Link to="/analyst" className="btn btn-outline-warning">
                  Analyst
                </Link>
            </div>
          </div>
          <br/>

          <div className="list">
                {articleList} {/* Display the reutrned articles */}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowArticleList;