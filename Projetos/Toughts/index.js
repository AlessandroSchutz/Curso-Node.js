const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

// Models
const Tought = require("./models/Tought");
const User = require("./models/User");

// Import Routes
const toughtsRoutes = require("./routes/toughtsRoutes");
const authRoutes = require("./routes/authRoutes");

// Import Controller
const ToughtController = require("./controllers/ToughtController");

// Template Engine
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

// Recebendo Resposta Do Body
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

// Session Middleware
app.use(
  session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require("path").join(require("os").tmpdir(), "sessions"),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  }),
);

//  Flash Messages
app.use(flash());

// Public Path
app.use(express.static("public"));

// Set Session to resposta
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

// Routes
app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);

app.get("/", ToughtController.showToughts);

conn
  // .sync({ force: true }) // reinicializar as tabelas
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
