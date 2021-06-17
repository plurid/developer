// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        ClientWorker,
    } from '~server/data/interfaces';

    // import {
    //     addEntityMutation,
    // } from '~kernel-services/logic/mutations';

    import {
        GENERATE_WORKER,
    } from '~kernel-services/graphql/mutate';

    import {
        StyledH1,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '~kernel-services/styled';

    import InputLine from '../InputLine';
    // #endregion external


    // #region internal
    import {
        StyledWorker,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface WorkerProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        action: (
            worker: ClientWorker,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Worker: React.FC<WorkerProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [
        workerName,
        setWorkerName,
    ] = useState('');
    // #endregion state


    // #region handlers
    const addWorker = async () => {
        if (!workerName) {
            return;
        }

        // const worker: IWorker | undefined = await addEntityMutation(
        //     {
        //         value: workerName,
        //     },
        //     GENERATE_WORKER,
        //     'generateWorker',
        // );

        // if (worker) {
        //     action(worker);
        // }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            addWorker();
        }
    }
    // #endregion handlers


    // #region render
    return (
        <StyledWorker
            theme={theme}
        >
            <StyledH1>
                generate worker
            </StyledH1>

            <InputLine
                name="name"
                text={workerName}
                theme={theme}
                atChange={(event) => setWorkerName(event.target.value)}
                atKeyDown={handleEnter}
            />

            <div>
                <StyledPluridPureButton
                    text="Generate Worker"
                    atClick={() => addWorker()}
                    level={2}
                    disabled={!workerName}
                />
            </div>

            {cancel && (
                <div>
                    <StyledPluridLinkButton
                        text="cancel"
                        atClick={() => cancel()}
                        theme={theme}
                        level={2}
                    />
                </div>
            )}
        </StyledWorker>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Worker;
// #endregion exports
