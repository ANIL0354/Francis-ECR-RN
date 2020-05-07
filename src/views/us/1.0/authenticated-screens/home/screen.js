import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  Keyboard,
  FlatList,
  ScrollView,
  TouchableOpacity,
  AppState,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import NetInfo from '@react-native-community/netinfo';
import Geocoder from 'react-native-geocoding';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AppHoc from '../../../../../components/hoc/AppHoc';
import {
  APP_LOGO,
  MENU_LOGO,
  USER_ICON,
  CAR,
  CAR_WASHER,
  CAR_CHECKLIST,
  SEARCH_ICON,
  LIMITS,
  DOWN_ARROW,
  DATE_ICON,
  GOOGLE_API_KEY,
  SCREENS,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import CustomButton from '../../../../../components/atoms/CustomButton';
import PopularPlace from '../../../../../components/atoms/PopularPlace';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import { CheckPermission } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from './style.js';
import LocationSearch from '../../../../../components/atoms/LocationSearch';

export const Screen = ({
  logout,
  userToken,
  navigation,
  fuelType,
  vehicleType,
  transmissionType,
  childSeatsValue,
  isNetConnected,
  adultSeatsValue,
  freeDays,
  neverAskPermission,
  setLocationEnabled,
  setGpsEnabled,
  popularPlaces,
  getPopularPlaces,
  setPickupLocation,
  pickupLocation,
  setChildSeats,
  setAdultSeats,
  setFuelType,
  setPickupDate,
  setFreeDays,
  startLoader,
  pickupDate,
  stopLoader,
  getFuelTypes,
  setVehicleType,
  fuelTypesList,
  vehicleTypesList,
  setTransmissionType,
  setNeverAskPermission,
  updateInternetStatus,
  getVehicleTypes,
  transmissionTypesList,
  getTransmissionTypes,
  fetchVehicleListing,
}) => {
  const today = new Date();
  const maxDate = today.setMonth(today.getMonth() + 6);
  const [appState, setAppState] = useState('active');
  const [dateValue, onDateChange] = useState(pickupDate);
  const [filterMenu, showFilterMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const scaledFont = scaleText(14);
  useEffect(() => {
    Geocoder.init(GOOGLE_API_KEY);
    checkLocationPermissions();
    AppState.addEventListener('change', handleAppStateChange);
    getPopularPlaces(
      {},
      () => { },
      () => { },
    );
    getFuelTypes(
      {},
      () => { },
      () => { },
    );
    getTransmissionTypes(
      {},
      () => { },
      () => { }
    );
    getVehicleTypes(
      {},
      () => { },
      () => { }
    );
  }, []);

  useEffect(() => {
    startLoader();
    if (fuelTypesList && vehicleTypesList && transmissionTypesList) {
      stopLoader();
    }
  }, [fuelTypesList, transmissionTypesList, vehicleTypesList]);

  const handleAppStateChange = (nextAppState) => {
    if (neverAskPermission || Platform.OS === 'ios') {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        checkLocationPermissions();
      }
      setAppState(nextAppState);
    }
  };

  const checkLocationPermissions = async () => {
    startLoader();
    if (Platform.OS === 'android') {
      CheckPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((hasPermission) => {
          if (hasPermission === 'granted') {
            setNeverAskPermission(false);
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
              interval: 10000,
              fastInterval: 50000,
            })
              .then((data) => {
                getUserLocation();
                setGpsEnabled(true);
              })
              .catch((err) => {
                stopLoader();
                setGpsEnabled(false);
              });
            setLocationEnabled(true);
          } else if (hasPermission === 'never_ask_again') {
            stopLoader();
            setNeverAskPermission(true);
          } else {
            stopLoader();
            setNeverAskPermission(false);
            setLocationEnabled(false);
          }
        })
        .catch((error) => {
          stopLoader();
          setLocationEnabled(false);
        });
    } else {
      getUserLocation();
    }
    stopLoader();
  };

  const getUserLocation = () => {
    startLoader();
    Geolocation.getCurrentPosition(
      (info) => {
        Geocoder.from(info.coords.latitude, info.coords.longitude)
          .then((json) => {
            var addressComponent =
              json.results[2].formatted_address;
            setPickupLocation(addressComponent);
            stopLoader();
          })
          .catch((error) => {
            console.warn(error);
            stopLoader();
          });
      },
      (error) => {
        console.log('error', error);
        stopLoader();
      },
      {
        timeout: 30000,
        enableHighAccuracy: true,
      },
    );
  };

  return (
    <AppHoc rightIcon={MENU_LOGO} leftIcon={APP_LOGO} centerIcon={USER_ICON}>
      {(filterMenu && isNetConnected) && (
        <AdvanceSearchFilter
          fuelType={fuelType}
          vehicleType={vehicleType}
          transmissionType={transmissionType}
          childSeatsValue={childSeatsValue}
          adultSeatsValue={adultSeatsValue}
          freeDays={freeDays}
          setFuelType={setFuelType}
          setTransmissionType={setTransmissionType}
          setVehicleType={setVehicleType}
          setFreeDays={setFreeDays}
          setChildSeats={setChildSeats}
          setAdultSeats={setAdultSeats}
          fuelTypesList={fuelTypesList}
          vehicleTypesList={vehicleTypesList}
          transmissionTypesList={transmissionTypesList}
          onClose={() => showFilterMenu(false)}
          onSubmit={async () => {
            if (!!!pickupLocation) {
              Alert.alert(
                'Select Pick-up Location',
                'Please select a pick-up location before proceeding.',
                [
                  {
                    text: 'Okay',
                    onPress: () => { },
                  },
                ],
              );
              return;
            } else if (!pickupDate) {
              Alert.alert(
                'Select Pick-up Date',
                'Please select a pick-up date before proceeding.',
                [
                  {
                    text: 'Okay',
                    onPress: () => { },
                  },
                ],
              );
              return;
            } else {
              showFilterMenu(false);
              let formattedDate = moment(pickupDate).format('YYYY-MM-DD');
              startLoader();
              let city = '';
              await Geocoder.from(pickupLocation)
                .then(json => {
                  var location = json.results[0].address_components;
                  location.map((item) => {
                    if (item.types.includes('locality')) {
                      console.log('location', JSON.stringify(item.long_name));
                      city = item.long_name;
                    }
                    return;
                  })
                })
                .catch(error => console.warn(error));
              fetchVehicleListing(
                {
                  fromCity: city,
                  pickupDate: formattedDate,
                  adultSeats: adultSeatsValue,
                  childSeats: childSeatsValue,
                  freeDays: freeDays,
                  fuelType: Array.from(fuelType),
                  vehicleType: Array.from(vehicleType),
                  transmissionType: Array.from(transmissionType),
                  limit: LIMITS.vehicleList,
                  index: 0,
                },
                () => {
                  stopLoader();
                  navigation.navigate(SCREENS.VEHICLE_LISTING);
                },
                () => { },
              );
            }
          }}
        />
      )}
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.childContainer}>
          <Text
            style={{
              ...styles.subHeaderText,
              height:
                Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
              fontSize: scaleText(20).fontSize,
            }}>
            {'Great deals on vehicle relocation'}
          </Text>
          <View
            style={{
              backgroundColor: '#1e5e9e',
              padding: 20,
            }}>
            <LocationSearch
              pickupLocation={pickupLocation}
              setPickupLocation={(value) => {
                setPickupLocation(value);
              }}
              inputStyle={{
                height: 2.5 * scaledFont.lineHeight,
                fontSize: scaledFont.fontSize,
                lineHeight: scaledFont.lineHeight,
                ...styles.pickupLocationInput,
              }}
            />

            <DatePicker
              mode="date"
              placeholder={
                pickupDate
                  ? `${moment(pickupDate).format('DD-MM-YYYY')}`
                  : 'Pick-up date'
              }
              format={'DD-MM-YYYY'}
              minDate={new Date()}
              maxDate={new Date(maxDate)}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                padding: 0,
                margin: 0,
                width: '100%',
              }}
              getDateStr={(date) => {
                onDateChange(date);
                setPickupDate(date);
              }}
              iconSource={DATE_ICON}
              customStyles={{
                dateTouchBody: {
                  marginVertical: scaleText(20).fontSize,
                  zIndex: 10,
                },
                dateIcon: {
                  marginLeft: -1 * (scaleText(35).fontSize),
                  height: scaleText(25).fontSize,
                  width: scaleText(25).fontSize
                },
                dateInput: {
                  textAlign: 'left',
                  minWidth: '40%',
                  margin: 0,
                  backgroundColor: 'white',
                  padding: 0,
                  height: 2.5 * scaledFont.lineHeight,
                  borderColor: 'black',
                  borderRadius: 5,
                  borderWidth: 0.8,
                  fontSize: scaledFont.fontSize,
                  lineHeight: scaledFont.lineHeight,
                  paddingHorizontal: 10,
                  alignSelf: 'center',
                  paddingVertical: 2,
                  paddingBottom: 0,
                  marginBottom: 0,
                  textAlign: 'left',
                },
                datePickerCon: {
                  backfaceVisibility: false,
                },
                dateText: {
                  textAlign: 'left',
                  margin: 0,
                  fontSize: scaledFont.fontSize,
                  lineHeight: scaledFont.lineHeight,
                  padding: 0,
                },
                placeholderText: {
                  textAlign: 'left',
                  margin: 0,
                  alignSelf: 'flex-start',
                  color: pickupDate ? 'black' : 'rgba(0,0,0,0.4)',
                  fontSize: scaledFont.fontSize,
                  lineHeight: scaledFont.lineHeight,
                  padding: 0,
                },
              }}
              onDateChange={(date) => {
                setSelectedDate(date);
              }}
            />
            <TouchableOpacity
              onPress={() => showFilterMenu(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
                marginBottom: 2,
              }}>
              <Image source={SEARCH_ICON} />
              <Text
                style={{
                  color: 'white',
                  fontSize: scaleText(18).fontSize,
                  textAlign: 'left',
                  marginLeft: scaleText(5).fontSize,
                  textAlignVertical: 'center',
                }}>
                {'Advanced Search'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff93e',
                alignItems: 'center',
                borderRadius: 5,
                padding: scaleText(10).fontSize,
                marginTop: scaleText(20).fontSize,
              }}
              activeOpacity={0.7}
              onPress={async () => {
                Keyboard.dismiss();
                if (!!!pickupLocation) {
                  Alert.alert(
                    'Select Pick-up Location',
                    'Please select a pick-up location before proceeding.',
                    [
                      {
                        text: 'Okay',
                        onPress: () => { },
                      },
                    ],
                  );
                  return;
                } else if (!pickupDate) {
                  Alert.alert(
                    'Select Pick-up Date',
                    'Please select a pick-up date before proceeding.',
                    [
                      {
                        text: 'Okay',
                        onPress: () => { },
                      },
                    ],
                  );
                  return;
                } else {
                  let formattedDate = moment(pickupDate).format('YYYY-MM-DD');
                  startLoader();
                  let city = '';
                  await Geocoder.from(pickupLocation)
                    .then(json => {
                      var location = json.results[0].address_components;
                      location.map((item) => {
                        if (item.types.includes('locality')) {
                          console.log('location', JSON.stringify(item.long_name));
                          city = item.long_name;
                        }
                        return;
                      })
                    })
                    .catch(error => console.warn(error));
                  console.log('city', city)
                  fetchVehicleListing(
                    {
                      fromCity: city,
                      pickupDate: formattedDate,
                      adultSeats: adultSeatsValue,
                      childSeats: childSeatsValue,
                      freeDays: freeDays,
                      fuelType: Array.from(fuelType),
                      vehicleType: Array.from(vehicleType),
                      transmissionType: Array.from(transmissionType),
                      limit: LIMITS.vehicleList,
                      index: 0,
                    },
                    () => {
                      stopLoader();
                      navigation.navigate(SCREENS.VEHICLE_LISTING);
                    },
                    () => { },
                  );
                }
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: 'black',
                  fontSize: scaleText(16).fontSize,
                }}>
                Search Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'center',
            marginBottom: 0,
            flexDirection: 'row',
          }}>
          <Image
            source={DOWN_ARROW}
            height={20}
            width={20}
            style={{ margin: 0, marginTop: -1 * scaleText(10).fontSize }}
          />
        </View>

        <FlatList
          style={{ paddingHorizontal: 40, backgroundColor: 'white' }}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          data={popularPlaces}
          keyExtractor={(item, index) => (item.id ? item.id : `${index}`)}
          renderItem={({ item }) => {
            return (
              <PopularPlace
                icon={CAR}
                availableCount={item.count}
                placeRange={`${item._id.fromCity} to ${item._id.toCity}`}
                buttonText={'See All'}
                onPress={() => {
                  startLoader();
                  setVehicleType(new Set());
                  setFuelType(new Set());
                  setTransmissionType(new Set());
                  setAdultSeats(0);
                  setChildSeats(0);
                  setFreeDays(0);
                  setPickupDate(null);
                  fetchVehicleListing(
                    {
                      fromCity: item._id.fromCity,
                      toCity: item._id.toCity,
                      limit: LIMITS.vehicleList,
                      index: 0,
                    },
                    () => {
                      navigation.navigate(SCREENS.VEHICLE_LISTING);
                      setPickupLocation(item._id.fromCity);
                      stopLoader();
                    },
                    () => { },
                  );
                }}
              />
            );
          }}
        />
        <View style={{ backgroundColor: 'white' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: scaleText(18).fontSize,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginVertical: 15,
            }}>
            {'Helpful Information'}
          </Text>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <Image
            style={{
              alignSelf: 'center',
              marginTop: 15,
              marginBottom: 15,
              height: 50,
              width: 50,
            }}
            source={CAR_CHECKLIST}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: scaleText(16).fontSize,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginVertical: 5,
            }}>
            {'How relocations work'}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              paddingHorizontal: 25,
              paddingVertical: 8,
            }}>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          </Text>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <Image
            style={{
              alignSelf: 'center',
              marginTop: 40,
              marginBottom: 15,
              height: 50,
              width: 50,
            }}
            source={CAR_WASHER}
          />
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: scaleText(16).fontSize,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginVertical: 5,
            }}>
            {'Can I relocate a vehicle?'}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              paddingHorizontal: 25,
              paddingVertical: 8,
            }}>
            {
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          </Text>
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: scaleText(16).fontSize,
              textAlign: 'center',
              textAlignVertical: 'center',
              marginVertical: scaleText(50).fontSize,
            }}>
            {'Click here for more helpful information.'}
          </Text>
        </View>
      </ScrollView>
    </AppHoc>
  );
};
