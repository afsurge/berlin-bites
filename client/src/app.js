import { Component } from "react";
import ProfilePic from "./profilepic";
import axios from "./axios";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Food from "./food";
import Basket from "./basket";
import Orders from "./orders";
import Profile from "./profile";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            first: "",
            last: "",
            phone: "",
            email: "",
            ppicurl: "",
            address: "",
            admin: false,
            created_at: "",
            showUploader: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                const loggedUser = data.rows[0];
                this.setState(loggedUser);
            })
            .catch((err) => {
                "Error getting user info:", err.message;
            });

        let newBasketFromLS = localStorage.getItem("basket"); // JSON
        let count;
        if (newBasketFromLS) {
            count = JSON.parse(newBasketFromLS).length;
            this.setState({ basket_count: count });
        }
        console.log("New basket from LS:", JSON.parse(newBasketFromLS));
        // console.log("count:", count);
        this.setState({ basket_items: newBasketFromLS });
    }

    basketInApp(itemForBasket) {
        // console.log("Item received in App from Basket:", itemForBasket);

        let basketFromLS = JSON.parse(localStorage.getItem("basket"));
        console.log("oldBasketFromLS:", basketFromLS);

        if (basketFromLS) {
            basketFromLS.push(itemForBasket);
            localStorage.setItem("basket", JSON.stringify(basketFromLS));
        } else {
            localStorage.setItem("basket", JSON.stringify([itemForBasket]));
        }
    }

    toggleUploader() {
        this.setState({
            showUploader: !this.state.showUploader,
        });
    }

    uploaderInApp(ppicurlFromUploader) {
        console.log(
            "Received imgUrl in App from Uploader:",
            ppicurlFromUploader
        );
        this.setState({
            ppicurl: ppicurlFromUploader,
            showUploader: !this.state.showUploader,
        });
    }

    render() {
        if (!this.state.first) {
            return "LOADING...";
            // can use "Loading..." or gif instead of "null"
        }
        return (
            <div id="mainAppContainer">
                <div className="appTop">
                    <a id="logo-tag" href="/">
                        <img id="logo" src="/net.png" />
                    </a>
                    <div id="navbar">
                        <a className="navlinks" href="/food">
                            FOOD
                        </a>
                        <br></br>
                        <a className="navlinks" href="/orders">
                            ORDERS
                        </a>
                        <br></br>
                        <a className="navlinks" href="/basket">
                            BASKET
                            {this.state.basket_count &&
                                `(${this.state.basket_count})`}
                        </a>
                        <br></br>
                        <a className="navlinks" href="/profile">
                            PROFILE
                        </a>
                        <br></br>
                        <a className="navlinks" href="/logout">
                            LOGOUT
                        </a>
                    </div>
                </div>
                <div id="greet-profile">
                    <h1 id="greetuser">
                        Hi {this.state.first} {this.state.last}!
                    </h1>
                    <ProfilePic
                        ppicurl={this.state.ppicurl}
                        toggleUploader={this.toggleUploader}
                        class2="smallppic"
                    />
                </div>
                <BrowserRouter>
                    <>
                        <Route
                            path="/food"
                            render={() => (
                                <Food
                                    user_id={this.state.id}
                                    admin={this.state.admin}
                                    basketInApp={(itemInBasket) =>
                                        this.basketInApp(itemInBasket)
                                    }
                                />
                            )}
                        />
                        <Route
                            path="/basket"
                            render={() => (
                                <Basket
                                    user_id={this.state.id}
                                    admin={this.state.admin}
                                    basket_items={this.state.basket_items}
                                    basketInApp={(itemInBasket) =>
                                        this.basketInApp(itemInBasket)
                                    }
                                />
                            )}
                        />
                        <Route
                            path="/orders"
                            render={() => (
                                <Orders
                                    user_id={this.state.id}
                                    admin={this.state.admin}
                                />
                            )}
                        />
                        <Route
                            path="/profile"
                            render={() => (
                                <Profile
                                    userDetails={this.state}
                                    toggleUploader={this.toggleUploader}
                                />
                            )}
                        />
                    </>
                </BrowserRouter>
                {this.state.showUploader && (
                    <div id="uploaderContainer">
                        <Uploader
                            uploaderInApp={(ppicurl) =>
                                this.uploaderInApp(ppicurl)
                            }
                            toggleUploader={this.toggleUploader}
                        />
                    </div>
                )}
            </div>
        );
    }
}
