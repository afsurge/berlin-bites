import { HashRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import ResetPass from "./resetpass";

export default function Welcome() {
    return (
        <div id="welcome">
            <div id="name-logo">
                {/* <h1>Berlin</h1> */}
                <img id="welcome-logo" src="./food-to-go-1.png" />
                <h1>Berlin Bites</h1>
            </div>
            <h1 id="welcome-tag">Home-made goodness...</h1>
            <HashRouter>
                <>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpass" component={ResetPass} />
                </>
            </HashRouter>
        </div>
    );
}
