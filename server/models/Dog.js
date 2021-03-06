const { Schema, model, Types } = require('mongoose');

const dogSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            unique: true },
        breed:{
            type: String
            },
        gender:{
            type: String
            },
        age:{
            type: Number
            },
        username:{
            type: String,
            required: true,
            ref: 'User'
            },
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

dogSchema.virtual('imageCount').get(function () {
    return this.images.length;
  });

const Dog = model('Dog', dogSchema);

module.exports = Dog;