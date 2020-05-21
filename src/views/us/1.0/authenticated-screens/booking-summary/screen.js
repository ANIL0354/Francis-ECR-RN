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
import CustomDraggableCalendar from '../../../../../components/atoms/CustomDraggableCalendar';
import CollapsableWrapper from '../../../../../components/hoc/CollapsableWrapper';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    navigation,
    route
}) => {
    let { vehicleDetails } = route.params;
    const onViewRef = React.useRef((viewableItems) => {
        if (viewableItems.changed[0].index <= 1) {
            showUpButton(false);
        }
        if (viewableItems.changed[0].index >= 2) {
            showUpButton(true);
        }
    })
    const today = new Date();
    const largeScaledFont = scaleText(18);
    const mediumScaledFont = scaleText(16)

    return (
        <AppHoc rightIcon={MENU_LOGO} leftIcon={APP_LOGO} centerIcon={USER_ICON}>
            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}>
                <View style={styles.childContainer}>
                    <TouchableOpacity
                        style={styles.navArrowContainer}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={NAV_ARROW_ICON}
                            height={20}
                            width={20}
                            resizeMode={'contain'}
                            style={{ alignSelf: 'center', marginVertical: scaleText(5).fontSize }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            ...styles.subHeaderText,
                            fontSize: largeScaledFont.fontSize,
                        }}>
                        {'Summary'}
                    </Text>
                </View>

                <View style={{ paddingHorizontal: scaleText(10).fontSize }}>
                    <View>
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
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Text
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                    style={styles.listPickupText}>{vehicleDetails.pickupBranchData.city}</Text>
                                <SimpleImage source={TURN_RIGHT} />
                                <Text
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                    style={styles.listPickupText}>{vehicleDetails.dropoffBranchData.city}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <Text style={{ color: 'black', flex: 1, }}>{'Pick-up Date: '}</Text>
                                <Text style={{ color: 'black', flex: 1, }}>{'20/05/2020'}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <Text style={{ color: 'black', flex: 1, }}>{'Return Date: '}</Text>
                                <Text style={{ color: 'black', flex: 1, }}>{'28/05/2020'}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <CustomButton
                                title={'Change'}
                                titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'capitalize' }}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                buttonStyle={{ marginHorizontal: scaleText(40).fontSize, paddingVertical: scaleText(5).fontSize, backgroundColor: '#535050' }}
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
                        </View>
                        <CustomButton
                            title={'Submit your request'}
                            titleStyle={{ color: 'white', textAlign: 'center', textTransform: 'uppercase' }}
                            onPress={() => {
                            }}
                            buttonStyle={styles.vehicleListButton}
                        />
                    </View>
                </View>
            </ScrollView>
        </AppHoc >
    );
};

