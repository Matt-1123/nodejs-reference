// Provides info about environment, operating system

const os = require("os");

// Platform
console.log(os.platform()); // win32

// CPU architecture
console.log(os.arch()); // x64

// CPU Core Info
// console.log(os.cpus());

// Free memory - Returns the amount of free system memory in bytes as an integer.
console.log(os.freemem());

// Total memory
console.log(os.totalmem());

// Home directory
console.log(os.homedir());

// Uptime (amt of time system has been up)
console.log(os.uptime());
