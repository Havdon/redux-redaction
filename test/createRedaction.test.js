import createRedaction from '../src/createRedaction';
import redaction from '../src/redaction';
import { expect } from 'chai';
import sinon from 'sinon';
describe('createRedaction', function () {
    var redactionValue;
    beforeEach(function (done) {
        const mod = {
            initialState: {
                value: 0
            },
            noop: state => state,
            subMod: {
                initialState: "",
                subReducer: state => state + "*"
            },
            deep: {
                initialState: {},
                subMod: {
                    initialState: 0,
                    subReducer: state => state + 1
                }
            },
            redactionFn: redaction((i) => {
                return { payload: i }
            }).reduce((state, action) => ({value: action.payload }))
        };
        redactionValue = createRedaction(mod);
        done();
    });
    
    it('should return object with correct values', function (done) {
        expect(redactionValue).to.be.a('object');
        expect(redactionValue).to.have.property('reducers');
        expect(redactionValue).to.have.property('actions');
        expect(redactionValue.actions).to.have.be.a('object');
        expect(redactionValue).to.have.property('reducer');
        expect(redactionValue.reducer).to.have.be.a('function');
        expect(redactionValue.actions).to.have.property('noop');
        expect(redactionValue.actions).to.have.property('deep');
        expect(redactionValue.actions).to.be.a('object');
        expect(redactionValue.actions.deep).to.have.property('subMod');
        done();
    });
    
    
    it('should create initial state properly', function (done) {
        const state = redactionValue.reducer();
        expect(state).to.deep.equal({
            value: 0,
            subMod: "",
            deep: {
                subMod: 0
            }
        })
        done();
    });
    
    it('multiple action parameters cause payload to be array', function (done) {
        const { noop } = redactionValue.actions;
        const ret = noop(1, 2, 3);
        expect(ret.payload).to.deep.equal([1, 2, 3]);
        done();
    });
    
    
    it('action creators should return valid actions', function (done) {
        const { noop, subMod } = redactionValue.actions;
        expect(noop).to.be.a('function');
        const action = noop();
        expect(action).to.be.a('object');
        expect(action).to.have.property('type');
        expect(action).to.have.property('payload');
        expect(action.type).to.equal('noop'); 
        expect(subMod.subReducer).to.be.a('function');
        const action2 = subMod.subReducer();
        expect(action2).to.be.a('object');
        expect(action2).to.have.property('type');
        expect(action2).to.have.property('payload');
        expect(action2.type).to.equal('subMod.subReducer');    
        const action3 = redactionValue.actions.deep.subMod.subReducer();
        expect(action3).to.be.a('object');
        expect(action3).to.have.property('type');
        expect(action3).to.have.property('payload');
        expect(action3.type).to.equal('deep.subMod.subReducer');      
        done();
    });
    
    
    it('should map actions to correct reducers and not affect state with noop', function (done) {
        const { noop } = redactionValue.actions;
        const state1 = { some: 'value' };
        const state2 = redactionValue.reducer(state1, noop());
        expect(state2).to.be.a('object');
        expect(state2).to.deep.equal(state1);
        done();
    });
    
    it('should only effect substate when reducing a submodule action.', function (done) {
        const { subMod } = redactionValue.actions;
        const state1 = { some: 'value', subMod: '' };
        const state2 = redactionValue.reducer(state1, subMod.subReducer());
        expect(state2).to.be.a('object');
        expect(state2.subMod).to.equal('*');
        done();
    });
    
    it('should only effect substate when reducing a deep submodule action.', function (done) {
        const { subMod } = redactionValue.actions.deep;
        const state1 = { some: 'value', subMod: '', deep: { subMod: 1 } };
        const state2 = redactionValue.reducer(state1, subMod.subReducer());
        expect(state2).to.be.a('object');
        expect(state2).to.have.property('deep');
        expect(state2.deep).to.be.a('object');
        expect(state2.deep).to.have.property('subMod');
        expect(state2.deep.subMod).to.equal(2);
        done();
    });
    
    
    
    it('should handle redaction wrapped actions properly', function (done) {
        expect(redactionValue.actions).to.have.property('redactionFn')
        expect(redactionValue.actions.redactionFn).to.be.a('function')
        expect(redactionValue.actions.redactionFn('test')).to.deep.equal({
            type: 'redactionFn',
            payload: 'test'
        })
        done();
    });
    
    it('should handle redaction wrapped reducers properly', function (done) {
        expect(redactionValue.reducers).to.have.property('redactionFn')
        expect(redactionValue.reducers.redactionFn).to.be.a('function')
        const action = redactionValue.actions.redactionFn(100);
        const state2 = redactionValue.reducer(undefined, action);
        expect(state2.value).to.equal(100);
        done();
    });
    
    
    it('should throw if module with a non object initial state has a sub module.', function (done) {
        
        const create = () => createRedaction({
            initialState: '',
            sub: {
                initialState: 10
            }
        });
        
        expect(create).to.throw(Error);
        done();
    });
    
    
    it('should work with an empty root module', function (done) {
        const ret = createRedaction({});
        expect(ret).to.be.a('object')
        done();
    });
    
    it('should work with submodule without functions', function (done) {
        const ret = createRedaction({
            initialState: {},
            sub: {
                initialState: 10
            }
        });
        expect(ret).to.be.a('object')
        expect(ret.actions).to.have.property('sub')
        done();
    });
    
    it('should not include objects without the "initialState" property', function (done) {
        const ret = createRedaction({
            initialState: {},
            sub: {
                initialState: 10
            },
            sub2: {
                state: 10
            }
        });
        expect(ret).to.be.a('object')
        expect(ret.actions).to.have.property('sub')
        expect(ret.actions).to.not.have.property('sub2')
        done();
    });
    
    
});
