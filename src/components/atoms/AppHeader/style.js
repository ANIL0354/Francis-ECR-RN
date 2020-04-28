import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        padding: 10,
        minHeight: 50,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftIconStyle: {
        height: 35,
        width: 90
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