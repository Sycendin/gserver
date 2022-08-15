import handleurl from "./controllers/urlcheck.js";
import handlearchetypes from "./controllers/archetypes.js";
import handleMarkdown from "./controllers/markdown.js";
import herokuSSLRedirect from "heroku-ssl-redirect";
import express from "express";
import cors from "cors";
import knex from "knex";
import dotenv from "dotenv";
var whitelist = ["http://localhost:3000", "https://sycendin.github.io/"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
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

app.get("/urlcheck/:url", cors(corsOptions), (req, res) => {
  handleurl(req.params, res, db);
});
app.get("/archetypes", cors(corsOptions), (req, res) => {
  handlearchetypes(req, res, db);
});
app.get("/markdown/:mdname", cors(corsOptions), (req, res) => {
  handleMarkdown(req.params, res, db);
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 3002`);
});
