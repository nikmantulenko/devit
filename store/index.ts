import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import actions from './actions';
import selectors from './selectors';

const store = configureStore({
    reducer: rootReducer,
});

export { actions, selectors };
export default store;
