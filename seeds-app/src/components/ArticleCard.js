import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ArticleCard = (props) => {
    const article  = props.article;

    //Create a card for the article that includes a link to its moderation page, analysis page, and show its detials on it
    return(
        <div className="card-container">
            <img src="https://i.imgur.com/EzQocLG.png" alt="" />
            <div className="desc">
                
                <div className="links">
                <h2>
                    <Link to={`/show-article/${article._id}`}>
                        { "Moderation" }
                    </Link>
                    <Link to={`/edit-article/${article._id}`}>
                        { "Analyst" }
                    </Link>
                </h2>
                </div>
                <h2>{article.title}</h2>
                <h3>{article.author}</h3>
                <p>{article.year_of_pub}</p>
            </div>
        </div>
    )
};

export default ArticleCard;