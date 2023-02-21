const { gql } = require('apollo-server-express')

const typedefs = gql
`
    type Book {
        bookId: String!
        authors: [string]
        description: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID!
        email: String!
        username: String!
        bookCount: Int
        savedBooks: [book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query  {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password:String!): Auth
        saveBook (input: BookInfo!): User
        removeBook(bookId: String!): User
    }

    input BookInfo{
        bookId: String!
        description: String!
        authors: [String]
        image: String
        title: String
        link: String
    }

`

module.exports = typeDefs