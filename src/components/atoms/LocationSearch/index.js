import React from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const LocationSearch = () => {
    return (<GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2}
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
            console.log(data);
            console.log(details);
        }}
        getDefaultValue={() => {
            return ''; // text input default value
        }}
        query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAevQalBYq5ZtK9pf4-4Mun2RG-d1kSDJU',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
        }}
        styles={{
            container: {
                // maxHeight: 43,
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
                // maxHeight: 50
            }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
        }}
        filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[]}
        debounce={200}
    />

    );
}

export default LocationSearch;