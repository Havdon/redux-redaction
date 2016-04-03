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
   togglePopup: () -> Action,
   addErrors: () -> Action,
   todos: {
      deleteTodos: () -> Action
   }
}

Usage:
dispatch(actions.todos.deleteTodos({ id: '123' }));
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

export * as todos from './Todos.reducer'

export const defaultState = {
   popupOpen: false,
   errors: []
};

export const togglePopup = (state, action) => {
  // Reduce state.
  return {
   ...state,
   popupOpen: !state.popupOpen
  }
};

export const addErrors = redaction((errorMsg) => {
    return 'Error: ' + errorMsg;
})
.reduce((state, action) => {
  return {
   ...state,
   errors: [...state.errors, action.payload]
  }
});

```
```js
// Todos.reducer.js

export const defaultState = [];

export const deleteTodo = (state, action) => {
  const { id } = action.payload;
  return state.filter(todo => (todo.id !== id));
}

```
