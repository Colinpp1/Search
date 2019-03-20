import React, { Component } from "react";
import Search from "./Search";

class App extends Component {

  render() {
  
    return (
      <div className="App">
        <div className="ui text container">
          <Search />
        </div>
      </div>
    );
  }
}

export default App;
