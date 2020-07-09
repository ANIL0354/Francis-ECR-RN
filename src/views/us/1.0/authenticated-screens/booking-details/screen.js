/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image as SimpleImage,
    Alert,
    ScrollView,
    UIManager,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import WebView from 'react-native-autoheight-webview';
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
    LUGGAGE_ICON,
    LABELS,
    FUEL_INACTIVE,
    VEHICLE_YEAR_RANGE,
    SCREENS,
    FREQUENCY,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import styles from './styles.js';
import IconText from '../../../../../components/atoms/IconTextComponent';
import CustomButton from '../../../../../components/atoms/CustomButton';
import MultiImageViewer from '../../../../../components/atoms/MultiImageViewer';
import CustomDraggableCalendar from '../../../../../components/atoms/CustomDraggableCalendar';
import CollapsableWrapper from '../../../../../components/hoc/CollapsableWrapper';
import HTML from 'react-native-render-html';
import { STRINGS } from '../../../../../shared/constants/us/strings';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    userToken,
    navigation,
    route,
    completeDetails,
    stopLoader,
    getFaqList,
    faqList,
    saveCompleteDetails,
    fetchCompleteDetails,
}) => {
    const scrollRef = useRef();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalSelectedDate, setTotalSelectedDates] = useState(0);
    const [imageExpanded, setImageExpanded] = useState(false);
    const [availableImages, setAvailableImages] = useState([]);
    const [portrait, setPortraitOrientation] = useState(true);
    const [htmlContent, setHTMLContent] = useState('');
    let { vehicleDetails, fromSummary = false } = route.params;
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
        setAvailableImages(images);
    }, [vehicleDetails && vehicleDetails.vehicleData && vehicleDetails.vehicleData.url && vehicleDetails.vehicleData.url.length])

    useEffect(() => {
        let total = 0;
        if (startDate && !endDate) {
            total = 1;
            setEndDate(startDate);
        }
        else if (startDate && endDate) {
            total = ((endDate - startDate) / (1000 * 3600 * 24)) + 1;
        }
        setTotalSelectedDates(total);
    }, [startDate, endDate]);

    const largeScaledFont = scaleText(18);


    useEffect(() => {
        return () => {
            saveCompleteDetails(null);
        };
    }, []);

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            Dimensions.get('window').width > Dimensions.get('window').height
                ? setPortraitOrientation(false)
                : setPortraitOrientation(true);
        });
    }, []);

    useEffect(() => {
        if (completeDetails && completeDetails.termsData && completeDetails.termsData.description) {
            let html = completeDetails.termsData.description;
            html = html.replace(/&lt;/g, '<');
            html = html.replace(/&gt;/g, '>');
            html = html.replace(/&nbsp;/g, ' ');
            console.log(html);
            setHTMLContent(html);
        }
    }, [completeDetails && completeDetails.termsData && completeDetails.termsData.description])

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
                            style={styles.navArrow}
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
                <View style={styles.screenContentWrapper}>
                    <View style={styles.detailsWrapper}>
                        <View style={styles.rowFlex}>
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
                                    <View style={styles.rowFlex}>
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
                        <View style={styles.locationWrapper}>
                            <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                                style={styles.listPickupText}>{vehicleDetails.pickupBranchData.city}</Text>
                            <SimpleImage source={STRAIGHT_ARROW} style={styles.alignSelfCenter} />
                            <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                                style={styles.listPickupText}>{vehicleDetails.dropoffBranchData.city}</Text>
                        </View>
                    </View>
                    {completeDetails && <View style={{ paddingHorizontal: scaleText(5).fontSize, marginVertical: scaleText(10).fontSize }}>
                        <Text style={styles.descriptionText}>
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
                        {completeDetails && <View style={styles.costSummarWrapper}>
                            <View style={{ flex: 1, }}>
                                <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, ...styles.basicBlueText }}>{'Free Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, ...styles.basicBlueText }}>{`$${0} x ${totalSelectedDate < completeDetails.freeDays ? totalSelectedDate : completeDetails.freeDays} day${completeDetails.freeDays > 1 ? 's' : ''}`}</Text>
                                        <Text style={{ flex: 1, ...styles.basicBlueText }}>{' = '}</Text>
                                        <Text style={{ flex: 1, ...styles.basicBlueText }}>{`$${0}`}</Text>
                                    </View>
                                </View>
                                {(completeDetails.extraPaidDays && completeDetails.ratePerDay) && <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, ...styles.basicBlueText }}>{'Paid Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, ...styles.basicBlueText }}>{`$${completeDetails.ratePerDay} x ${totalSelectedDate > completeDetails.freeDays ? (totalSelectedDate - completeDetails.freeDays) : 0} days`}</Text>
                                        <Text style={{ flex: 1, ...styles.basicBlueText }}>{' = '}</Text>
                                        <Text style={{ flex: 1, ...styles.basicBlueText }}>{`$${totalSelectedDate > completeDetails.freeDays ? (completeDetails.ratePerDay * (totalSelectedDate - completeDetails.freeDays)) : 0}`}</Text>
                                    </View>
                                </View>}
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, ...styles.basicBlueText }}>{'Total : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text style={{ flex: 3, ...styles.basicBlueText }}>{''}</Text>
                                        <Text style={{ flex: 1, ...styles.basicBlueText }}>{''}</Text>
                                        <Text style={{ flex: 1, ...styles.basicBlueText }}>{`$${0 + (completeDetails.extraPaidDays && completeDetails.ratePerDay && totalSelectedDate && totalSelectedDate > completeDetails.freeDays) ? (completeDetails.ratePerDay * (totalSelectedDate - completeDetails.freeDays)) : 0}`}</Text>
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
                                                        text: STRINGS.OKAY,
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
                                                        freeDays: completeDetails.freeDays,
                                                    },
                                                    scrollRef: scrollRef,
                                                })
                                                : navigation.navigate(SCREENS.LOGIN, {
                                                    fromDetails: true,
                                                    vehicleDetails: {
                                                        ...vehicleDetails,
                                                        pickupDate: startDate,
                                                        dropoffDate: endDate,
                                                        totalSelectedDate: totalSelectedDate,
                                                        ratePerDay: completeDetails.ratePerDay ? completeDetails.ratePerDay : 0,
                                                        freeDays: completeDetails.freeDays,
                                                    },
                                                    scrollRef: scrollRef,
                                                });
                                        }
                                    }}
                                    buttonStyle={styles.vehicleListButton}
                                />
                            </View>
                        </View>}
                    </View>
                    {completeDetails && <View style={{ flex: 1, marginVertical: scaleText(10).fontSize }}>
                        <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                            <Text style={styles.tripDetailsText}>{STRINGS.TRIP_DETAILS_SUBHEADING}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ ...styles.basicBlackText, flex: 1.5 }}>{STRINGS.FREE_DAYS_AVAILABLE}</Text>
                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.freeDays} day${completeDetails.freeDays > 1 ? 's' : ''}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ ...styles.basicBlackText, flex: 1.5 }}>{STRINGS.EXTRA_DAYS_AVAILABLE}</Text>
                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{(completeDetails.extraPaidDays && completeDetails.ratePerDay) ? `${completeDetails.extraPaidDays} day${completeDetails.extraPaidDays > 1 ? 's' : ''}` : 'Not Available'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ ...styles.basicBlackText, flex: 1.5 }}>{STRINGS.PICKUP_FROM}</Text>
                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{moment(completeDetails.pickupDate).format('DD-MMMM-YYYY')}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ ...styles.basicBlackText, flex: 1.5 }}>{STRINGS.PICKUP_TIME}</Text>
                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${moment(new Date(completeDetails.pickupTime.from).toLocaleTimeString(), 'HH:mm').format('hh:mm a')} to ${moment(new Date(completeDetails.pickupTime.to).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ ...styles.basicBlackText, flex: 1.5 }}>{STRINGS.DROPOFF_TIME}</Text>
                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${moment(new Date(completeDetails.dropoffTime.from).toLocaleTimeString(), 'HH:mm').format('hh:mm a')} to ${moment(new Date(completeDetails.dropoffTime.to).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ ...styles.basicBlackText, flex: 1.5 }}>{STRINGS.KILOMETER_ALLOWED}</Text>
                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.kmAllow ? completeDetails.kmAllow : 'Unlimited'} Kms`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ ...styles.basicBlackText, flex: 1.5 }}>{STRINGS.ESTIMATED_DISTANCE}</Text>
                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.estimatedDistance} Km${completeDetails.estimatedDistance > 1 ? 's' : ''}`}</Text>
                        </View>
                    </View>}
                    {completeDetails && <View style={{ flex: 1, marginVertical: scaleText(20).fontSize }}>
                        <View style={{ flex: 1, marginBottom: scaleText(15).fontSize }}>
                            <Text style={{ color: '#565353', fontWeight: 'bold', fontSize: scaleText(18).fontSize }}>{STRINGS.ADDITIONAL_INFORMATION}</Text>
                        </View>
                        <CollapsableWrapper wrapperLabel={STRINGS.IMPORTANT_DETAILS}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                {completeDetails && completeDetails.extraItemsData && completeDetails.extraItemsData.items ?
                                    <React.Fragment>
                                        <Text style={{
                                            ...styles.basicBlackText, flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize,
                                        }}>{STRINGS.THIS_RELOCATION_INCLUDES}</Text>
                                        {completeDetails.extraItemsData && completeDetails.extraItemsData.items.map((item, index) => (
                                            <View style={{ flex: 1, paddingVertical: scaleText(3).fontSize }}>
                                                <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${index + 1}. ${item.name} at $${item.price} ${FREQUENCY[item.frequency - 1].label}.`}</Text>
                                            </View>
                                        ))}
                                    </React.Fragment>
                                    :
                                    <Text style={{
                                        ...styles.basicBlackText, flex: 1, marginVertical: scaleText(5).fontSize
                                    }}>{STRINGS.NO_EXTRA_ITEM_FOUND}</Text>}
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Insurance'}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                {completeDetails && completeDetails.insuranceData
                                    ? <React.Fragment>
                                        <Text style={{
                                            ...styles.basicBlackText, flex: 1, marginVertical: scaleText(5).fontSize, fontSize: scaleText(15).fontSize, fontWeight: 'bold'
                                        }}>{STRINGS.BASIC_DETAILS}</Text>
                                        <View style={{ flex: 1, paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, fontWeight: 'bold' }}>{STRINGS.INSURANCE_NAME}</Text>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{completeDetails.insuranceData.name}</Text>
                                        </View>
                                        <View style={{ flex: 1, paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, fontWeight: 'bold' }}>{STRINGS.INSURANCE_DESCRIPTION}</Text>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{`${completeDetails.insuranceData.description ? completeDetails.insuranceData.description : 'N/A'}`}</Text>
                                        </View>
                                        <Text style={{
                                            ...styles.basicBlackText, flex: 1, marginVertical: scaleText(5).fontSize, fontSize: scaleText(15).fontSize, fontWeight: 'bold',
                                        }}>{STRINGS.OTHER_INSURANCE_DETAILS}</Text>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, fontWeight: 'bold' }}>{STRINGS.BOND}</Text>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{`${completeDetails.insuranceData.bond ? completeDetails.insuranceData.bond : 0} year${completeDetails.insuranceData.bond > 1 ? 's' : ''}`}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, fontWeight: 'bold' }}>{STRINGS.EXCESS}</Text>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{`$${completeDetails.insuranceData.excess ? completeDetails.insuranceData.excess : 0}`}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, fontWeight: 'bold' }}>{STRINGS.DAILY_FEE}</Text>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{`$${completeDetails.insuranceData.dailyFee ? completeDetails.insuranceData.dailyFee : 0}`}</Text>
                                        </View>
                                    </React.Fragment>
                                    : <Text style={{
                                        ...styles.basicBlackText, flex: 1, marginVertical: scaleText(5).fontSize,
                                    }}>{STRINGS.NO_INSURANCE_FOUND}</Text>}
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Location'}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                <Text style={{
                                    ...styles.basicBlackText, flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize,
                                }}>{STRINGS.PICKUP_BRANCH_DETAILS}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.BRANCH_NAME}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{completeDetails.pickupBranchData.name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.CONTACT}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.pickupBranchData.phoneNumber.code}${completeDetails.pickupBranchData.phoneNumber.phone}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.EMAIL_TEXT}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.pickupBranchData.email}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.ADDRESS}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{`${completeDetails.pickupBranchData.address}, ${completeDetails.pickupBranchData.suburb}, ${completeDetails.pickupBranchData.city}, ${completeDetails.pickupBranchData.country}, ${completeDetails.pickupBranchData.postcode}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.BRANCH_CODE}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.pickupBranchData.code}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.OPENS_AT}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{moment(new Date(completeDetails.pickupBranchData.openFrom).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.CLOSE_BY}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{moment(new Date(completeDetails.pickupBranchData.closeBy).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                <Text style={{
                                    ...styles.basicBlackText, flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize
                                }}>{STRINGS.DROPOFF_BRANCH_DETAILS}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.BRANCH_NAME}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{completeDetails.dropoffBranchData.name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.CONTACT}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.dropoffBranchData.phoneNumber.code}${completeDetails.dropoffBranchData.phoneNumber.phone}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.EMAIL}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.dropoffBranchData.email}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.ADDRESS}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{`${completeDetails.dropoffBranchData.address}, ${completeDetails.dropoffBranchData.suburb}, ${completeDetails.dropoffBranchData.city}, ${completeDetails.dropoffBranchData.country}, ${completeDetails.dropoffBranchData.postcode}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.BRANCH_CODE}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.dropoffBranchData.code}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.OPENS_AT}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{moment(new Date(completeDetails.dropoffBranchData.openFrom).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.CLOSE_BY}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{moment(new Date(completeDetails.dropoffBranchData.closeBy).toLocaleTimeString(), 'HH:mm').format('hh:mm a')}</Text>
                                </View>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Vehicle Details'}>
                            <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                                <Text style={{
                                    ...styles.basicBlackText, flex: 1, fontWeight: 'bold', marginVertical: scaleText(5).fontSize,
                                }}>{STRINGS.VEHICLE_DETAILS}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.VEHICLE_NAME}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{completeDetails.vehicleData.name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.VEHICLE_DESCRIPTION}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1, textTransform: 'capitalize' }}>{completeDetails.vehicleData.description}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.FUEL_TYPE}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.fuelTypeData.fuelType}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.TRANSMISSION_TYPE}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.transmissionData.name}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.VEHICLE_TYPE}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleTypeData.name}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.NO_OF_DOORS}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleData.numberOfDoor} Doors`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.SMALL_LUGGAGE_CAPACITY}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleData.smallLuggageSpace} Bags`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.LARGE_LUGGAGE_CAPACITY}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleData.largeLuggageSpace} Bags`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.NO_OF_ADULT_SEATS}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleData.adultSeats} Seats`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.NO_OF_CHILD_SEATS}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleData.childSeats} Seats`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.AIR_CONDITIONING}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleData.airConditionType ? 'with AC' : 'Non-AC'}`}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', paddingVertical: scaleText(3).fontSize }}>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.VEHICLE_CODE}</Text>
                                    <Text style={{ ...styles.basicBlackText, flex: 1 }}>{`${completeDetails.vehicleData.vehicleCode}`}</Text>
                                </View>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Policy'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <WebView
                                    automaticallyAdjustContentInsets={false}
                                    style={{ flex: 1, flexDirection: 'column' }}
                                    source={{ html: htmlContent }}
                                    scalesPageToFit={true}
                                />
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'FAQs'}>
                            {faqList && <View>
                                {
                                    faqList.length ? faqList.map((item, index) => (
                                        <View style={{ flex: 1, flexDirection: 'column', marginVertical: scaleText(10).fontSize }}>
                                            <Text style={{ ...styles.basicBlackText, flex: 1, fontWeight: 'bold' }}>{`${index + 1}. ${item.question}`}</Text>
                                            <Text style={{ ...styles.basicBlackText, flex: 1 }}>{item.answer}</Text>
                                        </View>
                                    ))
                                        : (
                                            <View style={{ flex: 1, flexDirection: 'column', marginVertical: scaleText(10).fontSize }}>
                                                <Text style={{ ...styles.basicBlackText, flex: 1 }}>{STRINGS.NO_FAQ_FOUND}</Text>
                                            </View>
                                        )
                                }
                            </View>}
                        </CollapsableWrapper>
                    </View>}
                    <View style={{ marginBottom: scaleText(30).fontSize }}>
                        <CustomButton
                            title={STRINGS.MAKE_A_REQUEST}
                            titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                            onPress={() => {
                                if (!totalSelectedDate || !startDate || !endDate) {
                                    Alert.alert(
                                        STRINGS.SELECT_TRAVEL_DATES,
                                        STRINGS.SELECT_DATES_BEFORE_PROCEEDING,
                                        [
                                            {
                                                text: STRINGS.OKAY,
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
                                                freeDays: completeDetails.freeDays,
                                            },
                                            scrollRef: scrollRef,
                                        })
                                        : navigation.navigate(SCREENS.LOGIN, {
                                            fromDetails: true,
                                            vehicleDetails: {
                                                ...vehicleDetails,
                                                pickupDate: startDate,
                                                dropoffDate: endDate,
                                                totalSelectedDate: totalSelectedDate,
                                                ratePerDay: completeDetails.ratePerDay ? completeDetails.ratePerDay : 0,
                                                freeDays: completeDetails.freeDays,
                                            },
                                            scrollRef: scrollRef,
                                        });
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

