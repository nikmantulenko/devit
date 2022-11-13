import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import apiRegister from '../api/register'
import apiPhoneCheck from '../api/phoneCheck'
import apiRequestPhoneCheck from '../api/requestPhoneCheck'

export default function Register(props: NativeStackScreenProps<any>) {
    const [status, setStatus] = useState('INITIAL')

    const registerData = {
        name: 'testname',
        email: 'test@gmail.com',
        password: '1234',
        phone: '+3801111111111',
    }

    const handleRequestPhoneCheck = () => apiRequestPhoneCheck(registerData.phone)
        .then(() => setStatus('REQUESTED'))
        .catch(() => setStatus('ERROR'))
    const handlePhoneCheck = () => apiPhoneCheck(registerData.phone, '1111')
        .then(() => setStatus('CONFIRMED'))
        .catch(() => setStatus('ERROR'))
    const handleRegister = () => apiRegister(registerData)
        .then(userData => props.navigation.navigate('profile', userData))
        .catch(() => setStatus('ERROR'))

    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>REGISTER SCREEN</Text>
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
                <Button
                    color={'tomato'}
                    title={'register'}
                    onPress={handleRegister}
                    disabled={status !== 'CONFIRMED'}
                />
                <Button title={'to login'} onPress={() => props.navigation.navigate('log-in')} />
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
