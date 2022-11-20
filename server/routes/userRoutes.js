const express = require('express')

const router = express.Router();

const userController = require('../controllers/userController')

router.put('/api/setDonor/:id',userController.setDonor)

router.post('/api/postRequest/:id', userController.postRequest)

router.get('/api/getRequests', userController.getRequests)

module.exports =router