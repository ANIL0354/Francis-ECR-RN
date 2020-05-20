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
    TURN_RIGHT,
    DOORS_ICON,
    GEAR_ICON,
    SEARCH_ICON,
    LUGGAGE_ICON,
    LIMITS,
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
import LocationSearch from '../../../../../components/atoms/LocationSearch';
import CustomLoader from "../../../../../components/atoms/Loader";
import ImageButton from '../../../../../components/atoms/ImageButton';
import CustomDraggableCalendar from '../../../../../components/atoms/CustomDraggableCalendar';
import CollapsableWrapper from '../../../../../components/hoc/CollapsableWrapper';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    userToken,
    navigation,
    route,
    completeDetails,
    stopLoader,
    fetchCompleteDetails
}) => {
    let { vehicleDetails } = route.params;
    console.log('completeDetails', completeDetails)
    useEffect(() => {
        fetchCompleteDetails(
            vehicleDetails._id,
            () => { stopLoader(); },
            () => { stopLoader(); }
        )
    })


    const onViewRef = React.useRef((viewableItems) => {
        if (viewableItems.changed[0].index <= 1) {
            showUpButton(false);
        }
        if (viewableItems.changed[0].index >= 2) {
            showUpButton(true);
        }
    })
    const today = new Date();
    const scaledLargeFont = scaleText(18);

    return (
        <AppHoc rightIcon={MENU_LOGO} leftIcon={APP_LOGO} centerIcon={USER_ICON}>
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={styles.navArrowContainer}
                        onPress={() => navigation.navigate(SCREENS.VEHICLE_LISTING)}>
                        <Image
                            source={NAV_ARROW_ICON}
                            height={20}
                            width={20}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            ...styles.subHeaderText,
                            fontSize: scaledLargeFont.fontSize,
                        }}>
                        {LABELS.yourRequest}
                    </Text>
                </View>
                <View style={{ paddingHorizontal: scaleText(20).fontSize }}>
                    <View style={styles.detailsWrapper}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.detailsLeftContainer}>
                                <Image
                                    source={{ uri: vehicleDetails.vehicleData.url[0] }}
                                    resizeMode={'contain'}
                                    style={{
                                        ...styles.alignSelfCenter,
                                        height: scaleText(150).fontSize,
                                        width: scaleText(150).fontSize,
                                    }}
                                />
                            </View>
                            <View style={styles.detailsRightContainer}>
                                <Text
                                    style={styles.carTitle}>{vehicleDetails.vehicleData ? vehicleDetails.vehicleData.name : ''}</Text>
                                <View style={styles.carFeaturesWrapper}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <IconText
                                            icon={CAR_SEATS_ICON}
                                            title={`${vehicleDetails.vehicleData.adultSeats || 0} adult${vehicleDetails.vehicleData.adultSeats > 1 ? 's' : ''}, ${vehicleDetails.vehicleData.childSeats || 0} child${vehicleDetails.vehicleData.childSeats > 1 ? 's' : ''}`}
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
                                        {/* <IconText
                                            icon={VEHICLE_YEAR_RANGE}
                                            title={`${vehicleDetails.vehicleData.vehicleYearRange.from}-${vehicleDetails.vehicleData.vehicleYearRange.to}`}
                                            titleFontSize={14}
                                            titleStyle={styles.iconText}
                                            containerStyle={styles.iconTextContainer}
                                        /> */}
                                        <IconText
                                            icon={VEHICLE_YEAR_RANGE}
                                            title={`${vehicleDetails.vehicleData.manufactureYear || 'N/A'}`}
                                            titleFontSize={14}
                                            titleStyle={styles.iconText}
                                            containerStyle={styles.iconTextContainer}
                                        />
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
                            <SimpleImage source={TURN_RIGHT} />
                            <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                                style={styles.listPickupText}>{vehicleDetails.dropoffBranchData.city}</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: scaleText(5).fontSize, marginVertical: scaleText(10).fontSize }}>
                        <Text style={{ textAlign: 'center', fontSize: scaleText(14).fontSize, textAlignVertical: 'center', color: 'black' }}>
                            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                        </Text>
                    </View>
                    <View>
                        <CustomDraggableCalendar />
                    </View>
                    <View style={{ marginVertical: scaleText(20).fontSize }}>
                        <Text
                            style={styles.carTitle}>{'Cost Summary'}</Text>
                        <View style={{
                            backgroundColor: '#f8f8f8',
                            padding: scaleText(20).fontSize,
                            borderRadius: scaleText(10).fontSize,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1 }}>{'Free Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text>{`$${30} x ${4} days`}</Text>
                                        <Text>{' = '}</Text>
                                        <Text>{`$${30}`}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1 }}>{'Paid Days : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text>{`$${30} x ${4} days`}</Text>
                                        <Text>{' = '}</Text>
                                        <Text>{`$${30}`}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', marginVertical: scaleText(5).fontSize }}>
                                    <Text style={{ flex: 1, }}>{'Total : '}</Text>
                                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <Text>{`$${30} x ${4} days`}</Text>
                                        <Text>{' = '}</Text>
                                        <Text>{`$${30}`}</Text>
                                    </View>
                                </View>

                                <CustomButton
                                    title={'Make a request'}
                                    titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                                    onPress={() => {
                                        userToken
                                            ? navigation.navigate(SCREENS.BOOKING_SUMMARY)
                                            : navigation.navigate(SCREENS.LOGIN, { fromDetails: true, vehicleDetails: vehicleDetails })
                                    }}
                                    buttonStyle={styles.vehicleListButton}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginVertical: scaleText(10).fontSize }}>
                        <View style={{ flex: 1, marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: '#565353', fontWeight: 'bold', fontSize: scaleText(18).fontSize }}>{'Trip Details:'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Free days available:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'4'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Extra Paid days available:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'14'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Pick-up from:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'1st January 2020'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Pick-up time:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'8:00 am to 6:00 pm'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Drop-off time:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'8:00 am to 6:00 pm'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Kilometer allowance:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Unlimited'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                            <Text style={{ color: 'black', flex: 1.5, fontSize: scaleText(14).fontSize }}>{'Estimated travel distance:'}</Text>
                            <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'999 Kms'}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginVertical: scaleText(20).fontSize }}>
                        <View style={{ flex: 1, marginBottom: scaleText(15).fontSize }}>
                            <Text style={{ color: '#565353', fontWeight: 'bold', fontSize: scaleText(18).fontSize }}>{'Additional Information:'}</Text>
                        </View>
                        <CollapsableWrapper wrapperLabel={'Important Details'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Important details will come here.'}</Text>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Insurance'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Insurance details will come here.'}</Text>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Location'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Location details will come here.'}</Text>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Vehicle Details'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Vehicle details will come here.'}</Text>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'Policy'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'Terms & Condition will come here.'}</Text>
                            </View>
                        </CollapsableWrapper>
                        <CollapsableWrapper wrapperLabel={'FAQs'}>
                            <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(3).fontSize }}>
                                <Text style={{ color: 'black', flex: 1, fontSize: scaleText(14).fontSize }}>{'FAQs will come here.'}</Text>
                            </View>
                        </CollapsableWrapper>
                    </View>
                    <View style={{ marginBottom: scaleText(30).fontSize }}>
                        <CustomButton
                            title={'Make a request'}
                            titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                            onPress={() => {
                                userToken
                                    ? navigation.navigate(SCREENS.BOOKING_SUMMARY)
                                    : navigation.navigate(SCREENS.LOGIN)
                            }}
                            buttonStyle={{ ...styles.vehicleListButton, marginHorizontal: scaleText(10).fontSize }}
                        />
                    </View>
                </View>
            </ScrollView>
        </AppHoc>
    );
};

