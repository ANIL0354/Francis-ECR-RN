import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
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
  GOOGLE_API_KEY,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import CustomButton from '../../../../../components/atoms/CustomButton';
import PopularPlace from '../../../../../components/atoms/PopularPlace';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import { CheckPermission } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from './style.js';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LocationSearch from '../../../../../components/atoms/LocationSearch';

export const Screen = ({
  logout,
  userToken,
  navigation,
  fuelType,
  vehicleType,
  transmissionType,
  childSeatsValue,
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
  setVehicleType,
  setTransmissionType,
  setNeverAskPermission,
  updateInternetStatus,
  fetchVehicleListing,
}) => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [appState, setAppState] = useState('active');
  const [dateValue, onDateChange] = useState(pickupDate);
  const [filterMenu, showFilterMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const scaledFont = scaleText(14);
  useEffect(() => {
    checkLocationPermissions();
    checkInternetConnection();
    AppState.addEventListener('change', handleAppStateChange);
    getPopularPlaces(
      {},
      () => { },
      () => { },
    );
  }, []);

  const checkInternetConnection = () => {
    NetInfo.addEventListener((state) => {
      updateInternetStatus(
        (state.isConnected && state.isInternetReachable) || state.isWifiEnabled,
      );
    });
  };

  const handleAppStateChange = (nextAppState) => {
    if (neverAskPermission || Platform.OS === 'ios') {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
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
    Geocoder.init(GOOGLE_API_KEY);
    Geolocation.getCurrentPosition(
      (info) => {
        Geocoder.from(info.coords.latitude, info.coords.longitude)
          .then((json) => {
            var addressComponent =
              json.results[json.results.length - 2].address_components[0];
            setPickupLocation(addressComponent.long_name);
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
      {filterMenu && (
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
          onClose={() => showFilterMenu(false)}
          onSubmit={() => {
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
              showFilterMenu(false)
              let formattedDate = moment(pickupDate).format(
                'YYYY-MM-DD',
              );
              startLoader();
              fetchVehicleListing(
                {
                  fromCity: pickupLocation,
                  pickupDate: formattedDate,
                  adultSeats: adultSeatsValue,
                  childSeats: childSeatsValue,
                  fuelType: fuelType + 1,
                  limit: LIMITS.vehicleList,
                  index: 0,
                },
                () => {
                  stopLoader();
                  navigation.navigate('VEHICLE_SCREEN');
                },
                () => { },
              );
            }
          }}
        />
      )}
      <ScrollView keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#0091ff' }}>
          <View style={styles.childContainer}>
            <View style={styles.childContainer}>
              <Text
                style={{
                  ...styles.subHeaderText,
                  height:
                    Platform.OS == 'ios'
                      ? scaleText(18).lineHeight + 2
                      : 'auto',
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
                  setPickupLocation={(value) => setPickupLocation(value)}
                  inputStyle={{
                    height: 2.5 * scaledFont.lineHeight,
                    fontSize: scaledFont.fontSize,
                    lineHeight: scaledFont.lineHeight,
                    ...styles.pickupLocationInput
                  }} />
                {/* <TextInput
                                        placeholder={'Pick-up location'}
                                        placeholderTextColor={'black'}
                                        underlineColorAndroid={"transparent"}
                                        style={{
                                            height: 2.5 * scaledFont.lineHeight,
                                            fontSize: scaledFont.fontSize,
                                            lineHeight: scaledFont.lineHeight,
                                            ...styles.pickupLocationInput
                                        }}
                                        value={pickupLocation}
                                        onChangeText={value => setPickupLocation(value)}
                                        returnKeyType={'next'}
                                    /> */}

                <DatePicker
                  mode="date"
                  placeholder={
                    pickupDate
                      ? `${moment(pickupDate).format('DD-MM-YYYY')}`
                      : 'Pick-up date'
                  }
                  format={'DD-MM-YYYY'}
                  minDate={new Date()}
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
                  customStyles={{
                    dateTouchBody: {
                      marginVertical: scaleText(20).fontSize,
                      zIndex: 10,
                    },
                    dateIcon: {
                      display: 'none',
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
                    {'Advance Search'}
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
                  onPress={() => {
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
                      let formattedDate = moment(pickupDate).format(
                        'YYYY-MM-DD',
                      );
                      startLoader();
                      fetchVehicleListing(
                        {
                          fromCity: pickupLocation,
                          pickupDate: formattedDate,
                          adultSeats: adultSeatsValue,
                          childSeats: childSeatsValue,
                          fuelType: fuelType + 1,
                          limit: LIMITS.vehicleList,
                          index: 0,
                        },
                        () => {
                          stopLoader();
                          navigation.navigate('VEHICLE_SCREEN');
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
          </View>

          <View style={{ backgroundColor: 'white', justifyContent: 'center', marginBottom: 0, flexDirection: 'row' }}>
            <Image source={DOWN_ARROW} height={20} width={20} style={{ margin: 0, marginTop: -1 * (scaleText(10).fontSize) }} />
          </View>


          <FlatList
            style={{ paddingHorizontal: 40, backgroundColor: 'white' }}
            contentContainerStyle={{}}
            showsVerticalScrollIndicator={false}
            data={popularPlaces}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <PopularPlace
                  icon={CAR}
                  availableCount={item.count}
                  placeRange={`${item._id.fromCity} to ${item._id.toCity}`}
                  buttonText={'See All'}
                  onPress={() => navigation.navigate('VEHICLE_SCREEN')}
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
                marginVertical: scaleText(10).fontSize,
              }}>
              {'Click here for more helpful information.'}
            </Text>
          </View>
          <CustomButton
            icon={null}
            titleStyle={{
              textAlign: 'center',
              color: 'white',
              textTransform: 'uppercase',
            }}
            iconContainerStyle={{}}
            buttonStyle={{
              backgroundColor: '#009000',
              maxWidth: 100,
              minWidth: 100,
              marginVertical: 20,
              padding: 10,
              alignSelf: 'center',
            }}
            title={STRINGS.LOGOUT}
            onPress={() =>
              Alert.alert('Logout', 'Are you sure you want to logout?', [
                {
                  text: 'Cancel',
                  onPress: () => { },
                },
                {
                  text: 'Confirm',
                  onPress: () =>
                    logout(
                      userToken,
                      () => { },
                      () => { },
                    ),
                },
              ])
            }
          />
        </View>
      </ScrollView>
    </AppHoc>
  );
};
