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
            containerStyle={{ backgroundColor: 'transparent', marginLeft: 0, borderColor: 'transparent', paddingHorizontal: 0, }}
            // iconType={''}
            checkedIcon={<Image source={CHECKBOX_ACTIVE} style={{ resizeMode: 'contain', height: 15, width: 15 }} height={80} width={80} />}
            uncheckedIcon={<Image source={CHECKBOX_ICON} style={{ resizeMode: 'contain', height: 15, width: 15 }} height={80} width={80} />}
            // checkedColor='green'
            onPress={(event) => toggleCheck(event)}
            checked={checked}
        />
    )
}

export default Checkbox;