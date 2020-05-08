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
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    const vehicleListRef = useRef();
    const today = new Date();
    const maxDate = today.setMonth(today.getMonth() + 6);
    const [filterMenu, showFilterMenu] = useState(false);
    const [modifySearch, setModifySearch] = useState(false);
    const [dateValue, onDateChange] = useState(pickupDate);
    const [selectedDate, setSelectedDate] = useState(null);
    const [detailsList, setDetailsList] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [fetchingData, setFetchingData] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [upButton, showUpButton] = useState(false);

    const scaledLargerFont = scaleText(20);
    const scaledLargeFont = scaleText(18);
    const scaledMediumFont = scaleText(16);
    const scaledSmallFont = scaleText(14);
    const scaledSmallerFont = scaleText(12);
    const scaledFont = scaleText(14)
    let animatedValue = new Animated.Value(0);

    const showSearchBarAnimation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setModifySearch(!modifySearch);
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            refreshVehicleList();
            setPageIndex(0);
            stopLoader();
        });
    }, []);

    useEffect(() => {
        setDetailsList(vehicleListItems)
    }, [vehicleListItems]);

    const scrollToTop = () => {
        vehicleListRef.current.scrollToIndex({ animated: true, index: 0 });
        showUpButton(false)
    }


    return (
        <AppHoc rightIcon={MENU_LOGO} leftIcon={APP_LOGO} centerIcon={USER_ICON}>
            <View style={styles.childContainer}>
                <TouchableOpacity
                    style={styles.navArrowContainer}
                    onPress={() => navigation.navigate(SCREENS.LOGIN)}>
                    <Image
                        source={NAV_ARROW_ICON}
                        height={20}
                        width={20}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        fontSize: largeScaledFont.fontSize,
                    }}>
                    {LABELS.forgotPasswordHeader}
                </Text>
            </View>

        </AppHoc>
    );
};

