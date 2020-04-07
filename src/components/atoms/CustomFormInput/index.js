import React from 'react';
import { View, Text, TextInput, PixelRatio } from 'react-native';
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
                style={{
                    borderColor: 'black',
                    borderRadius: 25,
                    borderWidth: 0.8,
                    marginVertical: 10,
                    fontSize: scaledFont.fontSize,
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
            }}>{validationMessage}</Text>
        </View>
    )
}

export default CustomFormInput;