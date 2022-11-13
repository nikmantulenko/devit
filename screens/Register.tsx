import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function Register(props: NativeStackScreenProps<any>) {
    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>REGISTER SCREEN</Text>
                <Button title={'mock authorization'} onPress={() => props.navigation.navigate('profile')} />
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