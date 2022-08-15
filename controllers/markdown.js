const handleMarkdown = (req, res, db) => {
  const { mdname } = req;
  if (!mdname) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("Requires data");
  }
  // Find if url exists and return response to app
  return (
    db
      .select("link")
      .from("markdown")
      .where("mdname", mdname)
      .then((data) => JSON.parse(JSON.stringify(data)))
      .then((data) => fetch(data[0].link))
      // .then((data) => console.log(data))
      .then((data) => data.text())
      .then((convert) => res.status(200).json(convert))
  );
};

export default handleMarkdown;
