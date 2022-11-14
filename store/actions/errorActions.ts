import { createAction } from '@reduxjs/toolkit';

export const addError = createAction('ADD_ERROR', (key: string, message: string) => ({ payload: { key, message } }))
export const removeError = createAction('REMOVE_ERROR', (key: string) => ({ payload: { key } }))
export const clear = createAction<null, 'CLEAR'>('CLEAR')
