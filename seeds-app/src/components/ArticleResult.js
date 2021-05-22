import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ArticleCard from './ArticleCard';


class ArticleResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios
      // .get('http://localhost:8082/api/articles/search/Python')
      // .get('http://localhost:8082/api/articles/search/?asd=TDD') //add param from search bar
      .get('http://localhost:8082/api/articles/search/' + this.props.match.params.id) //this 
      .then(res => {
        this.setState({
          articles: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowArticleList');
      })
  };
  
  renderTableData() {
    const articles = this.state.articles;
    let articleList;

    if(!articles) {
      articleList = "there is no article record!";
    } else {
      return articles.map((article, k) => {
        const { title, author, year_of_pub, journal_name, volume_number } = article
        console.log("Start TableData");
        return (
           <tr key={title}>
              <td>{title}</td>
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
    // const articles = this.state.articles;
    // let articleList;
    // console.log("PrintArticle: " + articles);
    // if(!articles) {
    //   articleList = "there is no article record!";
    // } else {
    //   articleList = articles.map((article, k) =>
    //     <ArticleCard article={article} key={k} />
    //   );
    // }

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
                  {/* {articleList} */}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleResult;