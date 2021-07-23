const { Schema, model } = require('mongoose');
const { User } = require('./index.js');
const { Comment } = require('./index.js');

const imageSchema = new Schema();

const Image = model('Image', imageSchema);

module.exports = Image;