const handlecombined = (req, res, db) => {
  const { url } = req;
  let x = [];
  if (!url) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("Requires data");
  }

  // Find if url exists and return response to app
  return db
    .select("archetype")
    .from("extranames")
    .where("url", url.replace(" ", "%20"))
    .then((data) => JSON.parse(JSON.stringify(data)))
    .then((data) => {
      data.forEach((element, i) => {
        x.push(element.archetype);
      });
      return x;
    })
    .then((convert) => res.status(200).json(convert));
};

export default handlecombined;
