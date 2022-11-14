import lodash from 'lodash';
import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions/loaderActions';

const initialState: string[] = [];

export default createReducer(initialState, builder => builder
    .addCase(actions.loaderOn, (state, action) => {
        return lodash.uniq([...state, action.payload.key])
    })
    .addCase(actions.loaderOff, (state, action) => {
        return state.filter(key => key !== action.payload.key)
    })
    .addCase(actions.clear, () => initialState)
)
