//  application route

// dependencies
const { sampleHandler } = require("../routeHandlers/sampleHandler");
const { notFoundHandler } = require("../routeHandlers/notFoundHandler");
const { userHandler } = require("../routeHandlers/userHandler");

// scafolding
const route = {
    sample: sampleHandler,
    user: userHandler
};

module.exports = route;