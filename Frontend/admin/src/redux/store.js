import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import auth from './auth/authReducer'
import users from './users/userReducer'

const intialState = {}

const middleware = [thunk]

const rootReducer = combineReducers ({
    auth,
    users,
});

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;