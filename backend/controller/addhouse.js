const House = require('../models/house_schema');
const fileuploader = require('express-fileupload');
//module adds the houses in the db
exports.addHouse = async function (req, res, data, mimetype){
    let House_model = new House({
        house: req.body,
        image : {
            data : data,
            ContentType: mimetype
        }
    })

    await House_model.save()
    .then(()=>{
        console.log('house successfully saved')
        res.status(200).send('house stored')
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send('server internal error. could not create the house')
    })
}