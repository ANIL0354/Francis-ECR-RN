import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text } from 'react-native';
import { scaleText } from '../../../helpers';
import moment from 'moment';
import styles from './style';

const CustomDatePicker = ({
    label,
    input,
    style,
    dateFormat = 'DD-MM-YYYY',
    // minDate = new Date(),
    maxDate = new Date(),
    placeholder,
    fontSize = 14,
    returnKeyType,
    takeErrorSpace = true,
    onDateChange = () => { },
    meta: { touched, error, visited },
    ...props
}) => {
    const [parentWidth, setParentWidth] = useState(0);
    const validationMessage =
        touched && error ? error : '';
    const scaledFont = scaleText(fontSize);
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <View
            onLayout={({ nativeEvent }) => { setParentWidth(nativeEvent.layout.width) }}
            style={{
                ...style,
                maxHeight: takeErrorSpace ? 2.5 * scaledFont.lineHeight : 2 * scaledFont.lineHeight,
            }}>
            <DatePicker
                mode="date"
                placeholder={input.value ? `${moment(input.value).format(dateFormat)}` : placeholder}
                format={dateFormat}
                // minDate={minDate}
                maxDate={maxDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                // style={styles.pickerStyle}
                getDateStr={(date) => { onDateChange(date) }}
                customStyles={{
                    dateTouchBody: {
                        width: scaleText(parentWidth).fontSize + scaleText(10).fontSize,
                        padding: 0,
                        maxHeight: takeErrorSpace ? 2.5 * scaledFont.lineHeight : 2 * scaledFont.lineHeight,
                    },
                    dateIcon: styles.dateIcon,
                    dateInput: {
                        ...style,
                        ...styles.dateInput,
                        margin: 0,
                        width: scaleText(parentWidth).fontSize,
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                        height:
                            takeErrorSpace ? 2.5 * scaledFont.lineHeight : 2 * scaledFont.lineHeight,
                    },
                    datePickerCon: {
                        backfaceVisibility: false
                    },
                    dateText: {
                        ...styles.dateText,
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                    },
                    placeholderText: {
                        ...styles.placeholderText,
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                    }
                }}

                onDateChange={(date) => { setSelectedDate(date) }}
                {...input}
                {...props}
            />
            {(takeErrorSpace || !!validationMessage) && <Text style={{
                ...styles.errorText,
                height: takeErrorSpace ? 2 * scaledFont.lineHeight : scaledFont.lineHeight,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
            }}>{validationMessage}</Text>}
        </View>

    )
}

export default CustomDatePicker;