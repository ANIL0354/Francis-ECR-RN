import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapperContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 0,
        margin: 0,
    },
    countryDropWrapper: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 0.8,
        marginTop: 0,
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2,
        paddingBottom: 0,
        marginBottom: 0,
    },
    topCountriesContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: 'transparent',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderWidth: 0.8,
        paddingHorizontal: 8
    },
    emojiStyle: {
        fontSize: 20,
        margin: 0,
        padding: 0
    },
    topCountriesText: {
        flex: 1,
        color: 'black',
        fontSize: 13,
        paddingLeft: 10
    },
});

export default styles;