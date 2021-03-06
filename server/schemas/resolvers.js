const { User, Dog, Dates, Image, Comment} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;

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
        if(context.user) {
        const userData = await User.findOne({ username: args.username })
          .select('-__v -password')
          .populate('dogs').populate('friends');
          return userData;
        } throw new AuthenticationError('Not logged in');
      },
      /*"allUsers" is for testing purposes only */
      allUsers: async(parent, args, context) => {
        const userData = await User.find({})
           .select('-__v -password')
          .populate('dogs').populate('friends');
          return userData;
      },
      /*"allUsers" is for testing purposes only */
      allDogs: async(parent, args, context) => {
        const userData = await Dog.find({})
          .select('-__v')
          .populate('dogs')
          return userData;
      },
      //searches by dog id - for dog profile
      dog: async(parent, args, context) => {
        if(context.user) {
          const dogData = await Dog.findOne({_id: args._id}).populate('images')
          return dogData;
        } throw new AuthenticationError('Not logged in');
      },
      //searches by user id - for user dog list
      dogs: async(parent, args, context) => {
        if(context.user) {
          return await Dog.find({username: context.user.username}).populate('images');
        } throw new AuthenticationError('Not logged in');
      },
      //searches by image id - for comment page
      image: async(parent, args, context) => {
        if(context.user) {
        return await Image.findOne({_id: args._id}).populate('comments');
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

        const saltRounds = 10;
        const password = await bcrypt.hash(args.password, saltRounds);

        if(context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id}, 
          {
            email: args.email,
            password: password,
            city: args.city
          },
           { new: true }
        );
        
        const token = signToken(user);
        return { user, token };
        } throw new AuthenticationError('Not logged in');

      },
      deleteUser: async(parent, args, context) => {
          const user = await User.findOne({ _id: args._id });

          if(context.user) {
          const correctPw = await user.isCorrectPassword(args.password);
          if(!correctPw) {
            throw new AuthenticationError('Incorrect Password');
          }

          else{
          const userName = await User.findById({_id: args._id}).select('username');
          await Dog.deleteMany({username: userName.username});}

          await User.findOneAndDelete(
          { _id: args._id }
        );

         } throw new AuthenticationError('Not logged in');

         
      },
      addDog: async(parent, args, context) => {
        if(context.user) {
          const dog = await Dog.create({username: context.user.username,
            name: args.name,
            breed: args.breed,
            gender: args.gender,
            age: args.age
          });
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

              await Image.deleteMany(
                { dogId: args._id }
              );

              await Dog.findOneAndDelete(
                { _id: args._id }
              );
            }
            return updatedUser;
        } throw new AuthenticationError('Not logged in');
      },
      addImage: async(parent, args, context) => {
          if(context.user) {
            const image = await Image.create({link: args.link, name: args.name, dogId: args._id, caption: args.caption});

             await Dog.findOneAndUpdate({_id: args._id}, { $push: { images: image
            }}, {new: true}); 

            return image;

          } throw new AuthenticationError('Not logged in');
      },
      updateImageCaption: async(parent, args, context) => {
        if(context.user){
          return await Image.findOneAndUpdate(
            { _id: args._id}, {caption: args.caption}, { new: true }
          );
        } throw new AuthenticationError('Not logged in');
      },
      deleteImage: async(parent, args, context) => {
        if(context.user) {

        const updatedDog = await Dog.findOneAndUpdate(
          {_id: args.dogId},
          { $pull: {images: args._id}},
          {new: true}
        )
        if (!updatedDog) {
          throw new AuthenticactionError("Couldn't find this dog");
        }

        const imageLink = await Image.findOneAndDelete(
          {_id: args._id}
        ); 

        // cloudinary.config({ 
        //     cloud_name: 'web-dev-projs-jaim', 
        //     api_key: '328367657729691', 
        //     api_secret: '6vGJblMTMNME8wp7cL67WgY_pZQ',
        //     secure: true
        //   });
          
        //   cloudinary.uploader.destroy(`puppy-love/${(imageLink.link).split("/puppy-love/")[1].split(".jpg")[0]}`, function(error,result) {
        //     console.log(result, error) });
        
        return updatedDog;

        } throw new AuthenticationError('Not logged in');
      },
      addComment: async(parent, args, context) => {

        if(context.user) {
          const commented = await Comment.create({username: context.user.username,
          commentText: args.commentText});

          await Image.findByIdAndUpdate({_id: args._id}, { $push: { comments: commented}},{new: true});

          return commented;
        } throw new AuthenticationError('Not logged in');
      },
      deleteComment: async(parent, args, context) => {
        if(context.user) {
          
        const updatedImage = await Image.findOneAndUpdate(
          {_id: args.imageId},
          { $pull: {comments: args._id}},
          {new: true}
        )

        if (!updatedImage) {
          throw new AuthenticactionError("Couldn't find this dog");
        }
        await Comment.findByIdAndDelete({_id: args._id});

        return updatedImage;
      } throw new AuthenticationError('Not logged in');
      },
      addFriend: async(parent, {user1, user2}, context) => {
        if(context.user) {
          const updatedUser = await User.findOneAndUpdate(
            {_id: user1},
            { $push: {friends: user2}},
            { new: true}
          )
          if (!updatedUser){
            throw new AuthenticationError("Couldn't find this dog");
          }
          return updatedUser;
        } throw new AuthenticationError('Not logged in');
      },
      removeFriend: async(parent, {user1, user2}, context) => {
        if(context.user) {
          const updatedUser = await User.findOneAndUpdate(
            {_id: user1},
            { $pull: {friends: user2}},
            { new: true}
          )
          if (!updatedUser){
            throw new AuthenticationError("Couldn't find this dog");
          }
          return updatedUser;
        } throw new AuthenticationError('Not logged in');
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