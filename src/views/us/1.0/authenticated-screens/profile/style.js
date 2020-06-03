/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    rowFlex: {
        flex: 1,
        flexDirection: 'row',
    },
    flexOne: {
        flex: 1,
    },
    alignSelfCenter: {
        alignSelf: 'center',
    },
    justifySpaceBetween: {
        justifyContent: 'space-between',
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
        padding: scaleText(20).fontSize,
        flex: 4,
    },
    ratingWrapper: {
        flex: 1,
        paddingHorizontal: scaleText(20).fontSize,
    },
    iconContainerStyle: {
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
    },
    alignSelfStart: {
        alignSelf: 'flex-start',
    },
    label: {
        color: 'black',
        fontSize: scaleText(14).fontSize,
        fontWeight: 'bold',
        marginVertical: scaleText(3).fontSize,
    },
    value: {
        color: 'black',
        fontSize: scaleText(14).fontSize,
    },
    basicBlueText: {
        color: '#0091ff',
        fontSize: scaleText(14).fontSize,
    },
    basicWhiteText: {
        color: 'white',
        fontSize: scaleText(14).fontSize,
    },
    saveEditText: {
        color: '#ffffff',
        fontSize: scaleText(14).fontSize,
    },
    changePasswordButton: {
        flex: 1,
        borderColor: '#0091ff',
        borderWidth: 1,
        backgroundColor: 'white',
        fontSize: scaleText(16).fontSize,
        marginTop: scaleText(20).fontSize,
        minWidth: scaleText(100).fontSize,
        minHeight: scaleText(40).fontSize,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaleText(20).fontSize,
        paddingVertical: scaleText(5).fontSize,
        borderRadius: scaleText(5).fontSize,
    },
    overallText: {
        color: 'black',
        fontSize: scaleText(14).fontSize,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
    },
    changePasswordWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalFiveMargin: {
        marginVertical: scaleText(5).fontSize,
    },
    submitEditButton: {
        flex: 1,
        backgroundColor: '#0091ff',
        borderColor: '#0091ff',
        borderWidth: 1,
        fontSize: scaleText(16).fontSize,
        marginTop: scaleText(20).fontSize,
        minWidth: scaleText(100).fontSize,
        minHeight: scaleText(40).fontSize,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scaleText(20).fontSize,
        paddingVertical: scaleText(5).fontSize,
        borderRadius: scaleText(5).fontSize,
    },
});

export default styles;
