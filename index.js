const fs = require("fs");

function firstSolution() {
  fs.writeFile("text.txt", "Hello", (err) => {
    if (err) return console.log(err.message);
    fs.readFile("text.txt", (err, content) => {
      if (err) return console.log(err.message);
      console.log(content.toString());
      fs.appendFile("text.txt", " there", (err) => {
        if (err) return console.log(err.message);
        fs.readFile("text.txt", (err, content) => {
          if (err) return console.log(err.message);
          console.log(content.toString());
          fs.unlink("text.txt", (err) => {
            if (err) return console.log(err.message);
          });
        });
      });
    });
  });
}

// firstSolution();

function secondSolution() {
  function writeFile() {
    return new Promise((resolve, reject) => {
      fs.writeFile("text2.txt", "Hello", (err) => {
        if (err) return reject(err);
        resolve("");
      });
    });
  }

  function readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile("text2.txt", (err, content) => {
        if (err) return reject(err);
        console.log(content.toString());
        resolve(content);
      });
    });
  }

  async function appendFile() {
    return new Promise((resolve, reject) => {
      fs.appendFile("text2.txt", " there", (err) => {
        if (err) return reject(err);
        resolve("");
      });
    });
  }

  async function unlinkFile() {
    return new Promise((resolve, reject) => {
      fs.unlink("text2.txt", (err) => {
        if (err) return reject(err);
        resolve("");
      });
    });
  }

  writeFile()
    .then(() => readFile())
    .then(() => appendFile())
    .then(() => readFile())
    .then(() => unlinkFile())
    .catch((err) => {
      console.log(err);
    });
}

// secondSolution();

async function thirdSolution() {
  function promisify(func) {
    return function asyncFunc(...arg) {
      return new Promise((resolve, reject) => {
        func(...arg, (err, content) => {
          if (err) return reject(err);
          resolve(content ? content.toString() : "");
        });
      });
    };
  }

  const readFileAsync = promisify(fs.readFile);
  const writeFileAsync = promisify(fs.writeFile);
  const appendFileAsync = promisify(fs.appendFile);
  const unlinkdFileAsync = promisify(fs.unlink);

  await writeFileAsync("text3.txt", "hello");
  console.log(await readFileAsync("text3.txt"));
  await appendFileAsync("text3.txt", " there");
  console.log(await readFileAsync("text3.txt"));
  await unlinkdFileAsync("text3.txt");
}

// thirdSolution();
