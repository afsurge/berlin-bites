export default function reducer(state = {}, action) {
    if (action.type === "RECENT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs,
        };
    }

    if (action.type === "NEW_MESSAGE_USER") {
        console.log("msg details from server:", action.msg);
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.msg],
        };
    }

    console.log(`state in reducer for action "${action.type}":`, state);
    return state;
}
