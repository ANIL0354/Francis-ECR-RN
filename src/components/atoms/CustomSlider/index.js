import React, { useState } from 'react';
import { Slider } from 'react-native-elements';
import { View, Text } from 'react-native';
import styles from './style';

const CustomSlider = ({
    minValue = 0,
    maxValue = 15,
    step = 1,
    sliderValue,
    setSliderValue = () => { }
}) => {
    return (
        <View style={styles.sliderWrapper}>
            <Slider
                value={sliderValue}
                step={step}
                minimumValue={minValue}
                maximumValue={maxValue}
                style={{ flex: 7 }}
                onValueChange={value => setSliderValue(value)}
                trackStyle={styles.trackStyle}
                thumbStyle={styles.thumbStyle}
                thumbTintColor={'#0091ff'}
                minimumTrackTintColor={'#0091ff'}
                maximumTrackTintColor={'lightgray'}
            />
            <Text style={styles.valueIndicator}>{sliderValue}</Text>
        </View>
    )
}

export default CustomSlider;