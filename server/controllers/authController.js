const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator/check')

exports.postSignup = async (req,res,next)=>{
    console.log(req.body)
    const errors = validationResult(req);
    console.log('validation errors',errors.array().length >0)
    if(errors.array().length > 0){
     return  res.status(400).send({msg:errors.array(), status:'danger',code:400})
    }
    try{
        const username = req.body.username;
        const phoneNo = req.body.phoneNo;
        const email = req.body.email;
        const password = req.body.password;
        // const imageUrl = req.file.filename;
        const imageUrl = req.body.imageUrl;
        const isDonor = req.body.isDonor;
        const hashedPassword =await bcrypt.hash(password, 12)
            const user = new User({
                username: username,
                phoneNo:phoneNo,
                email: email,
                password: hashedPassword,
                imageUrl: imageUrl,
                isDonor: isDonor
            })
            const createdUser = await user.save()
            console.log( createdUser)
            if(createdUser){
                return res.status(200).send({status: 'ok'})
            }
    }
    catch(error){
        console.log(error)
     return   res.status(400).send({msg:error.message})
    }
}

exports.postLogin =async (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user =await User.findOne({email: email});
    if(!user){
        const error = new Error('User does not exist');
        error.statusCode = 404;
        next(error)
    }
    let loadedUser = user;
    req.userId = loadedUser._id.toString()
    const doMatch = await bcrypt.compare(password, user.password)
        if(doMatch){
            console.log('User is logged in')
            const token = jwt.sign({
                email: loadedUser.email,
                userId:loadedUser._id.toString()
            },
            'thisIsTheSecretKeyPart',
            {
                expiresIn:'3600000'
            }
        )
            // req.session.token = token 
            // console.log(req.session)
            res.status(201).json({
                'result': 'User successfully loged in',
                token:token,
                user: loadedUser,
                userId: loadedUser._id.toString()
            })
    }
        else{
           const error = new Error('Password does not match');
           error.statusCode = 400;
           next(error); 
        }
}


// exports.logout = (req,res,next)=>{
//     req.session.destroy(err => {
//         if(err){
//             console.log(err);
//         } else {
//             res.send('Session is destroyed')
//         }
//     })
// }
