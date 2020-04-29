import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch, TouchableOpacity } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal';
import { TextInput, } from 'react-native-gesture-handler';
import { scaleText } from '../../../helpers';
import Emoji from 'react-native-emoji';

const styles = StyleSheet.create({
    // ...
})

const AUSTRALIA_VALUES = {
    callingCode: ["61"],
    cca2: "AU",
    currency: ["AUD"],
    flag: "flag-au",
    name: "Australia",
    region: "Oceania",
    subregion: "Australia and New Zealand"
}

const NEW_ZEALAND_VALUES = {
    callingCode: ["64"],
    cca2: "NZ",
    currency: ["NZD"],
    flag: "flag-nz",
    name: "New Zealand",
    region: "Oceania",
    subregion: "Australia and New Zealand"
}

const CountryCodePicker = ({
    fontSize = 14,
    style,
    input,
    countryValue,
    codeValue,
    placeholder,
    countryDrop = false,
    meta: { touched, error, visited },
    setCallingCode = () => { },
    setSelectedCountry = () => { }
}) => {
    let withFlag = true;
    let withEmoji = true;
    let withFilter = true;
    let withAlphaFilter = false;
    let withCallingCode = countryDrop ? false : true;
    const scaledFont = scaleText(fontSize)
    const [countryCode, setCountryCode] = useState(codeValue);
    const [savedValue, saveValue] = useState({})
    const [country, setCountry] = useState(countryValue)
    const [showCountries, setShowCountries] = useState(false);
    const [withCountryNameButton, setWithCountryNameButton] = useState(false)
    const onSelect = (country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }

    useEffect(() => {
        setCountryCode(savedValue.cca2);
        onSelect(savedValue)
    }, [countryValue, codeValue]);

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
                    flatListProps={{
                        ListHeaderComponent: () => (
                            <React.Fragment>
                                <TouchableOpacity onPress={() => {
                                    setShowCountries(false);
                                    setCountryCode(AUSTRALIA_VALUES.cca2);
                                    setCountry(AUSTRALIA_VALUES.country);
                                    setSelectedCountry(AUSTRALIA_VALUES.name);
                                    setCallingCode(AUSTRALIA_VALUES.callingCode[0]);
                                }}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        paddingVertical: 10,
                                        zIndex: 10,
                                        borderColor: 'transparent', borderBottomColor: 'rgba(0,0,0,0.3)', borderWidth: 0.8, paddingHorizontal: 8
                                    }}>
                                    <Emoji name="flag-au" style={{ fontSize: 20, margin: 0, padding: 0 }} />
                                    <Text style={{ flex: 1, color: 'black', fontSize: 13, paddingLeft: 10 }}
                                    >{countryDrop ? 'Australia' : 'Australia (+61)'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        saveValue(NEW_ZEALAND_VALUES)
                                        setShowCountries(false);
                                        setCountryCode(NEW_ZEALAND_VALUES.cca2);
                                        setCountry(NEW_ZEALAND_VALUES.country);
                                        setSelectedCountry(NEW_ZEALAND_VALUES.name);
                                        setCallingCode(NEW_ZEALAND_VALUES.callingCode[0]);
                                    }}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        paddingVertical: 10,
                                        borderColor: 'transparent',
                                        borderBottomColor: 'rgba(0,0,0,0.3)',
                                        borderWidth: 0.8,
                                        paddingHorizontal: 8
                                    }}>
                                    <Emoji name="flag-nz" style={{ fontSize: 20, margin: 0, padding: 0 }} />
                                    <Text
                                        style={{ flex: 1, color: 'black', fontSize: 13, paddingLeft: 10 }}>{countryDrop ? 'New Zealand' : 'New Zealand (+64)'}</Text>
                                </TouchableOpacity>
                            </React.Fragment>
                        )
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
                        display: codeValue && countryValue ? 'none' : 'flex',
                    }}
                    onSelect={(value) => {
                        console.log('country value', value)
                        saveValue(value)
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
                {countryValue !== null && (
                    <TouchableOpacity activeOpacity={1} onPress={() => setShowCountries(true)}>
                        <TextInput
                            value={countryDrop ? `${input.value}` : codeValue ? `+${input.value}` : ''}
                            onTouchEndCapture={() => setShowCountries(true)}
                            style={{
                                color: 'black',
                                fontSize: scaledFont.fontSize,
                                lineHeight: scaledFont.lineHeight,
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