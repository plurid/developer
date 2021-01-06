// #region imports
    // #region external
    import {
        Project,
        ClientNotifier,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const loadProjects = async (
    ownerID: string,
) => {
    // const projects: Project[] = await database.query(
    //     'projects',
    //     'ownedBy',
    //     ownerID,
    // );

    // return projects;
    return [];
}


export const loadNotifiers = async (
    ownerID: string,
) => {
    // const notifiers: any[] = await database.query(
    //     'notifiers',
    //     'ownedBy',
    //     ownerID,
    // );

    // const clientNotifiers = notifiers.map(notifier => {
    //     const {
    //         id,
    //         name,
    //         notifyOn,
    //         type,
    //         data,
    //     } = notifier;

    //     const clientData = extractClientNotifierData(
    //         type,
    //         data,
    //     );

    //     const clientNotifier = {
    //         id,
    //         name,
    //         notifyOn,
    //         type,
    //         data: clientData,
    //     };

    //     return clientNotifier;
    // });

    // return clientNotifiers;

    return [];
}

const loadData = async (
    ownerID: string | undefined,
) => {
    if (!ownerID) {
        return {
            projects: [],
            notifiers: [],
        };
    }

    const projects = await loadProjects(
        ownerID,
    );

    const notifiers = await loadNotifiers(
        ownerID,
    );


    const data = {
        projects,
        notifiers,
    };

    return data;
}
// #endregion module



// #region exports
export default loadData;
// #endregion exports
