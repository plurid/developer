// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getBuilds: ResponseBuilds!
    }
`;


export const mutations = gql`
    extend type Mutation {
        handleBuild(input: InputValueString!): ResponseBuild!
    }
`;


export const types = gql`
    type ResponseBuild {
        status: Boolean!
        error: Error
        data: Build
    }

    type ResponseBuilds {
        status: Boolean!
        error: Error
        data: [Build!]
    }

    type Build {
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
