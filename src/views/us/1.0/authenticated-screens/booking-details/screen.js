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
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    navigation,
    route
}) => {

    // console.log('props', route)

    let { vehicleDetails } = route.params;
    console.log('vehicleData', vehicleDetails.vehicleData.adultSeats);
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
                <View style={{ flex: 1, paddingHorizontal: scaleText(10).fontSize }}>
                    <View style={styles.detailsWrapper}>
                        <View style={styles.rowFlex}>
                            <View style={styles.detailsLeftContainer}>
                                <Image
                                    source={{ uri: vehicleDetails.vehicleData.url }}
                                    resizeMode={'contain'}
                                    style={{
                                        ...styles.alignSelfCenter,
                                        height: scaleText(150).fontSize,
                                        width: scaleText(150).fontSize
                                    }}
                                />
                            </View>
                            <View style={styles.detailsRightContainer}>
                                <Text
                                    style={styles.carTitle}>{vehicleDetails.vehicleData ? vehicleDetails.vehicleData.name : ''}</Text>
                                <View style={styles.carFeaturesWrapper}>
                                    <View style={{ ...styles.rowFlex, justifyContent: 'space-between' }}>
                                        <IconText
                                            icon={CAR_SEATS_ICON}
                                            title={`${vehicleDetails.vehicleData ? vehicleDetails.vehicleData.adultSeats + vehicleDetails.vehicleData.childSeats : 0} seats`}
                                            titleFontSize={14}
                                            titleStyle={styles.iconText}
                                            containerStyle={styles.iconTextContainer}
                                        />
                                        <IconText
                                            icon={LUGGAGE_ICON}
                                            title={`${vehicleDetails.vehicleData ? vehicleDetails.vehicleData.largeLuggageSpace + vehicleDetails.vehicleData.smallLuggageSpace : 0} bags`}
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
                                    {/* <View style={styles.rowFlex}>
                                        <IconText
                                            icon={AC_ICON}
                                            title={vehicleDetails.airConditionType ? 'Air Conditioning' : 'Non-AC'}
                                            titleFontSize={14}
                                            titleStyle={styles.iconText}
                                            containerStyle={styles.iconTextContainer}
                                        />
                                        <IconText
                                            icon={GEAR_ICON}
                                            title={vehicleDetails.transmissionData.name}
                                            titleFontSize={14}
                                            titleStyle={styles.iconText}
                                            containerStyle={styles.iconTextContainer}
                                        />
                                    </View> */}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: scaleText(5).fontSize }}>
                        <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'black' }}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}</Text>
                    </View>
                </View>
            </ScrollView>
        </AppHoc>
    );
};

