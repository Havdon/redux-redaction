import { Redaction } from './redaction';

// Returns empty object if no redactions were found.
export function mapRedaction(redaction, callback, parentName) {
    var obj = {};
    var isEmpty = true;
    for (const key in redaction) {
        const item = redaction[key];
        const name = parentName ? `${parentName}.${key}` : key;
        if (typeof item === 'object') {
            if (item.__esModule === true) {
                const value = mapRedaction(item, callback, name);
                if (value) {
                    obj[key] = value;
                    isEmpty = false;
                }
            }
            else if (item instanceof Redaction){
                item.name = name;
                const value = callback(item, name);
                if (value) {
                    obj[key] = value;
                    isEmpty = false;
                }
            }
        }
        else if (typeof item === 'function') {
            const value = callback(item, name);
            if (value) {
                obj[key] = value;
                isEmpty = false;
            }
        }
    }
    return (!isEmpty || !parentName) ? obj : undefined;
}