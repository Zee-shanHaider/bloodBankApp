const express = require('express');

const router = express.Router();

const donorController = require('../controllers/donorController')

const isAuth = require('../middlewares/isAuth')


router.post('/api/postDonor/:id', donorController.postDonor)

router.get('/api/donors', donorController.getDonors)

 module.exports = router