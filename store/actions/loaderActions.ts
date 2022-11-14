import { createAction } from '@reduxjs/toolkit';

export const loaderOn = createAction('LOADER_ON', (key: string) => ({ payload: { key }}))
export const loaderOff = createAction('LOADER_OFF', (key: string) => ({ payload: { key }}))
export const clear = createAction<null, 'CLEAR'>('CLEAR')
