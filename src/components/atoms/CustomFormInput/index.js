import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { scaleText } from '../../../helpers';
import styles from './style';

const CustomFormInput = ({
    label,
    onChangeText,
    input,
    style,
    placeholder,
    fontSize = 14,
    returnKeyType,
    secureTextEntry = false,
    meta: { touched, error, visited },
    ...props
}) => {
    const validationMessage =
        touched && error ? error : '';
    const scaledFont = scaleText(fontSize)
    return (
        <View style={{ justifyContent: 'center' }}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'black'}
                underlineColorAndroid={"transparent"}
                style={{
                    ...style,
                    ...styles.inputStyle,
                    fontSize: scaledFont.fontSize,
                    lineHeight: scaledFont.lineHeight,
                    height: 2.5 * scaledFont.lineHeight,
                }}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
                {...input}
                {...props}
            />
            <Text style={{
                ...style,
                ...styles.errorTextStyle,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
                height: 2 * scaledFont.lineHeight,
            }}>{validationMessage}</Text>
        </View>
    )
}

export default CustomFormInput;