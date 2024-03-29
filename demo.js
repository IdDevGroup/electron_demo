const path = require('path');

// Assuming this file is ./src/es6-init.js
var appRoot = path.join(__dirname, '.');

// ...and that your main app is called ./src/main.js. This is written as if
// you were going to `require` the file from here.
require('electron-compile').init(appRoot, './src/Application');