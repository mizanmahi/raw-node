//dependencies
const http = require("http");

const { handleReqRes } = require("./utils/handleReqRes");
const data = require("./lib/data");

// scafolding
const app = {};

// configuration
app.config = {};

// testing file system
// data.read("test", "sample", (err) => {
//   if(err) console.log(err);
// })

// creating server
app.createServer = (PORT = process.env.PORT || 3000) => {
  const server = http.createServer(app.reqResHandler);
  server.listen(PORT, () => console.log(`server is live on port ${PORT}`));
};

// handling request response
app.reqResHandler = handleReqRes;

// starting the server
app.createServer();
