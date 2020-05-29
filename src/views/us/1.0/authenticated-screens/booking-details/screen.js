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
    Dimensions,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Image from 'react-native-image-progress';
import AppHoc from '../../../../../components/hoc/AppHoc';
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
    LUGGAGE_ICON,
    LIMITS,
    LABELS,
    FUEL_INACTIVE,
    VEHICLE_YEAR_RANGE,
    SCREENS,
    FREQUENCY
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from "./styles.js";
import IconText from "../../../../../components/atoms/IconTextComponent";
import CustomButton from "../../../../../components/atoms/CustomButton";
import MultiImageViewer from '../../../../../components/atoms/MultiImageViewer';
import LocationSearch from '../../../../../components/atoms/LocationSearch';
import CustomLoader from "../../../../../components/atoms/Loader";
import ImageButton from '../../../../../components/atoms/ImageButton';
import CustomDraggableCalendar from '../../../../../components/atoms/CustomDraggableCalendar';
import CollapsableWrapper from '../../../../../components/hoc/CollapsableWrapper';
import HTML from 'react-native-render-html';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    userToken,
    navigation,
    route,
    completeDetails,
    stopLoader,
    getFaqList,
    faqList,
    fetchCompleteDetails
}) => {
    const scrollRef = useRef();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalSelectedDate, setTotalSelectedDates] = useState(0);
    const [imageExpanded, setImageExpanded] = useState(false);
    const [availableImages, setAvailableImages] = useState([]);

    let { vehicleDetails } = route.params;
    useEffect(() => {
        getFaqList(
            () => { },
            () => { }
        );
        fetchCompleteDetails(
            vehicleDetails._id,
            () => { stopLoader(); },
            () => { stopLoader(); }
        )
    }, []);

    useEffect(() => {
        let images = [];
        vehicleDetails.vehicleData.url.map((item) => {
            images.push({ url: item });
            return null;
        });
        setAvailableImages(images)
    }, [vehicleDetails && vehicleDetails.vehicleData && vehicleDetails.vehicleData.url && vehicleDetails.vehicleData.url.length])

    useEffect(() => {
        let total = 0;
        if (startDate && !endDate) {
            total = 1;
            setEndDate(startDate)
        }
        else if (startDate && endDate) {
            total = ((endDate - startDate) / (1000 * 3600 * 24)) + 1
        }
        setTotalSelectedDates(total);
    }, [startDate, endDate]);

    const today = new Date();
    const largeScaledFont = scaleText(18);

    useEffect(() => {
        scrollRef.current.scrollTo(0);
    }, [navigation.isFocused()])

    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
            navigation={navigation}
        >
            <ScrollView
                bounces={false}
                ref={scrollRef}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={styles.navArrowContainer}
                        onPress={() => navigation.goBack()}
                        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                    >
                        <Image
                            source={NAV_ARROW_ICON}
                            height={20}
                            width={20}
                            style={{ alignSelf: 'center', marginVertical: scaleText(5).fontSize }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            ...styles.subHeaderText,
                            fontSize: largeScaledFont.fontSize,
                        }}>
                        {LABELS.yourRequest}
                    </Text>
                </View>
                <MultiImageViewer
                    visible={imageExpanded}
                    closeView={() => setImageExpanded(false)}
                    images={availableImages} />
                <View style={{ paddingHorizontal: scaleText(20).fontSize }}>
                    <View style={styles.detailsWrapper}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setImageExpanded(true)} style={styles.detailsLeftContainer}>
                                <Image
                                    source={{ uri: vehicleDetails.vehicleData.url[0] }}
                                    resizeMode={'contain'}
                                    style={{
                                        ...styles.alignSelfCenter,
                                        height: scaleText(100).fontSize,
                                        width: scaleText(100).fontSize,
                                    }}
                                />
                            </TouchableOpacity>
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
                    {completeDetails && <View style={{ paddingHorizontal: scaleText(5).fontSize, marginVertical: scaleText(10).fontSize }}>
                        <Text style={{ textAlign: 'center', fontSize: scaleText(14).fontSize, textAlignVertical: 'center', color: 'black' }}>
                            {completeDetails.vehicleData.description}
                        </Text>
                    </View>}
                    <View>
                        {completeDetails && <CustomDraggableCalendar
                            startDate={startDate}
                            endDate={endDate}
                            freeDays={completeDetails.freeDays}
                            setStartDate={(date) => setStartDate(date)}
                            setEndDate={(date) => setEndDate(date)}
                            pickupDate={completeDetails.pickupDate}
                            dropoffDate={completeDetails.dropoffDate}
                            totalSelectable={completeDetails.freeDays + (completeDetails.extraPaidDays ? completeDetails.extraPaidDays : 0)}
                        />}
                    </View>
                    <View style={{ marginVertical: scaleText(20).fontSize }}>
                        <Text
                            style={styles.carTitle}>{'Cost Summary'}</Text>
                        {completeDetails && <View style={{
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
                                        <Text style={{ flex: 3, color: '#0091ff' }}>{`$${0} x ${totalSelectedDate < completeDetails.freeDays ? totalSelectedDate : completeDetails.freeDays} day${completeDetails.freeDays > 1 ? 's' : ''}`}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{' = '}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{`$${0}`}</Text>
                                    </View>
                                </View>
                                {(completeDetails.extraPaidDays && completeDetails.ratePerDay) && <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, color: '#0091ff' }}>{'Paid Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, color: '#0091ff' }}>{`$${completeDetails.ratePerDay} x ${totalSelectedDate > completeDetails.freeDays ? (totalSelectedDate - completeDetails.freeDays) : 0} days`}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{' = '}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{`$${totalSelectedDate > completeDetails.freeDays ? (completeDetails.ratePerDay * (totalSelectedDate - completeDetails.freeDays)) : 0}`}</Text>
                                    </View>
                                </View>}
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, color: '#0091ff' }}>{'Total : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, color: '#0091ff' }}>{``}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{''}</Text>
                                        <Text style={{ flex: 1, color: '#0091ff' }}>{`$${0 + (completeDetails.extraPaidDays && completeDetails.ratePerDay && totalSelectedDate && totalSelectedDate > completeDetails.freeDays) ? (completeDetails.ratePerDay * (totalSelectedDate - completeDetails.freeDays)) : 0}`}</Text>
                                    </View>
                                </View>

                                <CustomButton
                                    title={'Make a request'}
                                    titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                                    onPress={() => {
                                        if (!totalSelectedDate || !startDate || !endDate) {
                                            Alert.alert(
                                                'Select Travel Dates',
                                                'Please select your travel dates before proceeding.',
                                                [
                                                    {
                                                        text: 'Okay',
                                                        onPress: () => { },
                                                    },
                                                ],
                                            );
                                        }
                                        else {
                                            userToken
                                                ? navigation.navigate(SCREENS.BOOKING_SUMMARY, {
                                                    vehicleDetails: {
                                                        ...vehicleDetails,
                                                        pickupDate: startDate,
                                                        dropoffDate: endDate,
                                                        totalSelectedDate: totalSelectedDate,
                                                        ratePerDay: completeDetails.ratePerDay ? completeDetails.ratePerDay : 0,
                                                        freeDays: completeDetails.freeDays
                                                    }
                                                })
                                                : navigation.navigate(SCREENS.LOGIN, {
                                                    fromDetails: true,
                                                    vehicleDetails: {
                                                        ...vehicleDetails,
                                                        pickupDate: startDate,
                                                        dropoffDate: endDate,
                                                        totalSelectedDate: totalSelectedDate,
                                                        ratePerDay: completeDetails.ratePerDay ? completeDetails.ratePerDay : 0,
                                                        freeDays: completeDetails.freeDays
                                                    }
                                                })
                                        }
                                    }}
                                    buttonStyle={styles.vehicleListButton}
                                />
                            </View>
                        </View>}
                    </View>
                    {completeDetails && <View style={{ flex: 1, marginVertical: scaleText(10).fontSize }}>
                        <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: '#565353', fontWeight: 'bold', fontSize: scaleText(18).fontSize }}>{'Trip Details:'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Free days available:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.freeDays} day${completeDetails.freeDays > 1 ? 's' : ''}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Extra Paid days available:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{(completeDetails.extraPaidDays && completeDetails.ratePerDay) ? `${completeDetails.extraPaidDays} day${completeDetails.extraPaidDays > 1 ? 's' : ''}` : 'Not Available'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Pick-up from:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{moment(completeDetails.pickupDate).format('DD-MMMM-YYYY')}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Pick-up time:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${moment(new Date(completeDetails.pickupTime.from).toLocaleTimeString(), 'HH:mm').format('hh:mm a')} to ${moment(new Date(completeDetails.pickupTime.to).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Drop-off time:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${moment(new Date(completeDetails.dropoffTime.from).toLocaleTimeString(), 'HH:mm').format('hh:mm a')} to ${moment(new Date(completeDetails.dropoffTime.to).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Kilometer allowance:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.kmAllow ? completeDetails.kmAllow : 'Unlimited'} Kms`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Estimated travel distance:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'999 Kms'}</Text>
                        </View>
                    </View>}
                    {completeDetails && <View style={{ flex: 1, marginVertical: scaleText(20).fontSize }}>
                        <View style={{ flex: 1, marginBottom: scaleText(15).fontSize }}>
                            <Text style={{ color: '#565353', fontWeight: 'bold', fontSize: scaleText(18).fontSize }}>{'Additional Information:'}</Text>
                        </View>
                        <CollapsableWrapper wrapperLabel={'Important Details'}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                {completeDetails && completeDetails.extraItemsData && completeDetails.extraItemsData.items ?
                                    <React.Fragment>
                                        <Text style={{
                                            color: 'black', flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize
                                        }}>{'This relocation includes:'}</Text>
                                        {completeDetails.extraItemsData && completeDetails.extraItemsData.items.map((item, index) => (
                                            <View style={{ flex: 1, paddingVertical: scaleText(3).fontSize }}>
                                                <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${index + 1}. ${item.name} at $${item.price} ${FREQUENCY[item.frequency - 1].label}.`}</Text>
                                            </View>
                                        ))}
                                    </React.Fragment>
                                    :
                                    <Text style={{
                                        color: 'black', flex: 1, marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize
                                    }}>{'No extra item found for this relocation.'}</Text>}
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Insurance'}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                {completeDetails && completeDetails.insurancrData
                                    ? <React.Fragment>
                                        {/* <Text style={{
                                            color: 'black', flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize
                                        }}>{'Insurance Details'}</Text> */}
                                        <Text style={{
                                            color: 'black', flex: 1, marginVertical: scaleText(5).fontSize, fontSize: scaleText(15).fontSize, fontWeight: 'bold'
                                        }}>{'Basic Details: '}</Text>
                                        <View style={{ flex: 1, paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, fontWeight: 'bold' }}>{'Insurance Name: '}</Text>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{completeDetails.insurancrData.name}</Text>
                                        </View>
                                        <View style={{ flex: 1, paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, fontWeight: 'bold' }}>{'Insurance Description: '}</Text>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`${completeDetails.insurancrData.description}`}</Text>
                                        </View>
                                        <Text style={{
                                            color: 'black', flex: 1, marginVertical: scaleText(5).fontSize, fontSize: scaleText(15).fontSize, fontWeight: 'bold'
                                        }}>{'Other Insurance Details: '}</Text>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, fontWeight: 'bold' }}>{'Bond: '}</Text>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`${completeDetails.insurancrData.bond ? completeDetails.insurancrData.bond : 0} year${completeDetails.insurancrData.bond > 1 ? 's' : ''}`}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, fontWeight: 'bold' }}>{'Excess: '}</Text>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`$${completeDetails.insurancrData.excess ? completeDetails.insurancrData.excess : 0}`}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, fontWeight: 'bold' }}>{'Daily Fee: '}</Text>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`$${completeDetails.insurancrData.dailyFee ? completeDetails.insurancrData.dailyFee : 0}`}</Text>
                                        </View>
                                    </React.Fragment>
                                    : <Text style={{
                                        color: 'black', flex: 1, marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize
                                    }}>{'No insurance found for this relocation.'}</Text>}
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Location'}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                <Text style={{
                                    color: 'black', flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize
                                }}>{'Pickup Branch Details'}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Branch Name: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{completeDetails.pickupBranchData.name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Contact: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.pickupBranchData.phoneNumber.code}${completeDetails.pickupBranchData.phoneNumber.phone}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Email: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.pickupBranchData.email}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Address: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`${completeDetails.pickupBranchData.address}, ${completeDetails.pickupBranchData.suburb}, ${completeDetails.pickupBranchData.city}, ${completeDetails.pickupBranchData.country}, ${completeDetails.pickupBranchData.postcode}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Branch Code: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.pickupBranchData.code}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Opens At: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{moment(new Date(completeDetails.pickupBranchData.openFrom).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Closes By: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{moment(new Date(completeDetails.pickupBranchData.closeBy).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                <Text style={{
                                    color: 'black', flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize
                                }}>{'Dropoff Branch Details'}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Branch Name: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{completeDetails.dropoffBranchData.name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Contact: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.dropoffBranchData.phoneNumber.code}${completeDetails.dropoffBranchData.phoneNumber.phone}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Email: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.dropoffBranchData.email}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Address: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`${completeDetails.dropoffBranchData.address}, ${completeDetails.dropoffBranchData.suburb}, ${completeDetails.dropoffBranchData.city}, ${completeDetails.dropoffBranchData.country}, ${completeDetails.dropoffBranchData.postcode}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Branch Code: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.dropoffBranchData.code}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Opens At: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{moment(new Date(completeDetails.dropoffBranchData.openFrom).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Closes By: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{moment(new Date(completeDetails.dropoffBranchData.closeBy).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Vehicle Details'}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                <Text style={{
                                    color: 'black', flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize, fontSize: scaleText(14).fontSize
                                }}>{'Vehicle Details'}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Vehicle Name: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{completeDetails.vehicleData.name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Vehicle Description: '}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{completeDetails.vehicleData.description}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Fuel Type:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.fuelTypeData.fuelType}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Transmission Type:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.transmissionData.name}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Vehicle Type:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.vehicleTypeData.name}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'No. of doors:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.vehicleData.numberOfDoor} Doors`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Small luggage capacity:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{`${completeDetails.vehicleData.smallLuggageSpace} Bags`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Large luggage capacity:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.vehicleData.largeLuggageSpace} Bags`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'No. of Adult Seats:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.vehicleData.adultSeats} Seats`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'No. of Child Seats:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.vehicleData.childSeats} Seats`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Air conditioning:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.vehicleData.airConditionType ? 'with AC' : 'Non-AC'}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Vehicle Code:'}</Text>
                                    <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize, }}>{`${completeDetails.vehicleData.vehicleCode}`}</Text>
                                </View>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Policy'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <HTML
                                    html={completeDetails.termsData.description ? completeDetails.termsData.description : ''}
                                    imagesMaxWidth={Dimensions.get('window').width}
                                    textSelectable={false}
                                    tagStyles={{
                                        p: { color: 'black' },
                                        h1: { color: 'black' },
                                        h2: { color: 'black' },
                                        strong: { color: 'black' }
                                    }}
                                />
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'FAQs'}>
                            {faqList && <View>
                                {
                                    faqList.length && faqList.map((item, index) => (
                                        <View style={{ flex: 1, flexDirection: 'column', marginVertical: scaleText(10).fontSize }}>
                                            <Text style={{ color: 'black', flex: 1, fontWeight: 'bold', fontSize: scaleText(14).fontSize }}>{`${index + 1}. ${item.question}`}</Text>
                                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{item.question}</Text>
                                        </View>
                                    ))
                                }
                            </View>}
                        </CollapsableWrapper>
                    </View>}
                    <View style={{ marginBottom: scaleText(30).fontSize }}>
                        <CustomButton
                            title={'Make a request'}
                            titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                            onPress={() => {
                                if (!totalSelectedDate || !startDate || !endDate) {
                                    Alert.alert(
                                        'Select Travel Dates',
                                        'Please select your travel dates before proceeding.',
                                        [
                                            {
                                                text: 'Okay',
                                                onPress: () => { },
                                            },
                                        ],
                                    );
                                }
                                else {
                                    userToken
                                        ? navigation.navigate(SCREENS.BOOKING_SUMMARY, {
                                            vehicleDetails: {
                                                ...vehicleDetails,
                                                pickupDate: startDate,
                                                dropoffDate: endDate,
                                                totalSelectedDate: totalSelectedDate,
                                                ratePerDay: completeDetails.ratePerDay ? completeDetails.ratePerDay : 0,
                                                freeDays: completeDetails.freeDays
                                            }
                                        })
                                        : navigation.navigate(SCREENS.LOGIN, {
                                            fromDetails: true,
                                            vehicleDetails: {
                                                ...vehicleDetails,
                                                pickupDate: startDate,
                                                dropoffDate: endDate,
                                                totalSelectedDate: totalSelectedDate,
                                                ratePerDay: completeDetails.ratePerDay ? completeDetails.ratePerDay : 0,
                                                freeDays: completeDetails.freeDays
                                            }
                                        })
                                }
                            }}
                            buttonStyle={{ ...styles.vehicleListButton, marginHorizontal: scaleText(10).fontSize }}
                        />
                    </View>
                </View>
            </ScrollView>
        </AppHoc >
    );
};

