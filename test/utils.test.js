import { pathMap } from '../src/utils'
import { expect } from 'chai';
import sinon from 'sinon';


describe('utils', function () {
    
    describe('pathMap', function () {
        
        it('should work at root depth', function (done) {
            const test = (path) => {
                const ret = pathMap({
                    a: 10
                }, path, (state) => {
                    return 11;
                })
                expect(ret).to.be.a('object');
                expect(ret).to.have.property('a');
                expect(ret.a).to.equal(11);
            }
            test('a');
            test(['a']);
            done();
        });
        
        it('should map to 2nd depth', function (done) {
            const test = (path) => {
                const ret = pathMap({
                    a: {
                        b: 10
                    }
                }, path, (state) => {
                    return 11;
                })
                expect(ret).to.be.a('object');
                expect(ret).to.have.property('a');
                expect(ret.a).to.be.a('object');
                expect(ret.a).to.have.property('b');
                expect(ret.a.b).to.equal(11);
            }
            test('a.b');
            test(['a', 'b'])
            done();
        });
        
        it('should map to 3d depth', function (done) {
            const test = (path) => {
                const ret = pathMap({
                    a: {
                        b: {
                            c: 100
                        }
                    }
                }, path, (state) => {
                    return 1;
                })
                expect(ret).to.be.a('object');
                expect(ret).to.have.property('a');
                expect(ret.a).to.be.a('object');
                expect(ret.a).to.have.property('b');
                expect(ret.a.b).to.be.a('object');
                expect(ret.a.b).to.have.property('c');
                expect(ret.a.b.c).to.equal(1);
                expect(ret).to.deep.equal({
                    a: {
                        b: {
                            c: 1
                        }
                    }
                })
            }
            test('a.b.c')
            test(['a', 'b', 'c'])
            done();
        });
       
       it('invalid path should not trigger callback, nor alter state.', function (done) {
            const test = (path) => {
                const cb = sinon.spy();
                const state = {
                    a: 10
                };
                const ret = pathMap({...state}, path, cb)
                expect(ret).to.deep.equal(state);
                expect(cb.called).to.equal(false);
            }
            test('a.z');
            test(['a', 'z']);
            done();
        }); 
        
    });
    
});
