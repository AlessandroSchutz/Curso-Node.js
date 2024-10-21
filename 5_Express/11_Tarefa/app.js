const express = require("express");
const app = express();
const port = 5000;

const path = require("path");

const routes = require("./router/routes");

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static("public"));

const basePath = path.join(__dirname, "templates");

app.use("/routes", routes);

app.get("/", (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.use(function(req, res, next) {
  res.status(404).sendFile(`${basePath}/404.html`);
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
