import { Component } from "react";
import axios from "./axios";

export default class ProfileEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            phoneDraft: "",
            phoneText: "",
            emailDraft: "",
            emailText: "",
            addressDraft: "",
            addressText: "",
            created_at: "",
            buttonTxt: "",
        };
    }

    componentDidMount() {
        this.setState({
            buttonTxt: "EDIT",
            phoneText: this.props.userDetails.phone,
            emailText: this.props.userDetails.email,
            addressText: this.props.userDetails.address
                ? this.props.userDetails.address
                : "You can add your address here.",
            created_at: this.props.userDetails.created_at,
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick() {
        this.setState({
            edit: true,
            buttonTxt: "EDIT",
        });
    }

    updateProfile() {
        console.log(
            "Profile updates to send to server:",
            this.state.emailDraft,
            this.state.addressDraft,
            this.state.phoneDraft
        );

        if (
            this.state.emailDraft == "" &&
            this.state.addressDraft == "" &&
            this.state.phoneDraft == ""
        ) {
            return this.setState({ edit: false });
        }

        axios
            .post("/profile", {
                email: this.state.emailDraft
                    ? this.state.emailDraft
                    : this.state.emailText,
                address: this.state.addressDraft
                    ? this.state.addressDraft
                    : this.state.addressText,
                phone: this.state.phoneDraft
                    ? this.state.phoneDraft
                    : this.state.phoneText,
            })
            .then(({ data }) => {
                console.log("Response from server after Profile update:", data);
                if (data.success) {
                    this.setState({
                        emailText: this.state.emailDraft,
                        addressText: this.state.addressDraft,
                        phoneText: this.state.phoneDraft,
                        edit: false,
                    });
                    this.props.updateProfileInApp(this.state.emailDraft);
                    location.replace("/profile");
                }
            })
            .catch((err) => {
                console.log(
                    "Error adding bio to database (axios):",
                    err.message
                );
            });
    }

    render() {
        return (
            <div id="profile-editor">
                <h2>
                    {this.props.userDetails.first} {this.props.userDetails.last}
                </h2>
                <p className="profile-text">📧️ {this.state.emailText}</p>
                {this.state.edit && (
                    <textarea
                        name="emailDraft"
                        className="profile-texteditor"
                        defaultValue={this.props.userDetails.email}
                        onChange={(e) => this.handleChange(e)}
                    />
                )}
                <p className="profile-text">🏠️ {this.state.addressText}</p>
                {this.state.edit && (
                    <textarea
                        name="addressDraft"
                        className="profile-texteditor"
                        defaultValue={this.props.userDetails.address}
                        onChange={(e) => this.handleChange(e)}
                    />
                )}
                <p className="profile-text">📱️ {this.state.phoneText}</p>
                {this.state.edit && (
                    <textarea
                        name="phoneDraft"
                        className="profile-texteditor"
                        defaultValue={this.props.userDetails.phone}
                        onChange={(e) => this.handleChange(e)}
                    />
                )}
                <p>
                    ✅️ Joined on{" "}
                    {this.props.userDetails.created_at.slice(0, 10)}
                </p>
                <button
                    className="profile-buttons"
                    onClick={() => this.handleClick()}
                >
                    {this.state.buttonTxt}
                </button>
                {this.state.edit && (
                    <button
                        className="profile-buttons"
                        onClick={() => this.updateProfile()}
                    >
                        SAVE
                    </button>
                )}
                <p>
                    ⚠️ For changing your password, please log out and click on
                    the "RESET PASSWORD" link at the LOGIN page.
                </p>
            </div>
        );
    }
}
