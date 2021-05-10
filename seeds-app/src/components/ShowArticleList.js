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
      .get('http://localhost:8082/api/articles')
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
    console.log("PrintArticle: " + articles);
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
            </div>

            <div className="col-md-11">
              <Link to="/submit-article" className="btn btn-outline-warning float-right">
                + Submit An Article
              </Link>
              <br />
              <br />
              <hr />
            </div>

            <div className="col-md-11">
              <Link to="/submit-article" className="btn btn-outline-warning float-right">
                + Search for Article
              </Link>
              <br />
              <br />
              <hr />
            </div>

            <div className="col-md-11">
              <Link to="/submit-article" className="btn btn-outline-warning float-right">
                + Moderate an Article
              </Link>
              <br />
              <br />
              <hr />
            </div>

            <div className="col-md-11">
              <Link to="/submit-article" className="btn btn-outline-warning float-right">
                + Analyse Article
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {articleList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowArticleList;