import { gql } from 'apollo-server-express'

export const typeDefs = gql`
 type User {
     id: ID!
     name: String!
     email: String!
     type: String!
 }
 input Review {
     id: Int!,
     user_id: Int!,
     name: String!,
     text: String!,
     star: Int!
 }
 type ListingAccommdation {
    id: ID!,
    name: String!
    images: [String!]!
    comment: String!
    price: Int!
    beds: Int!
    postalcode: String!
    amenities: [String!]!
    country: String!
    city: String!
    address: String!
    tags: [String!]!
    user_id: Int!
 }
 input HostInput {
    name: String!
    files: [String!]
    comment: String!
    price: Int!
    beds: String!
    postalcode: String!
    amenities: [String!]!
    reviews: [Review]
    country: String!
    city: String!
    address: String!
    tags: [String!]!
 }
 type Query {
     me: User,
     listingPost(id: Int!): ListingAccommdation,
     userToPost(user_id: Int!): ListingAccommdation,
     searchPost(input: String!): [ListingAccommdation] 
 }
 type Mutation {
    register(name: String!, email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    forgotPassword(email: String!): Boolean!
    changePassword(token: String!, password: String!): Boolean!
    createPost(input: HostInput!): String!
    deletePost(id: Int!): String!
    updatePost(input: HostInput): String!
 }
`

export const confimationPrefix = "user-confimation"
export const forgotPasswordPrefix = "forgot-password"
