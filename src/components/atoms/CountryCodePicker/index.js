import React, { useState } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch, } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { scaleText } from '../../../helpers';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
    // ...
})


const CountryCodePicker = ({
    fontSize = 14,
    style,
    input,
    placeholder,
    countryDrop = false,
    meta: { touched, error, visited },
    setCallingCode = () => { },
    setSelectedCountry = () => { }
}) => {
    const scaledFont = scaleText(fontSize)
    const [countryCode, setCountryCode] = useState('')
    const [country, setCountry] = useState(null)
    const [showCountries, setShowCountries] = useState(false);
    const [withCountryNameButton, setWithCountryNameButton] = useState(false)
    const [withFlag, setWithFlag] = useState(true)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(false)
    const [withCallingCode, setWithCallingCode] = useState(countryDrop ? false : true)
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }
    const validationMessage =
        touched && error ? error : '';
    return (
        <View style={{ justifyContent: 'center', padding: 0, margin: 0, justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => setShowCountries(true)}
                style={{
                    borderColor: 'black',
                    borderRadius: 5,
                    borderWidth: 0.8,
                    height: 2.5 * scaledFont.lineHeight,
                    marginTop: 0,
                    justifyContent: 'center',
                    alignContent: 'center',
                    fontSize: scaledFont.fontSize,
                    lineHeight: scaledFont.lineHeight,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    paddingBottom: 0,
                    marginBottom: 0,
                    ...style
                }}>
                <CountryPicker
                    {...{
                        countryCode,
                        withFilter,
                        withFlag,
                        withCountryNameButton,
                        withAlphaFilter,
                        withCallingCode,
                        withEmoji,
                        onSelect
                    }}
                    theme={{
                        margin: 0,
                        fontSize: scaledFont.fontSize,
                        lineHeight: scaledFont.lineHeight,
                        primaryColor: 'darkgrey',
                        primaryColorVariant: 'darkgrey',
                    }}
                    containerButtonStyle={{
                        margin: 0,
                        flexDirection: 'row',
                        margin: 0,
                        padding: 0,
                        alignContent: 'center',
                        display: countryCode ? 'none' : 'flex',
                    }}
                    onSelect={(value) => {
                        setShowCountries(false);
                        setCountryCode(value.cca2);
                        setCountry(value.country);
                        setSelectedCountry(value.name);
                        setCallingCode(value.callingCode[0]);
                    }}
                    onClose={() => {
                        setShowCountries(false);
                    }}
                    modalProps={{
                        visible: showCountries,
                        onRequestClose: () => setShowCountries(false)
                    }}
                    style={{
                        color: 'darkgrey'
                    }}
                    placeholder={placeholder}
                    visible
                />
                {country !== null && (
                    <TouchableOpacity activeOpacity={1} onPress={() => setShowCountries(true)}>
                        <TextInput
                            value={countryDrop ? `${input.value}` : `+${input.value}`}
                            onTouchEndCapture={() => setShowCountries(true)}
                            style={{
                                color: 'black',
                                fontSize: scaledFont.fontSize,
                                lineHeight: scaledFont.lineHeight,
                                marginBottom: -5,
                                marginLeft: -5,
                                ...styles.data
                            }} editable={false} />
                    </TouchableOpacity>
                )}
            </TouchableOpacity>

            <Text style={{
                color: 'red',
                paddingVertical: 0,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
                height: 2 * scaledFont.lineHeight,
                ...style
            }}>{validationMessage}</Text>
        </View>
    )
}

export default CountryCodePicker;