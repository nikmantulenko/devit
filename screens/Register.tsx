import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import apiRegister from '../api/register'
import apiPhoneCheck from '../api/phoneCheck'
import apiRequestPhoneCheck from '../api/requestPhoneCheck'
import { FieldInput, PasswordInput } from '../components';
import validationRules from '../validationRules';
import { actions, selectors } from '../store';

type FormValues = {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    phone: string,
}

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
    const dummyPhone = '+3801111111111'

    const handleRequestPhoneCheck = async () => {
        !!requestCheckError && dispatch(actions.removeError('REQUEST_PHONE_CHECK'))
        dispatch(actions.loaderOn('REQUEST_PHONE_CHECK'))
        try {
            await apiRequestPhoneCheck(dummyPhone)
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
            await apiPhoneCheck(dummyPhone, '1111')
            setStatus('CONFIRMED')
        } catch (error: any) {
            dispatch(actions.addError('PHONE_CHECK', error.message))
        } finally {
            dispatch(actions.loaderOff('PHONE_CHECK'))
        }
    }

    const handleRegister = async (values: FormValues) => {
        !!registrationError && dispatch(actions.removeError('REGISTRATION'))
        dispatch(actions.loaderOn('REGISTRATION'))
        try {
            const userData = await apiRegister(values)
            dispatch(actions.authorize(userData))
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

                <Form<FormValues>
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirmation: '',
                        phone: dummyPhone,
                    }}
                    onSubmit={handleRegister}
                    render={formProps => (
                        <View>
                            {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                            {loading && <ActivityIndicator color={'darkblue'} />}
                            <Field
                                name={'phone'}
                                validate={validationRules.phone}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        editable={false}
                                        textContentType={'telephoneNumber'}
                                        placeholder={'380 00 000 000 00'}
                                    />
                                )}
                            />
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
                            <Field
                                name={'name'}
                                validate={validationRules.username}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        textContentType={'username'}
                                        placeholder={'name'}
                                    />
                                )}
                            />
                            <Field
                                name={'email'}
                                validate={validationRules.email}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        textContentType={'emailAddress'}
                                        placeholder={'email'}
                                    />
                                )}
                            />
                            <Field
                                name={'password'}
                                validate={validationRules.password}
                                render={fieldProps => (
                                    <PasswordInput
                                        {...fieldProps}
                                        placeholder={'password'}
                                    />
                                )}
                            />
                            <Field
                                name={'passwordConfirmation'}
                                validate={validationRules.passwordConfirmation}
                                render={fieldProps => (
                                    <PasswordInput
                                        {...fieldProps}
                                        placeholder={'password'}
                                    />
                                )}
                            />
                            <Button
                                color={'tomato'}
                                title={'register'}
                                onPress={formProps.handleSubmit}
                                disabled={
                                    status !== 'CONFIRMED' ||
                                    formProps.submitFailed && formProps.invalid
                                }
                            />
                            <Button title={'to login'} onPress={() => props.navigation.navigate('log-in')} />
                        </View>
                    )}
                />
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
