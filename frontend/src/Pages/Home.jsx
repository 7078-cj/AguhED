import React, { useState } from "react";
import Navbar2 from "../Components/NavBar2.jsx";
import Logo from "../assets/logo.svg";
import "../css/home.css";

const Home = () => {
  const [articles, setArticles] = useState([]);

  const addArticle = () => {
    const newArticle = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      title: "Untitled",
      image:
        "https://images.unsplash.com/photo-1482877346909-048fb6477632?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=958&q=80",
    };
    setArticles([...articles, newArticle]);
  };
  return (
    <div>
      <Navbar2 />
      <h2> DOCUMENTS</h2>
      <div className="app-container">
        <button className="add-article-button" onClick={addArticle}>
          Add Document
        </button>
        <div className="article-list">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.link || "/present"}
              className="article-card"
            >
              <div className="content">
                <p className="date">{article.date}</p>
                <p className="title">{article.title}</p>
              </div>
              <img src={article.image} alt="article-cover" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
