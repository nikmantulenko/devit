import { RootState } from '../reducers'

export const isAuthorizedSelector = (state: RootState) => !!state.user?.userID
export const userDataSelector = (state: RootState) => state.user