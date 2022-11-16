import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import apiRegister from '../api/register'
import apiPhoneCheck from '../api/phoneCheck'
import apiRequestPhoneCheck from '../api/requestPhoneCheck'
import { FieldInput, PasswordInput, Button } from '../components';
import validationRules from '../validationRules';
import { actions, selectors } from '../store';
import globalStyles from '../globalStyles';
// @ts-ignore
import LogoPNG from '../assets/logo.png';

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
        <View style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView contentContainerStyle={globalStyles.flexGrow1}>
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
                        <View style={styles.formWrapper}>
                            <Image source={LogoPNG} style={[styles.logo, globalStyles.mt5]} />
                            <Text style={[globalStyles.title, globalStyles.mb5]}>Sign Up To Workroom</Text>

                            {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                            <Field
                                name={'phone'}
                                validate={validationRules.phone}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        containerStyle={globalStyles.mb2}
                                        editable={false}
                                        textContentType={'telephoneNumber'}
                                        placeholder={'380 00 000 000 00'}
                                    />
                                )}
                            />
                            {status === 'INITIAL' && (
                                <Button
                                    title={'request check'}
                                    style={globalStyles.mb2}
                                    onPress={handleRequestPhoneCheck}
                                    disabled={status !== 'INITIAL'}
                                    loading={isRequestingCheck}
                                />
                            )}
                            {status === 'REQUESTED' && (
                                <Button
                                    title={'verify'}
                                    style={globalStyles.mb2}
                                    onPress={handlePhoneCheck}
                                    disabled={status !== 'REQUESTED'}
                                    loading={isChecking}
                                />
                            )}
                            <Field
                                name={'name'}
                                validate={validationRules.username}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        containerStyle={globalStyles.mb4}
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
                                        containerStyle={globalStyles.mb4}
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
                                        containerStyle={globalStyles.mb4}
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
                                title={'Next'}
                                style={[globalStyles.mt5, globalStyles.mb4]}
                                onPress={formProps.handleSubmit}
                                disabled={
                                    status !== 'CONFIRMED' ||
                                    formProps.submitFailed && formProps.invalid
                                }
                                loading={isSigningIn}
                            />
                            <Text style={[globalStyles.text, globalStyles.textCenter, globalStyles.mb4]}>
                                Have Account?{' '}
                                <Text style={globalStyles.accentText} onPress={() => props.navigation.replace('log-in')}>Log In</Text>
                            </Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formWrapper: {
        paddingHorizontal: 32,
    },
    logo: {
        width: 68,
        height: 90,
        alignSelf: 'center',
    },
    errorMessage: {
        color: 'darkred',
    },
});
