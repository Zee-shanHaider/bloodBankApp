const express = require('express');

const router = express.Router();
const isAuth = require('../middlewares/isAuth')
const {check} = require('express-validator/check')

const authController = require('../controllers/authController');
const User = require('../model/user');

router.post('/api/signup',  [
    check('email', 'Please Enter the Valid Email')
    .isEmail()
    .normalizeEmail()
    .trim()
    .custom((value, {req})=>{
        return User.findOne({email: value})
        .then(userDoc=>{
        if(userDoc){
            return Promise.reject('E-Mail Address is already been taken. Try Another One!')
            
        } 
    })
}),
    check('password', 'Please enter a valid Password with only numbers, text and at least 4 characters')
    .trim()
    .isLength({min: 8})
    .not()
    .isEmpty()
    
] ,authController.postSignup);

router.post('/api/postLogin', authController.postLogin)



router.get('/api',async (req,res)=>{
    const token = req.get('Authorization');
    try{
        const decodedToken =await jwt.verify(token, 'thisIsTheSecretKeyPart')
        if(decodedToken)
        return res.status(200).send("success")
    }
    catch(error){
        res.status('401').send({message: 'Unauthorized request'})
    }
})

router.post('/api/login', authController.postLogin)

// router.post('/api/logout', authController.logout)

module.exports = router;