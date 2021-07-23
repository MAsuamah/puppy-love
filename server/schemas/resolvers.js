const { User, Pet, Dates, Image} = require('../models');
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
            .populate('savedBooks')
            return userData;
        } throw new AuthenticationError('Not logged in');
      },
      user: async(parent, args, context) => {},
      dogs: async(parent, args, context) => {},
      dog: async(parent, args, context) => {},
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
      updateUser: async(parent, args, context) => {},
      deleteUser: async(parent, args, context) => {},
      addDog: async(parent, args, context) => {},
      updateDog: async(parent, args, context) => {},
      deleteDog: async(parent, args, context) => {},
      addImage: async(parent, args, context) => {},
      updateImageCaption: async(parent, args, context) => {},
      deleteImage: async(parent, args, context) => {},
      addComment: async(parent, args, context) => {},
      deleteComment: async(parent, args, context) => {},
      addReply: async(parent, args, context) => {},
      deleteReply: async(parent, args, context) => {},
    }

  };
  
  module.exports = resolvers;