import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import "../src/App.scss";

class App extends Component {
  state = {
    value: "420",
    value2: "",
    rate1: "",
    rate2: "",
    valueExchange: "0",
    selectedValue1: "",
    selectedValue2: "",
    pln: "",
    symbol2: "Zl",
    symbol1: "$"
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleFormSubmit = e => {
    const svg = document.querySelector("svg");
    svg.classList.toggle("active");

    e.preventDefault();
    const selectOption1 = document.getElementById("selectControl1")
      .selectedOptions[0].text;
    const selectOption2 = document.getElementById("selectControl2")
      .selectedOptions[0].text;
    if (selectOption1 !== "PLN") {
      fetch(
        `http://api.nbp.pl/api/exchangerates/rates/a/${selectOption1}/?format=json`
      )
        .then(response => {
          if (response.ok) return response;
        })
        .then(response => response.json())
        .then(data => {
          const { value } = this.state;
          this.setState({
            pln: (value * data.rates[0].mid).toFixed(2),
            rate1: data.rates[0].mid
          });
          if (selectOption1 !== "PLN" && selectOption2 === "PLN") {
            const { pln } = this.state;
            this.setState({
              valueExchange: pln
            });
          }
        });
    }
    if (selectOption2 !== "PLN") {
      fetch(
        `http://api.nbp.pl/api/exchangerates/rates/a/${selectOption2}/?format=json`
      )
        .then(response => {
          if (response.ok) return response;
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            rate2: data.rates[0].mid
          });
          if (selectOption1 !== "PLN" && selectOption2 !== "PLN") {
            const { pln, rate2 } = this.state;
            this.setState({
              valueExchange: (pln / rate2).toFixed(2)
            });
          }
          if (selectOption1 === "PLN" && selectOption2 !== "PLN") {
            const { value, rate2 } = this.state;
            this.setState({
              valueExchange: (value / rate2).toFixed(2)
            });
          }
        });
    }

    if (selectOption1 === selectOption2) {
      alert("You can't convert the same currency!");
    }
  };

  selectValue1 = () => {
    const selectElement = document.getElementById("selectControl1");
    const index = selectElement.options.selectedIndex;
    const symbol = selectElement.options[index].attributes[1].value;
    const value = selectElement.options[index].value;
    this.setState({
      selectedValue1: value,
      symbol1: symbol
    });
  };
  selectValue2 = () => {
    const selectElement = document.getElementById("selectControl2");
    const index = selectElement.options.selectedIndex;
    const symbol = selectElement.options[index].attributes[1].value;
    const value = selectElement.options[index].value;
    this.setState({
      selectedValue2: value,
      symbol2: symbol
    });
  };

  getValue = () => {
    const selectElement = document.getElementById("selectControl1");
    const text = selectElement.selectedOptions[0].text;
    return text;
  };

  render() {
    const {
      value,
      valueExchange,
      selectedValue1,
      selectedValue2,
      symbol2,
      symbol1
    } = this.state;
    return (
      <section>
        <div className="container">
          <h2>{selectedValue1 || "United States Dollar"}</h2>
          <form id="form1">
            <div className="amount">
              <input
                type="number"
                className="number"
                value={value}
                onChange={this.handleChange}
              />
              <span>{symbol1}</span>
            </div>

            <select onChange={this.selectValue1} id="selectControl1">
              <option value="United States Dollar" symbol="$">
                USD
              </option>
              <option value="Polish Zloty" symbol="Zl">
                PLN
              </option>
              <option value="Pound Sterling" symbol="£">
                GBP
              </option>
              <option value="Euro" symbol="€">
                EUR
              </option>
              <option value="Swiss Franc" symbol="₣">
                CHF
              </option>
            </select>
          </form>
        </div>
        <button
          className="arrows"
          type="submit"
          onClick={this.handleFormSubmit}
        >
          <FontAwesomeIcon icon={faExchangeAlt} />
        </button>
        <div className="exchange">
          <form id="form2">
            <select onChange={this.selectValue2} id="selectControl2">
              <option value="Polish Zloty" symbol="Zl">
                PLN
              </option>
              <option value="United States Dollar" symbol="$">
                USD
              </option>
              <option value="Pound Sterling" symbol="£">
                GBP
              </option>
              <option value="Euro" symbol="€">
                EUR
              </option>
              <option value="Swiss Franc" symbol="₣">
                CHF
              </option>
            </select>
            <p className="displayValue">
              {valueExchange} <span>{symbol2}</span>
            </p>
          </form>
          <h2 className="selectValue">{selectedValue2 || "Polish Zloty"}</h2>
        </div>
      </section>
    );
  }
}

export default App;
