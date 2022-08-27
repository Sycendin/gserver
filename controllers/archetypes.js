const handlearchetypes = (req, res, db) => {
  // const { letter } = req.body;
  const { letter } = req;

  let y = [];
  //  let alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  let alpha = ["A", "B"];
  async function printFiles() {
    for (const l of alpha) {
      let x = [];
      const contents = await db
        .select("archetypename", "link", "url")
        .from("urlcheck")
        .where("letter", l);
      const data = await JSON.parse(JSON.stringify(contents));
      data.forEach((element, i) => {
        let a = [];
        a.push(element.archetypename, element.link, element.url), x.push(a);
      });
      y.push({ letter: l, archetype: x });
    }
    res.status(200).json(y);
  }
  printFiles();
  // return db
  //   .select("archetypename", "link", "url")
  //   .from("urlcheck")
  //   .where("letter", letter)
  //   .then((data) => JSON.parse(JSON.stringify(data)))
  //   .then((data) => {
  //     data.forEach((element, i) => {
  //       let a = [];
  //       a.push(element.archetypename, element.link, element.url), x.push(a);
  //     });
  //     y.push({ letter: letter, archetype: x });
  //   })
  //   .then((convert) => res.status(200).json(y));
};
export default handlearchetypes;
