 const Donor = require('../model/donor')
 const User = require('../model/user')
 
 exports.postDonor =async (req,res,next)=>{
    const userId = req.params.id;
    try{
        console.log('userId', req.userId)
        const donor = new Donor({
            userId: userId,
            address: req.body.address,
            age: req.body.age,
            blood: req.body.blood,
            gender: req.body.gender,
            city: req.body.city,
        })
        const response = await donor.save()
        if(response){
            const user = await User.findByIdAndUpdate(userId, {isDonor:true})
            const userResponse = await user.save()
            console.log( 'userSetDonor' ,userResponse)
        }
        console.log(response)

    }
    catch(err){
        console.log(err)
        res.status(401).send({message: 'Cannot post donor'})
    }

 }
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