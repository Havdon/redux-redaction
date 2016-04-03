import { mapRedaction } from '../src/utils';
import * as redactions from './test-src/redactions';
import * as empty from './test-src/empty';
import { expect } from 'chai';
import sinon from 'sinon';

describe('utils', function () {
    
    describe('mapRedaction', function () {
        var mapResult;
        
        it('should find all modules', function (done) {
            mapResult = mapRedaction(redactions, item => item);
            expect(mapResult).to.have.property('A');
            expect(mapResult.A).to.have.property('reductionA');
            done();
        });
        
        it('should return empty object if no redactions were found.', function (done) {
            mapResult = mapRedaction(redactions, item => undefined);
            expect(mapResult).to.be.empty;
            expect(mapResult).not.to.be.undefined;
            done();
        });
        
            
    });
    
});
