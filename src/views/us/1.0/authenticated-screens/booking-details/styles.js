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
        flexDirection: 'row',
        backgroundColor: '#0091ff',
        paddingHorizontal: 30,
        paddingVertical: scaleText(20).fontSize,
        alignItems: 'center',
    },
    navArrowContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    subHeaderText: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    detailsWrapper: {
        marginHorizontal: scaleText(10).fontSize
    },
    iconContainerStyle: {
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    detailsLeftContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        maxHeight: scaleText(120).fontSize
    },
    detailsRightContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: scaleText(10).fontSize,
        paddingHorizontal: scaleText(10).fontSize,
        maxHeight: scaleText(120).fontSize,
    },
    carTitle: {
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        fontSize: scaleText(18).fontSize,
        marginBottom: scaleText(10).fontSize,
    },
    carFeaturesWrapper: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // flexWrap: 'wrap',
        // maxWidth: '90%',
    },
    iconTextContainer: {
        paddingVertical: 5,
        marginRight: scaleText(7).fontSize
    },
    iconText: {
        color: 'gray',
        textAlign: 'left',
        fontSize: scaleText(14).fontSize,
        textAlignVertical: 'center',
        textTransform: 'capitalize'
    },
});

export default styles;