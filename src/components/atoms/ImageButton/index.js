import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const ImageButton = ({
    style,
    source,
    activeOpacity = 0.9,
    imageStyle,
    onPress = () => { },
}) => (
        <TouchableOpacity
            // onLayout
            activeOpacity={activeOpacity}
            style={[styles.button, style]}
            onPress={() => onPress()}>
            <Image
                resizeMode={'contain'}
                source={source}
                style={[styles.image, imageStyle]}
            />
        </TouchableOpacity>
    );
export default ImageButton;