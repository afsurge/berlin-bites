import { Component } from "react";
import ProfilePic from "./profilepic";
import axios from "./axios";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Food from "./food";
import Basket from "./basket";

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
            basket_items: [],
        };
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

        let basket = localStorage.getItem("basket");
        console.log("Basket from LS:", JSON.parse(basket));
    }

    basketInApp(itemFromBasket) {
        console.log("Item received in App from Basket:", itemFromBasket);
        localStorage.setItem("basket", JSON.stringify(itemFromBasket));
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
                        imgUrl={this.state.ppicurl}
                        // toggleUploader={this.toggleUploader}
                        // class1="appTop"
                        class2="smallppic"
                    />
                </div>
                <a href="/food">FOOD</a>
                <br></br>
                <a href="/orders">ORDERS</a>
                <br></br>
                <a href="/basket">BASKET</a>
                <br></br>
                <a href="/profile">PROFILE</a>
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
                    </>
                </BrowserRouter>
                {/* {this.state.showUploader && (
                    <div id="uploaderContainer">
                        <Uploader
                            uploaderInApp={(imgUrl) =>
                                this.uploaderInApp(imgUrl)
                            }
                            toggleUploader={this.toggleUploader}
                        />
                    </div>
                )} */}
            </div>
        );
    }
}
