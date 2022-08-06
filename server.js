import handleurl from "./controllers/urlcheck.js";
import handlearchetypes from "./controllers/archetypes.js";
import express from "express";
import cors from "cors";
import knex from "knex";
import dotenv from "dotenv";
dotenv.config();
console.log(
  process.env.HOST,
  process.env.DBUSER,
  process.env.DBPASS,
  process.env.DATABASE
);
const db = knex({
  client: "mysql",
  connection: {
    host: process.env.HOST,
    port: 3306,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE,
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
app.post("/archetypes", (req, res) => {
  handlearchetypes(req, res, db);
});
app.listen(3002, () => {
  console.log(`Server is running on port 3002`);
});
