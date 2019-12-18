import React from "react";

export default function BackgroundWithOverlay(props) {
  let background = {
    backgroundImage:
      "url(" + process.env.PUBLIC_URL + "/images/" + props.imgUrl,
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: -1,
    backgroundSize: "cover",
    backgroundRepeat: "none"
  };

  let overlay = {
    backgroundColor: "rgba(0, 0, 0, " + props.alpha + ")",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  };

  return (
    <div style={background}>
      <div style={overlay}></div>
    </div>
  );
}
