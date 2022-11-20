const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
   blood:{
    type: String,
    required: true,
   },
   address:{
    type: String,
    required: true,
   },
   city:{
    type: String,
    required: true
   },
   message:{
    type: String,
    required: false
   },
   lat:{
    type: Number,
    required: true
   },
   lng:{
    type: Number,
    required: true
   },
   requestCreator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true,
   },
},{
   timestamps: true
})
module.exports = mongoose.model('Request', requestSchema)