import axios from "./axios";
import { useState, useEffect } from "react";

export default function FoodDetails(props) {
    let foodId = props.foodId;
    const admin = props.admin;
    const [foodDetails, setFoodDetails] = useState();
    let [amount, setAmount] = useState(1);
    // let [basket, setBasket] = useState();

    useEffect(function () {
        axios.get("/foodDetails/" + foodId).then(({ data }) => {
            console.log("Data about selected food:", data[0]);
            setFoodDetails(data[0]);
        });
    }, []);

    function addToBasket(foodId, foodPrice, amount) {
        // console.log(foodId, foodPrice, amount);
        props.basketInApp({ id: foodId, price: foodPrice, amount: amount });
    }

    function closeDetails() {
        props.showFoodDetails(null);
    }

    return (
        <div>
            {foodDetails && (
                <>
                    <img id="food-img" src={foodDetails.imgurl} />
                    <h3>{foodDetails.name}</h3>
                    <h3>{foodDetails.description}</h3>
                    <h3>€{foodDetails.price}</h3>
                    <button
                        onClick={() => amount != 1 && setAmount(amount - 1)}
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
                    <button
                        onClick={() =>
                            addToBasket(
                                foodDetails.id,
                                foodDetails.price,
                                amount
                            )
                        }
                    >
                        ADD TO BASKET (€ {foodDetails.price * amount})
                    </button>
                    <button onClick={closeDetails}>CLOSE</button>
                </>
            )}
        </div>
    );
}
