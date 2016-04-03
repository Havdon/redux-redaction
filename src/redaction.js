import { createAction } from 'redux-actions';

export class Redaction {
    constructor(payload) {
        this.payload = payload;
        this.name = null;
    }
    
    reduce(cb) {
        this.reduceCb = cb;
        return this;
    }
    
    onError(cb) {
        this.onErrorCb = cb;
        return this;
    }
    
    onPending(cb) {
        this.onPendingCb = cb;
        return this;
    }
    
    getPayload(...args) {
        if (typeof this.payload === 'function')
            return this.payload(...args);
        else
            return this.payload;
    }
    
    getActionCreator() {
        if (!this.name) 
            throw new Error('Redaction has no name!');
       
        const actionCreator = createAction(this.name);
        return (...args) => {
            const payload = this.getPayload(...args);
            return actionCreator(payload);  
        };
    }
    
    
    
    reducer(state, action = {}) {
        if (Redaction.isPending(action)) {
            if (this.onPendingCb)
                return this.onPendingCb(state, action);
        } else if(Redaction.isError(action)) {
            if (this.onErrorCb)
                return this.onErrorCb(state, action);
        } else if (this.reduceCb) {
            return this.reduceCb(state, action);
        }
       return state;
    }
    
    static isPending(action) {
        return action.pending;
    }
    
    static isError(action) {
        return action.error;
    }
}





const redaction = action => new Redaction(action);


export default redaction;