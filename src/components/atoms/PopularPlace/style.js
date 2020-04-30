import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        paddingBottom: 30
    },
    iconStyle: {
        height: 50,
        width: 30,
        marginTop: 10,
        marginBottom: -35,
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
        width: 150,
        alignSelf: 'center'
    },
    buttonTitleStyle: {
        color: 'white'
    },
});

export default styles;