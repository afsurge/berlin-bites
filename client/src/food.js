import { BrowserRouter, Link, Route } from "react-router-dom";
import FoodTypes from "./foodtypes";
import { useState } from "react";

export default function Food(props) {
    // const pathname = location.pathname;
    // console.log(pathname);
    // const showTypes = true;
    const [showTypes, setShowTypes] = useState(true);

    return (
        <div>
            {/* {location.pathname == "/food" && (
                <div id="food-types">
                    <Link to="/food/starters">STARTERS</Link>
                    <a href="/food/starters">
                        <img src=""></img>
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
            )} */}
            <BrowserRouter>
                <>
                    {showTypes && (
                        <div id="food-types">
                            <Link
                                className="food-types-links"
                                to="/food/starters"
                                onClick={() => {
                                    setShowTypes(false);
                                }}
                            >
                                <img
                                    className="food-types-img"
                                    src="/food/starters.jpg"
                                />
                                <p className="food-types-p">Starters</p>
                            </Link>
                            <Link
                                className="food-types-links"
                                to="/food/main"
                                onClick={() => {
                                    setShowTypes(false);
                                }}
                            >
                                <img
                                    className="food-types-img"
                                    src="/food/mains.jpg"
                                />
                                <p className="food-types-p">Main Dishes</p>
                            </Link>
                            <Link
                                className="food-types-links"
                                to="/food/sides"
                                onClick={() => {
                                    setShowTypes(false);
                                }}
                            >
                                <img
                                    className="food-types-img"
                                    src="/food/sides.jpg"
                                />
                                <p className="food-types-p">Side Dishes</p>
                            </Link>
                            <Link
                                className="food-types-links"
                                to="/food/dessert"
                                onClick={() => {
                                    setShowTypes(false);
                                }}
                            >
                                <img
                                    className="food-types-img"
                                    src="/food/dessert.jpg"
                                />
                                <p className="food-types-p">Dessert</p>
                            </Link>
                        </div>
                    )}
                    {!showTypes && (
                        <div id="back-foodtypes-link">
                            <Link
                                to="/food"
                                onClick={() => {
                                    setShowTypes(true);
                                }}
                            >
                                BACK
                            </Link>
                        </div>
                    )}
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
