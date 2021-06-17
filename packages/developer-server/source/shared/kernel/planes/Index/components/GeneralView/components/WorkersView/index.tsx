// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '~server/utilities/general';

    import {
        ClientWorker,
    } from '~server/data/interfaces';

    import EntityView from '~kernel-components/EntityView';

    import client from '~kernel-services/graphql/client';

    import {
        OBLITERATE_WORKER,
    } from '~kernel-services/graphql/mutate';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '~kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        workerRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface WorkersViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface WorkersViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateWorkers: ClientWorker[];
}

export interface WorkersViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type WorkersViewProperties = WorkersViewOwnProperties
    & WorkersViewStateProperties
    & WorkersViewDispatchProperties;

const WorkersView: React.FC<WorkersViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateWorkers,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleWorkerObliterate = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'worker',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_WORKER,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }
    // #endregion handlers


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateWorkers),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateWorkers.map(
            worker => workerRowRenderer(
                worker,
                handleWorkerObliterate,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredWorkers = stateWorkers.filter(stateWorker => {
            if (filterIDs.includes(stateWorker.id)) {
                return true;
            }

            return false;
        });

        const sortedWorkers = filteredWorkers.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedWorkers.map(
                worker => workerRowRenderer(
                    worker,
                    handleWorkerObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateWorkers,
        );
        const filteredRows = stateWorkers.map(
            worker => workerRowRenderer(
                worker,
                handleWorkerObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateWorkers,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                id
            </div>

            <div>
                name
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 2fr 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no workers"

            actionButtonText="Generate Worker"
            actionButtonClick={() => {
                setGeneralView('generate-worker');
            }}

            filterUpdate={filterUpdate}
            refresh={() => {
            }}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): WorkersViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateWorkers: selectors.data.getWorkers(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): WorkersViewDispatchProperties => ({
    dispatch,
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


const ConnectedWorkersView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(WorkersView);
// #endregion module



// #region exports
export default ConnectedWorkersView;
// #endregion exports
