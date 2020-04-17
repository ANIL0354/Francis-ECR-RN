import React from 'react';
import { Button } from 'react-native-elements';

const CustomButton = ({
    icon = null,
    titleStyle = {},
    iconContainerStyle = {},
    buttonStyle = {},
    title = 'Click here',
    onPress = () => { }
}) => {
    return (
        <Button
            icon={icon}
            title={title}
            titleStyle={titleStyle}
            iconContainerStyle={iconContainerStyle}
            buttonStyle={buttonStyle}
            onPress={onPress}
        />
    )
}

export default CustomButton;