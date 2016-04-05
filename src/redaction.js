export class Redaction {
    constructor(actionFn) {
        this.actionFn = actionFn;
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
    
    getAction(...args) {
        if (typeof this.actionFn === 'function')
            return this.actionFn(...args);
        else
            return this.actionFn;
    }
    
    
    
    handleReduce(state, action = {}) {
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