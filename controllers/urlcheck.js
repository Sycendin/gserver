const handleurl = (req, res, db) => {
  const { url } = req.body;

  let knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "gameuser",
      password: "Brandon1",
      database: "game",
    },
  });
  if (!url) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("incorrect form submission");
  }
  return knex
    .select("url")
    .from("urlcheck")
    .where("url", req.body.url)
    .then((data) => {
      results = JSON.parse(JSON.stringify(data));
      if (results.length === 0) {
        res.status(200).json("Does not exist");
      } else {
        res.status(200).json("Does exist");
        // res.status(200).json(data)});
      }
    });

  // return db.select("url").from("urlcheck").where("url", "=", req.body.url);
  // console.log("1");
  // return db.from("urlcheck").select("url");

  // .then((data)=>{

  // })
};

module.exports = {
  handleurl: handleurl,
};
