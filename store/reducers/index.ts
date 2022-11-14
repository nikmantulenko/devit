import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import loaderReducer from './loaderReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    error: errorReducer,
    loader: loaderReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;