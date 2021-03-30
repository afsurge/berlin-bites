import { useEffect, useState } from "react";
import axios from "./axios";

export default function Basket(props) {
    // const basketFromApp = JSON.parse(props.basket_items);

    var foodIdArray = [];
    var total = 0;

    const [basket, setBasket] = useState();
    const [foodInfo, setFoodInfo] = useState();
    const [bill, setBill] = useState();
    const [confirm, setConfirm] = useState(false);

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

    useEffect(
        function () {
            var newTotal = 0;
            if (basket) {
                for (var i = 0; i < basket.length; i++) {
                    newTotal += basket[i].price * basket[i].amount;
                }
                setBill(newTotal);
            }
        },
        [basket]
    );

    function removeFood(i) {
        console.log("Remove this food and amount at index:", i);
        var newBasket = [...basket];
        var newFoodInfo = [...foodInfo];
        newBasket.splice(i, 1);
        newFoodInfo.splice(i, 1);
        setBasket(newBasket);
        setFoodInfo(newFoodInfo);

        if (newBasket.length != 0) {
            localStorage.setItem("basket", JSON.stringify(newBasket));
        } else {
            localStorage.removeItem("basket");
            location.replace("/food");
        }
    }

    function checkout() {
        console.log("Food ordered!");
        axios
            .post("/order", {
                user_id: props.user_id,
                bill: bill,
                basket: basket,
            })
            .then(() => {
                console.log("Added orders and order items successfully!");
                // more things to do here...
                localStorage.removeItem("basket");
                location.replace("/orders");
            })
            .catch((err) => {
                console.log("Error adding order:", err.message);
            });
    }

    return (
        <div>
            {/* <h3>User: {props.user_id}</h3> */}
            {!foodInfo && (
                <div>
                    <h3>You have not added anything to your basket yet! 🙃️</h3>
                    <h3>
                        All food can be found <a href="/food">HERE</a>
                    </h3>
                </div>
            )}
            {foodInfo &&
                foodInfo.map(function (food, i) {
                    return (
                        <div key={food.id}>
                            <p>
                                {food.name} -- € {food.price} --{" "}
                                {basket[i].amount}x ---- €{" "}
                                {food.price * basket[i].amount}
                            </p>
                            {!confirm && (
                                <button onClick={() => removeFood(i)}>
                                    REMOVE
                                </button>
                            )}
                        </div>
                    );
                })}
            {bill && <h2>Total Bill: € {bill}</h2>}
            {bill && (
                <button onClick={() => setConfirm(!confirm)}>
                    {confirm && "MODIFY BASKET"}
                    {!confirm && "CONFIRM BASKET"}
                </button>
            )}

            {confirm && (
                <button
                    onClick={() => {
                        checkout();
                    }}
                >
                    ORDER & CHECKOUT
                </button>
            )}
        </div>
    );
}
