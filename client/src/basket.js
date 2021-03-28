export default function Basket(props) {
    console.log("Basket items from App:", props.basket_items);

    return (
        <div>
            <h1>{props.basket_items}</h1>
        </div>
    );
}
