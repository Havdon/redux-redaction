import createActions from '../src/createActions';
import * as redactions from './test-src/redactions'
import * as empty from './test-src/empty'
import { expect } from 'chai';
import sinon from 'sinon';
describe('createActions', function () {
    var actions;
    beforeEach(function (done) {
        actions = createActions(redactions);
        done();
    });
    
    it('finds all redactions in the tree.', function (done) {
        expect(actions).to.have.property('A');
        expect(actions.A).to.have.property('reductionA');
        done();
    });
    
    it('only to take es modules', function (done) {
        expect(actions).to.not.have.property('someConstObject');
        done();
    });
    
    it('should only have functions and objects in returned object', function (done) {
        const typeCheck = (obj) => {
            for (const key in obj) {
                if (typeof obj[key] === 'object') {
                    typeCheck(obj[key]);
                }
                else {
                    expect(typeof obj[key]).to.equal('function');
                }
            }
        }
        typeCheck(actions);
        done();
    });
    
    it('should handle plane functions correctly and they should return proper action.', function (done) {
        const action = actions.A.fnA();
        expect(action).to.be.a('object');
        expect(action).to.have.property('type');
        expect(action).to.have.property('payload');
        done();
    });
    
    it('should should give correct action type for plane functions.', function (done) {
        const payload = { payload : 'test'};
        const action = actions.A.fnA(payload);
        expect(action.type).to.equal('A.fnA');
        expect(action.payload).to.equal(payload);
        const payload2 = { some : 'test'};
        const action2 = actions.rootPlaneFn(payload2);
        expect(action2.type).to.equal('rootPlaneFn');
        expect(action2.payload).to.equal(payload2);
        done();
    });
    
    it('return empty object for empty module', function (done) {
        actions = createActions(empty);
        expect(actions).to.deep.equal({});
        done();
    });
    
    it('handle Redaction instances properly', function (done) {
        expect(actions.A).to.have.property('reductionA');
        expect(actions.A.reductionA).to.be.a('function');
        const result = actions.A.reductionA();
        expect(result).to.be.a('object');
        done();
    });
});
