#Work in progress. Not yet functional.

## redux-redaction



Utility methods for parsing a tree of reducers and derviving actions from them.

```js
// redaction.js
import { createRedaction } from 'redux-redaction'
import rootReducer from './rootReducer';

export default createRedaction(rootReducer);

```


```js
// actions.js
import redaction from './redaction'

export createActions(redaction.actions);
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
import redaction from './redaction'

export redaction.reducer;

```

```js
// rootReducer.js
import { redaction } from 'redux-redaction'

import todos from './Todos.reducer'

const initialState = {
   popupOpen: false,
   errors: []
};

const togglePopup = (state, action) => {
  // Reduce state.
  return {
   ...state,
   popupOpen: !state.popupOpen
  }
};

const addErrors = redaction((errorMsg) => {
    return 'Error: ' + errorMsg;
})
.reduce((state, action) => {
  return {
   ...state,
   errors: [...state.errors, action.payload]
  }
});

export default {
    initialState,
    togglePopup,
    addErrors,
    todos
}


```
```js
// Todos.reducer.js

const initialState = [];

const deleteTodo = (state, action) => {
  const { id } = action.payload;
  return state.filter(todo => (todo.id !== id));
}

export default {
    initialState,
    deleteTodo   
}

```
