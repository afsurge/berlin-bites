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
        props.basketInApp({
            id: foodId,
            price: foodPrice,
            amount: amount,
        });
    }

    function closeDetails() {
        props.showFoodDetails(null);
    }

    return (
        <div id="food-details">
            {foodDetails && (
                <>
                    <img
                        id="closeUploader"
                        src="/x-image.png"
                        onClick={closeDetails}
                    />
                    <div id="details-img-info">
                        <img id="food-details-img" src={foodDetails.imgurl} />
                        <div id="details-info">
                            <h3 id="food-name">{foodDetails.name}</h3>
                            <p>{foodDetails.description}</p>
                            <h1>€ {foodDetails.price}</h1>
                            <div id="details-buttons">
                                <button
                                    onClick={() =>
                                        amount != 1 && setAmount(amount - 1)
                                    }
                                >
                                    -
                                </button>
                                <input
                                    value={amount}
                                    name="amount"
                                    placeholder="amount"
                                    readOnly
                                />
                                <button onClick={() => setAmount(amount + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        id="add-cart-button"
                        onClick={() => {
                            addToBasket(
                                foodDetails.id,
                                foodDetails.price,
                                amount
                            );
                            closeDetails();
                        }}
                    >
                        ADD TO CART (€ {foodDetails.price * amount})
                    </button>
                </>
            )}
        </div>
    );
}
