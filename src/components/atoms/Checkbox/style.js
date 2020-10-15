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
        resizeMode: 'center'
    },
    unCheckedIconStyle: {
        resizeMode: 'center'
    },
    textStyle: {
        color: 'black',
        textTransform: 'capitalize'
    }
});

export default styles;