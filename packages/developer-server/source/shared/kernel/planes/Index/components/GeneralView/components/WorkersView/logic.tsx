// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        ClientWorker,
    } from '~server/data/interfaces';

    import CopyableField from '~kernel-components/CopyableField';
    // #endregion external
// #endregion imports



// #region module
export const workerRowRenderer = (
    worker: ClientWorker,
    handleWorkerObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name
    } = worker;

    return (
        <>
            <CopyableField
                data={id}
            />

            <div>
                {name}
            </div>

            <PluridIconDelete
                atClick={() => handleWorkerObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    workers: ClientWorker[],
) => {
    const searchTerms = workers.map(
        worker => {
            const {
                id,
                name,
            } = worker;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    id.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
