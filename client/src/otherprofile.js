import { Component } from "react";
import axios from "./axios";
import Orders from "./orders";
// import FriendButton from "./friendbutton";
// import { Link } from "react-router-dom";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "",
            last: "",
            ppicurl: "",
            email: "",
            phone: "",
            address: "",
            created_at: "",
            currentId: "",
        };
    }

    componentDidMount() {
        // console.log("ID of other user:", this.props.match.params.id);
        const otherId = this.props.match.params.id;
        axios
            .get("/user/" + otherId + ".json")
            .then(({ data }) => {
                // console.log("Response about otherId:", data.rows[0]);
                if (data.rows[0].currentId == this.props.match.params.id) {
                    return this.props.history.push("/profile");
                } else {
                    this.setState(data.rows[0]);
                }
            })
            .catch((err) => {
                console.log("Error getting otherId info:", err.message);
                return this.props.history.push("/profile");
            });
    }

    render() {
        return (
            <>
                <div id="otherProfile">
                    <h2>
                        {this.state.first} {this.state.last}
                    </h2>
                    <div id="otherProfile-img-text">
                        <img
                            id="otherProfilePic"
                            className="largeppic"
                            src={this.state.ppicurl}
                        />
                        <div>
                            <p className="otherprofile-text">
                                📧️ {this.state.email}
                            </p>
                            <p className="otherprofile-text">
                                🏠️ {this.state.address}
                            </p>
                            <p className="otherprofile-text">
                                📱️ {this.state.phone}
                            </p>
                            <p className="otherprofile-text">
                                ✅️ Joined on{" "}
                                {this.state.created_at.slice(0, 10)}
                            </p>
                        </div>
                    </div>

                    <Orders
                        otherId={this.props.match.params.id}
                        admin={false}
                    />
                </div>
            </>
        );
    }
}
