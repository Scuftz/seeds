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
      .get('http://localhost:8082/api/articles/article/'+this.props.match.params.id) //get the details of a specific article
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
      .delete('http://localhost:8082/api/articles/'+id) //delete an article from the database (moderater declined article)
      .then(res => {
        this.props.history.push("/moderation");
      })
      .catch(err => {
        console.log("Error form ShowArticleDetails_deleteClick");
      })
  };

  //approve an article to the PendingAnalyst phase where the analyst will look at it
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
      .put('http://localhost:8082/api/articles/'+this.props.match.params.id, data) //return to moderation page after approving
      .then(res => {
        this.props.history.push('/moderation');
      })
      .catch(err => {
        console.log("Error in Accepting Article!");
      })
  };

  render() {
    //Show article details in a table
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
            <div className="col-md-6"> {/* Button to decline article */}
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,article._id)}>Decline Article</button><br />
            </div>

            <div className="col-md-6"> {/* Button to accept article */}
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