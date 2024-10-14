const fs = require("fs"); // file sistem

fs.readFile("arquivo.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
