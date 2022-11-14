import { RootState } from '../reducers'

export const errorMessageSelector = (key: string) => (state: RootState) => state.error[key]