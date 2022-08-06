import handleurl from "./controllers/urlcheck.js";
import handlearchetypes from "./controllers/archetypes.js";
import herokuSSLRedirect from "heroku-ssl-redirect";
import express from "express";
import cors from "cors";
import knex from "knex";
import dotenv from "dotenv";
const sslRedirect = herokuSSLRedirect.default;
dotenv.config();
const db = knex({
  client: "mysql",
  connection: {
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    user: "b4c3713140856f",
    password: "a300f5e8",
    database: "heroku_6d3c8c682bb15aa",
  },
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(sslRedirect());
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.get("/urlcheck", (req, res) => {
  handleurl(req, res, db);
});
app.get("/archetypes", (req, res) => {
  handlearchetypes(req, res, db);
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 3002`);
});
