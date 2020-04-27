import React, { useState, useEffect } from "react";

function Title() {
  const [title, setTitle] = useState();
  // componentDidMount
  useEffect(() => {
    fetch("/district")
      .then((response) => response.json())
      .then((data) => {
        console.log("Title: " + data.district);
        setTitle(data.district);
      });
  }, []);

  return <div>{title}</div>;
}

export default Title;
