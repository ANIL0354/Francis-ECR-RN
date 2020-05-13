import { StyleSheet } from 'react-native';
import { scaleText } from '../../../helpers';

const styles = StyleSheet.create({
    customIconStyle: {
        height: scaleText(15).fontSize,
        width: scaleText(15).fontSize,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export default styles;