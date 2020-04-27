import React, { useState, useEffect } from 'react';
import Checkbox from '../../atoms/Checkbox';
import { View } from 'react-native';
import { CHECKBOX_ACTIVE, CHECKBOX_ICON } from '../../../shared/constants'

const MultiCheckGroup = ({
    checkboxOptions,
    selectedValue = new Set(),
    setSelectedValue = () => { }
}) => {
    console.log('selectedValue', selectedValue)
    const [checkUpdated, setCheckUpdated] = useState(false);
    useEffect(() => {
        console.log('updated')
        setCheckUpdated(!checkUpdated);
    }, [selectedValue.size])
    return (
        <View>
            {checkboxOptions.map((item, index) => (
                <Checkbox title={item.title}
                    checked={selectedValue.has(index)}
                    checkedIcon={CHECKBOX_ACTIVE}
                    checkUpdated={checkUpdated}
                    uncheckedIcon={CHECKBOX_ICON}
                    toggleCheck={(value) => setSelectedValue(index)}
                />
            ))}
        </View>
    )
};

export default MultiCheckGroup;