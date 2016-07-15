# redux-redaction
*Utility methods for parsing a tree of reducers and derviving actions from them.*

## Why this was created
I was working on an internal web dashboard, built with React and Redux. I greatly enjoyed both, but was pained by the repetetive task of defining Redux actions, action creators and reducers. To solve this pain I created redux-redaction, where all actions and action creators can be derived from a reducer.

## Why it didn't work
Once the project was ~6 months old, I decided to refactor redux-redaction out of the project. 

*Why?* Because it brought no real benefit other than less typing, it added an unflexible and unnecessary layer of abstraction on top of redux, and it cause tight coupling of modules within the project.

## What I do instead
I refactored the project to use a structure similar to what [Jack Hsu describes on his blog](http://jaysoo.ca/2016/02/28/organizing-redux-application/).
I cannot recommend this structure highly enough! It is very simple, clean and easy to reason about :)

-----




```js
// redaction.js
import { createRedaction } from 'redux-redaction'
import rootReducer from './rootReducer';

const redaction = createRedaction(rootReducer);
export const actions = redaction.actions;
export const reducer = redaction.reducer;

/*
createRedaction returns: 
{
   actions: {
      togglePopup: () -> Action,
      addErrors: () -> Action,
      todos: {
         deleteTodos: () -> Action
      }
   },
   reducer: (state, action) -> state
}

Usage:
import { actions } from './redaction'
dispatch(actions.todos.deleteTodos({ id: '123' }));

*/
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
