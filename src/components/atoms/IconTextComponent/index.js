import React from 'react';
import { View, Image, Text } from 'react-native';
import { scaleText } from '../../../helpers';

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
        <View style={{ flexDirection: iconLeftAlign ? 'row' : 'row-reverse', ...containerStyle }}>
            <Image style={{
                ...iconStyle,
                marginRight: iconLeftAlign ? 5 : 0,
                alignSelf: 'center'
            }} source={icon} />
            <Text style={{
                ...titleStyle,
                fontSize: scaledFont.fontSize
            }}>{title}</Text>
        </View>
    )
};

export default IconText;