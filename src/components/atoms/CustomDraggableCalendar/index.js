import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DraggableCalendar } from './wrapper';
import { scaleText } from '../../../helpers';
const styles = StyleSheet.create({
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
        <View style={{ marginVertical: scaleText(20).fontSize }}>
            <Text style={{ color: '#737171', marginVertical: scaleText(5).fontSize, fontSize: scaleText(16).fontSize }}>{'Select your travel dates:'}</Text>
            <DraggableCalendar
                {..._genStyles()}
                freeDays={3}
                fullDateRange={[new Date(2020, 4, 1, 0, 0, 0), new Date(2021, 4, 30, 0, 0, 0)]}
                availableDateRange={[new Date(2020, 4, 20), new Date(2020, 4, 28)]}
                onSelectionChange={(value) => console.log(value)}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#1dd1a1', minWidth: scaleText(20).fontSize, height: scaleText(10).fontSize, borderRadius: scaleText(5).fontSize }} />
                <Text style={{ color: '#737171', marginHorizontal: scaleText(5).fontSize, fontSize: scaleText(14).fontSize }}>{'Available Days'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fe6a67', minWidth: scaleText(20).fontSize, height: scaleText(10).fontSize, borderRadius: scaleText(5).fontSize }} />
                <Text style={{ color: '#737171', marginHorizontal: scaleText(5).fontSize, fontSize: scaleText(14).fontSize }}>{'Selected Free Days'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#f2c225', minWidth: scaleText(20).fontSize, height: scaleText(10).fontSize, borderRadius: scaleText(5).fontSize }} />
                <Text style={{ color: '#737171', marginHorizontal: scaleText(5).fontSize, fontSize: scaleText(14).fontSize }}>{'Selected Paid Days'}</Text>
            </View>
        </View>
    )

}

export default CustomDraggableCalendar;