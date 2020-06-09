import { StyleSheet } from 'react-native';
import { scaleText } from '../../../helpers';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: scaleText(20).fontSize,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: 'rgba(0,0,0,0.2)',

    },
    iconStyle: {
        height: scaleText(50).fontSize,
        width: scaleText(30).fontSize,
        marginBottom: -1 * scaleText(30).fontSize,
        alignSelf: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    countStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginHorizontal: 2,
        color: 'orange'
    },
    relocationText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black'
    },
    placeRangeText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#4568c9'
    },
    buttonStyle: {
        backgroundColor: '#0091ff',
        width: scaleText(150).fontSize,
        alignSelf: 'center'
    },
    buttonTitleStyle: {
        color: 'white'
    },
});

export default styles;