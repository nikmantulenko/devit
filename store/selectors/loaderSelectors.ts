import { RootState } from '../reducers'

export const isLoadingSelector = (key: string) => (state: RootState) => state.loader.some(lKey => lKey === key)
