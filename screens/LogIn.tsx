import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { FieldInput, PasswordInput } from '../components';
import { actions, selectors } from '../store';
import apiLogIn from '../api/logIn'

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
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>LOGIN SCREEN</Text>

                <Form<FormValues>
                    initialValues={{ username: '', password: '' }}
                    onSubmit={handleLogIn}
                    render={formProps => (
                        <View>
                            {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                            {loading && <ActivityIndicator color={'darkblue'} />}
                            <Field
                                name={'username'}
                                validate={value => value.length <= 5}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        textContentType={'username'}
                                        placeholder={'username'}
                                    />
                                )}
                            />
                            <Field
                                name={'password'}
                                validate={value => value.length <= 5}
                                render={fieldProps => (
                                    <PasswordInput
                                        {...fieldProps}
                                        placeholder={'password'}
                                        initialSecure={true}
                                    />
                                )}
                            />
                            <Button
                                disabled={formProps.submitFailed && formProps.invalid}
                                color={'tomato'}
                                title={'log in'}
                                onPress={formProps.handleSubmit}
                            />
                        </View>
                    )}
                />

                <Button
                    title={'to register'}
                    onPress={() => props.navigation.navigate('register')}
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
