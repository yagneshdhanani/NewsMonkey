import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMore: true,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async updateNews() {
    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
      page: this.state.page + 1,
    });
  }

  fetchMoreData = () => {
    this.updateNews();
  };

  async componentDidMount() {
    this.props.setProgress(10);
    this.updateNews();

    this.props.setProgress(100);
  }

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "35px" }}>
          {`NewsMonkey - Top ${this.capitalizeFirstLetter(this.props.category)}
          Headlines`}
        </h2>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            !this.state.loading && (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            )
          }
        >
          <div className="container my-3">
            <div className="row">
              {this.state.articles.map((article, index) => (
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
}
