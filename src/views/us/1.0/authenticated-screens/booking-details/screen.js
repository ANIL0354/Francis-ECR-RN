import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
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
    fuelType,
    vehicleListing,
    vehicleType,
    transmissionType,
    seatsValue,
    freeDays,
    setChildSeats,
    setAdultSeats,
    setPickupLocation,
    isNetConnected,
    pickupLocation,
    childSeatsValue,
    adultSeatsValue,
    setSeatsValue,
    setFuelType,
    setFreeDays,
    startLoader,
    stopLoader,
    setPickupDate,
    pickupDate,
    setVehicleType,
    fuelTypesList,
    fetchVehicleListing,
    transmissionTypesList,
    vehicleTypesList,
    refreshVehicleList,
    vehicleListItems,
    setTransmissionType,
}) => {
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

        </AppHoc>
    );
};

