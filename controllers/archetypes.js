const handlearchetypes = (req, res, db) => {
  // const { letter } = req.body;
  const { letter } = req;

  let totalContents = [];
  let alpha = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const allArchetypes = async () => {
    for (const arrayL of alpha) {
      let archetypes = [];
      const contents = await db
        .select("archetypename", "link", "url")
        .from("urlcheck")
        .where("letter", arrayL);
      const data = await JSON.parse(JSON.stringify(contents));
      data.forEach((element) => {
        let archetypeInfo = [];
        archetypeInfo.push(element.archetypename, element.link, element.url),
          archetypes.push(archetypeInfo);
      });
      totalContents.push({ letter: arrayL, archetype: archetypes });
    }
    res.status(200).json(totalContents);
  };
  allArchetypes();
};
export default handlearchetypes;
