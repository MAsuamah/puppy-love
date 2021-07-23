const { Schema, model, Types } = require('mongoose');

const dogSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true },
        breed:{
            type: String,
            required: true,
            },
        gender:{
            type: String,
            required: true,
            },
        age:{
            type: Number,
            required: true,
            },
        username:{
            type: String,
            required: true,
            ref: 'User'
            },
        friends:[{
            type: Schema.Types.ObjectId,
            ref: 'User' 
        }],
        images:[{
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }],
    },
// set this to use virtual below
{
  toJSON: { 
    virtuals: true,
  },
}
);

dogSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

dogSchema.virtual('imageCount').get(function () {
    return this.images.length;
  });

const Dog = model('Dog', dogSchema);

module.exports = Dog;