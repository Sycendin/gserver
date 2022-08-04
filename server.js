import handleurl from "./controllers/urlcheck.js";
import express from "express";
import cors from "cors";
import knex from "knex";

const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "newgame",
    password: "Brandon1",
    database: "game",
  },
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/urlcheck", (req, res) => {
  handleurl(req, res, db);
});
app.listen(3002, () => {
  console.log(`Server is running on port 3002`);
});
