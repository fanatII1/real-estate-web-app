const House = require('../models/house_schema');

//in this module, we delete a house meeting a certain criteria(house infromation) in the db
exports.deleteHouse = async function(req, res){
    await House.remove({
        house : req.body
    }).then(()=>{
        res.status(200).send('house successfully deleted')
    }).catch((error)=>{
        res.status(500).send('failure in attempt to delete a specific house')
    })
}