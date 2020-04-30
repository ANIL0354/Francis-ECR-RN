import React from 'react';
import { View, Image, Text } from 'react-native';
import { scaleText } from '../../../helpers';
import styles from './style';

const IconText = ({
    icon,
    title,
    iconStyle,
    titleStyle,
    titleFontSize,
    iconLeftAlign = true,
    containerStyle
}) => {
    const scaledFont = scaleText(titleFontSize)
    return (
        <View style={{
            ...containerStyle,
            flexDirection: iconLeftAlign ? 'row' : 'row-reverse',
        }}>
            <Image style={{
                ...iconStyle,
                ...styles.customIconStyle,
                marginRight: iconLeftAlign ? 5 : 0,
            }} source={icon} />
            <Text style={{
                ...titleStyle,
                fontSize: scaledFont.fontSize
            }}>{title}</Text>
        </View>
    )
};

export default IconText;