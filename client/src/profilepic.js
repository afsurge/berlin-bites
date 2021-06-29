export default function ProfilePic(props) {
    const ppicurl = props.ppicurl || "/no-profile-pic.png";

    return (
        <div id="profilepic" className={props.class1}>
            <img
                className={props.class2}
                src={ppicurl}
                alt={props.last}
                onClick={() =>
                    location.pathname == "/profile"
                        ? props.toggleUploader()
                        : location.replace("/profile")
                }
                // onClick={props.toggleUploader}
            />
        </div>
    );
}
