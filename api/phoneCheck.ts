// mocking api call entirely with dummy data
async function phoneCheck(phone: string, code: string): Promise<boolean> {
    await new Promise(r => setTimeout(r, 1000))

    if (code == '4444') {
        return false
    }

    return true
}

export default phoneCheck
