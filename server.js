import handleurl from "./controllers/urlcheck.js";
import handlearchetypes from "./controllers/archetypes.js";
import handleMarkdown from "./controllers/markdown.js";
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
app.use(sslRedirect());
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.post("/urlcheck", (req, res) => {
  handleurl(req, res, db);
});
app.post("/archetypes", (req, res) => {
  handlearchetypes(req, res, db);
});
app.post("/markdown", (req, res) => {
  handleMarkdown(req, res, db);
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 3002`);
});
