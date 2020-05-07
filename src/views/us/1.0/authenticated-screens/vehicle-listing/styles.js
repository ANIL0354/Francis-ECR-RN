import React from 'react';
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    rowFlex: {
        flex: 1,
        flexDirection: 'row'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    childContainer: {
        alignItems: 'center',
        backgroundColor: '#0091ff',
        flex: 1,
        minHeight: 60,
        paddingHorizontal: 10,
    },
    searchChildContainer: {
        flex: 1,
        backgroundColor: '#0091ff',
        paddingVertical: scaleText(60).fontSize,
        paddingHorizontal: scaleText(10).fontSize,
        justifyContent: 'center',
    },
    subHeaderText: {
        color: 'white',
        textAlign: 'left',
        textAlignVertical: 'center',
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
        padding: 10
    },
    pickupLocationInput: {
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 0.8,
        // backgroundColor: 'white',
        // marginBottom: 10,
        // paddingHorizontal: 10,
        // paddingVertical: 2,
        paddingBottom: 0,
        marginBottom: 0,
    },
    normalLocationInput: {
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
    pageHeading: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
        maxWidth: '80%',
        alignSelf: 'center',
    },
    vehicleTypeList: {
        paddingVertical: 10,
        borderColor: 'transparent',
        borderTopColor: 'lightgray',
        borderBottomColor: 'lightgray',
        borderWidth: 1
    },
    vehicleTypeWrapper: {
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: 'white'
    },
    vehicleTypeContainer: {
        flexDirection: 'column',
        paddingHorizontal: 5,
    },
    vehicleTypeTitle: {
        textAlign: 'center',
        color: 'black',
        textAlignVertical: 'center',
    },
    detailsList: {
        // paddingVertical: 10,
    },
    advanceFilterText: {
        color: 'gray',
        textAlign: 'center',
        paddingVertical: 20,
        width: '100%',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    detailsWrapper: {
        paddingVertical: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        marginHorizontal: 10
    },
    iconContainerStyle: {
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    detailsLeftContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 10
    },
    detailsRightContainer: {
        flexDirection: 'column',
        flex: 2
    },
    carTitle: {
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        marginBottom: 10,
    },
    freeDaysText: {
        textTransform: 'uppercase',
        backgroundColor: 'rgba(0,0,0,0.1)',
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 10,
        borderRadius: 15,
        marginTop: 15,
        color: 'black',
    },
    carFeaturesWrapper: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // flexWrap: 'wrap',
        // maxWidth: '90%',
    },
    iconTextContainer: {
        paddingVertical: 5,
        marginRight: scaleText(10).fontSize
    },
    iconText: {
        color: 'gray',
        textAlign: 'left',
        textAlignVertical: 'center',
        textTransform: 'capitalize'
    },
    listLocationWrapper: {
        paddingVertical: scaleText(10).fontSize,
        paddingHorizontal: scaleText(20).fontSize
    },
    listPickupText: {
        textTransform: 'uppercase',
        textAlign: 'left',
        textAlignVertical: 'center',
        borderRadius: 15,
    },
    listDropoffWrapper: {
        flexDirection: 'row',
        paddingVertical: 5
    },
    listDropoffText: {
        textTransform: 'uppercase',
        textAlign: 'left',
        textAlignVertical: 'center',
        borderRadius: 15,
        marginLeft: 5
    },
    offerTextWrapper: {
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    carOfferTitle: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
    },
    carOfferText: {
        flex: 1,
        color: 'black',
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },
    vehicleListButton: {
        margin: 10,
        backgroundColor: '#009000'
    }
});

export default styles;