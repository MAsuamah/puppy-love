const { User, Dog, Dates, Image, Comment} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      helloWorld: () => {
        return 'Hello world!';
      },
      me: async(parent, args, context) => {
        if(context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('dogs')
            return userData;
        } throw new AuthenticationError('Not logged in');
      },
      user: async(parent, {params, args}, context) => {
          const userData = await User.findOne({ _id: params.userId })
            .select('-__v -password')
            .populate('dogs')
            return userData;
      },
      dogs: async(parent, args, context) => {
        if(context.user) {
          return await Dog.find({owner: context.user._id}).populate('images').populate('friends');
        } throw new AuthenticationError('Not logged in');
      },
      dog: async(parent, {params, args}, context) => {
        if(context.user) {
          const dogData = await Dog.findOne({_id: params.dogId}).populate('images').populate('friends');
          return dogData;
        } throw new AuthenticationError('Not logged in');
      },
      images: async(parent, {params, args}, context) => {
        return await Image.find({});
      }
    },
    Mutation: {
      login: async(parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('No account found with this email');
        }
        const correctPw = await user.isCorrectPassword(password);
        if(!correctPw) {
          throw new AuthenticatioError('Incorrect Password');
        }
        const token = signToken(user);
        return { token, user };
      },
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        return { user, token };
      },
      updateUser: async(parent, args, context) => {
        return await User.findOneAndUpdate(
          { _id: context.user.id}, args, { new: true }
        );
      },
      deleteUser: async(parent, args, context) => {
        return await User.findOneAndDelete(
          { _id:context.user.id}, args, { new: true }
        );
      },
      // deleteUser: async(parent, args, context) => {
      //   const user = await User.findOneAndDelete(
      //     { _id:context.user.id}, args, { new: true }
      //   );
      //   return user;
      // },

      addDog: async(parent, args, context) => {
        if(context.user) {
          const dog = new Dog({args});
          await User.findOneAndUpdate({_id: context.user._id}, { $push: { dogs: dog}}, {new: true});
          return dog;
        } throw new AuthenticationError('Not logged in');
      },
      updateDog: async(parent, {params, args}, context) => {
        if(context.user) {
          const dog = await Dog.findOneAndUpdate(
            { _id: params.dogId}, args, { new: true }
          );
          return dog;
        } throw new AuthenticationError('Not logged in');
      },
      // updateDog: async(parent, {params, args}, context) => {
      //   if(context.user) {
      //     return await Dog.findOneAndUpdate(
      //       { _id: params.dogId}, args, { new: true }
      //     );
      //   } throw new AuthenticationError('Not logged in');
      // },
      deleteDog: async(parent, {params, args}, context) => {
        // if(context.user) {
        //   const dog = await Dog.findOneAndDelete(
        //     { _id: params.dogId }, args, { new: true }
        //   );
        //   return dog;
        // } throw new AuthenticationError('Not logged in');
        const updatedUser = await User.findOneAndUpdate(
          {_id: context.user._id},
          { $pull: {pets: params.petId}},
          {new: true}
        )
        if (!updatedUser) {
          throw new AuthenticactionError("Couldn't find this dog");
        }
        return updatedUser;
      },
      addImage: async(parent, { params, args }, context) => {
        if(context.user) {
          const image = Image({args});
          await Dog.findOneAndUpdate({_id: params.dogId}, { $push: { images: image}},{new: true});
          // or
          // await Dog.findByIdAndUpdate(params.dogId, { $push: { images: image}},{new: true});
          return image;
        } throw new AuthenticationError('Not logged in');
      },
      updateImageCaption: async(parent, {params, args}, context) => {
        if(context.user) {
          return await Image.findOneAndUpdate(
            { _id: params.imageId}, args, { new: true }
          );
        } throw new AuthenticationError('Not logged in');
      },
      // updateImageCaption: async(parent, {params, args}, context) => {
      //   const image = await Image.findOneAndUpdate(
      //     { _id: params.imageId}, args, { new: true }
      //   );
      //   const token = signToken(image);
      //   return { image, token };
      // },
      deleteImage: async(parent, {params, args}, context) => {
        // if(context.user) {
        //   return await Image.findOneAndDelete(
        //     {_id: params.imageId}, args, { new: true }
        //   );
        // } throw new AuthenticationError('Not logged in');
        const updatedDog = await Dog.findOneAndUpdate(
          {_id: params.dogId},
          { $pull: {images: params.imageId}},
          {new: true}
        )
        if (!updatedDog) {
          throw new AuthenticactionError("Couldn't find this dog");
        }
        return updatedDog;
      },


      addComment: async(parent, { params, args }, context) => {
        if(context.user) {
          const comment = Comment({args});
          await Image.findByIdAndUpdate({_id: params.imageId}, { $push: { comments: comment}},{new: true});
          return comment;
        } throw new AuthenticationError('Not logged in');
      },
      deleteComment: async(parent, {params, args}, context) => {
        const updatedImage = await Image.findOneAndUpdate(
          {_id: params.imageId},
          { $pull: {comments: params.commentId}},
          {new: true}
        )
        if (!updatedImage) {
          throw new AuthenticactionError("Couldn't find this dog");
        }
        return updatedImage;
      },

      /* addReply: async(parent, args, context) => {
        if(context.user) {
          const comment = Comment({args});
          await Comment.findByIdAndUpdate({_id: params._id}, { $push: { replies: comment}},{new: true});
          return comment;
        } throw new AuthenticationError('Not logged in');
      },
      deleteReply: async(parent, args, context) => {
        if(context.user) {
          return  await Comment.findOneAndDelete(
            {_id: params._id}, args, { new: true }
          );
        } throw new AuthenticationError('Not logged in');
      },*/ //replies are now comments and will be deleted by the comment id
    }
  };
  
  module.exports = resolvers;