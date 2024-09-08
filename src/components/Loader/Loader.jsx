import React from "react";
import "./loader.css";
import liader from "../../assets/loader.png";

function Loader(props) {
  return (
    <div className="loader__name">
      <img src={liader} alt="" className="loader__item" />
    </div>
  );
}

export default Loader;
