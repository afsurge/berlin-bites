import axios from "./axios";
import { useState, useEffect } from "react";

export default function Orders(props) {
    const userId = props.otherId ? props.otherId : props.user_id;
    const admin = props.admin;
    const [orders, setOrders] = useState();
    const [items, setItems] = useState();
    // const [showBasket, setShowBasket] = useState(false);

    useEffect(function () {
        if (!admin) {
            axios
                .get("/orders/" + userId)
                .then(({ data }) => {
                    console.log("Orders received from server:", data);
                    setOrders(data.reverse());
                })
                .catch((err) => {
                    console.log(
                        "Error getting orders from server:",
                        err.message
                    );
                });
        } else {
            axios
                .get("/allorders")
                .then(({ data }) => {
                    console.log("Orders received for admin:", data);
                    setOrders(data.reverse());
                })
                .catch((err) => {
                    console.log("Error getting orders for admin:", err.message);
                });
            // tips by Alistair for this so that deleted user orders still show up!
        }
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
                    `Error getting items for order this order: ${err.message}`
                );
            });
    }

    return (
        <div id="orders">
            {admin ? (
                <h2>All customer orders</h2>
            ) : (
                <h2>{props.otherId ? "Recent" : "Your recent"} orders</h2>
            )}
            <>
                <div id="orders-container">
                    {orders &&
                        orders.map(function (order) {
                            return (
                                <div className="order-info" key={order.id}>
                                    <p>
                                        DATE {order.created_at.slice(0, 10)} |
                                        {admin &&
                                            ` CUSTOMER ${order.first} ${order.last} |`}{" "}
                                        BILL €{order.bill} | PAYMENT{" "}
                                        {order.paytype}
                                    </p>
                                    {!items && (
                                        <button
                                            className="orders-cart-buttons"
                                            onClick={() => getBasket(order.id)}
                                        >
                                            BASKET
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                </div>
                <div id="orders-items">
                    {items &&
                        items.map(function (item) {
                            return (
                                <div className="order-item" key={item.id}>
                                    <img
                                        className="food-img-small"
                                        src={item.imgurl}
                                    />
                                    <p>
                                        {item.name} | €{item.price} |{" "}
                                        {item.amount}x | Sub-total: €
                                        {item.price * item.amount}
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
                </div>
            </>
        </div>
    );
}
