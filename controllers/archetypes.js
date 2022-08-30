import { alpha } from "../archetypeAlphabet/alphabet.js";
import { dbtoarray } from "../helperfunctions/dbtoarray.js";
const handlearchetypes = (req, res, db) => {
  // const { letter } = req.body;
  const { letterparam } = req;
  // Convert param to uppercase
  const letter = letterparam.toUpperCase();
  let totalContents = [];
  const allArchetypes = async () => {
    // Return all archetypes if params is 'all'
    if (letter === "ALL") {
      // Loop over for all 26 letters of alphabet
      for (const arrayL of alpha) {
        let archetypes = [];
        // Make request to db for current letter to get all archetypes of that letter
        const contents = await db
          .select("archetypename", "link", "url")
          .from("urlcheck")
          .where("letter", arrayL);
        const data = await JSON.parse(JSON.stringify(contents));
        // Convert result from db into array format needed for
        // archetypes
        dbtoarray(data, archetypes);
        // Push results above into object that contains its letter then add to final array
        totalContents.push({ letter: arrayL, archetype: archetypes });
      }
      res.status(200).json(totalContents);
    } else if (alpha.includes(letter)) {
      // Return only archetypes that match letter in params
      const contents = await db
        .select("archetypename", "link", "url")
        .from("urlcheck")
        .where("letter", letter);
      res.status(200).json(contents);
    } else {
      // Otherwise retrn error message
      res.status(400).json("Bad request params");
    }
  };
  allArchetypes();
};
export default handlearchetypes;
