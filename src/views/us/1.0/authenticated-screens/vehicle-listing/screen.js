import React, { useState, useEffect } from "react";
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
    VEHICLE_TYPE_LISTING,
    NAV_ARROW_ICON,
    CAR_SEATS_ICON,
    AC_ICON,
    TURN_RIGHT,
    DOORS_ICON,
    VERTICAL_LINE,
    VEHICLE_DETAILS_LISTING,
    GEAR_ICON,
    SEARCH_ICON,
    LUGGAGE_ICON,
    DATE_ICON,
    LIMITS,
    SCREENS,
    BIG_NORMAL_CAR,
    GOOGLE_API_KEY
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from "./styles.js";
import IconText from "../../../../../components/atoms/IconTextComponent";
import CustomButton from "../../../../../components/atoms/CustomButton";
import LocationSearch from '../../../../../components/atoms/LocationSearch';
import CustomLoader from "../../../../../components/atoms/Loader";
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

    return (
        <AppHoc rightIcon={MENU_LOGO} leftIcon={APP_LOGO} centerIcon={USER_ICON}>
            <View>

            </View>
            {
                detailsList && <FlatList
                    style={{ flex: 1, ...styles.detailsList }}
                    contentContainerStyle={{}}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
                        refreshVehicleList();
                        setPageIndex(0);
                        setIsRefreshing(true);
                        let formattedDate = moment(pickupDate).format('YYYY-MM-DD');
                        fetchVehicleListing(
                            {
                                fromCity: pickupLocation,
                                pickupDate: formattedDate,
                                adultSeats: adultSeatsValue,
                                childSeats: childSeatsValue,
                                freeDays: freeDays,
                                fuelType: Array.from(fuelType),
                                vehicleType: Array.from(vehicleType),
                                transmissionType: Array.from(transmissionType),
                                limit: LIMITS.vehicleList,
                                index: 0,
                            },
                            () => {
                                navigation.navigate(SCREENS.VEHICLE_LISTING);
                                setIsRefreshing(false)
                            },
                            () => { },
                        );
                    }} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                {(filterMenu && isNetConnected) && (
                                    <AdvanceSearchFilter
                                        fuelType={fuelType}
                                        vehicleType={vehicleType}
                                        transmissionType={transmissionType}
                                        childSeatsValue={childSeatsValue}
                                        adultSeatsValue={adultSeatsValue}
                                        freeDays={freeDays}
                                        setFuelType={setFuelType}
                                        setTransmissionType={setTransmissionType}
                                        setVehicleType={setVehicleType}
                                        setFreeDays={setFreeDays}
                                        setChildSeats={setChildSeats}
                                        setAdultSeats={setAdultSeats}
                                        fuelTypesList={fuelTypesList}
                                        vehicleTypesList={vehicleTypesList}
                                        transmissionTypesList={transmissionTypesList}
                                        onClose={() => showFilterMenu(false)}
                                        onSubmit={() => {
                                            if (!!!pickupLocation) {
                                                Alert.alert(
                                                    'Select Pick-up Location',
                                                    'Please select a pick-up location before proceeding.',
                                                    [
                                                        {
                                                            text: 'Okay',
                                                            onPress: () => { },
                                                        },
                                                    ],
                                                );
                                                return;
                                            } else if (!pickupDate) {
                                                Alert.alert(
                                                    'Select Pick-up Date',
                                                    'Please select a pick-up date before proceeding.',
                                                    [
                                                        {
                                                            text: 'Okay',
                                                            onPress: () => { },
                                                        },
                                                    ],
                                                );
                                                return;
                                            } else {
                                                showFilterMenu(false)
                                                let formattedDate = moment(pickupDate).format(
                                                    'YYYY-MM-DD',
                                                );
                                                startLoader();
                                                refreshVehicleList();
                                                fetchVehicleListing(
                                                    {
                                                        fromCity: pickupLocation,
                                                        pickupDate: formattedDate,
                                                        adultSeats: adultSeatsValue,
                                                        childSeats: childSeatsValue,
                                                        freeDays: freeDays,
                                                        fuelType: Array.from(fuelType),
                                                        vehicleType: Array.from(vehicleType),
                                                        transmissionType: Array.from(transmissionType),
                                                        limit: LIMITS.vehicleList,
                                                        index: 0,
                                                    },
                                                    () => {
                                                        stopLoader();
                                                        navigation.navigate(SCREENS.VEHICLE_LISTING);
                                                    },
                                                    () => { },
                                                );
                                            }
                                        }}
                                    />
                                )}

                                <View style={{ backgroundColor: '#0091ff' }}>
                                    <View style={styles.childContainer}>
                                        {!modifySearch && <View style={styles.childContainer}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    refreshVehicleList();
                                                    navigation.navigate(SCREENS.HOME)
                                                }}
                                                hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                                            >
                                                <Image source={NAV_ARROW_ICON} height={20} width={20} />
                                            </TouchableOpacity>
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                <View style={{ flex: 1, paddingHorizontal: scaleText(15).fontSize, borderRightColor: 'white', borderRightWidth: 1 }}>
                                                    <Text
                                                        style={{
                                                            ...styles.subHeaderText,
                                                            height: Platform.OS == 'ios' ? scaledMediumFont.lineHeight + 2 : 'auto',
                                                            fontSize: scaledMediumFont.fontSize,
                                                        }}>
                                                        {'Pick-up Location:'}
                                                    </Text>
                                                    <Text
                                                        ellipsizeMode={'tail'}
                                                        numberOfLines={1}
                                                        style={{
                                                            ...styles.subHeaderText,
                                                            maxWidth: 150,
                                                            height: Platform.OS == 'ios' ? scaledMediumFont.lineHeight + 2 : 'auto',
                                                            fontSize: scaledMediumFont.fontSize,
                                                            lineHeight: scaledMediumFont.lineHeight
                                                        }}>
                                                        {pickupLocation ? pickupLocation : ''}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, marginHorizontal: scaleText(15).fontSize }}>
                                                    <Text
                                                        style={{
                                                            ...styles.subHeaderText,
                                                            height: Platform.OS == 'ios' ? scaledMediumFont.lineHeight + 2 : 'auto',
                                                            fontSize: scaledMediumFont.fontSize,
                                                            lineHeight: scaledMediumFont.lineHeight
                                                        }}>
                                                        {'Pick-up Date:'}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            ...styles.subHeaderText,
                                                            height: Platform.OS == 'ios' ? scaledMediumFont.lineHeight + 2 : 'auto',
                                                            fontSize: scaledMediumFont.fontSize,
                                                            lineHeight: scaledMediumFont.lineHeight
                                                        }}>
                                                        {pickupDate ? `${moment(pickupDate).format('DD-MM-YYYY')}` : ''}
                                                    </Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => showSearchBarAnimation()}>
                                                <Image source={SEARCH_ICON} style={{ height: 20, width: 20 }} />
                                            </TouchableOpacity>
                                        </View>}
                                        {modifySearch && <View
                                            style={{
                                                backgroundColor: '#1e5e9e',
                                                width: '100%',
                                                padding: 20,
                                                marginVertical: 20
                                            }}>

                                            <LocationSearch
                                                pickupLocation={pickupLocation}
                                                setPickupLocation={(value) => setPickupLocation(value)}
                                                inputStyle={{
                                                    height: 2.5 * scaledFont.lineHeight,
                                                    fontSize: scaledFont.fontSize,
                                                    lineHeight: scaledFont.lineHeight,
                                                    ...styles.pickupLocationInput
                                                }} />

                                            <DatePicker
                                                mode="date"
                                                placeholder={
                                                    pickupDate
                                                        ? `${moment(pickupDate).format('DD-MM-YYYY')}`
                                                        : 'Pick-up date'
                                                }
                                                format={'DD-MM-YYYY'}
                                                minDate={new Date()}
                                                maxDate={new Date(maxDate)}
                                                confirmBtnText="Confirm"
                                                cancelBtnText="Cancel"
                                                iconSource={DATE_ICON}
                                                style={{
                                                    padding: 0,
                                                    margin: 0,
                                                    width: '100%',
                                                }}
                                                getDateStr={(date) => {
                                                    onDateChange(date);
                                                    setPickupDate(date);
                                                }}
                                                customStyles={{
                                                    dateTouchBody: {
                                                        marginVertical: scaleText(20).fontSize,
                                                        zIndex: 10,
                                                    },
                                                    dateIcon: {
                                                        // display: 'none',
                                                        marginLeft: -1 * (scaleText(35).fontSize),
                                                        height: scaleText(25).fontSize,
                                                        width: scaleText(25).fontSize
                                                    },
                                                    dateInput: {
                                                        textAlign: 'left',
                                                        minWidth: '40%',
                                                        margin: 0,
                                                        backgroundColor: 'white',
                                                        padding: 0,
                                                        height: 2.5 * scaledFont.lineHeight,
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
                                                        backfaceVisibility: false,
                                                    },
                                                    dateText: {
                                                        textAlign: 'left',
                                                        margin: 0,
                                                        fontSize: scaledFont.fontSize,
                                                        lineHeight: scaledFont.lineHeight,
                                                        padding: 0,
                                                    },
                                                    placeholderText: {
                                                        textAlign: 'left',
                                                        margin: 0,
                                                        alignSelf: 'flex-start',
                                                        color: pickupDate ? 'black' : 'rgba(0,0,0,0.4)',
                                                        fontSize: scaledFont.fontSize,
                                                        lineHeight: scaledFont.lineHeight,
                                                        padding: 0,
                                                    },
                                                }}
                                                onDateChange={(date) => {
                                                    setSelectedDate(date);
                                                }}
                                            />
                                            <TouchableOpacity
                                                onPress={() => showFilterMenu(true)}
                                                style={{
                                                    flexDirection: 'row',
                                                    paddingVertical: 5,
                                                    alignItems: 'center',
                                                    marginBottom: 2,
                                                }}>
                                                <Image source={SEARCH_ICON} />
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontSize: scaleText(18).fontSize,
                                                        textAlign: 'left',
                                                        marginLeft: scaleText(5).fontSize,
                                                        textAlignVertical: 'center',
                                                    }}>
                                                    {'Advanced Search'}
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: '#fff93e',
                                                    alignItems: 'center',
                                                    borderRadius: 5,
                                                    padding: scaleText(10).fontSize,
                                                    marginTop: scaleText(20).fontSize,
                                                }}
                                                activeOpacity={0.7}
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    if (!!!pickupLocation) {
                                                        Alert.alert(
                                                            'Select Pick-up Location',
                                                            'Please select a pick-up location before proceeding.',
                                                            [
                                                                {
                                                                    text: 'Okay',
                                                                    onPress: () => { },
                                                                },
                                                            ],
                                                        );
                                                        return;
                                                    } else if (!pickupDate) {
                                                        Alert.alert(
                                                            'Select Pick-up Date',
                                                            'Please select a pick-up date before proceeding.',
                                                            [
                                                                {
                                                                    text: 'Okay',
                                                                    onPress: () => { },
                                                                },
                                                            ],
                                                        );
                                                        return;
                                                    } else {
                                                        showSearchBarAnimation();
                                                        let formattedDate = moment(pickupDate).format(
                                                            'YYYY-MM-DD',
                                                        );
                                                        startLoader();
                                                        refreshVehicleList();
                                                        setPageIndex(0);
                                                        fetchVehicleListing(
                                                            {
                                                                fromCity: pickupLocation,
                                                                pickupDate: formattedDate,
                                                                adultSeats: adultSeatsValue,
                                                                childSeats: childSeatsValue,
                                                                freeDays: freeDays,
                                                                fuelType: Array.from(fuelType),
                                                                vehicleType: Array.from(vehicleType),
                                                                transmissionType: Array.from(transmissionType),
                                                                limit: LIMITS.vehicleList,
                                                                index: 0,
                                                            },
                                                            () => {
                                                                stopLoader();
                                                                navigation.navigate(SCREENS.VEHICLE_LISTING);
                                                            },
                                                            () => { },
                                                        );
                                                    }
                                                }}>
                                                <Text
                                                    style={{
                                                        fontWeight: '700',
                                                        color: 'black',
                                                        fontSize: scaleText(16).fontSize,
                                                    }}>
                                                    Modify Search
                                    </Text>
                                            </TouchableOpacity>
                                        </View>}
                                    </View>
                                    <View style={{ backgroundColor: 'white' }}>
                                        <Text
                                            style={{
                                                fontSize: scaledLargeFont.fontSize,
                                                lineHeight: scaledLargeFont.lineHeight,
                                                ...styles.pageHeading
                                            }}>
                                            {`We have found ${vehicleListing.totalCount} vehicles available from ${pickupLocation}.`}
                                        </Text>
                                        <FlatList
                                            style={styles.vehicleTypeList}
                                            contentContainerStyle={{}}
                                            data={vehicleTypesList}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item }) => {
                                                return (
                                                    <View style={styles.vehicleTypeWrapper}>
                                                        <TouchableOpacity onPress={() => {
                                                            startLoader();
                                                            refreshVehicleList();
                                                            let formattedDate = moment(pickupDate).format(
                                                                'YYYY-MM-DD',
                                                            );
                                                            let selectedVehicleType = new Set();
                                                            selectedVehicleType.add(item._id)
                                                            setVehicleType(selectedVehicleType);
                                                            fetchVehicleListing(
                                                                {
                                                                    fromCity: pickupLocation,
                                                                    pickupDate: formattedDate,
                                                                    adultSeats: adultSeatsValue,
                                                                    childSeats: childSeatsValue,
                                                                    freeDays: freeDays,
                                                                    fuelType: Array.from(fuelType),
                                                                    vehicleType: Array.from(selectedVehicleType),
                                                                    transmissionType: Array.from(transmissionType),
                                                                    limit: LIMITS.vehicleList,
                                                                    index: pageIndex + 1,
                                                                },
                                                                () => { stopLoader() },
                                                                () => { },
                                                            );
                                                        }} style={styles.vehicleTypeContainer}>
                                                            <Text style={{
                                                                fontSize: scaledSmallerFont.fontSize,
                                                                ...styles.vehicleTypeTitle
                                                            }}>{item.name}</Text>
                                                            <Image
                                                                source={{ uri: item.URL }}
                                                                resizeMode={'contain'}
                                                                style={{
                                                                    ...styles.alignSelfCenter,
                                                                    height: scaleText(60).fontSize,
                                                                    width: scaleText(80).fontSize
                                                                }}
                                                            />
                                                        </TouchableOpacity>
                                                        <Image style={{ width: scaleText(1).fontSize, height: scaleText(40).fontSize, marginTop: scaleText(5).fontSize, alignSelf: 'center', }} source={VERTICAL_LINE} />
                                                    </View>
                                                )
                                            }}
                                        />
                                        <Text
                                            onPress={() => showFilterMenu(true)}
                                            style={{
                                                fontSize: scaledSmallFont.fontSize,
                                                lineHeight: scaledSmallFont.lineHeight,
                                                ...styles.advanceFilterText,
                                            }}>
                                            {'Advanced Filters'}
                                        </Text>

                                    </View>
                                </View>
                            </View>
                        )
                    }}
                    ListEmptyComponent={<View>
                        <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center' }}>{'No vehicles available.'}</Text>
                    </View>}
                    ListFooterComponent={
                        <View style={{
                            width: '100%',
                            height: 40,
                            opacity: 1,
                            marginVertical: 10
                        }}>
                            {fetchingData && <CustomLoader size={30} />}
                        </View>}
                    data={detailsList}
                    scrollEnabled={true}
                    onEndReachedThreshold={0.8}
                    onEndReached={() => {
                        if (vehicleListing.totalCount === vehicleListItems.length) {
                            return;
                        }
                        let formattedDate = moment(pickupDate).format(
                            'YYYY-MM-DD',
                        );
                        setFetchingData(true)
                        fetchVehicleListing(
                            {
                                fromCity: pickupLocation,
                                pickupDate: formattedDate,
                                adultSeats: adultSeatsValue,
                                childSeats: childSeatsValue,
                                freeDays: freeDays,
                                fuelType: Array.from(fuelType),
                                vehicleType: Array.from(vehicleType),
                                transmissionType: Array.from(transmissionType),
                                limit: LIMITS.vehicleList,
                                index: pageIndex + 1,
                            },
                            () => {
                                setFetchingData(false)
                                setPageIndex(pageIndex + 1);
                            },
                            () => { },
                        );
                    }}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.detailsWrapper}>
                                <View style={styles.rowFlex}>
                                    <View style={styles.detailsLeftContainer}>
                                        <Image
                                            source={{ uri: item.vehicleData.url }}
                                            resizeMode={'contain'}
                                            style={{
                                                ...styles.alignSelfCenter,
                                                height: scaleText(110).fontSize,
                                                width: scaleText(110).fontSize
                                            }}
                                        />
                                    </View>
                                    <View style={styles.detailsRightContainer}>
                                        <Text
                                            style={styles.carTitle}>{item.vehicleData ? item.vehicleData.name : ''}</Text>
                                        <View style={styles.carFeaturesWrapper}>
                                            <View style={{ ...styles.rowFlex, justifyContent: 'space-between' }}>
                                                <IconText
                                                    icon={CAR_SEATS_ICON}
                                                    title={`${item.vehicleData ? item.vehicleData.adultSeats + item.vehicleData.childSeats : 0} seats`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={LUGGAGE_ICON}
                                                    title={`${item.vehicleData ? item.vehicleData.largeLuggageSpace + item.vehicleData.smallLuggageSpace : 0} bags`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={DOORS_ICON}
                                                    title={`${item.vehicleData.numberOfDoor || 0} doors`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                            <View style={styles.rowFlex}>
                                                <IconText
                                                    icon={AC_ICON}
                                                    title={item.airConditionType ? 'Air Conditioning' : 'Non-AC'}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={GEAR_ICON}
                                                    title={item.transmissionData.name}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.rowFlex}>
                                    <View style={styles.detailsLeftContainer}>
                                        <Text style={styles.freeDaysText}>{`Free Days: ${item.freeDays ? item.freeDays : 0}`}</Text>
                                    </View>
                                    <View style={styles.detailsRightContainer}>
                                        <View style={styles.listLocationWrapper}>
                                            <Text
                                                ellipsizeMode={'tail'}
                                                numberOfLines={1}
                                                style={styles.listPickupText}>{item.fromCity}</Text>
                                            <View style={styles.listDropoffWrapper}>
                                                <Image source={TURN_RIGHT} />
                                                <Text
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                    style={styles.listDropoffText}>{item.toCity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View style={styles.offerTextWrapper}>
                                        <Text style={styles.carOfferTitle}>{'This relocation includes:'}</Text>
                                        <Text style={styles.carOfferText}>{'Unlimited kms, free tank of fuel and standard insurance'}</Text>
                                    </View>
                                    <CustomButton title={'View'}
                                        buttonStyle={styles.vehicleListButton}
                                    />
                                </View>
                            </View>
                        )
                    }}
                />
            }
        </AppHoc >
    );
};

