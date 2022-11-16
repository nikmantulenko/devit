import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
    onPress: () => void
    title: string
    style?: StyleProp<ViewStyle>
    disabled?: boolean
    loading?: boolean
}

function Button(props: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            disabled={props.disabled || props.loading}
        >
            <View style={[styles.container, props.style, (props.disabled || props.loading) && styles.disabledContainer]}>
                <Text style={styles.text}>{props.title}</Text>
                {props.loading && (
                    <View style={styles.loader}>
                        <ActivityIndicator color={'darkblue'} />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 62,
        maxWidth: 365,
        minWidth: 200,
        backgroundColor: '#FFC612',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledContainer: {
        backgroundColor: 'lightgray',
    },
    text: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#1F1D1D',
    },
    loader: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 62,
        width: 62,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Button
