import { View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { TextInputProps, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { FieldRenderProps } from 'react-final-form';
import { FloatingLabelInput } from 'react-native-floating-label-input';

interface FieldInputProps<T> extends FieldRenderProps<T>, TextInputProps {
    labelStyle?: StyleProp<ViewStyle>
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
        labelStyle,
        containerStyle,
        textInputWrapperStyle,
        ...restProps
    } = props

    const showError = meta.submitFailed && !!meta.error

    return (
        <View>
            <View style={[textInputWrapperStyle, styles.field, meta.active && styles.activeField]}>
                <FloatingLabelInput
                    label={restProps.placeholder || ''}
                    staticLabel={false}
                    onChangeText={input.onChange}
                    onBlur={() => input.onBlur()}
                    onFocus={() => input.onFocus()}
                    value={input.value}
                    customLabelStyles={{
                        fontSizeFocused: styles.label.fontSize,
                        fontSizeBlurred: styles.label.fontSize,
                        topFocused: -30,
                        colorFocused: styles.label.color,
                        colorBlurred: styles.label.color,
                    }}
                    labelStyles={StyleSheet.flatten([styles.label, labelStyle])}
                    containerStyles={StyleSheet.flatten([styles.container, showError && styles.errorContainer, containerStyle])}
                    inputStyles={StyleSheet.flatten([styles.textInput, !!icon && styles.textInputWithIcon, style])}
                    {...restProps}
                />
                {!!icon && (
                    <TouchableWithoutFeedback onPress={onIconPress} hitSlop={{top: -3, right: -3, bottom: -3, left: -3}}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={icon}
                                style={styles.icon}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
            {/*{showError && <Text style={styles.errorMessage}>invalid</Text>}*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        height: 60,
        paddingTop: 25,
    },
    errorContainer: {
        borderBottomColor: 'tomato',
    },
    label: {
        color: '#9795A4',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
    },
    field: {
        flexDirection: 'row',
        maxWidth: 365,
        minWidth: 200,
    },
    activeField: {
    },
    textInput: {
        flex: 1,
        color: '#1F1D1D',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        textDecorationLine: 'none',
    },
    textInputWithIcon: {
        paddingRight: 28,
    },
    iconContainer: {
        position: 'absolute',
        right: 2,
        top: 28,
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