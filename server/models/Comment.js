const { Schema, model } = require('mongoose');

const commentSchema = new Schema();

const Comment = model('Dog', commentSchema);

module.exports = Comment;