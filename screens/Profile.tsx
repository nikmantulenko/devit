import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import editProfile from '../api/editProfile'
import { actions, selectors } from '../store';
import { UserData } from '../types'

export default function Profile(props: NativeStackScreenProps<any>) {
    const isUpdating = useSelector(selectors.isLoadingSelector('UPDATE_PROFILE'))
    const error = useSelector(selectors.errorMessageSelector('UPDATE_PROFILE'))
    const dispatch = useDispatch()

    const userData: UserData = props.route.params as any

    const handleChangeProfile = async () => {
        !!error && dispatch(actions.removeError('UPDATE_PROFILE'))
        dispatch(actions.loaderOn('UPDATE_PROFILE'))
        try {
            const newUserData = await editProfile({
                ...userData,
                name: /*'error' + */userData.name + '.',
            })
            props.navigation.setParams(newUserData)
        } catch (error: any) {
            dispatch(actions.addError('UPDATE_PROFILE', error.message))
        } finally {
            dispatch(actions.loaderOff('UPDATE_PROFILE'))
        }
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
                <Button title={'mock logout'} onPress={() => props.navigation.navigate('log-in')} />
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
