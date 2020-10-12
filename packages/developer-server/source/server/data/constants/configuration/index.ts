// #region module
export const LOG_LEVEL = process.env.DEVELOPER_LOG_LEVEL || '7';
export const QUIET = process.env.DEVELOPER_QUIET === 'true';

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);
// #endregion module
