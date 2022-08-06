const handlearchetypes = (req, res, db) => {
  return db
    .select("name")
    .from("urlcheck")
    .orderby("name", "desc")
    .then((data) => {
      // Convert db results from json to js
      let results = JSON.parse(JSON.stringify(data));
      res.status(200).json(results);
    });
};
export default handlearchetypes;
