import React from 'react';
import { Modal, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({
    maxDate,
    minDate,
    date,
    mode = 'date',
    visible,
    onDateChange = () => { }
}) => {
    return (
        <Modal
            transparent
            animated
            visible={visible}
            animationType='slide'
        >
            <SafeAreaView style={{ flex: 1 }}>
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={new Date()}
                    mode={mode}
                    maximumDate={maxDate}
                    minimumDate={minDate}
                    is24Hour={true}
                    display="default"
                    onChange={(event) => onDateChange(event.date)}
                />
            </SafeAreaView>
        </Modal>
    );
}

export default CustomDatePicker;