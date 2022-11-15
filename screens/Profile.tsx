import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';

import editProfile from '../api/editProfile'
import { FieldInput } from '../components';
import { actions, selectors } from '../store';

type FormValues = {
    name: string,
    email: string,
    phone: string,
    position: string,
    skype: string,
}

export default function Profile() {
    const userData = useSelector(selectors.userDataSelector)
    const isUpdating = useSelector(selectors.isLoadingSelector('UPDATE_PROFILE'))
    const error = useSelector(selectors.errorMessageSelector('UPDATE_PROFILE'))
    const dispatch = useDispatch()

    if (userData == null) {
        throw new Error('unexpected behavior')
    }

    const handleChangeProfile = async (values: FormValues) => {
        !!error && dispatch(actions.removeError('UPDATE_PROFILE'))
        dispatch(actions.loaderOn('UPDATE_PROFILE'))
        try {
            const newUserData = await editProfile({...userData, ...values})
            dispatch(actions.updateUserData(newUserData))
        } catch (error: any) {
            dispatch(actions.addError('UPDATE_PROFILE', error.message))
        } finally {
            dispatch(actions.loaderOff('UPDATE_PROFILE'))
        }
    }

    const handleLogOut = () => {
        dispatch({ type: 'CLEAR' })
    }

    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>PROFILE</Text>

                <Form<FormValues>
                    initialValues={{
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone,
                        position: userData.position || '',
                        skype: userData.skype || '',
                    }}
                    onSubmit={handleChangeProfile}
                    render={formProps => (
                        <View>
                            {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                            {isUpdating && <ActivityIndicator color={'darkblue'} />}
                            <Field
                                name={'name'}
                                validate={value => value.length <= 5}
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
                                validate={value => value.length <= 5}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        textContentType={'emailAddress'}
                                        placeholder={'email'}
                                    />
                                )}
                            />
                            <Field
                                name={'phone'}
                                validate={value => value.length <= 5}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        editable={false}
                                        textContentType={'telephoneNumber'}
                                        placeholder={'380 00 000 000 00'}
                                    />
                                )}
                            />
                            <Field
                                name={'position'}
                                validate={value => value !== '' && value.length <= 5}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        placeholder={'position'}
                                    />
                                )}
                            />
                            <Field
                                name={'skype'}
                                validate={value => value !== '' && value.length <= 5}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        placeholder={'skype'}
                                    />
                                )}
                            />
                            <Button color={'tomato'} title={'edit profile'} onPress={formProps.handleSubmit} />
                            <Button title={'logout'} onPress={handleLogOut} />
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
