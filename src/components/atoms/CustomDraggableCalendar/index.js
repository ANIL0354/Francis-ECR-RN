/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
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
const CustomDraggableCalendar = ({
    startDate,
    endDate,
    freeDays,
    setStartDate,
    setEndDate,
    pickupDate,
    dropoffDate,
    totalSelectable
}) => {
    const [pickup, setPickup] = useState(null);
    const [pickupDateValue, setPickupDateValue] = useState(new Date(pickupDate).getDate());
    const [pickupMonth, setPickupMonth] = useState(new Date(pickupDate).getMonth());
    const [pickupYear, setPickupYear] = useState(new Date(pickupDate).getFullYear());
    let dropoffDateValue = new Date(dropoffDate).getDate();
    let dropoffMonth = new Date(dropoffDate).getMonth();
    let dropoffYear = new Date(dropoffDate).getFullYear();


    useEffect(() => {
        setPickupDateValue(new Date(pickupDate).getDate());
        setPickupMonth(new Date(pickupDate).getMonth());
        setPickupYear(new Date(pickupDate).getFullYear());
    }, [pickupDate])

    const _genStyles = () => {
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
                freeDays={freeDays}
                startDate={startDate}
                endDate={endDate}
                setStartDate={(date) => setStartDate(date)}
                setEndDate={(date) => setEndDate(date)}
                fullDateRange={[new Date(pickupYear, pickupMonth, pickupDateValue > 1 ? 1 : pickupDateValue, 0, 0, 0), new Date(dropoffYear + 1, dropoffMonth, 30, 0, 0, 0)]}
                availableDateRange={[new Date(pickupYear, pickupMonth, pickupDateValue), new Date(dropoffYear, dropoffMonth, dropoffDateValue)]}
                onSelectionChange={(value) => { }}
                totalSelectable={totalSelectable}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View>
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
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text
                        onPress={() => { setStartDate(null); setEndDate(null) }}
                        style={{ color: '#0091ff', marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize }}>{'Clear Selection'}</Text>
                </View>
            </View>
        </View>
    )

}

export default CustomDraggableCalendar;