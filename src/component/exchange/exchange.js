import React from "react";
import axios from "axios";
import Util from "../util/util";
import { exchange,form, error } from "../styles/util.css";

class Exchange extends React.PureComponent {

    // define states
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            error: null,
            fromCurrency: "USD",
            toCurrency: "CAD",
            amount: 1,
            currencies: []
        };
    }

    // initialize list of countries
    componentDidMount() {
        axios
            .get(Util.getListOfCountriesURI())
            .then(response => {
                const currencies = [];
                for (const index in response.data) {
                    for (const currencyIndex in response.data[index].currencies) {
                        if(!Util.isNullNoneOrSpacesOnly(response.data[index].currencies[currencyIndex].code)) {
                            currencies.push(response.data[index].currencies[currencyIndex].code);
                        }
                    }
                }
                // stores all countries in this.state.currencies
                this.setState({currencies: Array.from(new Set(currencies.sort()))});
            })
            .catch(err => {
                console.log("Failed to fetch list of countries", err);
            });
    }

    selectHandler = event => {
        if (event.target.name === "from") {
            this.setState({ fromCurrency: event.target.value });
        } else {
            if (event.target.name === "to") {
                this.setState({ toCurrency: event.target.value });
            }
        }
    };

    //convert money using API: exchangerate-api
    //on button click execute the logic below
    convertHandler = () => {
        // validation check
        if(Util.isValidNumber(this.state.amount)) {
            this.setState({
                error: "Please input a valid number.",
                result: null
            });
        } else if (this.state.fromCurrency !== this.state.toCurrency) {
            axios
                .get(Util.getExchangeURI(this.state.fromCurrency))
                .then(response => {
                    const result =
                        this.state.amount * response.data.conversion_rates[this.state.toCurrency];
                    this.setState({
                        result: result.toFixed(5),
                        error: null
                    });
                })
                .catch(error => {
                    console.log("Failed to convert currency.", error.message);
                });
        } else {
            this.setState({
                error: "You can't convert the same currency!",
                result: null
            });
        }
    };

    render() {
        return (
            <div className="Exchange">
                <h2>
                    <span>Currency</span> Conversion App
                    <span role="img" aria-label="money">&#x1f4b5;</span>
                </h2>
                <div className="Form">
                    <input name="amount"
                           type="text"
                           placeholder="amount"
                           value={this.state.amount}
                           onChange={event => this.setState({ amount: event.target.value, result: null, error: null })} />
                    <select name="from"
                            onChange={event => this.selectHandler(event)}
                            value={this.state.fromCurrency}>
                        {this.state.currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    <select name="to"
                            onChange={event => this.selectHandler(event)}
                            value={this.state.toCurrency}>
                        {this.state.currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    <button onClick={this.convertHandler}>Convert</button>
                </div>
                <div className="Form">
                    {
                        this.state.result &&
                        <h3>{this.state.amount} {this.state.fromCurrency} equals {this.state.result} {this.state.toCurrency}</h3>
                    }
                </div>
                <div className="Error">{this.state.error && <h3>{this.state.error}</h3>}</div>
            </div>
        );
    }
}

export default Exchange;