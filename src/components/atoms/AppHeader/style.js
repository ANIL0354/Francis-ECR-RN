import { StyleSheet } from 'react-native';
import { scaleText } from '../../../helpers';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        padding: 10,
        minHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    leftIconStyle: {
        height: scaleText(35).fontSize,
        width: scaleText(35).fontSize
    },
    centerIconWrapper: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerIconStyle: {
        marginLeft: 10,
        justifyContent: 'flex-start',
        height: 20,
        width: 20
    },
    rightIconStyle: {
        alignItems: 'flex-end',
        height: 20,
        width: 20
    }
});

export default styles;