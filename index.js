// const Person = require("./person");
// const person1 = new Person("John Doe", 30);
// person1.greeting();

// const Logger = require("./logger");

// // instantiate logger
// const logger = new Logger();

// logger.on("message", (data) => console.log("Called Listener:", data)); // Called Listener: { id: 'fea69ae5-30fd-49fe-8ef9-43efae0c10e3', msg: 'Hello World' }

// logger.log("Hello World");

const http = require("http");
const path = require("path");
const fs = require("fs");

// Create a new server object
// Note: this isn't efficient because we need a conditional for each page or endpoint
// const server = http.createServer((req, res) => {
//   if ((req.url = "/")) {
//     fs.readFile(
//       path.join(__dirname, "public", "index.html"),
//       (err, content) => {
//         if (err) throw err;

//         // Add a content type (found in browser in Network > Headers)
//         res.writeHead(200, { "Content-Type": "text/html" });

//         res.write(content);
//         res.end();
//       }
//     );
//   }

//   // Microservice / REST API example
//   // Note: This is the more complicated way. Better to use Express or another web application framework
//   if ((req.url = "/api/users")) {
//     const users = [
//       { name: "Bob Smith", age: 40 },
//       { name: "John Doe", age: 30 },
//     ];

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(users));
//   }
// });

// More effient method:
// Create a server that creates a request and response every time a file is sent
const server = http.createServer((req, res) => {
  // Build file path
  // Look in the public folder and evaluate the path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Get extension of file being sent
  let extName = path.extname(filePath);

  // Initial content type
  let contentType = "text/html";

  // Check extension and then set the content type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extName == "") filePath += ".html";

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

// Server first looks for the environment variable (which exists if app is in production). Otherwise, it runs on port 5000 (during development)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
