import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import auth from './auth/authReducer'
import users from './users/userReducer'
import categories from './cat/catReducer'
import offres from './offres/offreReducer'

const intialState = {}

const middleware = [thunk]

const rootReducer = combineReducers ({
    auth,
    users,
    categories,
    offres
});

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;