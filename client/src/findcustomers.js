import axios from "./axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindCustomers() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();

    useEffect(function () {
        axios
            .get("/users.json")
            .then(({ data }) => {
                console.log("Received recent users:", data.rows);
                setResultUsers(data.rows);
            })
            .catch((err) => {
                "Error getting recent users (component):", err.message;
            });
    }, []);

    useEffect(
        function () {
            if (searchTerm == "") {
                setSearchTerm(undefined);
            }
            axios
                .get("/users/" + searchTerm)
                .then(({ data }) => {
                    // console.log("Received search users:", data.rows);
                    // console.log("searchTerm:", searchTerm);
                    setResultUsers(data.rows);
                })
                .catch((err) => {
                    "Error getting searched users (component):", err.message;
                });
        },
        [searchTerm]
    );

    return (
        <div id="findCustomers">
            <h2>FIND CUSTOMERS</h2>
            {searchTerm == undefined && <h3>Latest customers</h3>}
            {searchTerm == undefined || (
                <h3>Search results for: "{searchTerm}"</h3>
            )}
            {resultUsers &&
                resultUsers.map(function (user) {
                    return (
                        <div key={user.id}>
                            {user.id != 1 && (
                                <Link
                                    className="find-customer-link"
                                    to={`/user/${user.id}`}
                                >
                                    <div className="customer">
                                        <img
                                            className="userppic"
                                            src={user.ppicurl}
                                        />
                                        <h2>
                                            {user.first} {user.last}
                                        </h2>
                                    </div>
                                </Link>
                            )}
                        </div>
                    );
                })}
            <h3>Find specific customer</h3>
            <input
                defaultValue={searchTerm}
                onChange={({ target }) => {
                    setSearchTerm(target.value);
                }}
                placeholder="Enter name here"
            />
        </div>
    );
}
