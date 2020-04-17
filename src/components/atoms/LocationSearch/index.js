import React from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };

const LocationSearch = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            autoFocus={true}
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            listViewDisplayed={true}
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
                console.warn('data', data)
                console.log(data, details);
            }}
            // getDefaultValue={(value) => console.log('getDefaultValue',value)}
            query={{
                key: 'AIzaSyAevQalBYq5ZtK9pf4-4Mun2RG-d1kSDJU',
                language: 'en',
                types: '(cities)'
            }}
            styles={{
                textInputContainer: {
                    width: '100%'
                },
                description: {
                    fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                }
            }}
            currentLocation={false}
        />
    );
}

export default LocationSearch;