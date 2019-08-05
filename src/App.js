import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import "../src/App.scss";

class App extends Component {
  state = {
    value: "420",
    valueExchange: "40"
  };
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };
  handleClick = () => {
    const svg = document.querySelector("svg");
    svg.classList.toggle("active");
  };
  render() {
    const { value, valueExchange } = this.state;
    return (
      <section>
        <div className="container">
          <h2>United States Dollar</h2>
          <form onSubmit="">
            <input type="number" value={value} onChange={this.handleChange} />
            <select>
              <option defaultValue="USD">USD</option>
              <option value="PLN">PLN</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
            </select>
          </form>
        </div>
        <button className="arrows" onClick={this.handleClick}>
          <FontAwesomeIcon icon={faExchangeAlt} />
        </button>
        <div className="exchange">
          <form onSubmit="">
            <select>
              <option defaultValue="USD">USD</option>
              <option value="PLN">PLN</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
            </select>
            <input
              type="number"
              value={valueExchange}
              onChange={this.handleChange}
            />
          </form>
          <h2>Russian Ruble</h2>
        </div>
      </section>
    );
  }
}

export default App;
