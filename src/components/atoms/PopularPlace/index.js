import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '../CustomButton';
import styles from './style';

const PopularPlace = ({
    icon,
    availableCount,
    placeRange,
    buttonText,
    onPress = () => { }
}) => {
    return (
        <View style={styles.container}>
            <Image source={icon} resizeMode={'contain'} style={styles.iconStyle} />
            <View style={styles.placeRangeContainer}>
                <Text style={styles.placeRangeText}>{placeRange}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.countStyle}>{availableCount}</Text>
                <Text style={styles.relocationText}>{`${availableCount > 1 ? 'relocations' : 'relocation'} available`}</Text>
            </View>
            <CustomButton
                title={buttonText}
                titleStyle={styles.buttonTitleStyle}
                onPress={onPress}
                buttonStyle={styles.buttonStyle} />
        </View>
    )
}

export default PopularPlace;