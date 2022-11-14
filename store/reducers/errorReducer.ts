import lodash from 'lodash'
import { createReducer } from '@reduxjs/toolkit';

import * as actions from '../actions/errorActions';

const initialState: { [key: string]: string } = {}

export default createReducer(initialState, builder => builder
    .addCase(actions.addError, (state, action) => {
        return {...state, [action.payload.key]: action.payload.message}
    })
    .addCase(actions.removeError, (state, action) => {
        return lodash.omit(state, action.payload.key)
    })
    .addCase(actions.clear, () => initialState)
)
