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
    onDateChange = () => { },
    meta: { touched, error, visited },
    ...props
}) => {
    const validationMessage =
        touched && error ? error : '';
    const scaledFont = scaleText(fontSize);
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <View>
            <DatePicker
                mode="date"
                placeholder={input.value ? `${moment(input.value).format(dateFormat)}` : placeholder}
                format={dateFormat}
                // minDate={minDate}
                maxDate={maxDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                style={styles.pickerStyle}
                getDateStr={(date) => { onDateChange(date) }}
                customStyles={{
                    dateTouchBody: {
                        ...style,
                    },
                    dateIcon: styles.dateIcon,
                    dateInput: {
                        ...style,
                        ...styles.dateInput,
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                        height: 2.5 * scaledFont.lineHeight,
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
            <Text style={{
                ...styles.errorText,
                height: 2 * scaledFont.lineHeight,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
            }}>{validationMessage}</Text>
        </View>

    )
}

export default CustomDatePicker;