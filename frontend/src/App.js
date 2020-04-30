import React from "react";
import "./App.css";
import Title from "./Title.js";
import Result from "./Result.js";
import ImageUpload from "./ImageUpload.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      permission: null
    }
  }

  getResult = (res) => {
    let data = res.data
    this.setState({
      permission: data.permission,
    });
    console.log(res);
  }


  render() {
    const result = <Result permission={this.state.permission} />;
    return (
      <div className="App" >
        <Title />
        <ImageUpload
          returnResult={this.getResult}
        />
        <br />
        {result}
      </div>
    );
  }
}

export default App;
