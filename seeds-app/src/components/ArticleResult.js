import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ArticleResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
    this.btnClick = this.btnClick.bind(this);
  }

  componentDidMount() {
    const query = this.props.location.state;
    // console.log(this.props.match.params);
    console.log(this.props.location.state);

    axios
      .post('http://localhost:8082/api/articles/search', query)
      .then(res => {
        this.setState({
          articles: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowArticleList');
      })
  };
  
  btnClick(){
    alert("Hello");
    console.log("Btn Click");
  };

  renderTableData() {
    const articles = this.state.articles;

    if(!articles) {
      console.log("No Articles Found");
    } else {
      return articles.map((article, k) => {
        const { _id, title, author, year_of_pub, journal_name, volume_number } = article
        return (
           <tr key={title}>
              <td><Link to={{pathname: `/search-article/${_id}`, state: { prevPath: window.location.pathname }}}>{title}</Link></td>
              <td>{author}</td>
              <td>{year_of_pub}</td>
              <td>{journal_name}</td>
              <td>{volume_number}</td>
           </tr>
        )
     }) 
    }
  }

  renderTableHeader() {
    return(
      [
      <th key={"title"}>{"Title"}</th>,
      <th key={"author"}>{"Author"}</th>,
      <th key={"year"}>{"Year"}</th>,
      <th key={"journal"}>{"Journal Name"}</th>,
      <th key={"volume"}>{"Volume No."}</th>]
    )}

  render() {
    return (
      <div className="ShowArticleList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Search Results</h2>
              <br/>
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
          </div>
          <br/>

          <div className="tableList">
              <table id="articles">
                <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleResult;