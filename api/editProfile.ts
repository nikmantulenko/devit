import { AxiosError } from 'axios'

import { UserData } from '../types'

// mocking api call entirely with dummy data
async function editProfile(nextData: UserData): Promise<UserData> {
    await new Promise(r => setTimeout(r, 1000))

    if (nextData.name.startsWith('error')) {
        throw new AxiosError('internal error', '500')
    }

    return nextData
}

export default editProfile
