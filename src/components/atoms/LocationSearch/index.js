import React, { useState, useEffect, Component } from 'react';
import { Image, Text, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';

class LocationSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pickupLocation !== this.props.pickupLocation) {
      this.placesRef.setAddressText(nextProps.pickupLocation);
      this.setState({
        address: nextProps.pickupLocation,
      });
    }
  }

  render() {
    let { pickupLocation, inputStyle, setPickupLocation } = this.props;
    return (
      <GooglePlacesAutocomplete
        ref={(ref) => {
          this.placesRef = ref;
        }}
        placeholder={'Pick-up location'}
        minLength={2}
        autoFocus={false}
        defaultValue={pickupLocation}
        returnKeyType={'search'}
        listViewDisplayed={false}
        fetchDetails={true}
        renderDescription={(row) => row.description}
        onPress={(data, details = null) => {
          setPickupLocation(details.formatted_address);
          this.setState({
            address: details.formatted_address,
          });
        }}
        customProp={true}
        setValue={(text) => {
          setPickupLocation(text);
        }}
        text={pickupLocation}
        setAddressText={this.state.address}
        getAddressText={(text) => {
          this.setState({
            address: text,
          });
        }}
        getDefaultValue={() => {
          return pickupLocation;
        }}
        query={{
          key: 'AIzaSyCwe-4k_nGXdLcNt9YcIy0WeJzlL1Ot77k',
          language: 'en',
          types: '(cities)',
        }}
        styles={{
          container: {
            zIndex: 10,
            borderColor: 'transparent',
          },
          textInputContainer: {
            backgroundColor: 'transparent',
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            ...inputStyle,
          },
          textInput: {
            flex: 1,
            fontSize: inputStyle.fontSize,
            lineHeight: inputStyle.lineHeight,
            height: inputStyle.height,
            marginLeft: 0,
            marginTop: 0,
            marginRight: 0,
            marginBottom: 0,
          },
          placeholder: {
            color: 'black',
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: 'black',
          },
          poweredContainer: {
            display: 'none',
          },
          listView: {
            backgroundColor: 'white',
            position: Platform.OS === 'ios' ? 'absolute' : 'relative',
            top: Platform.OS === 'ios' ? 44 : 0,
            borderRadius: 5,
          },
        }}
      />
    );
  }
}

export default LocationSearch;
