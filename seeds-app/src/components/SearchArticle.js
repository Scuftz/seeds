import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../App.css';

class SearchArticle extends Component {
  constructor() {
    super();
    this.state = {
      search:'',
      title:'',
      author:'',
      year:'',
      journal_name:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("SEARCH STATE: " + this.state.search);
    
    const query = {};
    if(this.state.search == null)
      query.keywords = "";
    else
      query.keywords = this.state.search;

    if(this.state.title == null)
      query.title = "";
    else
      query.title = this.state.title;

    if(this.state.author == null)
      query.author = "";
    else
      query.author = this.state.author;

    if(this.state.year == null)
      query.year = "";
    else
      query.year = this.state.year;

    if(this.state.journal_name == null)
      query.journal_name = "";
    else
      query.journal_name = this.state.journal_name;

    this.props.history.push('article-result', query);   
    // this.props.history.push('article-result/search/' + this.state.search + '/' + this.state.title + '/' + this.state.author + '/' + this.state.year + '/' + this.state.journal_name);
  };

  render() {
    return (
      <div className="UpdateArticleInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            </div>
            <div className="col-md-8 m-auto">
              <br/>
              <h1 className="display-4 text-center">Search for an Article</h1>
              <br/>
            </div>
          </div>

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

          <br/>
          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>

            <div className='form-group'>
              <input
                type='text'
                name='search'
                placeholder='Keywords'
                className='form-control'
                onChange={this.onChange}
              />
              <br/>
              <input
                type='text'
                name='title'
                placeholder='Title'
                className='form-control'
                onChange={this.onChange}
              />
              <br/>
              <input
                type='text'
                name='author'
                placeholder='Author'
                className='form-control'
                onChange={this.onChange}
              />
              <br/>
              <input
                type='text'
                name='year'
                placeholder='Year'
                className='form-control'
                onChange={this.onChange}
              />
              <br/>
              <input
                type='text'
                name='journal_name'
                placeholder='Journal Name'
                className='form-control'
                onChange={this.onChange}
              />
            </div>

            <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
                onClick = { this.onSubmit }
            />
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(SearchArticle);