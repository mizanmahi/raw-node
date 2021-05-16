
//scafolding 
const handler = {};

handler.notFoundHandler = (requestProperties, cb) => {
    cb(404, {
        message: "URL Not found :)"
    })
}

module.exports = handler;