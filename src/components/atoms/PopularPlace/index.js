import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from '../CustomButton';
import styles from './style';

const PopularPlace = ({
    icon,
    availableCount,
    placeRange,
    buttonText
}) => {
    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.iconStyle} />
            <View style={styles.textContainer}>
                <Text style={styles.countStyle}>{availableCount}</Text>
                <Text style={styles.relocationText}>{`vehicle available for relocation from`}</Text>
                <Text style={styles.placeRangeText}>{placeRange}</Text>
            </View>
            <CustomButton
                title={buttonText}
                titleStyle={{ color: 'white' }}
                buttonStyle={{ backgroundColor: '#0091ff', width: 150, alignSelf: 'center' }} />
        </View>
    )
}

export default PopularPlace;