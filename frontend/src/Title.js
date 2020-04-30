import React, { useState, useEffect } from "react";

function Title() {
  const [title, setTitle] = useState();

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
