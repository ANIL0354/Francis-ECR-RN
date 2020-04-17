import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');


export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#009000',
        width: width
    },
    body: {
        flex: 1,
        width: width
    },
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: 'white'
    },
    locationWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '55%',
        resizeMode: 'contain',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        color: 'black',
        marginBottom: 10
    },
})