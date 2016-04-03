import { mapRedaction } from './utils';

const createReducers = (redaction) => {
    return mapRedaction(redaction, (item, name) => {
        if (typeof item === 'function') {
            return item;
        }
        else {
            return ::item.reducer;
        }
    });
}

export default createReducers;