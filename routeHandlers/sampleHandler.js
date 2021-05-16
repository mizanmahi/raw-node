
//scafolding 
const handler = {};

handler.sampleHandler = (requestProperties, cb) => {
    cb(200, {name: "Mizanur Rahman"})
}

module.exports = handler;