import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';

import editProfile from '../api/editProfile'
import { FieldInput, Button } from '../components';
import validationRules from '../validationRules';
import { actions, selectors } from '../store';
import globalStyles from '../globalStyles';
// @ts-ignore
import NoAvatar from '../assets/no-avatar.png';

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
        <View style={styles.container}>
            <StatusBar style="auto" />

            <ScrollView contentContainerStyle={globalStyles.flexGrow1}>
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
                        <View style={styles.formWrapper}>
                            <View style={[styles.logOutContainer, globalStyles.mt5, globalStyles.mb4]}>
                                <Text style={styles.logOut} />
                                <Text style={[globalStyles.title, styles.logOut, styles.fs18]}>Edit Profile</Text>
                                <Text style={[globalStyles.accentText, globalStyles.textRight, styles.logOut, styles.fs16]} onPress={handleLogOut}>Log Out</Text>
                            </View>

                            <View style={globalStyles.mb4}>
                                <Image source={NoAvatar} style={styles.avatar} />
                                <Text style={globalStyles.title}>{userData.name}</Text>
                                {!!userData.position && <Text style={[globalStyles.text, globalStyles.textCenter]}>{userData.position}</Text>}
                            </View>

                            {!!error && <Text style={styles.errorMessage}>{error}</Text>}
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
                                name={'phone'}
                                validate={validationRules.phone}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        containerStyle={globalStyles.mb4}
                                        editable={false}
                                        textContentType={'telephoneNumber'}
                                        placeholder={'380 00 000 000 00'}
                                    />
                                )}
                            />
                            <Field
                                name={'position'}
                                validate={validationRules.position}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        containerStyle={globalStyles.mb4}
                                        placeholder={'position'}
                                    />
                                )}
                            />
                            <Field
                                name={'skype'}
                                validate={validationRules.skype}
                                render={fieldProps => (
                                    <FieldInput
                                        {...fieldProps}
                                        placeholder={'skype'}
                                    />
                                )}
                            />
                            <Button
                                title={'Save'}
                                style={[globalStyles.mt4, globalStyles.mb4]}
                                onPress={formProps.handleSubmit}
                                loading={isUpdating}
                            />
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
    logOutContainer: {
        flexDirection: 'row',
    },
    logOut: {
        flexBasis: '33%',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 999,
        alignSelf: 'center',
    },
    fs16: {
        fontSize: 16,
    },
    fs18: {
        fontSize: 18,
    },
    errorMessage: {
        color: 'darkred',
    },
});
