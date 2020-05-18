import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DraggableCalendar } from './wrapper';
import { scaleText } from '../../../helpers';
const styles = StyleSheet.create({
    draggableContainer: {
        backgroundColor: '#303658',
        // height: scaleText(370).fontSize,
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
    }
});
const CustomDraggableCalendar = () => {
    _genStyles = () => {
        return {
            style: styles.draggableContainer,
            headerTextStyle: styles.dayText,
            monthHeaderTextStyle: styles.dayText,
            dayTextStyle: styles.dayText,
            selectedDayTextStyle: styles.selectedDayText,
            singleDayContainerStyle: styles.selectedDayContainer,
            beginDayContainerStyle: styles.selectedDayContainer,
            middleDayContainerStyle: styles.selectedDayContainer,
            endDayContainerStyle: styles.selectedDayContainer
        };
    }
    return (
        <DraggableCalendar
            {..._genStyles()}
            fullDateRange={[new Date(2020, 4, 1, 0, 0, 0), new Date(2021, 4, 30, 0, 0, 0)]}
            availableDateRange={[new Date(), new Date(2021, 5, 31)]}
            onSelectionChange={(value) => console.log(value)}
        />
    )

}

export default CustomDraggableCalendar;