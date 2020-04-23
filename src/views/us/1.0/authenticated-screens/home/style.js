import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    childContainer: {
        flex: 1,
        backgroundColor: '#0091ff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subHeaderText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        maxWidth: '50%',
        marginBottom: 10,
    },
    authTabContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 50,
        paddingVertical: 20,
        justifyContent: 'center'
    },
    authTabButton: {
        minWidth: 150,
        maxWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginHorizontal: 2
    },
    authTabButtonText: {
        color: 'white',
        opacity: 1,
        textTransform: 'uppercase'
    },
    formContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        // marginVertical: 20,
        padding: 10
    },
    pickupLocationInput: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 0.8,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        paddingBottom: 0,
        marginBottom: 0,
    },
    iconContainerStyle: { alignContent: 'flex-start', alignSelf: 'flex-start' },
    socialButton: { backgroundColor: 'darkblue', color: 'white', padding: 0, width: 200, justifyContent: 'space-evenly', height: 30, marginVertical: 5 }
});

export default styles;