
const onRequest = (details) => {
    console.log("REQ: ",details)
}

const onRequestCompleted = (details) => {
    console.log("REQ COMPLETED: ",details)
}

export {
    onRequest,
    onRequestCompleted
}