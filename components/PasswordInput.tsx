import { useCallback, useState } from 'react';
// @ts-ignore
import PasswordUnsecurePNG from '../assets/favicon.png';
// @ts-ignore
import PasswordSecurePNG from '../assets/icon.png';

import FieldInput from './FieldInput'

type PasswordInputProps = Parameters<typeof FieldInput>[0] & {
    initialSecure?: boolean
}

PasswordInput.defaultProps = {
    initialSecure: true,
    textContentType: 'password',
}

function PasswordInput(props: PasswordInputProps) {
    const { initialSecure, ...restProps } = props

    const [secure, setSecure] = useState(initialSecure)
    const handleIconPress = useCallback(() => setSecure(secure => !secure), [])

    return (
        <FieldInput
            {...restProps}
            secureTextEntry={secure}
            icon={secure ? PasswordSecurePNG : PasswordUnsecurePNG}
            onIconPress={handleIconPress}
        />
    )
}

export default PasswordInput
