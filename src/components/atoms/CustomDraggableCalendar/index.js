/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DraggableCalendar } from './wrapper';
import { scaleText } from '../../../helpers';
import styles from './styles';

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
        let pickFrom = new Date(pickupDate) > new Date() ? pickupDate : new Date();
        setPickupDateValue(new Date(pickFrom).getDate());
        setPickupMonth(new Date(pickFrom).getMonth());
        setPickupYear(new Date(pickFrom).getFullYear());
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
            <Text style={styles.headerText}>{'Select your travel dates:'}</Text>
            <DraggableCalendar
                {..._genStyles()}
                freeDays={freeDays}
                startDate={startDate}
                endDate={endDate}
                setStartDate={(date) => setStartDate(date)}
                setEndDate={(date) => setEndDate(date)}
                fullDateRange={[new Date(pickupYear, pickupMonth, 1, 0, 0, 0), new Date(dropoffYear, dropoffMonth, dropoffMonth % 2 ? 30 : 31, 0, 0, 0)]}
                availableDateRange={[new Date(pickupYear, pickupMonth, pickupDateValue), new Date(dropoffYear, dropoffMonth, dropoffDateValue)]}
                onSelectionChange={(value) => { }}
                totalSelectable={totalSelectable}
            />
            <View style={styles.indicatorWrapper}>
                <View>
                    <View style={styles.indicatorRow}>
                        <View style={{
                            backgroundColor: '#1dd1a1',
                            ...styles.indicatorColor,
                        }} />
                        <Text style={styles.indicatorText}>{'Available Days'}</Text>
                    </View>
                    <View style={styles.indicatorRow}>
                        <View style={{
                            backgroundColor: '#fe6a67',
                            ...styles.indicatorColor,
                        }} />
                        <Text style={styles.indicatorText}>{'Selected Free Days'}</Text>
                    </View>
                    <View style={styles.indicatorRow}>
                        <View style={{
                            backgroundColor: '#f2c225',
                            ...styles.indicatorColor
                        }} />
                        <Text style={styles.indicatorText}>{'Selected Paid Days'}</Text>
                    </View>
                </View>
                <View style={styles.clearSelectionWrapper}>
                    <Text
                        onPress={() => { setStartDate(null); setEndDate(null) }}
                        style={styles.clearSelectionText}>{'Clear Selection'}</Text>
                </View>
            </View>
        </View>
    )

}

export default CustomDraggableCalendar;