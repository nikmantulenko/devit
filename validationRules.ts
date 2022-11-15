export const password = (value: string): boolean => value.length >= 5

export default {
    password: (value?: any): boolean => {
        return (value || '').length <= 5
    },
    passwordConfirmation: (value?: any, values?: any): boolean => {
        return value === (values || {}).passwordConfirmation
    },
    username: (value?: any): boolean => {
        return (value || '').length <= 5
    },
    email: (value?: any): boolean => {
        return !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)
    },
    phone: (value?: any): boolean => {
        return (value || '').length <= 5
    },
    position: (value?: any): boolean => {
        return value != null && (value || '').length <= 5
    },
    skype: (value?: any): boolean => {
        return value != null && (value || '').length <= 5
    },
}