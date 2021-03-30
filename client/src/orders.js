import axios from "./axios";
import { useState, useEffect } from "react";

export default function Orders(props) {
    const userId = props.user_id;
    const admin = props.admin;
    const [orders, setOrders] = useState();
    const [items, setItems] = useState();
    // const [showBasket, setShowBasket] = useState(false);

    useEffect(function () {
        axios
            .get("/orders/" + userId)
            .then(({ data }) => {
                console.log("Orders received from server:", data);
                setOrders(data.reverse());
                // console.log(orders);
                // for (var i = 0; i < data.length; i++) {
                //     axios
                //         .get("/orderitems/" + data[i].id)
                //         .then(({ data }) => {
                //             console.log(
                //                 "Data received about this order:",
                //                 data
                //             );
                //             setItems({ i: data });
                //             // console.log(items);
                //             // do something more here...
                //         })
                //         .catch((err) => {
                //             console.log(
                //                 `Error getting items for order ${orders[i].id}: ${err.message}`
                //             );
                //         });
                // }
            })
            .catch((err) => {
                console.log("Error getting orders from server:", err.message);
            });

        // var sortOrders = groupBy2(orders, "id");
        // console.log(sortOrders[5]);
    }, []);

    function getBasket(id) {
        console.log("Basket request for order id:", id);
        // setShowBasket(true);

        axios
            .get("/orderitems/" + id)
            .then(({ data }) => {
                console.log("Data received about this order:", data);
                setItems(data);
                // console.log(items);
                // do something more here...
            })
            .catch((err) => {
                console.log(
                    `Error getting items for order ${orders[i].id}: ${err.message}`
                );
            });
    }

    return (
        <div>
            <h2>Your recent orders</h2>
            <>
                {orders &&
                    orders.map(function (order) {
                        return (
                            <div key={order.id}>
                                <p>
                                    {order.created_at.slice(0, 10)} | {order.id}{" "}
                                    | Total bill: €{order.bill} | Payment:{" "}
                                    {order.paytype}
                                </p>
                                {!items && (
                                    <button onClick={() => getBasket(order.id)}>
                                        BASKET
                                    </button>
                                )}
                            </div>
                        );
                    })}
                {items &&
                    items.map(function (item) {
                        return (
                            <div key={item.id}>
                                <p>
                                    {item.name} | €{item.price} | {item.amount}x
                                    | Sub-total: €{item.price * item.amount}
                                </p>
                            </div>
                        );
                    })}

                {items && (
                    <button
                        onClick={() => {
                            setItems(null);
                            // setShowBasket(false);
                        }}
                    >
                        CLOSE
                    </button>
                )}
            </>
        </div>
    );
}
