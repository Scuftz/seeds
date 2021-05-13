import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class SearchArticle extends Component {
  constructor() {
    super();
    this.state = {
      search:'',
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("SEARCH STATE: " + this.state.search);
    // this.props.history.push(`/article-result/search/${this.state.search}`);
    this.props.history.push('article-result/search/' + this.state.search);
        // this.props.history.push(`/article-result/search/?search=${this.state.search}`);

    // this.props.history.push('/article-result');
    // axios
    //   .get('http://localhost:8082/api/articles/search')
    //   .then(res => {
    //   })
    //   .catch(err => {
    //     console.log("Error in SubmitArticle!");
    //   })
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
                // value={this.state.search}
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

export default SearchArticle;