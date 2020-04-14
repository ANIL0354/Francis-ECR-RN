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
            containerStyle={{ backgroundColor: 'transparent', maxWidth: '80%', marginLeft: 0, marginTop: -10, borderColor: 'transparent', paddingHorizontal: 0, }}
            checkedIcon={<Image source={checkedIcon} style={{ height: 15, width: 15, resizeMode: 'center' }} height={15} width={15} />}
            uncheckedIcon={<Image source={uncheckedIcon} style={{ height: 15, width: 15, resizeMode: 'center' }} height={15} width={15} />}
            onPress={(event) => toggleCheck(event)}
            checked={checked}
        />
    )
}

export default Checkbox;