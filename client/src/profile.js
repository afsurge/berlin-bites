import ProfilePic from "./profilepic";
import ProfileEditor from "./profileeditor";
// import axios from "./axios";
import { useState } from "react";

export default function Profile(props) {
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    function deleteProfile() {
        console.log("Want to delete this profile!");
        // axios
        //     .get("/deleteProfile")
        //     .then(({ data }) => {
        //         if (data.success) {
        //             location.replace("/logout");
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("Error deleting user profile:", err.message);
        //     });
    }

    return (
        <div id="profile">
            <h1>Your Profile</h1>
            <div id="ppic-with-editor">
                <ProfilePic
                    ppicurl={props.userDetails.ppicurl}
                    toggleUploader={() => props.toggleUploader()}
                    class1="with-editor"
                    class2="largeppic"
                />
                <ProfileEditor
                    userDetails={props.userDetails}
                    updateProfileInApp={(profile) =>
                        props.updateProfileInApp(profile)
                    }
                />
            </div>

            {!props.userDetails.admin && (
                <button
                    id="del-profile-button"
                    onClick={() => {
                        setDeleteConfirm(true);
                    }}
                >
                    DELETE PROFILE
                </button>
            )}
            {deleteConfirm && (
                <div id="del-container">
                    <div id="del-confirmer">
                        <h2>
                            Are you sure you want to completely delete your
                            account?
                        </h2>
                        <button id="del-yes" onClick={deleteProfile}>
                            YES
                        </button>
                        <button
                            id="del-no"
                            onClick={() => {
                                setDeleteConfirm(false);
                            }}
                        >
                            NO
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
