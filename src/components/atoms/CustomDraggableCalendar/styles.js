/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../helpers';

const styles = StyleSheet.create({
    headerText: {
        color: '#737171',
        marginVertical: scaleText(5).fontSize,
        fontSize: scaleText(16).fontSize,
    },
    indicatorWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    indicatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    indicatorText: {
        color: '#737171',
        marginHorizontal: scaleText(5).fontSize,
        fontSize: scaleText(14).fontSize,
    },
    indicatorColor: {
        minWidth: scaleText(20).fontSize,
        height: scaleText(10).fontSize,
        borderRadius: scaleText(5).fontSize,
    },
    clearSelectionText: {
        color: '#0091ff',
        marginVertical: scaleText(5).fontSize,
        fontSize: scaleText(14).fontSize,
    },
    clearSelectionWrapper: {
        flex: 1,
        alignItems: 'flex-end',
    },
    draggableContainer: {
        backgroundColor: '#303658',
        minHeight: scaleText(375).fontSize,
        paddingHorizontal: scaleText(30).fontSize,
        paddingVertical: scaleText(10).fontSize
    },
    dayText: {
        color: 'white'
    },
    selectedDayText: {
        color: 'white',
        fontSize: scaleText(15).fontSize,
    },
    selectedDayContainer: {
        backgroundColor: 'red',
        height: scaleText(15).fontSize,
    },
    verticalFiveMargin: {
        marginVertical: scaleText(5).fontSize,
    },
});

export default styles;