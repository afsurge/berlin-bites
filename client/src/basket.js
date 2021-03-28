import { useEffect, useState } from "react";
import axios from "./axios";

export default function Basket(props) {
    // const basketFromApp = JSON.parse(props.basket_items);

    var foodIdArray = [];
    var total = 0;

    const [basket, setBasket] = useState();
    const [foodInfo, setFoodInfo] = useState();
    const [bill, setBill] = useState();

    useEffect(function () {
        const basketFromApp = JSON.parse(props.basket_items);
        // console.log("Basket items from App:", basketFromApp);
        // sort basketFromApp according to ids to match indexes of basket and foodInfo states
        if (basketFromApp) {
            basketFromApp.sort(function (a, b) {
                return a.id - b.id;
            });
        }
        console.log("Sorted basket items from App:", basketFromApp);
        setBasket(basketFromApp);

        if (basketFromApp) {
            for (var i = 0; i < basketFromApp.length; i++) {
                foodIdArray.push(basketFromApp[i].id);
                total += basketFromApp[i].price * basketFromApp[i].amount;
            }

            // console.log("total:", total);
            setBill(total);
            // console.log("ids of food items in basket:", foodIdArray);
            axios
                .get("/basketfood/" + foodIdArray)
                .then(({ data }) => {
                    // console.log("Food info for basket received:", data);
                    setFoodInfo(data);
                })
                .catch((err) => {
                    "Error getting food info for basket:", err.message;
                });
        }
    }, []);

    function removeFood(i) {
        console.log("Remove this food and amount at index:", i);
        var newBasket = basket;
        var newFoodInfo = foodInfo;
        newBasket.splice(i, 1);
        newFoodInfo.splice(i, 1);
        console.log(newBasket);
        console.log(newFoodInfo);
        setBasket(newBasket);
        setFoodInfo(newFoodInfo);
        // setBasket(basket.splice(i, 1));
        // setFoodInfo(foodInfo.splice(i, 1));
    }

    return (
        <div>
            {/* <h3>User: {props.user_id}</h3> */}
            {!foodInfo && <h3>There are no food in your basket!</h3>}
            {foodInfo &&
                foodInfo.map(function (food, i) {
                    return (
                        <div key={food.id}>
                            <p>
                                {food.name} -- € {food.price} --{" "}
                                {basket[i].amount}x ---- €{" "}
                                {food.price * basket[i].amount}
                            </p>
                            <button onClick={() => removeFood(i)}>
                                REMOVE
                            </button>
                        </div>
                    );
                })}
            {bill && <h1>Total Bill: € {bill}</h1>}
        </div>
    );
}
