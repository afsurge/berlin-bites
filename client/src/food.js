import axios from "./axios";
import { useState, useEffect } from "react";

export default function Food() {
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [foodFile, setFoodFile] = useState();
    const [allFood, setAllFood] = useState();

    useEffect(function () {
        // console.log(props);
        // axios
        //     .get("/food")
        //     .then(({ data }) => {
        //         console.log("Received food items:", data.rows);
        //     })
        //     .catch((err) => {
        //         console.log("Error getting food items:", err.message);
        //     });
    }, []);

    // useEffect(
    //     function () {
    //         console.log("food file:", foodFile);
    //     },
    //     [foodFile]
    // );

    function handleUplaod() {
        console.log("Time to upload new food!");
    }

    return (
        <div id="food-container">
            <div className="all-food">
                <h1>Food will render here</h1>
            </div>
            <div id="foodUploader">
                <input
                    name="name"
                    placeholder="name"
                    onChange={({ target }) => {
                        setName(target.value);
                    }}
                />
                <input
                    name="type"
                    placeholder="type"
                    onChange={({ target }) => {
                        setType(target.value);
                    }}
                />
                <input
                    name="description"
                    placeholder="description"
                    onChange={({ target }) => {
                        setDescription(target.value);
                    }}
                />
                <input
                    name="price"
                    placeholder="price"
                    onChange={({ target }) => {
                        setPrice(target.value);
                    }}
                />
                <input
                    onChange={({ target }) => {
                        setFoodFile(target.files[0]);
                    }}
                    name="file"
                    type="file"
                    accept="image/*"
                />
                <button onClick={handleUplaod}>UPLOAD</button>
            </div>
        </div>
    );
}
