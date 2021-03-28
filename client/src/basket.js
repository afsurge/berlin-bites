import { useEffect, useState } from "react";
import axios from "./axios";

export default function Basket(props) {
    // const basketFromApp = JSON.parse(props.basket_items);

    var foodIdArray = [];

    const [basket, setBasket] = useState();
    const [foodInfo, setFoodInfo] = useState();

    useEffect(function () {
        const basketFromApp = JSON.parse(props.basket_items);
        console.log("Basket items from App:", basketFromApp);
        setBasket(basketFromApp);
        if (basketFromApp) {
            for (var i = 0; i < basketFromApp.length; i++) {
                foodIdArray.push(basketFromApp[i].id);
            }
            console.log("ids of food items in basket:", foodIdArray);
        }

        axios.get("/basketfood/" + foodIdArray).then(({ data }) => {
            console.log("Food info for basket received:", data);
            setFoodInfo(data);
        });
    }, []);

    return (
        <div>
            <h1>User: {props.user_id}</h1>
            {/* {basket && <h1>something in basket!</h1>} */}
            {foodInfo &&
                foodInfo.map(function (food) {
                    return (
                        <div key={food.id}>
                            <h1>
                                {food.name} {food.price} {basket[0].amount}
                            </h1>
                        </div>
                    );
                })}
        </div>
    );
}
