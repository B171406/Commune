import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from '/home/quanteon/notebook1/notebook-ui/src/store/reducers/notesReducer.js'; // Adjust path as per your project structure

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
    // other middleware if any
  )
);

export default store;
