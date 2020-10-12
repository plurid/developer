// #region imports
    // #region internal
    import * as Types from '../types';

    import initialState from '../initial';
    // #endregion internal
// #endregion imports



// #region module
export const addEntity = (
    state: Types.State,
    action: Types.AddEntityAction,
): Types.State => {
    const {
        type,
        data,
    } = action.payload;

    const newState = {
        ...state,
    };

    let projects = [
        ...newState.projects,
    ];
    let notifiers = [
        ...newState.notifiers,
    ];


    switch (type) {
        case 'project':
            projects = [
                ...projects,
                {
                    ...data,
                },
            ];
            break;
        case 'notifier':
            notifiers = [
                ...notifiers,
                {
                    ...data,
                },
            ];
            break;
    }

    return {
        ...newState,
        projects: [
            ...projects,
        ],
        notifiers: [
            ...notifiers,
        ],
    };
}


export const removeEntity = (
    state: Types.State,
    action: Types.RemoveEntityAction,
): Types.State => {
    const {
        id,
        type,
    } = action.payload;

    const newState = {
        ...state,
    };

    let projects = [
        ...newState.projects,
    ];
    let notifiers = [
        ...newState.notifiers,
    ];


    switch (type) {
        case 'project':
            projects = projects.filter(
                project => project.id !== id
            );
            break;
        case 'notifier':
            notifiers = notifiers.filter(
                notifier => notifier.id !== id
            );
            break;
    }

    return {
        ...newState,
        projects: [
            ...projects,
        ],
        notifiers: [
            ...notifiers,
        ],
    };
}


export const addEntities = (
    state: Types.State,
    action: Types.AddEntitiesAction,
): Types.State => {
    const {
        type,
        data,
        push,
    } = action.payload;

    const newState = {
        ...state,
    };


    let projects = [
        ...newState.projects,
    ];
    let notifiers = [
        ...newState.notifiers,
    ];


    switch (type) {
        case 'projects':
            projects = [
                ...data,
            ];
            break;
        case 'notifiers':
            notifiers = [
                ...data,
            ];
            break;
    }

    return {
        ...newState,
        projects: [
            ...projects,
        ],
        notifiers: [
            ...notifiers,
        ],
    };
}


export const removeEntities = (
    state: Types.State,
    action: Types.RemoveEntitiesAction,
): Types.State => {
    const {
        type,
        ids,
    } = action.payload;

    const newState = {
        ...state,
    };

    let projects = [
        ...newState.projects,
    ];


    switch (type) {
        case 'projects':
            projects = projects.filter(project => !ids.includes(project.id));
            break;
    }

    return {
        ...newState,
        projects: [
            ...projects,
        ],
    };
}


export const clearData = (
    state: Types.State,
    action: Types.ClearDataAction,
): Types.State => {
    return {
        ...initialState,
    };
}



const resolvers = {
    addEntity,
    removeEntity,
    addEntities,
    removeEntities,
    clearData,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
