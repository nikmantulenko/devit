import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function LogIn(props) {
    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>LOGIN SCREEN</Text>
                <Button title={'mock authorization'} onPress={() => props.navigation.navigate('profile')} />
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
