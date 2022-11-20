const User = require('../model/user')
const Donor = require('../model/donor')
const Request = require('../model/request')


exports.getDonors = async (req,res,next)=>{
    try{
        const donors = await Donor.find();
        console.log("donors",donors)
        return res.status(200).send({donors: donors})
    }
    catch(error){
        console.log(error)
    }
}

exports.postRequest =async (req,res,next)=>{
    const blood = req.body.blood;
    const address = req.body.address;
    const city = req.body.city;
    const message = req.body.message;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const requestCreator = req.params.id;
    try{
        const request = new Request({
            blood:blood,
            address: address,
            city: city,
            message: message,
            lat: lat,
            lng: lng,
            requestCreator: requestCreator
        })
        const response = await request.save()
        if(response){
            console.log(response)
        }
    }
    catch(error){
        console.log(error)
    }
}

exports.getRequests = async (req,res,next)=>{
    try{
        const requests = await Request.find();
        console.log('requests', requests)
        return res.status(200).send({data: requests})
    }
    catch(error){
        console.log(error)
    }
}