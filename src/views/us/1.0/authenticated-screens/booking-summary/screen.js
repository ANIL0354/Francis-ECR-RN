/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    Image as SimpleImage,
    RefreshControl,
    FlatList,
    Animated,
    Alert,
    Keyboard,
    ScrollView,
    LayoutAnimation,
    UIManager,
    TouchableOpacity,
    BackHandler,
    Dimensions,
    Linking
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Image from 'react-native-image-progress';
import AppHoc from '../../../../../components/hoc/AppHoc';
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
    SEARCH_ICON,
    CHECKBOX_ICON,
    LUGGAGE_ICON,
    RIDE_BOOKED,
    LIMITS,
    CHECKBOX_ACTIVE,
    LABELS,
    FUEL_INACTIVE,
    VEHICLE_YEAR_RANGE,
    SCREENS,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from "./styles.js";
import IconText from "../../../../../components/atoms/IconTextComponent";
import CustomButton from "../../../../../components/atoms/CustomButton";
import CustomDraggableCalendar from '../../../../../components/atoms/CustomDraggableCalendar';
import CollapsableWrapper from '../../../../../components/hoc/CollapsableWrapper';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    navigation,
    route,
    driverData,
    submitBookingRequest
}) => {
    let { vehicleDetails, scrollRef = {} } = route.params;

    const today = new Date();
    const largeScaledFont = scaleText(18);
    const mediumScaledFont = scaleText(16);
    const [rideBooked, setRideBooked] = useState(false);
    const [accepted, setAccepted] = useState(false);

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
                            navigation.goBack()
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
                            fontSize: largeScaledFont.fontSize,
                        }}>
                        {rideBooked ? 'Thank You' : 'Summary'}
                    </Text>
                </View>

                {rideBooked
                    ?
                    <View style={{ flex: 1, paddingHorizontal: scaleText(20).fontSize, justifyContent: 'center', minHeight: Dimensions.get('window').height - scaleText(130).fontSize, }}>

                        <View>
                            <SimpleImage source={RIDE_BOOKED} style={{ flex: 1, alignSelf: 'center', marginBottom: scaleText(50).fontSize, }} resizeMode={'contain'} />
                            <Text
                                style={{ ...styles.carTitle, fontSize: scaleText(20).fontSize, textAlign: 'center', textAlignVertical: 'center' }}>{'Ride Booked!'}</Text>
                            <Text
                                style={{ color: 'black', fontSize: scaleText(16).fontSize, textAlign: 'center', textAlignVertical: 'center' }}>{'Thank you, your ride has been booked with us.'}</Text>
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
                                            {/* <IconText
                                            icon={VEHICLE_YEAR_RANGE}
                                            title={`${vehicleDetails.vehicleData.manufactureYear || 'N/A'}`}
                                            titleFontSize={14}
                                            titleStyle={styles.iconText}
                                            containerStyle={styles.iconTextContainer}
                                        /> */}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ ...styles.rowFlex, justifyContent: 'space-evenly' }}>
                                {/* <View style={styles.listLocationWrapper}> */}
                                <Text
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                    style={styles.listPickupText}>{vehicleDetails.pickupBranchData.city}</Text>
                                {/* <View style={styles.listDropoffWrapper}> */}
                                <SimpleImage source={STRAIGHT_ARROW} style={{ alignSelf: 'center' }} />
                                <Text
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                    style={styles.listPickupText}>{vehicleDetails.dropoffBranchData.city}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(10).fontSize }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <Text style={{ color: 'black', flex: 1, }}>{'Pick-up Date: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, }}>{moment(vehicleDetails.pickupDate).format('DD/MM/YYYY')}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
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
                                buttonStyle={{ marginHorizontal: scaleText(40).fontSize, paddingVertical: scaleText(5).fontSize, backgroundColor: '#535050', alignSelf: 'flex-end' }}
                            />
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
                                {(vehicleDetails.extraPaidDays && vehicleDetails.ratePerDay) && <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, color: '#0091ff' }}>{'Paid Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, color: '#0091ff' }}>{`$${vehicleDetails.ratePerDay} x ${vehicleDetails.totalSelectedDate > vehicleDetails.freeDays ? (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays) : 0} days`}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{' = '}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{`$${vehicleDetails.totalSelectedDate > vehicleDetails.freeDays ? vehicleDetails.ratePerDay * (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays) : 0}`}</Text>
                                    </View>
                                </View>}
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, color: '#0091ff' }}>{'Total : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, color: '#0091ff' }}>{``}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{''}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{`$${0 + (vehicleDetails.extraPaidDays && vehicleDetails.ratePerDay && vehicleDetails.totalSelectedDate && vehicleDetails.totalSelectedDate > vehicleDetails.freeDays) ? (vehicleDetails.ratePerDay * (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays)) : 0}`}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Checkbox
                                        title={' '}
                                        toggleCheck={() => setAccepted(!accepted)}
                                        checked={accepted}
                                        checkedIcon={CHECKBOX_ACTIVE}
                                        uncheckedIcon={CHECKBOX_ICON}
                                        titleStyle={{ textTransform: 'uppercase' }}
                                        checkboxStyle={{ flex: 1, maxWidth: '5%' }}
                                    />
                                    <View style={{ flex: 1, minWidth: '90%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <Text style={{ color: 'black' }}>
                                            {'I have read and agree with the '}
                                        </Text>
                                        <Text
                                            onPress={() => Linking.openURL('https://easycarrelo.co.nz/terms')}
                                            style={{ color: '#0091ff', textDecorationLine: 'underline' }}>
                                            {'Terms & Conditions.'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <CustomButton
                                title={'Submit your request'}
                                titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                                onPress={() => {
                                    if (!accepted) {
                                        Alert.alert(
                                            'Accept Terms & Conditions.',
                                            'Kindly read and accept all Terms and Conditions before proceeding.',
                                            [
                                                {
                                                    text: 'Okay',
                                                    onPress: () => { },
                                                },
                                            ],
                                        );
                                    }
                                    else {
                                        submitBookingRequest(
                                            driverData._id,
                                            {
                                                startDate: vehicleDetails.pickupDate,
                                                endDate: vehicleDetails.dropoffDate,
                                                selectedFreeDays: vehicleDetails.totalSelectedDate < vehicleDetails.freeDays ? vehicleDetails.totalSelectedDate : vehicleDetails.freeDays,
                                                bookingPrice: (vehicleDetails.extraPaidDays && vehicleDetails.ratePerDay && vehicleDetails.totalSelectedDate) ? (vehicleDetails.ratePerDay * (vehicleDetails.totalSelectedDate - vehicleDetails.freeDays)) : 0,
                                                commentForAgency: '',
                                                commentForECRByDriver: '',
                                                rateForAgency: 0
                                            },
                                            (response) => {
                                                setRideBooked(true)
                                            },
                                            () => { }
                                        )
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

