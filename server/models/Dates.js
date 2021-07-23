  
const { Schema, model } = require('mongoose');
const userSchema = require('./User')

const dateSchema = new Schema();

const Date = model('Date', DateSchema);

module.exports = Date;