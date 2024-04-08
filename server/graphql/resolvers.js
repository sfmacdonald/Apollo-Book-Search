const { User } = require('../models');
const { signToken } = require('../utils/auth');
const axios = require('axios');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findById(context.user._id).populate('savedBooks');
      }
      throw new Error('You are not authenticated!');
    },
    searchBooks: async (_, { query }) => {
      // Implement book search logic here using Google Books API
      try {
        // Make a GET request to the Google Books API
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: {
            q: query, // Pass the search query
          },
        });

        // Extract relevant data from the response
        const books = response.data.items.map(item => ({
          _id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
          description: item.volumeInfo.description || 'No description available',
          image: item.volumeInfo.imageLinks?.thumbnail || '', // Check if imageLinks is available
          link: item.volumeInfo.previewLink,
        }));

        return books;
      } catch (error) {
        console.error('Error searching books:', error);
        throw new Error('Failed to search books. Please try again later.');
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found!');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Invalid password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    signup: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Could not create user!');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { book }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedBooks: book } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new Error('You are not authenticated!');
    },
    removeBook: async (_, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { _id: bookId } } },
          { new: true }
        ).populate('savedBooks');
        return updatedUser;
      }
      throw new Error('You are not authenticated!');
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Could not create user!');
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
