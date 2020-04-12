import React from 'react';
import { CheckBox, Icon } from 'react-native-elements';
import { Image } from 'react-native';

const Checkbox = ({
    title = '',
    checked = false,
    toggleCheck,
    checkedIcon,
    uncheckedIcon
}) => {
    return (
        <CheckBox
            title={title}
            containerStyle={{ backgroundColor: 'transparent', marginLeft: 0, marginTop: -10, borderColor: 'transparent', paddingHorizontal: 0, }}
            checkedIcon={<Image source={checkedIcon} style={{ resizeMode: 'contain', height: 15, width: 15 }} height={80} width={80} />}
            uncheckedIcon={<Image source={uncheckedIcon} style={{ resizeMode: 'contain', height: 15, width: 15 }} height={80} width={80} />}
            onPress={(event) => toggleCheck(event)}
            checked={checked}
        />
    )
}

export default Checkbox;