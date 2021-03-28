import { BrowserRouter, Route } from "react-router-dom";
import FoodTypes from "./foodtypes";

export default function Food(props) {
    return (
        <div>
            {location.pathname == "/food" && (
                <div className="food-types">
                    <a href="/food/starters">
                        <h2>STARTERS</h2>
                    </a>
                    <a href="/food/main">
                        <h2>MAIN DISHES</h2>
                    </a>
                    <a href="/food/sides">
                        <h2>SIDE DISHES</h2>
                    </a>
                    <a href="/food/dessert">
                        <h2>DESSERTS</h2>
                    </a>
                </div>
            )}
            <BrowserRouter>
                <>
                    <Route
                        path="/food/starters"
                        render={() => (
                            <FoodTypes
                                admin={props.admin}
                                type={"starter"}
                                basketInApp={props.basketInApp}
                            />
                        )}
                    />
                    <Route
                        path="/food/main"
                        render={() => (
                            <FoodTypes
                                admin={props.admin}
                                type={"main"}
                                basketInApp={props.basketInApp}
                            />
                        )}
                    />
                    <Route
                        path="/food/sides"
                        render={() => (
                            <FoodTypes
                                admin={props.admin}
                                type={"side"}
                                basketInApp={props.basketInApp}
                            />
                        )}
                    />
                    <Route
                        path="/food/dessert"
                        render={() => (
                            <FoodTypes
                                admin={props.admin}
                                type={"dessert"}
                                basketInApp={props.basketInApp}
                            />
                        )}
                    />
                </>
            </BrowserRouter>
        </div>
    );
}
