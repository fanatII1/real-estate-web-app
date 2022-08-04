const jwt = require('jsonwebtoken');
const User = require('../models/user_schema');

//module registers user on the db
exports.register = function (req, res){
    let userModel = new User({
        role: "user",
        username: req.body.username,
        password: req.body.password,
    })
    
    //if user is created, we generate a token and send it back to the user
    //else generate an error
    userModel.save((err, data)=>{
        if(err){
            res.status(500).send('could not register user')
        }
        else{
            let payload = {
                role: 'user',
                username: req.body.username,
                password: req.body.password
            }

            const user_token = jwt.sign(payload, 'jwt-secret', {"algorithm": "HS256"});
            res.send({'userToken': user_token})
            // console.log(user_token)
        }

    })
}