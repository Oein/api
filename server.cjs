const express = require("express");
const server = require("./server.json");
const app = express();
Object.keys(server).forEach((method) => {
  Object.keys(server[method]).forEach((url) => {
    app[method](url, eval(`(${server[method][url]})`));
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
