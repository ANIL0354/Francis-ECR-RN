import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    sliderWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    trackStyle: {
        height: 10,
        borderRadius: 5
    },
    thumbStyle: {
        borderColor: '#0057b3',
        borderWidth: 2
    },
    valueIndicator: {
        flex: 1,
        textAlign: 'center',
        color: '#0091ff',
        textAlignVertical: 'center',
        fontSize: 16
    }
});

export default styles;