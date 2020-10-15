/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../helpers';

const styles = StyleSheet.create({
    closeButtonWrapper: {
        padding: scaleText(5).fontSize,
        borderRadius: scaleText(10).fontSize,
    },
    closeButtonText: {
        color: 'white',
        fontSize: scaleText(24).fontSize,
        textAlign: 'right',
        margin: scaleText(10).fontSize,
    },
});

export default styles;
