import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick() {
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((err) => {
                console.log("Error in axios POST /login:", err.message);
                this.setState({ error: true });
            });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        return (
            <div id="loginForm">
                <h1>Login</h1>
                <h3>
                    Please enter your registered email and password below to
                    login to your profile.
                </h3>
                {this.state.error && (
                    <p className="error-msg">ERROR: PLEASE TRY AGAIN !</p>
                )}
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
                <button onClick={() => this.handleClick()}>LOGIN</button>
                <Link to="/register">REGISTER</Link>
                <Link to="/resetpass">RESET PASSWORD</Link>
            </div>
        );
    }
}
