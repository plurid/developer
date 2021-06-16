// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getWorkers: ResponseWorkers!
    }
`;


export const mutations = gql`
    extend type Mutation {
        generateWorker(input: InputGenerateWorker!): ResponseWorker!
        obliterateWorker(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseWorker {
        status: Boolean!
        error: Error
        data: Worker
    }

    type ResponseWorkers {
        status: Boolean!
        error: Error
        data: [Worker!]
    }

    type Worker {
        id: String!
        name: String!
        ownedBy: String!
        dependencies: String!
        script: String!
        command: String!
        imagene: String!
        npmToken: String
        npmRegistry: String
    }

    extend type Owner {
        workers: [Worker!]!
    }
`;


export const inputs = gql`
    input InputGenerateWorker {
        name: String!
        dependencies: String!
        script: String!
        command: String!
        npmToken: String
        npmRegistry: String
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${inputs}
`;
// #endregion exports
