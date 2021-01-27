import { gql } from 'apollo-server-express'

export const typeDefs = gql`
 type User {
     id: ID!
     name: String!
     email: String!
     type: String!
 }
 type Query {
     me: User
 }
 type Mutation {
    register(name: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    forgotPassword(email: String!): Boolean!
    changePassword(token: String!, password: String!): Boolean!
 }
`

export const confimationPrefix = "user-confimation"
export const forgotPasswordPrefix = "forgot-password"