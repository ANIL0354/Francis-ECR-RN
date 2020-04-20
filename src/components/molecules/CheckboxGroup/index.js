import React, { useState } from 'react';
import Checkbox from '../../atoms/Checkbox';
import { View } from 'react-native';
import { CHECKBOX_ACTIVE, CHECKBOX_ICON } from '../../../shared/constants'

const CheckboxGroup = ({
    checkboxOptions,
    selectedValue,
    setSelectedValue = () => { }
}) => {
    return (
        <View>
            {checkboxOptions.map((item, index) => (
                <Checkbox title={item.title}
                    checked={selectedValue === index}
                    checkedIcon={CHECKBOX_ACTIVE}
                    uncheckedIcon={CHECKBOX_ICON}
                    toggleCheck={(value) => setSelectedValue(index)}
                />
            ))}
        </View>
    )
};

export default CheckboxGroup;