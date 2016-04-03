import createReducers from '../src/createReducers';
import * as redactions from './test-src/redactions'
import * as empty from './test-src/empty'
import { expect } from 'chai';
import sinon from 'sinon';


describe('createReducers', function () {
    
    var reducers;
    beforeEach(function (done) {
        reducers = createReducers(redactions);
        done();
    });
    
    it('finds all redactions in the tree.', function (done) {
        expect(reducers).to.have.property('A');
        expect(reducers.A).to.have.property('reductionA');
        done();
    });
    
    it('only to take es modules', function (done) {
        expect(reducers).to.not.have.property('someConstObject');
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
        typeCheck(reducers);
        done();
    });
    
    it('result should not alter plane function reducers', function (done) {
        expect(reducers.A.fnA).to.be.a('function');
        expect(reducers.A.fnA({})).to.have.property('newState');
        done();
    });
    
    it('result should map redactors to their reducer function.', function (done) {
        expect(reducers.A.reductionA).to.be.a('function');
        expect(reducers.A.reductionA({})).to.have.property('addition');
        done();
    });
    
});
