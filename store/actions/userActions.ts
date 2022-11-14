import { createAction } from '@reduxjs/toolkit';

// use type aliases in real live project
import { UserData } from '../../types'

export const authorize = createAction('AUTHORIZE', (data: UserData) => ({ payload: { data }}))
export const updateUserData = createAction('UPDATE_USER_DATA', (data: UserData) => ({ payload: { data }}))
export const clear = createAction<null, 'CLEAR'>('CLEAR')
