import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text } from 'react-native';
import { scaleText } from '../../../helpers';
import moment from 'moment';

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
                style={{
                    padding: 0,
                    margin: 0
                }}
                getDateStr={(date) => { onDateChange(date) }}
                customStyles={{
                    dateIcon: {
                        display: 'none',
                        padding: 0
                    },
                    dateInput: {
                        textAlign: 'left',
                        margin: 0,
                        padding: 0,
                        height: 2 * scaledFont.lineHeight,
                        borderColor: 'transparent',
                        width: '100%', borderColor: 'black',
                        borderRadius: 25,
                        borderWidth: 0.8,
                        marginVertical: 10,
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        paddingBottom: 0,
                        marginBottom: 0,
                        textAlign: 'left',
                        ...style
                    },
                    dateText: {
                        textAlign: 'left',
                        margin: 0,
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                        padding: 0
                    },
                    placeholderText: {
                        textAlign: 'left',
                        margin: 0,
                        alignSelf: 'flex-start',
                        color: input.value ? 'black' : 'darkgrey',
                        // display: 'none',
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                        padding: 0
                    }
                }}

                onDateChange={(date) => { setSelectedDate(date) }}
                {...input}
                {...props}
            />
            <Text style={{
                color: 'red',
                paddingVertical: 0,
                height: scaledFont.lineHeight,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
            }}>{validationMessage}</Text>
        </View>

    )
}

export default CustomDatePicker;