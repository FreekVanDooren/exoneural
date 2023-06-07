import {gql} from "graphql-tag";

export const typeDefs = gql`
    type Manufacturer {
        id: ID!
        name: String!
    }
    type Phone {
        id: ID!
        name: String!
        manufacturer: Manufacturer!
    }
    type Query {
        phone(id: ID!): Phone
        manufacturers: [Manufacturer]
        phones: [Phone]
    }

    type MutationError {
        message: String!
    }

    input AddManufacturerInput {
        name: String!
    }
    union AddManufacturerResult = Manufacturer | MutationError

    input AddPhoneInput {
        name: String!
        manufacturer: ID! # Choosing ID so it's clear that manufacturer needs to exist
    }
    union AddPhoneResult = Phone | MutationError

    input UpdatePhoneInput {
        name: String!
        phone: ID!
    }
    union UpdatePhoneResult = Phone | MutationError

    type Mutation {
        addManufacturer(input: AddManufacturerInput!): AddManufacturerResult!
        addPhone(input: AddPhoneInput!): AddPhoneResult!
        updatePhone(input: UpdatePhoneInput!): UpdatePhoneResult!
    }
`
