import axios from "./axios";
import { useState, useEffect } from "react";

export default function FoodDetails(props) {
    const foodId = props.foodId;
    const admin = props.admin;
    const [foodDetails, setFoodDetails] = useState();
    let [amount, setAmount] = useState(0);

    useEffect(function () {
        // setFoodId(props.id);
        axios.get("/foodDetails/" + foodId).then(({ data }) => {
            console.log("Data about selected food:", data[0]);
            setFoodDetails(data[0]);
        });
    }, []);

    useEffect(
        function () {
            console.log("Amount now:", amount);
        },
        [amount]
    );

    return (
        <div>
            {foodDetails && (
                <div>
                    <img id="food-img" src={foodDetails.imgurl} />
                    <h3>{foodDetails.name}</h3>
                    <h3>{foodDetails.description}</h3>
                    <h3>€{foodDetails.price}</h3>
                    <button
                        onClick={() => amount != 0 && setAmount(amount - 1)}
                    >
                        -
                    </button>
                    <input
                        value={amount}
                        name="amount"
                        placeholder="amount"
                        readOnly
                    />
                    <button onClick={() => setAmount(amount + 1)}>+</button>
                </div>
            )}
        </div>
    );
}
