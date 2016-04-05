import redaction, { Redaction } from '../src/redaction';
import { expect } from 'chai';
import sinon from 'sinon';

describe('redaction [Function]', function () {
    
    it('should return an instance of Redaction', function (done) {
        expect(redaction()).to.be.an.instanceOf(Redaction);
        done();
    });
});



describe('Redaction [Class]', function () {
    it('should handle function action creator properly', function (done) {
        var actionCreator = sinon.stub().returns({ test: true });
        var r = redaction(actionCreator)
        const action = r.getAction();
        expect(action).to.be.an('object');
        expect(actionCreator.calledOnce).to.equal(true);
        expect(action).to.deep.equal({
            test: true
        })
        done();
    });
    
    it('should handle constant action creator properly', function (done) {
        var r = redaction({test: true})
        const action = r.getAction();
        expect(action).to.be.an('object');
        expect(action).to.deep.equal({
            test: true
        })
        done();
    });
    
    it('should default to the "reduce" reduce handler when reducing.', function (done) {
        var reducer = sinon.stub().returns({ test: true });
        var r = redaction().reduce(reducer);
        const state = r.handleReduce();
        expect(state).to.be.an('object');
        expect(state).to.deep.equal({
            test: true
        })
        done();
    });
    
    it('should not modify state if it has no reduce handler', function(done) {
        var r = redaction();
        const startState = {test: 'hey'};
        const state = r.handleReduce(startState);
        expect(state).to.be.an('object');
        expect(state).to.deep.equal(startState)
        done();
    })
});

