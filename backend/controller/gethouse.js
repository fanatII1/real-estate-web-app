const House = require('../models/house_schema');

//module fetches ALL the houses from the database and sends back to the user
//we set the content-type header to be that of the image so that the browser can view the image data that it recieves
exports.getHouse = async function(req, res){
    await House.find()
    .then((data)=>{
        //   console.log(data[0].image.ContentType)
        //   data.forEach((v,i,a)=>[
        //     console.log(v.image.ContentType)
        //   ])
        // //  res.type("Content-Type", data[13].image.ContentType)
         res.status(200).send(data)
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).send('server internal error: no houses found')
    })
}