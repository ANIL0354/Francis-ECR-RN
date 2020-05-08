import React, { useState, useEffect, Component } from 'react';
import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';
import styles from './style';

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
      }, () => {
        this.placesRef._onBlur()
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
          details.address_components.map((item) => {
            if (item.types.includes('locality')) {
              setPickupLocation(item.long_name);
            }
            return;
          })
          this.setState({
            address: details.formatted_address,
          });
        }}
        customProp={true}
        isRowScrollable={false}
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
          container: styles.containerStyle,
          textInputContainer: {
            ...inputStyle,
          },
          textInput: {
            ...styles.textInputStyle,
            fontSize: inputStyle.fontSize,
            height: inputStyle.height,
          },
          placeholder: styles.placeholderStyle,
          description: styles.descriptionStyle,
          predefinedPlacesDescription: styles.predefinedDescriptionStyle,
          poweredContainer: styles.poweredByStyle,
          listView: styles.listViewStyle,
        }}
      />
    );
  }
}

export default LocationSearch;
