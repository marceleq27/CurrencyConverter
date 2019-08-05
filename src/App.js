import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import "../src/App.scss";

class App extends Component {
  state = {
    value: "420",
    valueExchange: "0",
    selectedValue1: "",
    selectedValue2: "",
    pln: ""
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
    console.log(selectOption1);
    if (selectOption1 !== "PLN") {
      fetch(
        `http://api.nbp.pl/api/exchangerates/rates/a/${selectOption1}/?format=json`
      )
        .then(response => {
          if (response.ok) return response;
        })
        .then(response => response.json())
        .then(data => {
          this.setState({
            valueExchange: (this.state.value * data.rates[0].mid).toFixed(2)
          });
        });
    } else {
      this.setState({
        pln: this.state.value
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
          if (this.state.pln === 1) {
            const exchangedValue = this.state.pln * data.rates[0].mid;
            this.setState({
              valueExchange: exchangedValue.toFixed(2)
            });
          } else {
            const exchangedValue = this.state.pln / data.rates[0].mid;
            this.setState({
              valueExchange: exchangedValue.toFixed(2)
            });
          }
        });
    }
    if (selectOption1 === selectOption2) {
      alert("You can't convert the same currency!");
    }
  };

  selectValue1 = () => {
    let selectElement = document.getElementById("selectControl1");
    switch (selectElement.selectedOptions[0].text) {
      case "USD":
        this.setState({
          selectedValue1: selectElement.options[0].value
        });
        break;
      case "PLN":
        this.setState({
          selectedValue1: selectElement.options[1].value
        });
        break;
      case "GBP":
        this.setState({
          selectedValue1: selectElement.options[2].value
        });
        break;
      case "EUR":
        this.setState({
          selectedValue1: selectElement.options[3].value
        });
        break;
      case "CHF":
        this.setState({
          selectedValue1: selectElement.options[4].value
        });
        break;
      default:
        this.setState({
          selectedValue1: selectElement.options[0].value
        });
    }
  };
  selectValue2 = () => {
    let selectElement = document.getElementById("selectControl2");
    switch (selectElement.selectedOptions[0].text) {
      case "USD":
        this.setState({
          selectedValue2: selectElement.options[0].value
        });
        break;
      case "PLN":
        this.setState({
          selectedValue2: selectElement.options[1].value
        });
        break;
      case "GBP":
        this.setState({
          selectedValue2: selectElement.options[2].value
        });
        break;
      case "EUR":
        this.setState({
          selectedValue2: selectElement.options[3].value
        });
        break;
      case "CHF":
        this.setState({
          selectedValue2: selectElement.options[4].value
        });
        break;
      default:
        this.setState({
          selectedValue2: selectElement.options[0].value
        });
    }
  };

  render() {
    const { value, valueExchange, selectedValue1, selectedValue2 } = this.state;
    return (
      <section>
        <div className="container">
          <h2>{selectedValue1 || "United States Dollar"}</h2>
          <form id="form1">
            <input
              type="number"
              className="number"
              value={value}
              onChange={this.handleChange}
            />
            <select onChange={this.selectValue1} id="selectControl1">
              <option value="United States Dollar">USD</option>
              <option value="Polish Zloty">PLN</option>
              <option value="Pound Sterling">GBP</option>
              <option value="Euro">EUR</option>
              <option value="Swiss Franc">CHF</option>
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
              <option value="United States Dollar">USD</option>
              <option value="Polish Zloty">PLN</option>
              <option value="Pound Sterling">GBP</option>
              <option value="Euro">EUR</option>
              <option value="Swiss Franc">CHF</option>
            </select>
            <p>{valueExchange}</p>
          </form>
          <h2 className="selectValue">
            {selectedValue2 || "United States Dollar"}
          </h2>
        </div>
      </section>
    );
  }
}

export default App;
