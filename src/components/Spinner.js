import React, { Component } from "react";
import loadingGif from "../static/loader.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-3">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }
}
