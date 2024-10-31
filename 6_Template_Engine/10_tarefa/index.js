const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/produto/:id", (req, res) => {
  const produto = produtos[parseInt(req.params.id) - 1];

  res.render("produto", { produto });
});

app.get("/", (req, res) => {
  res.render("home", { produtos });
});

app.listen(3000, () => {
  console.log("App rodando!");
});

const produtos = [
  {
    id: "1",
    title: "Cadeira",
    category: "Moveis",
    price: 100,
  },
  {
    id: "2",
    title: "Mesa",
    category: "Moveis",
    price: 1000,
  },
  {
    id: "3",
    title: "Jaqueta",
    category: "Roupas",
    price: 100,
  },
  {
    id: "4",
    title: "Calça",
    category: "Roupas",
    price: 120,
  },
  {
    id: "5",
    title: "Tênis de corrida",
    category: "Roupas",
    price: 250,
  },
  {
    id: "6",
    title: "Sofá",
    category: "Moveis",
    price: 3400,
  },
];
