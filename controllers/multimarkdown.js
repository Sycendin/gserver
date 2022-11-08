const handleMultiMarkdown = (req, res, db) => {
  const { mdname } = req;
  // If no name in url params then return error
  if (!mdname) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("Requires data");
  }
  // Get markdown file name, then fetch it, read data then split text based on keyword and remove beginning/trailing  whitespace.
  const readData = async () => {
    const contents = await db
      .select("link")
      .from("markdown")
      .where("mdname", mdname);
    const convert = await JSON.parse(JSON.stringify(contents));
    if (convert.length >= 1) {
      const getFile = await fetch(convert[0].link);
      const text = await getFile.text();
      const splitText = text.split("breakline");
      const trimStart = [];
      splitText.forEach((element) => {
        trimStart.push(element.trimStart());
      });
      res.status(200).json(trimStart);
    } else {
      res.status(200).json(["Wrong Parameter(s)"]);
    }
  };
  try {
    readData();
  } catch (error) {
    res.status(400).json(error);
  }
};
// rebuild

export default handleMultiMarkdown;
