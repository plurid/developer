// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getDevelops: ResponseDevelops!
    }
`;


export const mutations = gql`
    extend type Mutation {
        handleDevelop(input: InputValueString!): ResponseDevelop!
    }
`;


export const types = gql`
    type ResponseDevelop {
        status: Boolean!
        error: Error
        data: Develop
    }

    type ResponseDevelops {
        status: Boolean!
        error: Error
        data: [Develop!]
    }

    type Develop {
        id: String!
        name: String!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
`;
// #endregion exports
