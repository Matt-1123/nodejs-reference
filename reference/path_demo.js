// The path module provides utilities for working with file and directory paths. It can be accessed using:
const path = require("path");

// basename method: return base file name
console.log(path.basename(__filename)); // path_demo.js

// Directory name:
console.log(path.dirname(__filename));

// File extension
console.log(path.extname(__filename));

// Create path object
console.log(path.parse(__filename).base);
/* 
      {
        root: 'C:\\',
        dir: 'C:\\Users\\matth\\OneDrive\\Desktop\\code\\tutorials\\nodejs-crash-course\\reference',
        base: 'path_demo.js',
        ext: '.js',
        name: 'path_demo'
      }
*/

// Concatenate paths
console.log(path.join(__dirname, "test", "hello.html"));
