import { Component } from "react";
import ProfilePic from "./profilepic";
import axios from "./axios";
import { Link } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Food from "./food";

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

            // showUploader: false,
        };
        // this.toggleUploader = this.toggleUploader.bind(this);
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
    }

    // toggleUploader() {
    //     // console.log("toggleModal function is running!!!");
    //     this.setState({
    //         showUploader: !this.state.showUploader,
    //     });
    // }

    // uploaderInApp(imgUrlFromUploader) {
    //     console.log(
    //         "Received imgUrl in App from Uploader:",
    //         imgUrlFromUploader
    //     );
    //     this.setState({
    //         imgUrl: imgUrlFromUploader,
    //         showUploader: !this.state.showUploader,
    //     });
    // }

    // updateBioInApp(bioFromBioEditor) {
    //     console.log("Received bio in App from BioEditor:", bioFromBioEditor);
    // }

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
                <a href="/ordes">ORDERS</a>
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
