const User = require("../models/User");
const jwt = require("jsonwebtoken");
const tokenLasts = "365d";


exports.login = function (req, res) {
    let user = new User(req.body);
    user
      .login()
      .then(function(result) {
        res.json({
          token: jwt.sign(
            {
              _id: user.data._id,
              username: user.data.username,
            },
            process.env.JWTSECRET,
            { expiresIn: tokenLasts }
          ),
          username: user.data.username,
        });
      })
      .catch(function (e) {
        res.json(e);
      });
  };

  