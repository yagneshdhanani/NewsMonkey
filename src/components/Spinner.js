import React from "react";
import loadingGif from "../static/loader.gif";

export default function Spinner() {
  return (
    <div className="text-center my-3">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
}
