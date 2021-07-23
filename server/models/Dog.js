const { Schema, model } = require('mongoose');
const imageSchema = require('./Image');
const { Comment } = require('./index.js');

const dogSchema = new Schema();

const Dog = model('Dog', dogSchema);

module.exports = Dog;