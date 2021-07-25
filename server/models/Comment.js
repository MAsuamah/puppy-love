const { Schema, model, Types } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

/* const replySchema = new Schema({
    replyId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody:{
        type: String,
        required: true,
        validator: (checkReply) => { return (checkReply.length < 280)},
        message: props => `Your replies need to be between 1 to 280 characters.`
    },
    username: {
        type: String,
        required: true,
        ref: 'User' },
    createdAt:{
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
        }
}); */ //will delete this commented code if no longer required.

const commentSchema = new Schema(
    {
        commentText:{
            type: String,
            required: true,
            validator: (checkComment) => { return (checkComment.length < 280)},
            message: props => `Your comments need to be between 1 to 280 characters.`
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
            ref: 'User' },
        replies:[{
                type: Schema.Types.ObjectId,
                ref: 'Comment' 
        }],
    },
// set this to use virtual below
{
  toJSON: { 
    virtuals: true,
    getters: true
  },
}
);

commentSchema.virtual('repliesCount').get(function () {
    return this.replies.length;
  });

const Comment = model('Comment', commentSchema);

module.exports = Comment;