// #region imports
    // #region external
    import {
        resolveSpaceConfigurationPath,
    } from '~services/logic/space';

    import {
        getWorker,
        updateWorker,
    } from '~services/utilities';
    // #endregion external
// #endregion imports



// #region module
const describeServer = async (
    name: string,
) => {
    console.log('describe server',name);

}


const describeConnection = async (
    name: string,
) => {
    console.log('describe connection',name);

}


const describeSpace = async (
    name: string,
    server?: string,
    identonym?: string,
) => {
    console.log('describe space',name);
}


const describe = async (
    entity: string,
    name: string,
    server?: string,
    identonym?: string,
) => {
    try {
        switch (entity) {
            case 'srv':
            case 'server':
                await describeServer(
                    name,
                );
                return;
            case 'conn':
            case 'connection':
                await describeConnection(
                    name,
                );
                return;
            case 'spc':
            case 'space':
                await describeSpace(
                    name,
                    server,
                    identonym,
                );
                return;
            default:
                console.log(`Entity '${entity}' does not exist.`);
        }
    } catch (error) {
        console.log('Something went wrong.');
        return;
    }
}
// #endregion module



// #region exports
export default describe;
// #endregion exports
