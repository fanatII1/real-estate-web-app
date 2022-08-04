const Admin = require("../models/admin_schema");
const User = require("../models/user_schema");
const jwt = require("jsonwebtoken");

//in this module, we check if an admin exists in the 'admin collection'
//find by username and password(criteria)
//if admin exists, send a token
//if admin is not found, an empty array will be returned
//the error is there to specify that we could not use the 'find' method...an error occure in using the find method
//make the function return a promise that the person was found

//we check if there is an admin
//if user is an admin, we check the admin collection
//and if they are admin, we generate an admin token
//but if the user is not an admin, then we check if they exist in the User collection
//and if they do, we send a user token. if not, then we send 403 error that the user is not authorised to access the resouces
exports.findAdmin = async function (req, res) {
  Admin.find({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      //if this is NOT undefined, then person is admin
      if (typeof data[0] !== "undefined") {
        let payload = {
          role: "admin",
          username: req.body.username,
          password: req.body.password,
        };

        const admin_token = jwt.sign(payload, "jwt-secret", {
          algorithm: "HS256",
        });
        res.send({
          adminToken: admin_token,
        });
      } else {
        User.find({
          username: req.body.username,
          password: req.body.password,
        })
          .then((data) => {
            if (typeof data[0] !== "undefined") {
              console.log(data);
              let payload = {
                role: "user",
                username: req.body.username,
                password: req.body.password,
              };

              const user_token = jwt.sign(payload, "jwt-secret", {
                algorithm: "HS256",
              });
              console.log(user_token);
              res.send({
                userToken: user_token,
              });
            } else {
                res.status(403).send('not registered')
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
