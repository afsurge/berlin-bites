import axios from "./axios";
import { useState, useEffect } from "react";

export default function Orders(props) {
    const userId = props.user_id;
    const admin = props.admin;
    const [orders, setOrders] = useState();

    useEffect(function () {
        axios
            .get("/orders/" + userId)
            .then(({ data }) => {
                console.log("Orders received from server:", data);
                setOrders(data);
            })
            .catch((err) => {
                console.log("Error getting orders from server:", err.message);
            });

        // var sortOrders = groupBy2(orders, "id");
        // console.log(sortOrders[5]);
    }, []);

    return (
        <div>
            <h2>Your recent orders</h2>
            <>
                {orders &&
                    orders.map(function (order) {
                        return (
                            <div key={order.id}>
                                <p>
                                    {order.id} {order.bill} {order.paytype}{" "}
                                    {order.created_at}
                                </p>
                            </div>
                        );
                    })}
            </>
        </div>
    );
}
