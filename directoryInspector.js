//for windows use, you need to put double backslash in the path parameter
const fs = require("fs");
const readline = require("readline");

const args = process.argv;
let path = args[2] === undefined ? __dirname : args[2];

fs.readdir(path, (err, files) => {
  if (err) console.log(err.message);
  else {
    files.forEach((file) => {
      let check = fs.statSync(`${path}/${file}`);
      let message = check.isDirectory() ? `${file}/` : `file:${file}`;
      console.log(message);
    });
  }
});
