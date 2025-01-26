const bmiModels = require("../models/bmi.server.models");
const users = require("../models/user.server.models");
const Joi = require("joi");

const add_bmi = (req, res) => {
  let token = req.get("X-Authorization");

  users.getIdFromToken(token, (err, user_id) => {
    if (err) {
      return res.status(401).json({ error_message: err });
    }

    const schema = Joi.object({
      bmi: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ error_message: error.details[0].message });

    let bmi = Object.assign({}, req.body);

    bmiModels.addBmi(bmi.bmi, user_id, (err, id) => {
      if (err) {
        return res.status(500).json({ error_message: err });
      }
      return res.status(200).json({ bmi: id });
    });
  });
};

const get_bmi = (req, res) => {
  let token = req.get("X-Authorization");

  users.getIdFromToken(token, (err, user_id) => {
    if (err) {
      return res.status(401).json({ error_message: err });
    }

    bmiModels.getBmi(user_id, (err, row) => {
      if (err) {
        return res.status(500).json({ error_message: err });
      }
      return res.status(200).json({ bmi: row.bmi });
    });
  });
};

module.exports = {
  add_bmi,
  get_bmi,
};
