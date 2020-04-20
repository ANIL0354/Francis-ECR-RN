import React, { useState } from 'react';
import { Slider } from 'react-native-elements';
import { View, Text } from 'react-native';

const CustomSlider = ({
    minValue = 0,
    maxValue = 10,
    step = 1,
    sliderValue,
    setSliderValue = () => { }
}) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Slider
                value={sliderValue}
                step={step}
                minimumValue={minValue}
                maximumValue={maxValue}
                style={{ flex: 7 }}
                onValueChange={value => setSliderValue(value)}
                trackStyle={{
                    height: 6,
                    borderRadius: 5
                }}
                thumbTintColor={'#0091ff'}
                minimumTrackTintColor={'#0091ff'}
                maximumTrackTintColor={'lightgray'}
            />
            <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center', maxHeight: 35, fontSize: 16 }}>{sliderValue}</Text>
        </View>
    )
}

export default CustomSlider;