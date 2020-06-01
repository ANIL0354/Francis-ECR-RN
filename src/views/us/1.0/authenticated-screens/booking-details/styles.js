/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    rowFlex: {
        flex: 1,
        flexDirection: 'row',
    },
    alignSelfCenter: {
        alignSelf: 'center',
    },
    navArrow: {
        alignSelf: 'center',
        marginVertical: scaleText(5).fontSize,
    },
    screenContentWrapper: {
        paddingHorizontal: scaleText(20).fontSize,
    },
    childContainer: {
        flexDirection: 'row',
        backgroundColor: '#0091ff',
        paddingHorizontal: scaleText(30).fontSize,
        paddingVertical: scaleText(20).fontSize,
        alignItems: 'center',
    },
    navArrowContainer: {
        height: scaleText(20).fontSize,
        width: scaleText(20).fontSize,
        alignItems: 'center',
    },
    subHeaderText: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    detailsWrapper: {
        flex: 1,
    },
    iconContainerStyle: {
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    detailsLeftContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsRightContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: scaleText(10).fontSize,
        padding: scaleText(10).fontSize,
    },
    carTitle: {
        color: '#565353',
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
        flex: 1,
        justifyContent: 'center',
    },
    iconTextContainer: {
        paddingVertical: 5,
        marginRight: scaleText(7).fontSize,
    },
    iconText: {
        color: 'gray',
        textAlign: 'left',
        fontSize: scaleText(14).fontSize,
        textAlignVertical: 'center',
        textTransform: 'capitalize',
    },
    listPickupText: {
        textTransform: 'uppercase',
        textAlign: 'left',
        fontSize: scaleText(16).fontSize,
        textAlignVertical: 'center',
        borderRadius: 15,
    },
    locationWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    vehicleListButton: {
        flex: 1,
        maxHeight: scaleText(40).fontSize,
        borderRadius: scaleText(10).fontSize,
        marginTop: scaleText(10).fontSize,
        backgroundColor: '#009000',
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: scaleText(14).fontSize,
        textAlignVertical: 'center',
        color: 'black',
    },
    costSummaryWrapper: {
        backgroundColor: '#f8f8f8',
        padding: scaleText(20).fontSize,
        borderRadius: scaleText(10).fontSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;
