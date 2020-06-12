import React from 'react';
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    childContainer: {
        flexDirection: 'row',
        backgroundColor: '#0091ff',
        paddingHorizontal: scaleText(30).fontSize,
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
    formWrapper: {
        padding: scaleText(5).fontSize,
        marginHorizontal: scaleText(5).fontSize,
        flex: 1,
    },
    formContainer: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        flex: 1,
        padding: 10,
        marginVertical: scaleText(5).fontSize,
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
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderRadius: 5
    },
    facebookButtonTitle: {
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    googleButton: {
        backgroundColor: '#4c8bf5',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderRadius: 5
    },
    socialButtonTitle: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
    },
    socialButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    forgotPasswordLabel: {
        marginLeft: 5,
        marginTop: 30,
        color: '#0091ff',
        textAlign: 'center'
    },
    connectWithText: {
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 5,
        color: 'black'
    },
    dividingLine: {
        width: '100%',
        height: 1.5,
        marginVertical: 20
    },
    registerButtonStyle: {
        backgroundColor: '#009000',
        maxWidth: 200,
        minWidth: 200,
        marginBottom: 30,
        alignSelf: 'flex-end'
    },
    fieldsRow: {
        flexDirection: 'row',
        minWidth: '100%',
        justifyContent: 'space-between',
    }
});

export default styles;