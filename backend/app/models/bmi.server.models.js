const db = require("../../database");

const addBmi = (bmi, user_id, done) => {
  let sql = "UPDATE users SET bmi = ? WHERE user_id = ?";

  db.run(sql, [bmi, user_id], function (err) {
    if (err) {
      return done(err);
    }
    return done(null, bmi);
  });
};

const getBmi = (user_id, done) => {
  let sql = "SELECT bmi FROM users WHERE user_id = ?";

  db.get(sql, [user_id], (err, row) => {
    if (err) {
      return done(err);
    }
    return done(null, row);
  });
};

module.exports = {
  addBmi,
  getBmi,
};
