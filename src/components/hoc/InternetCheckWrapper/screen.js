import React from 'react';
import {
    View,
    Text,
    Modal,
    Image,
    Linking,
    Platform,
    PermissionsAndroid
} from 'react-native';
import styles from './style';
import { Images } from '../../../shared/constants';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import AndroidOpenSettings from 'react-native-android-open-settings';
import CustomButton from '../../atoms/CustomButton';
import { GPS_LOGO, NO_INTERNET, LOCATION_LOGO } from '../../../shared/constants';

export default InternetCheckWrapper = ({
    children,
    gpsEnabled,
    setUserLocation,
    setGpsEnabled,
    locationEnabled,
    isNetConnected,
    neverAskPermission,
    setLocationEnabled,
    setNeverAskPermission,
}) => {
    const onGetPermission = () => {
        Platform.OS === 'ios' ?
            Linking.openURL('app-settings:')
            :
            neverAskPermission ?
                AndroidOpenSettings.appDetailsSettings()
                :
                locationEnabled ?
                    !gpsEnabled &&
                    /**
                     * Todo: Integrate the library and 
                     * Popup request for gps
                     */
                    askGPSLocation()
                    :
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                    ).then((Permission) => {
                        if (Permission === 'granted') {
                            setLocationEnabled(true);
                            askGPSLocation();
                            return;
                        } else if (Permission === 'never_ask_again') {
                            setNeverAskPermission(true);
                        }
                    }).catch(() => {
                        setNeverAskPermission(false);
                        setLocationEnabled(false);
                    });
    }

    const askGPSLocation = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
            .then(() => {
                getUserLocation();
                setGpsEnabled(true);
            })
            .catch(err => {
                setGpsEnabled(false);
            });
    }

    const getUserLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setUserLocation(position.coords);
            },
            (error) => {
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    const showPermissionInfo = () => {
        return !locationEnabled || neverAskPermission || Platform.OS === 'ios';
    }

    return (
        <View style={styles.screen}>
            <View style={styles.body}>
                {children}
            </View>

            <Modal
                visible={!isNetConnected}
                onRequestClose={() => { }}
            >
                <View style={styles.container}>
                    <View style={styles.locationWrapper}>

                        <Image
                            style={styles.logo}
                            source={(!isNetConnected) ?
                                NO_INTERNET
                                : (showPermissionInfo()
                                    ? LOCATION_LOGO
                                    : GPS_LOGO
                                )}
                        />

                        <Text style={styles.heading}>
                            {!isNetConnected ?
                                'Internet connection is turned off'
                                :
                                showPermissionInfo() ?
                                    'Location permission required'
                                    :
                                    'Phone GPS turned off'
                            }
                        </Text>
                        <Text style={{ textAlign: 'center', color: 'black' }}>
                            {!isNetConnected ?
                                'You appear to be offline. Kindly check your internet connection.'
                                :
                                showPermissionInfo() ?
                                    `Allow Easy Car Relo to automatically detect your current location and show nearby users.`
                                    :
                                    `Allow Easy Car Relo to turn on your phone GPS for accurate location.`
                            }
                        </Text>
                        {isNetConnected && neverAskPermission &&
                            <Text style={{ marginTop: 20, textAlign: 'center', color: 'black' }}>
                                {`To enable, go to Settings and turn on location permission.`}
                            </Text>
                        }
                    </View>
                    {isNetConnected && <CustomButton
                        title={neverAskPermission ?
                            'Open Settings'
                            :
                            showPermissionInfo() ?
                                'Allow Permission'
                                :
                                'Turn on GPS'
                        }
                        onPress={onGetPermission}
                    />}
                </View>
            </Modal>
        </View>
    )
}