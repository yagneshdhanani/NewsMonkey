import React from "react";

import NewsImage from "../static/breaking-news.png";

export default function NewsItem({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
}) {
  return (
    <div className="card my-3 mx-3">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: 0,
        }}
      >
        <span className=" badge rounded-pill bg-secondary">{source}</span>
      </div>
      <img
        src={imageUrl ? imageUrl : NewsImage}
        className="card-img-top"
        alt="..."
        height="200px"
        style={{ objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">
          {title ? title.slice(0, 40) + "..." : ""}
        </h5>
        <p className="card-text">
          {description ? description.slice(0, 88) + "..." : ""}
        </p>
        <p className="card-text">
          <small className="text-muted">
            by {author ? author : "Unknown"} on {new Date(date).toGMTString()}
          </small>
        </p>
        <a
          href={newsUrl}
          rel="noreferrer"
          target="_blank"
          className="btn btn-sm btn-primary"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
