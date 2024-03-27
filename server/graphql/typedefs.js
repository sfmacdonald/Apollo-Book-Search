const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]!
  }

  type Book {
    _id: ID!
    title: String!
    author: [String]!
    description: String!
    image: String!
    link: String!
  }

  input BookInput {
    title: String!
    authors: [String]!
    description: String!
    image: String!
    link: String!
    bookId: String!
  }

  type Query {
    me: User!
    searchBooks(query: String!): [Book]!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    signup(username: String!, email: String!, password: String!): AuthPayload!
    saveBook(book: BookInput!): User!
    removeBook(bookId: ID!): User!
    addUser(username: String!, email: String!, password: String!): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;