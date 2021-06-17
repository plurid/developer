// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        ClientWorker,
    } from '~server/data/interfaces';

    import {
        addEntityMutation,
    } from '~kernel-services/logic/mutations';

    import {
        GENERATE_WORKER,
    } from '~kernel-services/graphql/mutate';

    import {
        StyledH1,
        StyledPluridPureButton,
        StyledPluridLinkButton,
    } from '~kernel-services/styled';

    import InputLine from '../InputLine';
    import InputBox from '../InputBox';
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

    const [
        workerDependencies,
        setWorkerDependencies,
    ] = useState('');

    const [
        workerScript,
        setWorkerScript,
    ] = useState('');

    const [
        workerCommand,
        setWorkerCommand,
    ] = useState('');

    const [
        workerNpmToken,
        setWorkerNpmToken,
    ] = useState('');

    const [
        workerNpmRegistry,
        setWorkerNpmRegistry,
    ] = useState('');

    const [
        validDependencies,
        setValidDependencies,
    ] = useState(false);

    const [
        validWorkerData,
        setValidWorkerData,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const addWorker = async () => {
        if (!validWorkerData) {
            return;
        }

        const worker: ClientWorker | undefined = await addEntityMutation(
            {
                name: workerName,
                dependencies: workerDependencies,
                script: workerScript,
                command: workerCommand,
                npmToken: workerNpmToken,
                npmRegistry: workerNpmRegistry,
            },
            GENERATE_WORKER,
            'generateWorker',
        );

        if (worker) {
            action(worker);
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            addWorker();
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (
            workerName
            && workerScript
            && workerCommand
            && validDependencies
        ) {
            setValidWorkerData(true);
        } else {
            setValidWorkerData(false);
        }
    }, [
        workerName,
        workerScript,
        workerCommand,
        validDependencies,
    ]);

    useEffect(() => {
        if (!workerDependencies) {
            setValidDependencies(false);
            return;
        }

        try {
            const valid = JSON.parse(workerDependencies);

            if (!!valid) {
                setValidDependencies(true);
            } else {
                setValidDependencies(false);
            }
        } catch (error) {
            setValidDependencies(false);
        }
    }, [
        workerDependencies,
    ]);
    // #endregion effects


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

            <InputBox
                name="dependencies"
                text={workerDependencies}
                theme={theme}
                atChange={(event) => setWorkerDependencies(event.target.value)}
                asCode={true}
            />

            <InputBox
                name="script"
                text={workerScript}
                theme={theme}
                atChange={(event) => setWorkerScript(event.target.value)}
                asCode={true}
            />

            <InputLine
                name="command"
                text={workerCommand}
                theme={theme}
                atChange={(event) => setWorkerCommand(event.target.value)}
                atKeyDown={handleEnter}
            />

            <InputLine
                name="npm token"
                text={workerNpmToken}
                theme={theme}
                atChange={(event) => setWorkerNpmToken(event.target.value)}
                atKeyDown={handleEnter}
            />

            <InputLine
                name="npm registry"
                text={workerNpmRegistry}
                theme={theme}
                atChange={(event) => setWorkerNpmRegistry(event.target.value)}
                atKeyDown={handleEnter}
            />

            <div>
                <StyledPluridPureButton
                    text="Generate Worker"
                    atClick={() => addWorker()}
                    level={2}
                    disabled={!validWorkerData}
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
