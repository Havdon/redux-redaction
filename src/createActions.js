import { createAction } from 'redux-actions';
import { mapRedaction } from './utils';

const createActions = (redaction, parentName) => {
    return mapRedaction(redaction, (item, name) => {
        if (typeof item === 'function') {
            return createAction(name);
        }
        else {
            return item.getActionCreator();
        }
    });
}

export default createActions;