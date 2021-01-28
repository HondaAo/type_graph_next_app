import { gql } from 'apollo-server-express'

export const typeDefs = gql`
 type User {
     id: ID!
     name: String!
     email: String!
     type: String!
 }
 type HostInput {
    name: String!
    images: String[]!
    comment: String!
    price: Int!
    beds: Int!
    guests: Int!
    latitude: Float!
    longitude: Float!
    amenities: [String!]!
    reviews: Review[]
    country: String!
    city: String!
    address: String!
    tags: String[]
 }
 type Query {
     me: User
 }
 type Mutation {
    register(name: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    forgotPassword(email: String!): Boolean!
    changePassword(token: String!, password: String!): Boolean!
    createPost(input: HostInput): Boolean!
 }
`

export const confimationPrefix = "user-confimation"
export const forgotPasswordPrefix = "forgot-password"
