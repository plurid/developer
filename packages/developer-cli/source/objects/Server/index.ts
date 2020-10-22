// #region imports
    // #region libraries
    import {
        AddressInfo,
    } from 'net';

    import path from 'path';

    import {
        promises as fs,
    } from 'fs';

    import fetch from 'cross-fetch';

    import {
        EventEmitter,
    } from 'events';

    import express, {
        Express,
    } from 'express';

    import bodyparser from 'body-parser';

    import Zip from 'adm-zip';
    // #endregion libraries


    // #region external
    import {
        getSpaceData,
    } from '#services/logic/space';
    // #endregion external


    // #region internal
    import indexHTML from './templates/index.html';
    // #endregion internal
// #endregion imports



// #region module
const pollProgresssion = [2, 5, 10];
const pollTimeout = 1_200;


export interface PollData {
    id: string;
    worker: string;
    space: string;
}


const handlePoll = async (
    poll: PollData,
) => {
    try {
        const spaceData = await getSpaceData(poll.space);

        if (!spaceData) {
            return;
        }

        const url = spaceData.worker.server + `/download/${poll.id}`;

        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        const tmpArchive = path.join(
            __dirname,
            'archive-' + poll.id,
        );
        await fs.writeFile(
            tmpArchive,
            Buffer.from(new Uint8Array(buffer)),
        );

        const zip = new Zip(tmpArchive);
        const zipPath = path.join(
            __dirname,
            spaceData.space.spacePath,
            '/build',
        );
        zip.extractAllTo(zipPath);

        await fs.unlink(tmpArchive);

        return true;
    } catch (error) {
        return;
    }
}


class Poller {
    private polls: PollData[] = [];
    private polling = false;

    public push(
        poll: PollData,
    ) {
        this.polls.push(poll);

        this.poll();
    }

    private async poll() {
        console.log('this.poll', this.polls);

        if (this.polls.length === 0) {
            return;
        }

        if (this.polling) {
            return;
        }

        this.polling = true;
        const resolvedPolls: number[] = [];

        for (const [index, poll] of this.polls.entries()) {
            const resolved = await handlePoll(poll);

            if (resolved) {
                resolvedPolls.push(index);
            }
        }

        const updatedPolls = this.polls.filter(
            (_, index) => !resolvedPolls.includes(index),
        );

        this.polls = updatedPolls;
        this.polling = false;

        if (this.polls.length !== 0) {
            setTimeout(() => {
                this.poll();
            }, 2_000);
        }
    }
}


class Server extends EventEmitter {
    private application: Express;
    private poller: Poller;

    constructor() {
        super();

        this.application = express();
        this.poller = new Poller();
    }

    public start() {
        this.handleApplication();

        const server = this.application.listen();

        if (server) {
            return (server.address() as AddressInfo).port;
        }

        return;
    }

    private handleApplication() {
        this.application.get(
            '/',
            (
                request,
                response,
            ) => {
                response.send(indexHTML);
            },
        );

        this.application.post(
            '/poll',
            bodyparser.json(),
            (
                request,
                response,
            ) => {
                const {
                    id,
                    worker,
                    space,
                } = request.body;

                const data: PollData = {
                    id,
                    worker,
                    space,
                };

                this.poller.push(data);

                response.json({
                    status: true,
                });
            },
        );
    }
}
// #endregion module



// #region exports
export default Server;
// #endregion exports
