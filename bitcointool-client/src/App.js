import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import BitCoinProfitAnalyzer from "./components/BitCoinProfitAnalyzer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BitCoinProfitAnalyzer />
        </div>
      </Provider>
    );
  }
}

export default App;
