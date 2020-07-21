/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image as SimpleImage,
    Alert,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Dimensions,
    LayoutAnimation,
    Linking,
    Slider
} from 'react-native';
import moment from 'moment';
import Image from 'react-native-image-progress';
import AppHoc from '../../../../../components/hoc/AppHoc';
import Swiper from 'react-native-swiper'
import Checkbox from '../../../../../components/atoms/Checkbox';
import {
    APP_LOGO,
    MENU_LOGO,
    USER_ICON,
    NAV_ARROW_ICON,
    CAR_SEATS_ICON,
    AC_ICON,
    STRAIGHT_ARROW,
    DOORS_ICON,
    GEAR_ICON,
    CHECKBOX_ICON,
    LUGGAGE_ICON,
    RIDE_BOOKED,
    CHECKBOX_ACTIVE,
    FUEL_INACTIVE,
    DEAL_DONE,
    SEND_IT,
    TIME,
    VEHICLE_YEAR_RANGE,
    SCREENS,
} from '../../../../../shared/constants';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import { scaleText } from '../../../../../helpers';
import styles from "./styles.js";
import IconText from "../../../../../components/atoms/IconTextComponent";
import CustomButton from "../../../../../components/atoms/CustomButton";
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    navigation,
    route,
    profileData,
    fetchProfile,
    getPopularPlaces,
    submitBookingRequest,
}) => {
    let { vehicleDetails, scrollRef = {} } = route.params;
    const largeScaledFont = scaleText(18);
    const [rideBooked, setRideBooked] = useState(false);
    const [infoTab, setInfoTab] = useState(null);
    const [accepted, setAccepted] = useState(false);
    let skipper = null;

    useEffect(()=>{
        let skipper 
        return () => {
                    clearInterval(skipper);
                }
    },[rideBooked])

    useEffect(() => {
        fetchProfile(() => { }, () => { });
    }, []);

    useEffect(() => {
        return () => {
            clearInterval(skipper);
            getPopularPlaces(
                {},
                () => { },
                () => { },
            );
        }
    }, [])

    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
            fromSummary={true}
            rideBooked={rideBooked}
            navigation={navigation}
        >
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}>
                <View style={styles.childContainer}>
                    {!rideBooked && <TouchableOpacity
                        style={styles.navArrowContainer}
                        onPress={() => {
                            scrollRef.current.scrollTo(0);
                            navigation.goBack();
                        }}>
                        <Image
                            source={NAV_ARROW_ICON}
                            height={20}
                            width={20}
                            resizeMode={'contain'}
                            style={{ alignSelf: 'center', marginVertical: scaleText(5).fontSize }}
                        />
                    </TouchableOpacity>}
                    <Text
                        style={{
                            ...styles.subHeaderText,
                            fontSize: scaleText(17).fontSize,
                        }}>
                        {rideBooked ? 'Thank You' : 'Summary'}
                    </Text>
                </View>

                {rideBooked
                    ?
                    <View style={{ flex: 1, paddingHorizontal: scaleText(20).fontSize, justifyContent: 'center', minHeight: Dimensions.get('window').height - scaleText(130).fontSize, marginVertical:scaleText(20).fontSize }}>

                        <View>
                            <SimpleImage source={RIDE_BOOKED} style={{ height:scaleText(100).fontSize,width:scaleText(300).fontSize, alignSelf: 'center', marginBottom: scaleText(10).fontSize, }} resizeMode={'contain'} />
                            <Text
                                style={{ ...styles.carTitle, fontSize: scaleText(16).fontSize, textAlign: 'center', textAlignVertical: 'center' }}>{'Thanks for completing your booking request with us!'}</Text>
                                <Text
                                style={{ ...styles.carTitle, fontSize: scaleText(14).fontSize,marginTop:scaleText(60).fontSize, textAlign: 'center', textAlignVertical: 'center' }}>{'What to expect from here:'}</Text>
                                
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <Swiper style={{maxHeight:scaleText(200).fontSize}} autoplayTimeout={3} autoplay={true} showsButtons={false}>
                                           <View
                                            style={{flex:1,marginHorizontal:scaleText(5).fontSize}}>
                                                <SimpleImage source={SEND_IT} style={{ 
                                                    alignSelf: 'center',
                                                    marginTop: 15,
                                                    marginBottom: 15,
                                                    height: 60,
                                                    width: 60,}} resizeMode={'contain'} />
                                                <Text
                                                    style={{ color: 'black', fontSize: scaleText(12).fontSize, textAlign: 'center', textAlignVertical: 'center' }}>{'Your booking request will be sent to the rental vehicle agency.'}</Text>
                                    
                                            </View>
                                            <View
                                                style={{flex:1,marginHorizontal:scaleText(5).fontSize}}>
                                                <SimpleImage source={TIME} style={{ 
                                                    alignSelf: 'center',
                                                    marginTop: 15,
                                                    marginBottom: 15,
                                                    height: 60,
                                                    width: 60,}} resizeMode={'contain'} />
                                                <Text
                                                    style={{ color: 'black', fontSize: scaleText(12).fontSize, textAlign: 'center', textAlignVertical: 'center' }}>{'Within 24-48 hrs you should hear back from the agency confirming your booking.'}</Text>
                                    
                                            </View>
                                            <View 
                                                style={{flex:1,marginHorizontal:scaleText(5).fontSize}}>
                                                <SimpleImage source={DEAL_DONE} style={{ 
                                                    alignSelf: 'center',
                                                    marginTop: 15,
                                                    marginBottom: 15,
                                                    height: 60,
                                                    width: 60,}} resizeMode={'contain'} />
                                                <Text
                                                    style={{ color: 'black', fontSize: scaleText(12).fontSize, textAlign: 'center', textAlignVertical: 'center' }}>{'If your booking has been approved, great! If your booking has been declined, please feel free to browse again for other options.'}</Text>
                                    
                                            </View>
                                    </Swiper>
                                </View>
                            <CustomButton
                                title={'Go To Home Page'}
                                titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                                onPress={() => {
                                    navigation.navigate(SCREENS.HOME);
                                }}
                                buttonStyle={{ ...styles.vehicleListButton, marginTop: scaleText(50).fontSize }}
                            />
                        </View>
                    </View>
                    : < View style={{ paddingHorizontal: scaleText(20).fontSize }}>
                        <View style={styles.detailsWrapper}>
                            <Text style={{ color: 'gray', flex: 1, textAlign: 'center', fontWeight: 'bold', textAlignVertical: 'center', marginVertical: scaleText(15).fontSize }}>{'One last thing, please review your request details.'}</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={styles.detailsLeftContainer}>
                                    <Image
                                        source={{ uri: vehicleDetails.vehicleData.url[0] }}
                                        resizeMode={'contain'}
                                        style={{
                                            ...styles.alignSelfCenter,
                                            height: scaleText(100).fontSize,
                                            width: scaleText(100).fontSize,
                                        }}
                                    />
                                </View>
                                <View style={styles.detailsRightContainer}>
                                    <Text
                                        style={styles.carTitle}>{vehicleDetails.vehicleData ? vehicleDetails.vehicleData.name : ''}</Text>
                                    <View style={styles.carFeaturesWrapper}>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <IconText
                                                icon={CAR_SEATS_ICON}
                                                title={`${vehicleDetails.vehicleData.adultSeats || 0} adult${vehicleDetails.vehicleData.adultSeats > 1 ? 's' : ''}, ${vehicleDetails.vehicleData.childSeats || 0} child`}
                                                titleFontSize={14}
                                                titleStyle={styles.iconText}
                                                containerStyle={styles.iconTextContainer}
                                            />
                                            <IconText
                                                icon={DOORS_ICON}
                                                title={`${vehicleDetails.vehicleData.numberOfDoor || 0} doors`}
                                                titleFontSize={14}
                                                titleStyle={styles.iconText}
                                                containerStyle={styles.iconTextContainer}
                                            />
                                        </View>
                                        <View style={styles.rowFlex}>
                                            <IconText
                                                icon={LUGGAGE_ICON}
                                                title={`${vehicleDetails.vehicleData.largeLuggageSpace || 0} large, ${vehicleDetails.vehicleData.smallLuggageSpace || 0} small`}
                                                titleFontSize={14}
                                                titleStyle={styles.iconText}
                                                containerStyle={styles.iconTextContainer}
                                            />
                                            <IconText
                                                icon={FUEL_INACTIVE}
                                                title={vehicleDetails.fuelTypeData.fuelType}
                                                titleFontSize={14}
                                                titleStyle={styles.iconText}
                                                containerStyle={styles.iconTextContainer}
                                            />
                                        </View>
                                        <View style={styles.rowFlex}>
                                            <IconText
                                                icon={GEAR_ICON}
                                                title={vehicleDetails.transmissionData.name}
                                                titleFontSize={14}
                                                titleStyle={styles.iconText}
                                                containerStyle={styles.iconTextContainer}
                                            />
                                            <IconText
                                                icon={AC_ICON}
                                                title={vehicleDetails.airConditionType ? 'Air Conditioning' : 'Non-AC'}
                                                titleFontSize={14}
                                                titleStyle={styles.iconText}
                                                containerStyle={styles.iconTextContainer}
                                            />
                                        </View>
                                        <View style={styles.rowFlex}>
                                            <IconText
                                                icon={VEHICLE_YEAR_RANGE}
                                                title={`${vehicleDetails.vehicleData.yearRange.from}-${vehicleDetails.vehicleData.yearRange.to}`}
                                                titleFontSize={14}
                                                titleStyle={styles.iconText}
                                                containerStyle={styles.iconTextContainer}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex:1,
                            backgroundColor: '#f8f8f8',
                            paddingHorizontal: scaleText(20).fontSize,
                            paddingVertical: scaleText(10).fontSize,
                            borderRadius: scaleText(10).fontSize,
                            marginBottom:scaleText(15).fontSize,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{ ...styles.rowFlex, justifyContent: 'space-evenly', marginHorizontal:scaleText(10).fontSize }}>
                                <Text
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                    style={styles.listPickupText}>{vehicleDetails.pickupBranchData.city}</Text>
                                <SimpleImage source={STRAIGHT_ARROW} style={{ alignSelf: 'center', marginHorizontal:scaleText(5).fontSize }} />
                                <Text
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                    style={styles.listPickupText}>{vehicleDetails.dropoffBranchData.city}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(10).fontSize }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', flex: 1, }}>{'Pick-up Date: '}</Text>
                                        <Text style={{ color: 'black', flex: 1, }}>{moment(vehicleDetails.pickupDate).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={{ color: 'black', flex: 1, }}>{'Return Date: '}</Text>
                                        <Text style={{ color: 'black', flex: 1, }}>{moment(vehicleDetails.dropoffDate).format('DD/MM/YYYY')}</Text>
                                    </View>
                                </View>
                                <CustomButton
                                    title={'Change'}
                                    titleStyle={{ color: 'white', fontSize: scaleText(14).fontSize, textAlign: 'center', textAlignVertical: 'center', textTransform: 'capitalize' }}
                                    onPress={() => {
                                        scrollRef.current.scrollTo(0);
                                        navigation.goBack();
                                    }}
                                    buttonStyle={{ marginHorizontal: scaleText(30).fontSize, paddingVertical: scaleText(5).fontSize, backgroundColor: '#535050', alignSelf: 'flex-end' }}
                                />
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: '#f8f8f8',
                            padding: scaleText(20).fontSize,
                            borderRadius: scaleText(10).fontSize,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, color: '#0091ff' }}>{'Free Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, color: '#0091ff' }}>{`$${0} x ${vehicleDetails.totalSelectedDate < vehicleDetails.freeDays ? vehicleDetails.totalSelectedDate : vehicleDetails.freeDays} day${vehicleDetails.freeDays > 1 ? 's' : ''}`}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{' = '}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{`$${0}`}</Text>
                                    </View>
                                </View>
                                {(vehicleDetails.extraPaidDays && vehicleDetails.ratePerDay) && <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize, }}>
                                    <Text style={{ flex: 1, color: '#0091ff', }}>{'Paid Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly', }}>
                                        <Text style={{ flex: 3, color: '#0091ff' }}>{`$${vehicleDetails.ratePerDay} x ${vehicleDetails.totalSelectedDate > vehicleDetails.freeDays ? (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays) : 0} days`}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{' = '}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{`$${vehicleDetails.totalSelectedDate > vehicleDetails.freeDays ? vehicleDetails.ratePerDay * (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays) : 0}`}</Text>
                                    </View>
                                </View>}
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, color: '#0091ff' }}>{'Total : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, color: '#0091ff', }}>{``}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff', }}>{''}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff', }}>{`$${0 + (vehicleDetails.extraPaidDays && vehicleDetails.ratePerDay && vehicleDetails.totalSelectedDate && vehicleDetails.totalSelectedDate > vehicleDetails.freeDays) ? (vehicleDetails.ratePerDay * (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays)) : 0}`}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <Checkbox
                                        title={' '}
                                        toggleCheck={() => setAccepted(!accepted)}
                                        checked={accepted}
                                        checkedIcon={CHECKBOX_ACTIVE}
                                        uncheckedIcon={CHECKBOX_ICON}
                                        titleStyle={{ textTransform: 'uppercase', }}
                                        checkboxStyle={{ flex: 1, maxWidth: '5%', }}
                                    />
                                    <View style={{ flex: 1, minWidth: '90%', flexDirection: 'row', flexWrap: 'wrap', }}>
                                        <Text style={{ color: 'black' }}>
                                            {'I have read and agree with the '}
                                        </Text>
                                        <Text
                                            onPress={() => Linking.openURL('https://easycarrelo.co.nz/terms')}
                                            style={{ color: '#0091ff', textDecorationLine: 'underline', }}>
                                            {'Terms & Conditions.'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <CustomButton
                                title={'Submit your request'}
                                titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase', }}
                                onPress={() => {
                                    if (!(profileData && profileData.name && profileData.surname && profileData.dob && profileData.city && profileData.country && profileData.email && profileData.phoneNumber && profileData.phoneNumber.code && profileData.phoneNumber.phone)) {
                                        Alert.alert(
                                            'Complete Your Details',
                                            'We require your complete details before proceeding ahead, kindly complete your details first.',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => { },
                                                },
                                                {
                                                    text: STRINGS.OKAY,
                                                    onPress: () => { navigation.navigate(SCREENS.COMPLETE_DETAILS) },
                                                },
                                            ],
                                        );
                                    }
                                    else if (!accepted) {
                                        Alert.alert(
                                            'Accept Terms & Conditions.',
                                            'Kindly read and accept all Terms and Conditions before proceeding.',
                                            [
                                                {
                                                    text: STRINGS.OKAY,
                                                    onPress: () => { },
                                                },
                                            ],
                                        );
                                    }
                                    else {
                                        let modifiedPickupDate = vehicleDetails.pickupDate.setHours(0, 0, 0, 0);
                                        modifiedPickupDate = new Date(modifiedPickupDate);
                                        let modifiedDropoffDate = vehicleDetails.dropoffDate.setHours(0, 0, 0, 0);
                                        modifiedDropoffDate = new Date(modifiedDropoffDate);
                                        submitBookingRequest(
                                            vehicleDetails._id,
                                            {
                                                startDate: modifiedPickupDate,
                                                endDate: modifiedDropoffDate,
                                                selectedFreeDays: vehicleDetails.totalSelectedDate < vehicleDetails.freeDays ? vehicleDetails.totalSelectedDate : vehicleDetails.freeDays,
                                                bookingPrice: (vehicleDetails.extraPaidDays && vehicleDetails.ratePerDay && vehicleDetails.totalSelectedDate && vehicleDetails.totalSelectedDate > vehicleDetails.freeDays) ? (vehicleDetails.ratePerDay * (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays)) : 0,
                                                commentForAgency: '',
                                                commentForECRByDriver: '',
                                                rateForAgency: 0,
                                                status: 6,
                                            },
                                            (response) => {
                                                setRideBooked(true);
                                                },
                                            () => { }
                                        );
                                    }
                                }}
                                buttonStyle={styles.vehicleListButton}
                            />
                        </View>
                    </View>}
            </ScrollView>
        </AppHoc >
    );
};

