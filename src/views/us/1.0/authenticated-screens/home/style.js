import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    childContainer: {
        flex: 1,
        backgroundColor: '#0091ff',
        paddingHorizontal: 30,
        paddingVertical: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subHeaderText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase'
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
    iconContainerStyle: { alignContent: 'flex-start', alignSelf: 'flex-start' },
    socialButton: { backgroundColor: 'darkblue', color: 'white', padding: 0, width: 200, justifyContent: 'space-evenly', height: 30, marginVertical: 5 }
});

export default styles;