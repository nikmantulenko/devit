import { AxiosError } from 'axios'

// mocking api call entirely with dummy data
async function requestPhoneCheck(phone: string): Promise<true> {
    await new Promise(r => setTimeout(r, 1000))

    // imitate sms

    // let errors rise
    if (phone.startsWith('+7')) {
        throw new AxiosError('invalid data', '401')
    }

    return true
}

export default requestPhoneCheck
