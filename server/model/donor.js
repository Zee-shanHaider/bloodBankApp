const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donorSchema = new Schema({
   userId:{
    type: Schema.Types.ObjectId,
     ref: 'User',
     required: true,
   },
   address:{
    type: String,
    required: true
   },
   age:{
    type: Number,
    required: true
   },
   blood:{
    type: String,
    required: true
   },
   gender:{
    type: String,
    required: true
   },
   city:{
    type: String,
    required: true
   }

})
module.exports = mongoose.model('Donor', donorSchema)