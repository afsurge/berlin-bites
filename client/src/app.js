import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            imgUrl: "",
            bio: null,
            showUploader: false,
        };
        // this.toggleUploader = this.toggleUploader.bind(this);
    }

    // componentDidMount() {
    //     axios
    //         .get("/user")
    //         .then(({ data }) => {
    //             const loggedUser = data.rows[0];
    //             this.setState({
    //                 first: loggedUser.first,
    //                 last: loggedUser.last,
    //                 imgUrl: loggedUser.imgurl,
    //                 bio: loggedUser.bio,
    //             });
    //         })
    //         .catch((err) => {
    //             "Error getting user info:", err.message;
    //         });
    // }

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
                        <img id="logo" src="/net2.png" />
                    </a>
                    <div id="navbar">
                        <a className="navlinks" href="/logout">
                            LOGOUT
                        </a>
                    </div>
                </div>
                {/* <div id="greet-profile">
                    <h1 id="greetuser">Hi {this.state.first}!</h1>
                    <ProfilePic
                        imgUrl={this.state.imgUrl}
                        toggleUploader={this.toggleUploader}
                        // class1="appTop"
                        class2="smallppic"
                    />
                </div> */}
                {/* <BrowserRouter>
                    <>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    bio={this.state.bio}
                                    imgUrl={this.state.imgUrl}
                                    toggleUploader={this.toggleUploader}
                                    updateBioInApp={(bio) =>
                                        this.updateBioInApp(bio)
                                    }
                                />
                            )}
                        />
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
                        <Route path="/users" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                        <Route path="/online-users" component={OnlineUsers} />
                    </>
                </BrowserRouter>
                {this.state.showUploader && (
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
