import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FieldInput, PasswordInput, Button } from '../components';
import { actions, selectors } from '../store';
import validationRules from '../validationRules';
import apiLogIn from '../api/logIn'
import globalStyles from '../globalStyles';
// @ts-ignore
import LogoPNG from '../assets/logo.png';

type FormValues = {
    username: string,
    password: string,
}

export default function LogIn(props: NativeStackScreenProps<any>) {
    const loading = useSelector(selectors.isLoadingSelector('LOG_IN'))
    const error = useSelector(selectors.errorMessageSelector('LOG_IN'))
    const dispatch = useDispatch()

    const handleLogIn = async (values: FormValues) => {
        !!error && dispatch(actions.removeError('LOG_IN'))
        dispatch(actions.loaderOn('LOG_IN'))
        try {
            const userData = await apiLogIn(values)
            dispatch(actions.authorize(userData))
        } catch (error: any) {
            dispatch(actions.addError('LOG_IN', error.message))
        } finally {
            dispatch(actions.loaderOff('LOG_IN'))
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView contentContainerStyle={globalStyles.flexGrow1}>
                <Image source={LogoPNG} style={[styles.logo, globalStyles.mt5]} />
                <View style={styles.mainGap} />
                <Text style={[globalStyles.title, globalStyles.mb5]}>Log In To Workroom</Text>

                <Form<FormValues>
                    initialValues={{ username: '', password: '' }}
                    onSubmit={handleLogIn}
                    render={formProps => (
                        <View style={styles.formWrapper}>
                            {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                            <Field
                                name={'username'}
                                validate={validationRules.username}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        containerStyle={globalStyles.mb4}
                                        textContentType={'username'}
                                        keyboardType={'email-address'}
                                        autoCapitalize={'none'}
                                        placeholder={'Your Email'}
                                    />
                                )}
                            />
                            <Field
                                name={'password'}
                                validate={validationRules.password}
                                render={fieldProps => (
                                    <PasswordInput
                                        {...fieldProps}
                                        containerStyle={globalStyles.mb3}
                                        placeholder={'Password'}
                                    />
                                )}
                            />
                            <Text style={[globalStyles.text, globalStyles.textRight]}>Forgot password?</Text>
                            <Button
                                title={'Log In'}
                                style={[globalStyles.mt5, globalStyles.mb4]}
                                onPress={formProps.handleSubmit}
                                disabled={formProps.submitFailed && formProps.invalid}
                                loading={loading}
                            />
                        </View>
                    )}
                />

                <Text style={[globalStyles.text, globalStyles.textCenter, globalStyles.mb4]}>
                    New user?{' '}
                    <Text style={globalStyles.accentText} onPress={() => props.navigation.replace('register')}>Create Account</Text>
                </Text>

                <View style={globalStyles.flexGrow1} />
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
    mainGap: {
        flexGrow: 1,
        minHeight: 60,
    },
    errorMessage: {
        color: 'darkred',
    },
});
