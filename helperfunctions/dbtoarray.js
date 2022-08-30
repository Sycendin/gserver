export const dbtoarray = (data, archetypes) => {
  // Loop over each array of objects
  data.forEach((element) => {
    let archetypeInfo = [];
    // Push relevant infor needed into temporary array
    archetypeInfo.push(element.archetypename, element.link, element.url),
      // Add that array into letter array
      archetypes.push(archetypeInfo);
  });
};
