var orders = [
    { id: 5, bill: 30, foodid: 3, amount: 2 },
    { id: 5, bill: 30, foodid: 2, amount: 1 },
    { id: 6, bill: 40, foodid: 2, amount: 1 },
    { id: 6, bill: 40, foodid: 3, amount: 2 },
];

var sorted = {};

for (var i = 0; i < orders.length; i++) {}

// I'd make an object and add properties to it in a loop through the items.
// For each item i'd check to see if there already was a property whose key was the id.
// If no, add a property whose key is the id and whose value is an object.
// The object should have a property whose value is an array to stick sub items in it with the first sub item placed in it right away.
// If there already is a property with the item's id, push into that object's array a new sub item
