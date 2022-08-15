const handledata = (req, res, db) => {
  console.log(req);
  const { data } = req;
  console.log(data1, data2, data3);
  if (!data) {
    // return Promise.reject("Incorrect url check");
    return res.status(400).json("Requires url");
  }

  // Find if url exists and return response to app
  return fetch(data)
    .then((data) => data.text())
    .then((convert) => res.status(200).json(convert));
  res.send(200, "okay");
};

export default handledata;
