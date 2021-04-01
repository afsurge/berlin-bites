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
import OtherProfile from "./otherprofile";
import FindCustomers from "./findcustomers";
import Chat from "./chat";

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

        // below setState need refresh to update cart!
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
        // basket does not update without refresh as count done on mount
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

    updateProfileInApp(newProfile) {
        console.log("Received profile in App from ProfileEditor:", newProfile);
    }

    render() {
        if (!this.state.first) {
            return "LOADING...";
            // can use "Loading..." or gif instead of "null"
        }
        return (
            <div id="mainAppContainer">
                {/* <div className="appTop">
                    <a id="logo-tag" href="/">
                        <img id="logo" src="/food-to-go-1.png" />
                    </a>
                    <div id="brand">
                        <h1 className="brand-name">Berlin</h1>
                        <h1 className="brand-name">Bites</h1>
                    </div>
                    <div id="navbar">
                        <a className="navlinks" href="/food">
                            FOOD
                        </a>
                        <a className="navlinks" href="/orders">
                            ORDERS
                        </a>
                        {!this.state.admin && (
                            <a className="navlinks" href="/basket">
                                BASKET
                                {this.state.basket_count &&
                                    `(${this.state.basket_count})`}
                            </a>
                        )}

                        <a className="navlinks" href="/profile">
                            PROFILE
                        </a>
                        <a className="navlinks" href="/messages">
                            MESSAGES
                        </a>
                        {this.state.admin && (
                            <a className="navlinks" href="/customers">
                                CUSTOMERS
                            </a>
                        )}
                        <a className="navlinks" href="/logout">
                            LOGOUT
                        </a>
                    </div>
                    <div id="greet-profile">
                        <ProfilePic
                            ppicurl={this.state.ppicurl}
                            toggleUploader={this.toggleUploader}
                            class2="smallppic"
                        />
                        <h1 id="greetuser">Hi {this.state.first} !</h1>
                    </div>
                </div> */}

                <BrowserRouter>
                    <>
                        <div className="appTop">
                            <Link id="logo-tag" to="/">
                                <img id="logo" src="/food-to-go-1.png" />
                            </Link>
                            <div id="brand">
                                <h1 className="brand-name">Berlin</h1>
                                <h1 className="brand-name">Bites</h1>
                            </div>
                            <div id="navbar">
                                <Link className="navlinks" to="/food">
                                    FOOD
                                </Link>
                                <Link className="navlinks" to="/orders">
                                    ORDERS
                                </Link>
                                {!this.state.admin && (
                                    <Link className="navlinks" to="/basket">
                                        CART{" "}
                                        {this.state.basket_count &&
                                            `(${this.state.basket_count})`}
                                    </Link>
                                )}
                                <Link className="navlinks" to="/profile">
                                    PROFILE
                                </Link>
                                <Link className="navlinks" to="/messages">
                                    MESSAGES
                                </Link>
                                {this.state.admin && (
                                    <Link className="navlinks" to="/customers">
                                        CUSTOMERS
                                    </Link>
                                )}
                                <Link className="navlinks" to="/logout">
                                    LOGOUT
                                </Link>
                            </div>
                            <div id="greet-profile">
                                <ProfilePic
                                    ppicurl={this.state.ppicurl}
                                    toggleUploader={this.toggleUploader}
                                    class2="smallppic"
                                />
                                <h1 id="greetuser">Hi {this.state.first} !</h1>
                            </div>
                        </div>
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
                                    updateProfileInApp={(profile) =>
                                        this.updateProfileInApp(profile)
                                    }
                                />
                            )}
                        />
                        <Route path="/customers" component={FindCustomers} />
                        {/* <Route path="/messages" component={Chat} /> */}
                        <Route
                            path="/messages"
                            render={() => <Chat admin={this.state.admin} />}
                        />
                        {this.state.admin && (
                            <Route
                                path="/user/:id"
                                render={(props) => (
                                    <>
                                        <OtherProfile
                                            key={props.match.url}
                                            match={props.match}
                                            history={props.history}
                                        />
                                    </>
                                )}
                            />
                        )}
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
