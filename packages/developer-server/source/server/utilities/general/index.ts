// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';
    // #endregion libraries
// #endregion imports



// #region module
export const fileExists = async (
    path: string,
) => !!(await fs.stat(path).catch(e => false));


export const cleanFileName = (
    name: string,
) => {
    return name.replace(/\//, '-');
}


export const compareValues = <T>(
    key: string,
    order = 'asc',
) => {
    return (
        a: T,
        b: T,
    ) => {
        if (!(a as any).hasOwnProperty(key) || !(b as any).hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase()
            : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase()
            : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }

        return (
            (order === 'desc')
                ? (comparison * -1)
                : comparison
        );
    };
}


export const removeDuplicates = <T>(
    data: T[],
    key: string,
) => {
    return data.filter(
        (obj, pos, arr) => arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos
    );
}
// #endregion module
