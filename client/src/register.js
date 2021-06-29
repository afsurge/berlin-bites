import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            agree: false,
        };
    }

    handleClick() {
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /register:", err.message);
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleAgree() {
        if (!this.state.agree) {
            this.setState({ agree: true });
        } else {
            this.setState({ agree: false });
        }
    }

    render() {
        return (
            <div id="regForm">
                <h1>Join us today!</h1>
                <h3>
                    Please provide the minimum details for signing up with us.
                </h3>
                {this.state.error && (
                    <p className="error-msg">ERROR: PLEASE TRY AGAIN !</p>
                )}
                <input
                    name="first"
                    placeholder="first"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="phone"
                    placeholder="phone"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="address"
                    placeholder="address"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    placeholder="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <div id="agreement">
                    <p>
                        Please agree to our terms of data policy & cookies use.
                    </p>
                    <div>
                        <input
                            id="agree-check"
                            type="checkbox"
                            name="agreement"
                            onClick={() => this.handleAgree()}
                        />
                        <label htmlFor="agreement">
                            I AGREE TO THE TERMS AND CONDITIONS
                        </label>
                    </div>
                </div>
                {this.state.agree && (
                    <button onClick={() => this.handleClick()}>SIGN UP!</button>
                )}

                <Link to="/login">Already with us? Go to LOGIN</Link>
            </div>
        );
    }
}
