export const pathMap = (obj, path, cb) => {
    if (typeof path === 'string') path = path.split('.');
    path = [...path];
    const key = path.shift();
    if (typeof obj[key] !== 'undefined') {
        if (path.length > 0) {
            return {
                ...obj,
                [key]: pathMap(obj[key], path, cb)
            };
        }
        else {
            return {
                ...obj,
                [key]: cb(obj[key])
            };
        }
    }
    return obj;
}