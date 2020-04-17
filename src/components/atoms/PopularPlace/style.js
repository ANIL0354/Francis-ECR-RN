import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: 'grey',
        padding: 10,
        paddingBottom: 30
    },
    iconStyle: {
        height: 60,
        width: 40,
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
    }
});

export default styles;