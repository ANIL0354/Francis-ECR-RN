import React from 'react';
import { CheckBox, Icon } from 'react-native-elements';
import { Image } from 'react-native';
import styles from './style';

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
            containerStyle={styles.containerStyle}
            checkedIcon={<Image
                source={checkedIcon}
                style={styles.checkedIconStyle}
                height={15}
                width={15}
            />}
            uncheckedIcon={<Image
                source={uncheckedIcon}
                style={styles.unCheckedIconStyle}
                height={15}
                width={15}
            />}
            onPress={(event) => toggleCheck(event)}
            checked={checked}
        />
    )
}

export default Checkbox;