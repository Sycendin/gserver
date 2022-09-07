const handleMultiMarkdown = (req, res, db) => {
  const { mdname } = req;
  if (!mdname) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("Requires data");
  }
  const readData = async () => {
    const contents = await db
      .select("link")
      .from("markdown")
      .where("mdname", mdname);
    const convert = await JSON.parse(JSON.stringify(contents));
    const getFile = await fetch(convert[0].link);
    const text = await getFile.text();
    const split = text.split("guess");
    const split2 = [];
    split.forEach((element) => {
      split2.push(element.trim());
    });
    res.status(200).json(split2);
  };
  readData();
};

export default handleMultiMarkdown;
