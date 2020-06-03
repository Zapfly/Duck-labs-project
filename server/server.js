const express = require("express");
const api = require("./api/api");
const users = require("./api/users");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

app.use(express.json({ extended: false }));
// app.get('/', (req,res) => res.send('API Running'))
app.use("/users", users);
// app.use('/users', express.static('./api/users'))

app.use(express.json());
app.use("/api", api);
// app.use("/", express.static("../src"));

//Server static assets in production

app.use(express.static(__dirname, "../src"));

app.get("*", (request, response) => {
  response.render("index");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening at ${port}`));
