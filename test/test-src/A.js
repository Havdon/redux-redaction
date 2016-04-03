import redaction from '../../src/redaction';


export const someConst = 'const string';

export const reductionA = redaction(() => {
    return {
        id: ''
    }
})
.reduce((state, action) => {
    return {
        ...state,
        addition: true
    }
})

export const fnA = (state, action) => {
    return {
        ...state,
        newState: 'hey'
    };
}