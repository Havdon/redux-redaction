import { pathMap } from './utils'
import { Redaction } from './redaction'

export default createRedaction;

const isFunction = f => (Object.prototype.toString.call(f) === '[object Function]');

function createRedaction(mod, parentName) {
    
    var redaction = Object.keys(mod).reduce((prev, key) => {
        if (key === 'initialState') {
            return prev;
        }
        
        const obj = mod[key];
        const name = parentName ? `${parentName}.${key}` : key;
        if (isFunction(obj)) {
            return {
                ...prev,
                reducers: {...prev.reducers, [name]: obj},
                actions: {...prev.actions, [key]: (...args) => {
                   return {type: name, payload: (args.length === 1 ? args[0] : args )};
               }}
            }
        }
        
        if (obj instanceof Redaction) {
            return {
                ...prev,
                reducers: {...prev.reducers, [name]: ::obj.handleReduce},
                actions: {...prev.actions, [key]: (...args) => {
                   let action = obj.getAction(...args) || {};
                   if (isFunction(action)) {
                       // Pass functions through so that thunks, etc still work.
                       return action;
                   }
                   else if(typeof action === 'string') {
                       action = {
                           payload: action
                       }
                   }
                   return {
                       ...action,
                       type: name
                    };
               }}
            }
        }
        
        // Any object with initialState is assumed to be a redaction module.
        if (typeof obj.initialState !== 'undefined') {
            if (typeof prev.initialState !== 'object') {
                throw new Error(`Redaction ${name} cannot have subredactions if the initial state is not an object.`);
            }
            const subRedaction = createRedaction(obj, name);
            return {
                ...prev,
                initialState: {
                    ...prev.initialState,
                    [key]: subRedaction.initialState
                },
                reducers: {...prev.reducers, ...subRedaction.reducers},
                actions: {...prev.actions,
                    [key]: subRedaction.actions    
                }
            }
        }
        return prev;
        
    }, {initialState: typeof mod.initialState !== 'undefined' ? mod.initialState : {}})
    
    redaction.reducer = (state = redaction.initialState, action = {}) => {
        const func = redaction.reducers[action.type];
        if (func) {
            
            const split = action.type.split('.');
            if (split.length == 1) return func(state, action);
            split.pop();
            return pathMap(state, split, (subState) => {
                return func(subState, action)
            })
        }
        else {
            return state;
        }
    };
    return redaction;
}


