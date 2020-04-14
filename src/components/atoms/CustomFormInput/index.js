import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { scaleText } from '../../../helpers';

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
                    borderColor: 'black',
                    borderRadius: 5,
                    borderWidth: 0.8,
                    height: 2.5 * scaledFont.lineHeight,
                    marginBottom: 10,
                    fontSize: scaledFont.fontSize,
                    lineHeight: scaledFont.lineHeight,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    paddingBottom: 0,
                    marginBottom: 0,
                    ...style
                }}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry}
                {...input}
                {...props}
            />
            <Text style={{
                color: 'red',
                paddingVertical: 0,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
                height: 2 * scaledFont.lineHeight,
                ...style
            }}>{validationMessage}</Text>
        </View>
    )
}

export default CustomFormInput;