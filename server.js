import handleurl from "./controllers/urlcheck.js";
// const urlcheck = require("./controllers/urlcheck");
import express from "express";
import cors from "cors";
import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "gameuser",
    password: "Brandon1",
    database: "game",
  },
  pool: { min: 0, max: 7 },
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("it's working");
});

app.post("/urlcheck", (req, res) => {
  handleurl(req, res, db);
});
app.listen(3002, () => {
  console.log(`app is running on port 3002`);
});
