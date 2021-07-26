const { User, Dog, Dates, Image, Comment} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      /*"helloWorld" is for testing purposes only */
      helloWorld: () => {
        return 'Hello world!';
      },
      //for user update page
      me: async(parent, args, context) => {
        if(context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('dogs')
            return userData;
        } throw new AuthenticationError('Not logged in');
      },
      /*"user" is for testing purposes only */
      user: async(parent, args, context) => {
        const userData = await User.findOne({ username: args.username })
          .select('-__v -password')
          .populate('dogs')
          return userData;
      },
      /*"allUsers" is for testing purposes only */
      allUsers: async(parent, args, context) => {
        const userData = await User.find({})
          .select('-__v -password')
          .populate('dogs')
          return userData;
      },
      //searches by dog id - for dog profile
      dog: async(parent, args, context) => {
        if(context.user) {
          const dogData = await Dog.findOne({_id: args._id}).populate('images').populate('friends');
          return dogData;
        } throw new AuthenticationError('Not logged in');
      },
      //searches by user id - for user dog list
      dogs: async(parent, args, context) => {
        if(context.user) {
          return await Dog.find({username: context.user._id}).populate('images').populate('friends');
        } throw new AuthenticationError('Not logged in');
      },
      //searches by image id - for comment page
      image: async(parent, args, context) => {
        if(context.user) {
        return await Image.findOne({_id: args._id});
      } throw new AuthenticationError('Not logged in');
      },
      //finds all dog images by dog id - for dog profile
      images: async(parent, args, context) => {
        if(context.user) {
        return await Dog.find({_id: args._id}).populate('images');
      } throw new AuthenticationError('Not logged in');
      },
      //queries all images - for landing page
      allImages: async(parent, args, context) => {
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
          throw new AuthenticationError('Incorrect Password');
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
        if(context.user) {
        return await User.findOneAndUpdate(
          { _id: args._id}, 
          {
            username: args.username,
            email: args.email,
            password: args.password,
            city: args.city
          },
           { new: true }
        );
        } throw new AuthenticationError('Not logged in');
      },
      deleteUser: async(parent, args, context) => {
         if(context.user) {
          const correctPw = await context.user.isCorrectPassword(args.password);
          if(!correctPw) {
            throw new AuthenticationError('Incorrect Password');
          }
        return await User.findOneAndDelete(
          { _id: args._id }
        );
         } throw new AuthenticationError('Not logged in');
      },
      // deleteUser: async(parent, args, context) => {
      //   const user = await User.findOneAndDelete(
      //     { _id:context.user.id}, args, { new: true }
      //   );
      //   return user;
      // },
      addDog: async(parent, args, context) => {
        console.log(context);
        if(context.user) {
          const dog = await Dog.create({username: context.user.username,...args});
          await User.findOneAndUpdate({_id: context.user._id}, { $push: { dogs: dog}}, {new: true});
          return dog;
        } throw new AuthenticationError('Not logged in');
      },
      updateDog: async(parent, args, context) => {
        if(context.user) {
          const dog = await Dog.findOneAndUpdate(
            { _id: args._id}, 
            {
              name: args.name,
              breed: args.breed,
              gender: args.gender,
              age: args.age
            },
            { new: true }
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
      deleteDog: async(parent, args, context) => {
        if(context.user) {
            const updatedUser = await User.findOneAndUpdate(
              {_id: context.user._id},
              { $pull: {dogs: args._id}},
              {new: true}
            )
            if (!updatedUser) {
              throw new AuthenticationError("Couldn't find this dog");
            }
            else {
              await Dog.findOneAndDelete(
                { _id: args._id }
              );
            }
            return updatedUser;
        } throw new AuthenticationError('Not logged in');
      },
      addImage: async(parent, { params, args }, context) => {
          if(context.user) {
            const image = await image.create({...args});
            await Dog.findOneAndUpdate({_id: params.dogId}, { $push: { images: image}}, {new: true});
            return image;
          } throw new AuthenticationError('Not logged in');
      },
      updateImageCaption: async(parent, {params, args}, context) => {
          return await Image.findOneAndUpdate(
            { _id: params.imageId}, 
            {caption: args.caption}, 
            { new: true }
          );
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