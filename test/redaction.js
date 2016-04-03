import redaction from '../src/redaction';
import { expect } from 'chai';
import sinon from 'sinon';

describe('redaction', function () {
    
    it('should be usable in proper form', function (done) {
        expect(() => {
            redaction('payload')
                .reduce(() => {})
                .onError(() => {})
                .onPending(() => {});
        }).not.to.throw(Error);
        done();
    });
    
    
    it('should return proper action with constant payload', function (done) {
        const payload = 'payload';
        const r = redaction(payload);
        r.name = 'a.name';
        const actionCreator = r.getActionCreator();
        expect(actionCreator).to.be.a('function');
        const action = actionCreator();
        expect(action.type).to.equal(r.name);
        expect(action.payload).to.equal(payload);
        done();
    });
    
    it('should return proper action with function payload', function (done) {
        const payload = () => 'data';
        const r = redaction(payload);
        r.name = 'a.name';
        const actionCreator = r.getActionCreator();
        expect(actionCreator).to.be.a('function');
        const action = actionCreator();
        expect(action.type).to.equal(r.name);
        expect(action.payload).to.equal(payload());
        done();
    });
    
    it('should pass proper parameters to function payload', function (done) {
        const payload = (param1, param2) => param1 + param2;
        const r = redaction(payload);
        r.name = 'a.name';
        const actionCreator = r.getActionCreator();
        expect(actionCreator).to.be.a('function');
        const action = actionCreator('a', 'b');
        expect(action.type).to.equal(r.name);
        expect(action.payload).to.equal(payload('a', 'b'));
        done();
    });
    
    it('should throw when getActionCreator is called without a name', function (done) {
        const payload = 'payload';
        const r = redaction(payload);
        expect(::r.getActionCreator).to.throw(Error);
        done(); 
    });
    
    it('should call onPending when reducing a pending action', function(done) {
        const payload = 'payload';
        const errorFn = sinon.spy();
        const pendingFn = sinon.spy();
        const successFn = sinon.spy();
        const r = redaction(payload).onError(errorFn).onPending(pendingFn).reduce(successFn)
        r.name = 'a.name';
        r.reducer({}, {type: 'a.name', pending: true});
        expect(errorFn.called).to.equal(false);
        expect(successFn.called).to.equal(false);
        expect(pendingFn.calledOnce).to.equal(true);
        done();
    })
    
    it('should be noop when reducing a pending action without a noPending callback', function(done) {
        const payload = 'payload';
        const r = redaction(payload);
        r.name = 'a.name';
        const state = {};
        const newState = r.reducer(state, {type: 'a.name', pending: true});
        expect(state).to.equal(newState);
        done();
    })
    
    it('should call onError when reducing a errored action', function(done) {
        const payload = 'payload';
        const errorFn = sinon.spy();
        const pendingFn = sinon.spy();
        const successFn = sinon.spy();
        const r = redaction(payload).onError(errorFn).onPending(pendingFn).reduce(successFn)
        r.name = 'a.name';
        r.reducer({}, {type: 'a.name', error: true});
        expect(pendingFn.called).to.equal(false);
        expect(successFn.called).to.equal(false);
        expect(errorFn.calledOnce).to.equal(true);
        done();
    })
    
    it('should be noop when reducing a errored action without a onError callback', function(done) {
        const payload = 'payload';
        const r = redaction(payload);
        r.name = 'a.name';
        const state = {};
        const newState = r.reducer(state, {type: 'a.name', error: true});
        expect(state).to.equal(newState);
        done();
    })
    
    it('should call reduce when reducing a errored action', function(done) {
        const payload = 'payload';
        const errorFn = sinon.spy();
        const pendingFn = sinon.spy();
        const successFn = sinon.spy();
        const r = redaction(payload).onError(errorFn).onPending(pendingFn).reduce(successFn)
        r.name = 'a.name';
        r.reducer({}, {type: 'a.name'});
        expect(pendingFn.called).to.equal(false);
        expect(errorFn.called).to.equal(false);
        expect(successFn.calledOnce).to.equal(true);
        done();
    })
    
    it('should be noop when reducing a errored action without a reduce callback', function(done) {
        const payload = 'payload';
        const r = redaction(payload);
        r.name = 'a.name';
        const state = {};
        const newState = r.reducer(state, {type: 'a.name'});
        expect(state).to.equal(newState);
        done();
    })
    
});
