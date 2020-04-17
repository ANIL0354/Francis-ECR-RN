import React, { useState } from 'react';
import { Slider } from 'react-native-elements';
import { View, Text } from 'react-native';

const CustomSlider = ({
    minValue = 0,
    maxValue = 10,
    step = 1
}) => {
    const [value, setValue] = useState(0);
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Slider
                value={value}
                step={step}
                minimumValue={minValue}
                maximumValue={maxValue}
                style={{ flex: 7 }}
                onValueChange={value => setValue(value)}
                trackStyle={{
                    height: 6,
                    borderRadius: 5
                }}
                thumbTintColor={'#0091ff'}
                minimumTrackTintColor={'#0091ff'}
                maximumTrackTintColor={'lightgray'}
            />
            <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center', maxHeight: 35, fontSize: 16 }}>{value}</Text>
        </View>
    )
}

export default CustomSlider;