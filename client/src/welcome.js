import { HashRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import ResetPass from "./resetpass";

export default function Welcome() {
    return (
        <div id="welcome">
            <div id="welcome-container">
                <h1>BerlinBites</h1>
                <a href="/welcome#/register">REGISTER</a>
                <br></br>
                <a href="/welcome#/login">LOGIN</a>
                <br></br>
                <a href="/welcome#/resetpass">RESET PASSWORD</a>
            </div>
            <HashRouter>
                <>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/resetpass" component={ResetPass} />
                </>
            </HashRouter>
        </div>
    );
}
