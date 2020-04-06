import React from 'react';
import { CheckBox, Icon } from 'react-native-elements';

const Checkbox = ({
    title = '',
    checked = false,
    toggleCheck
}) => {
    return (
        <CheckBox
            title={title}
            containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', paddingHorizontal: 0 }}
            iconType='material'
            checkedIcon='check_box_outline_blank'
            uncheckedIcon='check_box_outline_blank'
            checkedColor='green'
            onPress={(event) => toggleCheck(event)}
            checked={checked}
        />
    )
}

export default Checkbox;