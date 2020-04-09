import React from 'react';
import { CheckBox, Icon } from 'react-native-elements';
import { Image } from 'react-native';
import { CHECKBOX_ICON, CHECKBOX_ACTIVE } from '../../../shared/constants'

const Checkbox = ({
    title = '',
    checked = false,
    toggleCheck
}) => {
    return (
        <CheckBox
            title={title}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', paddingHorizontal: 0 }}
            // iconType={''}
            checkedIcon={<Image source={CHECKBOX_ACTIVE} height={50} width={50} />}
            uncheckedIcon={<Image source={CHECKBOX_ICON} height={50} width={50} />}
            // checkedColor='green'
            onPress={(event) => toggleCheck(event)}
            checked={checked}
        />
    )
}

export default Checkbox;