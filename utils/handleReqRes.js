// request response handling

// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const route = require("../controller/route");
const { notFoundHandler } = require("../routeHandlers/notFoundHandler");

//scafolding
const reqResHandler = {}; 

reqResHandler.handleReqRes = (req, res) => {
  // handling request
  const parsedUrl = url.parse(req.url, true); // parsing the url

  const pathName = parsedUrl.pathname;
  const trimmedPath = pathName.replace(/^\/+|\/$/g, "");
  const queryObj = parsedUrl.query;

  const method = req.method.toLowerCase();
  const headersObj = req.headers;

  const requestProperties = {
    parsedUrl,
    pathName,
    trimmedPath,
    method,
    queryObj,
    headersObj,
  };

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  // hendling response
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();

    try{
      let parsedRealData = JSON.parse(realData);
      requestProperties.body = parsedRealData;
    }catch{
      console.log("On catch block");
      requestProperties.body = {};
    }

    const coosenRoute = route[trimmedPath]
      ? route[trimmedPath]
      : notFoundHandler;
    coosenRoute(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);

      res.writeHead(statusCode,{"content-type": "application/json"});
      res.end(payloadString);
    });
  });
};

module.exports = reqResHandler;
