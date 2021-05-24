import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class ShowArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {}
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/articles/article/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          article: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowArticleDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/articles/'+id)
      .then(res => {
        this.props.history.push("/moderation");
      })
      .catch(err => {
        console.log("Error form ShowArticleDetails_deleteClick");
      })
  };

  onAccept = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      author: this.state.author,
      year_of_pub: this.state.year_of_pub,
      journal_name: this.state.journal_name,
      volume_number: this.state.volume_number,
      doi: this.state.doi,
      process_status: "PendingAnalyst",
      article_text: this.state.article_text,
      keywords: this.state.keywords
    };

    axios
      .put('http://localhost:8082/api/articles/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/moderation');
      })
      .catch(err => {
        console.log("Error in Accepting Article!");
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
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowArticleDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/moderation" className="btn btn-outline-warning float-left">
                  Show Moderation List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Submitted Article</h1>
              <p className="lead text-center">
                  Accept or Decline the Article
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { ArticleItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,article._id)}>Decline Article</button><br />
            </div>

            <div className="col-md-6">
              <button type="button" className="btn btn-outline-info btn-lg btn-block" onClick={this.onAccept}>Accept Article</button>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowArticleDetails;