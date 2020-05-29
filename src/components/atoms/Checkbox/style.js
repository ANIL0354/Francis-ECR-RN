import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'transparent',
        marginLeft: 0,
        marginTop: -10,
        borderColor: 'transparent',
        paddingHorizontal: 0,
    },
    checkedIconStyle: {
        height: 15,
        width: 15,
        resizeMode: 'center'
    },
    unCheckedIconStyle: {
        height: 15,
        width: 15,
        resizeMode: 'center'
    },
    textStyle: {
        color: 'black',
        textTransform: 'capitalize'
    }
});

export default styles;