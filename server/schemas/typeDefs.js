const { gql } = require('apollo-server-express')

const typeDefs = gql
`
    type Book {
        bookId: String!
        authors: [String]
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
        savedBooks: [Book]
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
        title: String!
        link: String
    }

`

module.exports = typeDefs