
const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const imageSchema = new Schema(
    {
        name:{
            type: String,
            required: true,},
        caption:{
            type: String,
        },
        link:{
            type: String,
            required: true,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        dogId:{
            type: Schema.Types.ObjectId,
            ref: 'Dog'},
        comments:[{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    },
// set this to use virtual below
{
  toJSON: { 
    virtuals: true,
  },
}
);

imageSchema.virtual('commentCount').get(function () {
    return this.comments.length;
  });

const Image = model('Image', imageSchema);

module.exports = Image;