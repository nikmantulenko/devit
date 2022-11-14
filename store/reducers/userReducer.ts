import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions/userActions';
import { UserData } from '../../types';

const initialState = null;

export default createReducer<UserData | null>(initialState, builder => builder
    .addCase(actions.authorize, (state, action) => {
        return action.payload.data
    })
    .addCase(actions.updateUserData, (state, action) => {
        return action.payload.data
    })
    .addCase(actions.clear, () => initialState)
)
