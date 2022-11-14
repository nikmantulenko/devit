import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import editProfile from '../api/editProfile'
import { actions, selectors } from '../store';

export default function Profile() {
    const userData = useSelector(selectors.userDataSelector)
    const isUpdating = useSelector(selectors.isLoadingSelector('UPDATE_PROFILE'))
    const error = useSelector(selectors.errorMessageSelector('UPDATE_PROFILE'))
    const dispatch = useDispatch()

    if (userData == null) {
        throw new Error('unexpected behavior')
    }

    const handleChangeProfile = async () => {
        !!error && dispatch(actions.removeError('UPDATE_PROFILE'))
        dispatch(actions.loaderOn('UPDATE_PROFILE'))
        try {
            const newUserData = await editProfile({
                ...userData,
                name: /*'error' + */userData.name + '.',
            })
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
                {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                {isUpdating && <ActivityIndicator color={'darkblue'} />}
                <Text>{JSON.stringify(userData)}</Text>
                <Button color={'tomato'} title={'edit profile'} onPress={handleChangeProfile} />
                <Button title={'logout'} onPress={handleLogOut} />
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
