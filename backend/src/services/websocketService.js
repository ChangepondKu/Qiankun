const { wss } = require("../server");

const broadcastProductUpdate = (products) => {
    const message = JSON.stringify({ type: 'PRODUCT_UPDATE', data: products });
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

module.exports = {
    broadcastProductUpdate
};
