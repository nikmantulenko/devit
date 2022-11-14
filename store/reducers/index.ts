import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
    error: errorReducer,
    loader: loaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;