const handleurl = (req, res, db) => {
  const { url } = req.body;

  if (!url) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("incorrect form submission");
  }
  // Find if url exists and return response to app
  return db
    .select("url")
    .from("urlcheck")
    .where("url", req.body.url)
    .then((data) => {
      let results = JSON.parse(JSON.stringify(data));
      if (results.length === 0) {
        res.status(200).json("Does not exist");
      } else {
        res.status(200).json("Does exist");
      }
    });
};

export default handleurl;
