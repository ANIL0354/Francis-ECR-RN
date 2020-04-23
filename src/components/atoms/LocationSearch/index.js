import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const LocationSearch = () => {
    const [address, setAddress] = useState('');
    return (<GooglePlacesAutocomplete
        placeholder="Pick-up location"
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'}
        listViewDisplayed={false}
        fetchDetails={true}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
            console.log(data);
            console.log('details', details);
            setAddress(details.formatted_address);
        }}
        setAddressText={address}
        getAddressText={text => { setAddress(text); console.log('text', text) }}
        getDefaultValue={(value) => {
            console.log('default Value', value)
            return '';
        }}
        query={{
            key: 'AIzaSyCwe-4k_nGXdLcNt9YcIy0WeJzlL1Ot77k',
            language: 'en',
            types: '(cities)',
        }}
        styles={{
            container: {
                zIndex: 10,
            },
            textInputContainer: {
                backgroundColor: 'white'
            },
            textInput: {
                margin: 0,

            },
            description: {
                fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
                color: 'white',
            },
            poweredContainer: {
                display: 'none'
            },
            listView: {
                backgroundColor: 'white',
                position: 'absolute',
                top: 44,
                zIndex: 10,
                // maxHeight: 50
            }
        }}
    />

    );
}

export default LocationSearch;