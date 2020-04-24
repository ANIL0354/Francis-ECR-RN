import React from 'react';
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    childContainer: {
        backgroundColor: '#0091ff',
        paddingHorizontal: 30,
        paddingVertical: scaleText(20).fontSize,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subHeaderText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    authTabContainer: {
        flexDirection: 'row',
        paddingHorizontal: scaleText(50).fontSize,
        paddingTop: scaleText(20).fontSize,
        justifyContent: 'center'
    },
    authTabButton: {
        minWidth: 150,
        maxWidth: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scaleText(10).fontSize,
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
        flex: 1,
        // marginVertical: 20,
        padding: 10
    },
    iconContainerStyle: {
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    socialButton: {
        backgroundColor: 'darkblue',
        color: 'white',
        padding: 0,
        width: 200,
        justifyContent: 'space-evenly',
        height: 30,
        marginVertical: 5
    },
    loginSubmit: {
        backgroundColor: '#009000',
        maxWidth: 200,
        minWidth: 200,
        marginBottom: 10,
        alignSelf: 'flex-end'
    },
    loginSubmitTitle: {
        textAlign: 'center',
        flexWrap: 'wrap',
        textTransform: 'uppercase'
    },
    facebookButton: {
        backgroundColor: '#3b5998',
        justifyContent: 'space-evenly',
        height: 30,
        maxWidth: 150,
        minWidth: 150,
        minHeight: 50,
        marginVertical: 5
    },
    facebookButtonTitle: {
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    googleButton: {
        backgroundColor: '#4c8bf5',
        justifyContent: 'space-evenly',
        height: 30,
        maxWidth: 150,
        minWidth: 150,
        minHeight: 50,
        marginVertical: 5
    },
    googleButtonTitle: {
        textAlign: 'center',
        flexWrap: 'wrap',
        margin: 0,
        padding: 10,
    },
    socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    }
});

export default styles;