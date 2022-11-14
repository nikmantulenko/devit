import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { actions, selectors } from '../store';
import apiLogIn from '../api/logIn'

export default function LogIn(props: NativeStackScreenProps<any>) {
    const loading = useSelector(selectors.isLoadingSelector('LOG_IN'))
    const error = useSelector(selectors.errorMessageSelector('LOG_IN'))
    const dispatch = useDispatch()

    const handleLogIn = async () => {
        !!error && dispatch(actions.removeError('LOG_IN'))
        dispatch(actions.loaderOn('LOG_IN'))
        try {
            const userData = await apiLogIn({ username: 'testname', password: '1234' })
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
                {!!error && <Text style={styles.errorMessage}>{error}</Text>}
                {loading && <ActivityIndicator color={'darkblue'} />}
                <Button disabled={loading} color={'tomato'} title={'log in'} onPress={handleLogIn} />
                <Button title={'to register'} onPress={() => props.navigation.navigate('register')} />
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
