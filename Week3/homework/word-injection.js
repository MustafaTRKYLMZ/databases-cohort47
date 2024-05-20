function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

// exaample of exercise 3 sql injection

function getPopulation(Country, name, code, cb) {
  const query = `SELECT Population FROM ${Country} WHERE Name = ? AND code = ?`;
  const values = [name, code];

  conn.query(query, values, function (err, result) {
    if (err) return cb(err);
    if (result.length == 0) return cb(new Error("Not found"));
    cb(null, result[0].Population);
  });
}
