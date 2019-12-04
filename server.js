const express = require("express"); // importing a CommonJS module

const helmet = require("helmet"); // <<<< install the pkg

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// middleware

// custom middleware
function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next(); // allows the request to continue to the next middleware or route handler
}

// write a gatekeeper middleware that reads a password from the headers and if the password is "mellon" , let it
//continue, if not, send back status code 401 and a message. Use it for the /area51 enpoint

function passCheck(req, res, next) {
  console.log(`${req.headers}`);
  req.headers.password === "mellon"
    ? next()
    : res.status(401).json({
        message: "incorrect password"
      });
}

server.use(helmet()); //<<<<< use the pkg
server.use(express.json()); // built-in middleware
server.use(logger);

//endpoints

server.use("/api/hubs", hubsRouter); // the router is local middleware, because it only applies to /api/hubs
server.use("/api/hubs/area51", passCheck)

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});
// shift + opt + up or down to copy selected lines
server.get("/echo", (req, res) => {
  res.send(req.headers);
});

server.get("/area51", helmet(), (req, res) => {
  res.send(req.headers);
});
module.exports = server;
