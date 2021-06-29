import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.file = null;

        console.log("props in Uploader: ", props);
    }

    handleChange(e) {
        console.log("upload file selected!");
        this.file = e.target.files[0];
    }

    uploader() {
        var formData = new FormData();
        formData.append("file", this.file);
        axios
            .post("/uploadppic", formData)
            .then(({ data }) => {
                this.props.uploaderInApp(data.ppicurl);
            })
            .catch((err) => {
                console.log(
                    "Error in post /uploadppic (Uploader):",
                    err.message
                );
            });
    }

    render() {
        return (
            <div id="uploader">
                <img
                    id="closeUploader"
                    src="/x-image.png"
                    onClick={this.props.toggleUploader}
                />
                <h3>Want to change/upload your profile picture?</h3>
                <div>
                    <input
                        id="uploader-input"
                        onChange={(e) => this.handleChange(e)}
                        name="file"
                        type="file"
                        accept="image/*"
                    />
                    <button onClick={() => this.uploader()}>UPLOAD</button>
                </div>
            </div>
        );
    }
}
