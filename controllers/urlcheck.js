const handleurl = (req, res, db) => {
  const { url } = req;
  console.log(url);
  const urlCombine = url.replace(" ", "%20");
  if (!url) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("Requires url");
  }

  // Find if url exists and return response to app
  return db
    .select("url", "archetypename")
    .from("urlcheck")
    .where("url", urlCombine)
    .then((data) => {
      // Convert db results from json to js
      let results = JSON.parse(JSON.stringify(data));
      if (results.length === 0) {
        res.status(200).json(["Does not exist"]);
      } else {
        res.status(200).json(["Does exist", results[0].archetypename]);
      }
    });
};

export default handleurl;
