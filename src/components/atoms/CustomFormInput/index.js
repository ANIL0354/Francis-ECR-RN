/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { scaleText } from '../../../helpers';
import { EYE_ICON, EYE_OFF_ICON } from '../../../shared/constants';
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
    showEye = true,
    multiline = false,
    meta: { touched, error, visited },
    ...props
}) => {
    const validationMessage =
        touched && error ? error : '';
    const scaledFont = scaleText(fontSize);
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'black'}
                underlineColorAndroid={'transparent'}
                multiline={multiline}
                style={{
                    ...style,
                    ...styles.inputStyle,
                    fontSize: scaledFont.fontSize,
                    lineHeight: scaledFont.lineHeight,
                    textAlignVertical: multiline ? 'top' : 'center',
                    height:
                        multiline ? 10 * scaledFont.lineHeight : takeErrorSpace ? 2.5 * scaledFont.lineHeight : 2 * scaledFont.lineHeight,
                }}
                returnKeyType={returnKeyType}
                secureTextEntry={secureTextEntry && !passwordVisible}
                {...input}
                {...props}
            />
            {secureTextEntry && showEye && <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{
                    position: 'absolute',
                    right: scaleText(0).fontSize,
                    top: scaleText(takeErrorSpace ? 10 : 7).fontSize,
                    bottom: scaleText(takeErrorSpace ? 10 : 7).fontSize,
                    height: scaleText(30).fontSize,
                    width: scaleText(30).fontSize,
                }}>
                <Image
                    source={passwordVisible ? EYE_OFF_ICON : EYE_ICON}
                    resizeMode={'contain'}
                    height={scaleText(20).fontSize}
                    width={scaleText(20).fontSize}
                    style={{
                        height: scaleText(20).fontSize,
                        width: scaleText(20).fontSize,
                    }}
                />
            </TouchableOpacity>}
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
