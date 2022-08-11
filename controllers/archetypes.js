const handlearchetypes = (req, res, db) => {
  const { letter } = req.body;
  try {
    return db
      .select("archetypename", "link", "url")
      .from("urlcheck")
      .where("letter", letter)
      .then((data) => {
        // Convert db results from json to js
        let results = JSON.parse(JSON.stringify(data));
        res.status(200).json(results);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
export default handlearchetypes;
