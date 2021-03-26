import { HashRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import ResetPass from "./resetpass";

export default function Welcome() {
    return (
        <div id="welcome">
            <div id="welcome-container">
                <h1>GOLPO CATERING & BAKERY</h1>
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
