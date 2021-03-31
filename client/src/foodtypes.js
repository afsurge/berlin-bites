import axios from "./axios";
import { useState, useEffect } from "react";
// import { BrowserRouter, Route } from "react-router-dom";
import FoodDetails from "./fooddetails";
import { Link } from "react-router-dom";

export default function FoodTypes(props) {
    const [foodId, setFoodId] = useState();
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [foodFile, setFoodFile] = useState();
    const [allTypeFood, setAllTypeFood] = useState();

    useEffect(function () {
        // console.log(props);

        setType(props.type);
        axios
            .get("/food/" + props.type + ".json")
            .then(({ data }) => {
                // console.log("Received food items:", data);
                setAllTypeFood(data);
            })
            .catch((err) => {
                console.log("Error getting food items:", err.message);
            });
    }, []);

    // useEffect(
    //     function () {
    //         console.log("foodId:", id);
    //     },
    //     [id]
    // );

    function showFoodDetails(id) {
        setFoodId(id);
    }

    function foodUpload() {
        // console.log("Time to upload new food!");
        var formData = new FormData();
        formData.append("file", foodFile);

        axios
            .post("/uploadfood", formData)
            .then(({ data }) => {
                // console.log("new upload url:", data.imgurl);
                // console.log("New food uploaded!");
                axios
                    .post("/addfood", {
                        name: name,
                        type: type,
                        description: description,
                        price: price,
                        imgurl: data.imgurl,
                    })
                    .then(({ data }) => {
                        console.log("Added new food with id:", data.id);
                        setAllTypeFood([
                            ...allTypeFood,
                            {
                                id: data.id,
                                name: name,
                                type: type,
                                description: description,
                                price: price,
                                imgurl: data.imgurl,
                            },
                        ]);
                    })
                    .catch((err) => {
                        console.log("Error adding new food:", err.message);
                    });
            })
            .catch((err) => {
                "Error uploading new food:", err.message;
            });
    }

    return (
        <div>
            {props.type == "starter" && <h1>STARTERS</h1>}
            {props.type == "main" && <h1>MAIN DISHES</h1>}
            {props.type == "side" && <h1>SIDE DISHES</h1>}
            {props.type == "dessert" && <h1>DESSERTS</h1>}
            <div>
                {allTypeFood &&
                    allTypeFood.map(function (item) {
                        return (
                            <h2
                                key={item.id}
                                onClick={() => showFoodDetails(item.id)}
                            >
                                {item.name}
                            </h2>
                        );
                    })}
            </div>
            {foodId && (
                <FoodDetails
                    foodId={foodId}
                    admin={props.admin}
                    basketInApp={props.basketInApp}
                    showFoodDetails={(id) => showFoodDetails(id)}
                    // path={location.pathname}
                />
            )}
            {/* <button onClick={() => location.replace("/food")}>BACK</button> */}
            {props.admin && (
                <div id="foodUploader">
                    <input
                        name="name"
                        placeholder="name"
                        onChange={({ target }) => {
                            setName(target.value);
                        }}
                    />
                    <input
                        defaultValue={props.type}
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
                    <button onClick={foodUpload}>UPLOAD</button>
                </div>
            )}
        </div>
    );
}
