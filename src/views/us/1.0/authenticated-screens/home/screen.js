import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, AppState, PermissionsAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { APP_LOGO, MENU_LOGO, USER_ICON, MAIL_ICON } from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import CustomButton from '../../../../../components/atoms/CustomButton';
import PopularPlace from '../../../../../components/atoms/PopularPlace';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import { CAR } from '../../../../../shared/constants';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from "./style.js";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CustomSlider from '../../../../../components/atoms/CustomSlider';
import LocationSearch from '../../../../../components/atoms/LocationSearch';
import { startLoader, stopLoader } from "../../../../../redux/actions";
import { AskPermission, CheckPermission, requestGPSPermission } from '../../../../../helpers';

export const Screen = ({
    logout,
    userToken,
    neverAskPermission,
    setLocationEnabled,
    setGpsEnabled,
    updateInternetStatus
}) => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const [appState, setAppState] = useState('active');
    const [dateValue, onDateChange] = useState(null);
    const [filterMenu, showFilterMenu] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null)

    const scaledFont = scaleText(14);
    useEffect(() => {
        checkInternetConnection();
        checkLocationPermissions();
        AppState.addEventListener('change', handleAppStateChange);
    })

    const checkInternetConnection = () => {
        NetInfo.addEventListener((state) => {
            updateInternetStatus(((state.isConnected && state.isInternetReachable) || state.isWifiEnabled))
        });
    }

    const handleAppStateChange = (nextAppState) => {
        if (neverAskPermission || Platform.OS === 'ios') {
            if (
                this.state.appState.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                checkLocationPermissions();
            }
            setAppState(nextAppState);
        }
    }

    const checkLocationPermissions = async () => {
        startLoader();
        if (Platform.OS === 'android') {
            CheckPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                .then((hasPermission) => {
                    if (hasPermission === "granted") {
                        setNeverAskPermission(false);

                        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                            .then(() => {
                                getUserLocation();
                                setGpsEnabled(true);
                            }).catch(err => {
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
                })
        }
    }

    const getUserLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                if (!this.props.userLocation) {
                    this.props.setUserLocation(position.coords);
                }
                this.props.stopLoading()
            },
            (error) => {
                this.props.stopLoading()
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
        >

            {filterMenu && <AdvanceSearchFilter onClose={() => showFilterMenu(false)} />}
            <ScrollView >
                <View style={styles.childContainer}>
                    <View style={styles.childContainer}>
                        <Text
                            style={{
                                ...styles.subHeaderText,
                                height: Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
                                fontSize: scaleText(20).fontSize,
                                lineHeight: scaleText(20).lineHeight
                            }}>
                            {'Great deals on vehicle relocation'}
                        </Text>
                        <View style={{ backgroundColor: '#1e5e9e', minWidth: '100%', minHeight: 100, padding: 20 }}>
                            <View style={{ flexDirection: 'column', minWidth: '100%', justifyContent: 'space-between', }}>
                                <TextInput
                                    placeholder={'Pick-up location'}
                                    placeholderTextColor={'black'}
                                    underlineColorAndroid={"transparent"}
                                    style={{
                                        borderColor: 'black',
                                        borderRadius: 5,
                                        borderWidth: 0.8,
                                        backgroundColor: 'white',
                                        height: 2.5 * scaledFont.lineHeight,
                                        marginBottom: 10,
                                        fontSize: scaledFont.fontSize,
                                        lineHeight: scaledFont.lineHeight,
                                        paddingHorizontal: 10,
                                        paddingVertical: 2,
                                        paddingBottom: 0,
                                        marginBottom: 0,
                                    }}
                                    returnKeyType={'next'}
                                />

                                <DatePicker
                                    mode="date"
                                    placeholder={dateValue && `${moment(dateValue).format('DD-MM-YYYY')}`}
                                    format={'DD-MM-YYYY'}
                                    minDate={new Date()}
                                    date={selectedDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    style={{
                                        padding: 0,
                                        margin: 0,
                                    }}
                                    getDateStr={(date) => { onDateChange(date) }}
                                    customStyles={{
                                        dateTouchBody: {
                                            marginVertical: 5,
                                            minWidth: 280,
                                            zIndex: 99999
                                        },
                                        dateIcon: {
                                            padding: 0,
                                            marginLeft: -40,
                                            display: 'none'
                                        },
                                        dateInput: {
                                            textAlign: 'left',
                                            minWidth: '40%',
                                            margin: 0,
                                            backgroundColor: 'white',
                                            padding: 0,
                                            height: 2.5 * scaledFont.lineHeight,
                                            borderColor: 'transparent',
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
                                            backgroundColor: 'red',
                                            backfaceVisibility: false
                                        },
                                        dateText: {
                                            textAlign: 'left',
                                            margin: 0,
                                            fontSize: scaledFont.fontSize,
                                            lineHeight: scaledFont.lineHeight,
                                            padding: 0
                                        },
                                        placeholderText: {
                                            textAlign: 'left',
                                            margin: 0,
                                            alignSelf: 'flex-start',
                                            color: 'black',
                                            fontSize: scaledFont.fontSize,
                                            lineHeight: scaledFont.lineHeight,
                                            padding: 0
                                        }
                                    }}
                                    onDateChange={(date) => { setSelectedDate(date) }}
                                />
                            </View>
                            <CustomButton
                                title={'Search Now'}
                                onPress={() => showFilterMenu(true)}
                                buttonStyle={{ backgroundColor: '#fff93e', minWidth: '100%', alignSelf: 'center' }}
                                titleStyle={{ color: 'black' }} />
                        </View>
                    </View>

                </View>
                <FlatList
                    style={{ paddingHorizontal: 40 }}
                    contentContainerStyle={{}}
                    data={[
                        {
                            id: '1',
                            icon: CAR,
                            availableCount: 29,
                            placeRange: 'Wellington to Auckland',
                            buttonText: 'See All'
                        }, {
                            id: '2',
                            icon: CAR,
                            availableCount: 29,
                            placeRange: 'Wellington to Auckland',
                            buttonText: 'See All'
                        }, {
                            id: '3',
                            icon: CAR,
                            availableCount: 29,
                            placeRange: 'Wellington to Auckland',
                            buttonText: 'See All'
                        }, {
                            id: '4',
                            icon: CAR,
                            availableCount: 29,
                            placeRange: 'Wellington to Auckland',
                            buttonText: 'See All'
                        },
                        {
                            id: '5',
                            icon: CAR,
                            availableCount: 29,
                            placeRange: 'Wellington to Auckland',
                            buttonText: 'See All'
                        },
                        {
                            id: '6',
                            icon: CAR,
                            availableCount: 29,
                            placeRange: 'Wellington to Auckland',
                            buttonText: 'See All'
                        }
                    ]}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <PopularPlace
                                icon={item.icon}
                                availableCount={item.availableCount}
                                placeRange={item.placeRange}
                                buttonText={item.buttonText} />
                        )
                    }}
                />
                <CustomButton
                    icon={null}
                    titleStyle={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', }}
                    iconContainerStyle={{}}
                    buttonStyle={{ backgroundColor: '#009000', maxWidth: 100, minWidth: 100, marginVertical: 20, padding: 10, alignSelf: 'center' }}
                    title={STRINGS.LOGOUT}
                    onPress={() => Alert.alert(
                        'Logout',
                        'Are you sure you want to logout?',
                        [{
                            text: 'Cancel',
                            onPress: () => { }
                        },
                        {
                            text: 'Confirm',
                            onPress: () => logout(userToken, () => { }, () => { })
                        }]
                    )} />
            </ScrollView>
        </AppHoc >
    );
}
