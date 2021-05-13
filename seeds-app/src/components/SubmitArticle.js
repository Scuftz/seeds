import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class SubmitArticle extends Component {
  constructor() {
    super();
    this.state = {
      title:'',
      author:'',
      year_of_pub:'',
      journal_name:'',
      volume_number:'',
      doi:'',
      process_status:'',
      article_text:'',
      keywords:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      author: this.state.author,
      year_of_pub: this.state.year_of_pub,
      journal_name: this.state.journal_name,
      volume_number: this.state.volume_number,
      doi: this.state.doi,
      process_status: "PendingModeration",
      article_text: this.state.article_text,
      keywords: this.state.keywords
    };

    axios
      .post('http://localhost:8082/api/articles', data)
      .then(res => {
        this.setState({
          title:'',
          author:'',
          year_of_pub:'',
          journal_name:'',
          volume_number:'',
          doi:'',
          process_status:'',
          article_text:'',
          keywords:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in SubmitArticle!");
      })
  };

  render() {
    return (
      <div className="SubmitArticle">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Return to Search
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Submit Article</h1>
              <p className="lead text-center">
                  Add Biblio Details
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                {/* <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Article ID'
                    name='article_id'
                    className='form-control'
                    value={this.state.article_id}
                    onChange={this.onChange}
                  />
                </div> */}
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Title of Article'
                    name='title'
                    className='form-control'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Author'
                    name='author'
                    className='form-control'
                    value={this.state.author}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Year of Publication'
                    name='year_of_pub'
                    className='form-control'
                    value={this.state.year_of_pub}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Journal Name'
                    name='journal_name'
                    className='form-control'
                    value={this.state.journal_name}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='number'
                    placeholder='Volume Number'
                    name='volume_number'
                    className='form-control'
                    value={this.state.volume_number}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='DOI'
                    name='doi'
                    className='form-control'
                    value={this.state.doi}
                    onChange={this.onChange}
                  />
                </div>
                {/* <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Process Status'
                    name='process_status'
                    className='form-control'
                    value={this.state.process_status}
                    onChange={this.onChange}
                  /> */}
                {/* </div> */}
                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubmitArticle;