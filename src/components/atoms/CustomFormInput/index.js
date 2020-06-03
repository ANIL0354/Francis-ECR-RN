/* eslint-disable prettier/prettier */
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
    takeErrorSpace = true,
    secureTextEntry = false,
    meta: { touched, error, visited },
    ...props
}) => {
    const validationMessage =
        touched && error ? error : '';
    const scaledFont = scaleText(fontSize);
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'black'}
                underlineColorAndroid={'transparent'}
                style={{
                    ...style,
                    ...styles.inputStyle,
                    fontSize: scaledFont.fontSize,
                    lineHeight: scaledFont.lineHeight,
                    height:
                        takeErrorSpace ? 2.5 * scaledFont.lineHeight : 2 * scaledFont.lineHeight,
                }}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
                {...input}
                {...props}
            />
            {(takeErrorSpace || !!validationMessage) && <Text style={{
                ...style,
                ...styles.errorTextStyle,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
                height: takeErrorSpace ? 2 * scaledFont.lineHeight : scaledFont.lineHeight,
            }}>{validationMessage}</Text>}
        </View>
    );
};

export default CustomFormInput;
