const fs = require("fs");

var readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);

const pathToDir = process.argv[2];

const getFiles = (path) => {
  try {
    let files = fs.readdirSync(path);
    return files;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteDirectory = (files, path) => {
  if (!files.length) {
    removeDirectory(path);
    rl.close();
  } else {
    rl.question(
      "this directory is not empty, do you want to delete? ",
      (response) => {
        rl.close();
        if (response === "Yes") {
          getFilesAndDirectorys(pathToDir);
          removeDirectory(path);
          console.log(myCounter);
        } else {
          console.log("See you later");
        }
      }
    );
  }
};

const myCounter = { directory: 1 };
const getFilesAndDirectorys = (path) => {
  let files = fs.readdirSync(path);
  files.forEach((file) => {
    let check = fs.statSync(`${path}/${file}`);
    if (check.isFile()) {
      myCounter["files"] = (myCounter["files"] || 0) + 1;
    } else if (check.isDirectory()) {
      myCounter["directory"] = (myCounter["directory"] || 0) + 1;
      getFilesAndDirectorys(`${path}/${file}`);
    }
  });
};

const removeDirectory = (path) => {
  fs.rm(path, { recursive: true }, function (err) {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully removed the empty directory!");
    }
  });
};

const filesOfDirectory = getFiles(pathToDir);
try {
  deleteDirectory(filesOfDirectory, pathToDir);
} catch (error) {
  console.log(error.message);
  rl.close();
}
