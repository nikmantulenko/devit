import { TextInput, View, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { TextInputProps, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { FieldRenderProps } from 'react-final-form';

interface FieldInputProps<T> extends FieldRenderProps<T>, TextInputProps {
    containerStyle?: StyleProp<ViewStyle>
    textInputWrapperStyle?: StyleProp<ViewStyle>
    icon?: ImageSourcePropType
    onIconPress?: () => void
}

function FieldInput<T extends string>(props: FieldInputProps<T>) {
    const {
        input,
        meta,
        onIconPress,
        icon,
        style,
        containerStyle,
        textInputWrapperStyle,
        ...restProps
    } = props

    return (
        <View style={[containerStyle, styles.container]}>
            <View style={[textInputWrapperStyle, styles.field, meta.active && styles.activeField]}>
                <TextInput
                    onChangeText={input.onChange}
                    onBlur={() => input.onBlur()}
                    onFocus={() => input.onFocus()}
                    value={input.value}
                    style={[styles.textInput, style]}
                    {...restProps}
                />
                {!!icon && (
                    <TouchableWithoutFeedback onPress={onIconPress}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={icon}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
            {(meta.submitFailed && meta.error) && <Text style={styles.errorMessage}>invalid</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
    },
    field: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
    },
    activeField: {
        borderBottomColor: 'darkblue',
    },
    textInput: {
        width: 120,
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        top: 4
    },
    icon: {
        height: 24,
        width: 24,

    },
    errorMessage: {
        color: 'orangered',
    },
});

export default FieldInput