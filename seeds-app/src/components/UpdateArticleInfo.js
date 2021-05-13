import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class UpdateArticleInfo extends Component {
  constructor(props) {
    super(props);
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
          process_status: res.data.process_status,
          article_text: res.data.article_text,
          keywords: res.data.keywords
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
      title: this.state.title,
      author: this.state.author,
      year_of_pub: this.state.year_of_pub,
      journal_name: this.state.journal_name,
      volume_number: this.state.volume_number,
      doi: this.state.doi,
      process_status: "Live",//this.state.process_status,
      article_text: this.state.article_text,
      keywords: this.state.keywords
    };

    axios
      .put('http://localhost:8082/api/articles/'+this.props.match.params.id, data)
      .then(res => {
        // this.props.history.push('/show-article/'+this.props.match.params.id);
        this.props.history.push('/analyst');
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
              <Link to="/analyst" className="btn btn-outline-warning float-left">
                  Return to Analyst
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Publish Article</h1>
              <p className="lead text-center">
                  Add Keywords and Article Text
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>

            <div className='form-group'>
              <input
                type='text'
                placeholder='Keywords'
                name='keywords'
                className='form-control'
                value={this.state.keywords}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <textarea
                placeholder='Article Text'
                name='article_text'
                className='form-control'
                value = {this.state.article_text}
                onChange={this.onChange}
              />

              {/* <input
                type='text'
                placeholder='Article Text'
                name='article_text'
                className='form-control'
                value={this.state.article_text}
                onChange={this.onChange}
              /> */}
            </div>
            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Publish Article</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateArticleInfo;