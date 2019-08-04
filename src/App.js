import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import "../src/App.scss";

class App extends Component {
  state = {};
  render() {
    return (
      <section>
        <div className="container">
          <h2>Dollars</h2>
          <form onSubmit="">
            <input type="number" />
            <select>
              <option defaultValue="USD">USD</option>
              <option value="PLN">PLN</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="CHF">CHF</option>
            </select>
            <button>
              <FontAwesomeIcon icon={faExchangeAlt} />
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default App;
