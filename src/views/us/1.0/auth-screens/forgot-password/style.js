import React from 'react';
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    childContainer: {
        flexDirection: 'row',
        backgroundColor: '#0091ff',
        paddingHorizontal: 30,
        paddingVertical: scaleText(20).fontSize,
        alignItems: 'center',
    },
    navArrowContainer: {
        height: 20,
        width: 20,
        justifyContent: 'center'
    },
    subHeaderText: {
        color: 'white',
        flex: 1,
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
        marginVertical: 20,
        padding: 15
    },
    checkMailText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginVertical: 5,
    },
    emailSentViewWrapper: {
        padding: 5,
        justifyContent: 'space-evenly'
    },
    emailSentIcon: {
        alignSelf: 'center',
        marginVertical: 30
    },
    resetPasswordLinkText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 50,
        color: 'black',
    },
    loginTitleStyle: {
        textTransform: 'uppercase'
    },
    loginButtonStyle: {
        backgroundColor: '#009000',
        maxWidth: 200,
        minWidth: 200,
        alignSelf: 'center',
    },
    resendWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40
    },
    didnotReceiveText: {
        textAlign: 'center',
        color: 'black',
        marginVertical: 5,
    },
    resendText: {
        marginLeft: 5,
        color: '#0091ff'
    },
    formWrapper: {
        padding: 5,
        justifyContent: 'center'
    },
    formDescription: {
        textAlign: 'center',
        marginTop: 10,
        color: 'black',
    },
    iconContainerStyle: { alignContent: 'flex-start', alignSelf: 'flex-start' },
    socialButton: { backgroundColor: 'darkblue', color: 'white', padding: 0, justifyContent: 'space-evenly', height: 30, marginVertical: 5 }
});

export default styles;