import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default function News({ country, category, pageSize, setProgress }) {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const updateNews = async () => {
    setLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setPage(page + 1);
  };

  const fetchMoreData = () => {
    updateNews();
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    setProgress(10);
    updateNews();
    setProgress(100);

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        {`NewsMonkey - Top ${capitalizeFirstLetter(category)}
          Headlines`}
      </h2>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        endMessage={
          !loading && (
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          )
        }
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-3" key={index}>
                {article && (
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    date={article.publishedAt}
                    author={article.author}
                    source={article.source.name}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
