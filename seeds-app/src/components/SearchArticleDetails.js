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
    console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/articles/article/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-searchArticleDetails-API-response: " + res.data);
        this.setState({
          article: res.data
        })
      })
      .catch(err => {
        console.log("Error from SearchArticleDetails");
      })
  };

  render() {

    const article = this.state.article;
    let ArticleItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ article.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Author</td>
            <td>{ article.author }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Year Of Pub</td>
            <td>{ article.year_of_pub }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Journal Name</td>
            <td>{ article.journal_name }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Volume Number</td>
            <td>{ article.volume_number }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>DOI</td>
            <td>{ article.doi }</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>Article</td>
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
              <Link to={{pathname: `${this.props.location.state.prevPath}`}} className="btn btn-outline-warning float-left">
              {/* <Link to="/moderation" className="btn btn-outline-warning float-left"> */}
                  Back to Search
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
            { ArticleItem }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchArticleDetails;