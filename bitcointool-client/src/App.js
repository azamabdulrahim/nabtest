import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;
