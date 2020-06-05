/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, Image, Platform } from 'react-native';
import { scaleText } from '../../../helpers';
import { EYE_ICON } from '../../../shared/constants';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                secureTextEntry={secureTextEntry}
                {...input}
                {...props}
            />
            {/* <TouchableOpacity style={{
               
                backgroundColor: 'red'
            }}> */}
            {secureTextEntry && showEye && <Image
                source={EYE_ICON}
                resizeMode={'contain'}
                style={{
                    position: 'absolute',
                    right: scaleText(10).fontSize,
                    top: scaleText(10).fontSize,
                    bottom: scaleText(5).fontSize,
                    height: scaleText(20).fontSize,
                    width: scaleText(20).fontSize,
                }}
            />}
            {/* </TouchableOpacity> */}
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
