import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Profile(props) {
    return (
        <>
            <StatusBar style="auto" />

            <View style={styles.container}>
                <Text>PROFILE</Text>
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
});
