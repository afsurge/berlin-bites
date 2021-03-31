export function chatMessages(msgs) {
    // console.log("Messages in action.js:", msgs);
    return {
        type: "RECENT_MESSAGES",
        msgs: msgs,
    };
}

export function chatMessageByUser(msg) {
    // console.log("action dispatch from socket for new chat message!");
    return {
        type: "NEW_MESSAGE_USER",
        msg: msg,
    };
}
