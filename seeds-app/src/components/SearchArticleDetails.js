import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class SearchArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/articles/article/'+this.props.match.params.id) //get the article details of a single article
      .then(res => {
        this.setState({
          article: res.data
        })
      })
      .catch(err => {
        console.log("Error from SearchArticleDetails");
      })
  };

  render() {
    //Display the information in a table format
    const article = this.state.article;
    let ArticleItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">Title</th>
            <td>{ article.title }</td>
          </tr>
          <tr>
            <th scope="row">Author</th>
            <td>{ article.author }</td>
          </tr>
          <tr>
            <th scope="row">Year of Pub</th>
            <td>{ article.year_of_pub }</td>
          </tr>
          <tr>
            <th scope="row">Journal Name</th>
            <td>{ article.journal_name }</td>
          </tr>
          <tr>
            <th scope="row">Vol. Number</th>
            <td>{ article.volume_number }</td>
          </tr>
          <tr>
            <th scope="row">DOI</th>
            <td>{ article.doi }</td>
          </tr>
          <tr>
            <th scope="row">Article</th>
            <td>{ article.article_text }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowArticleDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to={{pathname: `${this.props.location.state.prevPath}`, state: this.props.location.state.inputQuery}} className="btn btn-outline-warning float-left">
                  Back to Search {/* Return to search page */}
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">SEEDS</h1>
              <p className="lead text-center">
                  Viewing Article
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { ArticleItem } {/* Displaying the article details*/}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchArticleDetails;