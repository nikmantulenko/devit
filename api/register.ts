import { AxiosError } from 'axios'

import { UserData } from '../types'

type RegisterData = {
    name: string,
    email: string,
    password: string,
    phone: string,
}

// mocking api call entirely with dummy data
async function register(data: RegisterData): Promise<UserData> {
    await new Promise(r => setTimeout(r, 1000))

    if (data.name.startsWith('error')) {
        throw new AxiosError('internal error', '500')
    }

    return {
        token: 'random_QSPVPCtmZbkcJgpqtmzssdMSRKXhV71rgklL',
        userID: '1',
        name: data.name,
        email: data.email,
        phone: data.phone,
    }
}

export default register
