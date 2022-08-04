const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fileuploader = require('express-fileupload');
const sign_in = require('./controller/sign-in-user'); 
const log_in = require('./controller/admin');
const storeHouse = require('./controller/addhouse');
const findHouse = require('./controller/gethouse');
const deleteHouse = require('./controller/deleteHouse')
const path = require('path')
app.use(express.static(path.join(__dirname + '/public')))
//server usage of cors,body-parser and file-uploader middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileuploader());
const PORT = process.env.PORT || 3001;

let uri = "mongodb+srv://George:GeorgeMongo7@real-estat-cluster.4jdkuna.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
.then(()=>{
    console.log('connected')
}).catch(()=>{
    console.log('not connected')
})

//when receive a post req, create user in db(wait)
//when user is created, we want to generate a 'user' token
app.post('/', (req, res)=>{
    console.log(req.body)
    sign_in.register(req, res)
})

//when recieve post req, we want to authenticate(see if user exists) user in db
//wait till the person is found
//if person is found in the admin collection,. we send an admin token
//else if the person is not found in admin collection, we check if they exist in user collection
app.post('/Login', async (req, res)=>{
    await log_in.findAdmin(req, res);
})


//req to store 'house information' in the database
//first verify the token
//token verification will lead to store the house in the db
//we want when receive a req, to store the file we uploaded in the db
//first we set the image in our schema
//then we make sure that the we can extract the file uploaded to the server using req.files.files.
app.post('/Dashboard', async (req, res)=>{
    console.log(req.body, req.files)
    let adminToken = req.headers['authorization'].split(' ')[1];
    try {
        const decodedToken = jwt.verify(adminToken, 'jwt-secret');
        if(decodedToken){
            let data = req.files.file.data;
            let mimetype = req.files.file.mimetype;
            await storeHouse.addHouse(req, res, data, mimetype)
        }
    } catch (error) {
        res.status(401).send('user unknown: not authorised to access resources')
    }
})

//req to send the house info from the backend to the frontend(for user to view)
//also send the res type(content-type) so that the browser can allow view the file
app.get('/ViewProperties', async (req, res)=>{
    await findHouse.getHouse(req, res);

})

//delete specific house info on request
app.delete('/Dashboard', (req, res)=>{
    console.log(req.body)
    deleteHouse.deleteHouse(req, res)
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})