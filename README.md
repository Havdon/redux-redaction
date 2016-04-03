#Work in progress. Not yet functional.

## redux-redaction



Utility methods for parsing a tree of reducers and derviving actions from them.

```js
// actions.js
import * as rootReducer from 'rootReducer';
import { createActions } from 'redux-redaction'

export createActions(rootReducer);
/*
Returns: 
{
   planeFunctionReducer: [Function],
   redactionReducer: [Function],
   nestedReducer: {
      nestedReducerFunction: [Function]
   }
}
*/
```

```js
// reducers.js
import * as rootReducer from './rootReducer';
import { combineReducers } from 'redux'
import { createReducers } from 'redux-redaction'

export combineReducers(createReducers(rootReducer));

```

```js
// rootReducer.js
import { redaction } from 'redux-redaction'

export * as nestedReducer from './nestedReducer'

export const planeFunctionReducer = (state, action) => {
  // Reduce state.
  return state;
};

export const redactionReducer = redaction((data) => {
    return { data }
})
.reduce((state, action) => {
  const { data } = action.payload;
});

```
```js
// nestedReducer.js

export const nestedReducerFunction = (state, action) => {
  // ...
}

```
