const handleMarkdown = (req, res, db) => {
  const { mdname } = req.body;
  if (!mdname) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("Requires data");
  }
  // Find if url exists and return response to app
  return db
    .select("link")
    .from("markdown")
    .where("mdname", req.body.mdname)
    .then((data) => {
      // Convert db results from json to js
      let results = JSON.parse(JSON.stringify(data));
      if (results.length === 0) {
        res.status(200).json("Not found");
      } else {
        res.status(200).json(data);
      }
    });
};

export default handleMarkdown;
