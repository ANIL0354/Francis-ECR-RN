import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch, } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { scaleText } from '../../../helpers';
import Flag from 'react-native-flags';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
    // ...
})


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
    const scaledFont = scaleText(fontSize)
    const [countryCode, setCountryCode] = useState(codeValue);
    const [savedValue, saveValue] = useState({})
    const [country, setCountry] = useState(countryValue)
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
                        ListHeaderComponent: () => {
                            return (
                                <React.Fragment>
                                    <TouchableOpacity style={{ flex: 1, paddingVertical: 13, borderColor: 'transparent', borderBottomColor: 'rgba(0,0,0,0.3)', borderWidth: 0.8, paddingHorizontal: 10 }}>
                                        {/* <Flag code={'NZ'} /> */}
                                        <Text style={{ color: 'black', fontSize: 13, }}>{'Australia'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 1, paddingVertical: 13, borderColor: 'transparent', borderBottomColor: 'rgba(0,0,0,0.3)', borderWidth: 0.8, paddingHorizontal: 10 }}>
                                        {/* <Flag code={'NZ'} size={10} /> */}
                                        <Text style={{ color: 'black', fontSize: 13, }}>{'New Zealand'}</Text>
                                    </TouchableOpacity>
                                </React.Fragment>
                            )
                        }
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