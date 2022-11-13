import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import apiLogIn from '../api/logIn'

export default function LogIn(props: NativeStackScreenProps<any>) {
    const handleLogIn = () => {
        const creds = {
            username: 'testname',
            password: '1234',
        }
        apiLogIn(creds).then(userData => props.navigation.navigate('profile', userData))
    }

    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>LOGIN SCREEN</Text>
                <Button color={'tomato'} title={'log in'} onPress={handleLogIn} />
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
});
