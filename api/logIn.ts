import { AxiosError } from 'axios'

import { UserData } from '../types'

// mocking api call entirely with dummy data
async function logIn(creds: { username: string, password: string }): Promise<UserData> {
    await new Promise(r => setTimeout(r, 1000))

    if (creds.username.startsWith('error')) {
        throw new AxiosError('incorrect credentials', '401')
    }

    return {
        token: 'random_QSPVPCtmZbkcJgpqtmzssdMSRKXhV71rgklL',
        userID: '1',
        name: creds.username,
        email: 'test@gmail.com',
        phone: '+3801122333',
    }
}

export default logIn
