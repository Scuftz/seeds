import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateArticleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        article_id: '',
        title:'',
        author:'',
        year_of_pub:'',
        journal_name:'',
        volume_number:'',
        doi:'',
        process_status:''
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/articles/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, article: res.data})
        this.setState({
          title: res.data.title,
          author: res.data.author,
          year_of_pub: res.data.year_of_pub,
          journal_name: res.data.journal_name,
          volume_number: res.data.volume_number,
          doi: res.data.doi,
          process_status: res.data.process_status
        })
      })
      .catch(err => {
        console.log("Error from UpdateArticleInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      article_id: this.state.article_id,
      title: this.state.title,
      author: this.state.author,
      year_of_pub: this.state.year_of_pub,
      journal_name: this.state.journal_name,
      volume_number: this.state.volume_number,
      doi: this.state.doi,
      process_status: this.state.process_status
    };

    axios
      .put('http://localhost:8082/api/articles/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-article/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateArticleInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateArticleInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Article List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Article</h1>
              <p className="lead text-center">
                  Update Article's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
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
            <br />

            <div className='form-group'>
            <label htmlFor="author">Author</label>
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
            <div className='form-group'>
              <input
                type='text'
                placeholder='Process Status'
                name='process_status'
                className='form-control'
                value={this.state.process_status}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Article</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateArticleInfo;