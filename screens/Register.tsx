import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import apiRegister from '../api/register'
import apiPhoneCheck from '../api/phoneCheck'
import apiRequestPhoneCheck from '../api/requestPhoneCheck'
import { actions, selectors } from '../store';

export default function Register(props: NativeStackScreenProps<any>) {
    const isRequestingCheck = useSelector(selectors.isLoadingSelector('REQUEST_PHONE_CHECK'))
    const isChecking = useSelector(selectors.isLoadingSelector('PHONE_CHECK'))
    const isSigningIn = useSelector(selectors.isLoadingSelector('REGISTRATION'))
    const requestCheckError = useSelector(selectors.errorMessageSelector('REQUEST_PHONE_CHECK'))
    const checkError = useSelector(selectors.errorMessageSelector('PHONE_CHECK'))
    const registrationError = useSelector(selectors.errorMessageSelector('REGISTRATION'))
    const dispatch = useDispatch()

    const [status, setStatus] = useState('INITIAL')

    const error = requestCheckError || checkError || registrationError
    const loading = isRequestingCheck || isChecking || isSigningIn
    const registerData = {
        name: 'testname',
        email: 'test@gmail.com',
        password: '1234',
        phone: '+3801111111111',
    }

    const handleRequestPhoneCheck = async () => {
        !!requestCheckError && dispatch(actions.removeError('REQUEST_PHONE_CHECK'))
        dispatch(actions.loaderOn('REQUEST_PHONE_CHECK'))
        try {
            await apiRequestPhoneCheck(registerData.phone)
            setStatus('REQUESTED')
        } catch (error: any) {
            dispatch(actions.addError('REQUEST_PHONE_CHECK', error.message))
        } finally {
            dispatch(actions.loaderOff('REQUEST_PHONE_CHECK'))
        }
    }

    const handlePhoneCheck = async () => {
        !!checkError && dispatch(actions.removeError('PHONE_CHECK'))
        dispatch(actions.loaderOn('PHONE_CHECK'))
        try {
            await apiPhoneCheck(registerData.phone, '1111')
            setStatus('CONFIRMED')
        } catch (error: any) {
            dispatch(actions.addError('PHONE_CHECK', error.message))
        } finally {
            dispatch(actions.loaderOff('PHONE_CHECK'))
        }
    }

    const handleRegister = async () => {
        !!registrationError && dispatch(actions.removeError('REGISTRATION'))
        dispatch(actions.loaderOn('REGISTRATION'))
        try {
            const userData = await apiRegister(registerData)
            props.navigation.navigate('profile', userData)
            setStatus('CONFIRMED')
        } catch (error: any) {
            dispatch(actions.addError('REGISTRATION', error.message))
        } finally {
            dispatch(actions.loaderOff('REGISTRATION'))
        }
    }

    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>REGISTER SCREEN</Text>
                {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                {loading && <ActivityIndicator color={'darkblue'} />}
                <Button
                    color={'tomato'}
                    title={'request check'}
                    onPress={handleRequestPhoneCheck}
                    disabled={status !== 'INITIAL'}
                />
                <Button
                    color={'tomato'}
                    title={'verify'}
                    onPress={handlePhoneCheck}
                    disabled={status !== 'REQUESTED'}
                />
                <Button
                    color={'tomato'}
                    title={'register'}
                    onPress={handleRegister}
                    disabled={status !== 'CONFIRMED'}
                />
                <Button title={'to login'} onPress={() => props.navigation.navigate('log-in')} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMessage: {
        color: 'darkred',
    },
});
