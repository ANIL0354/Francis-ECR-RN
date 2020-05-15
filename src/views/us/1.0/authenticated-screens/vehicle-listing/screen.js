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
    Dimensions,
    LayoutAnimation,
    UIManager,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
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
    SCROLL_UP,
    FUEL_INACTIVE,
    VEHICLE_YEAR_RANGE
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
    setDropoffLocation,
    fetchVehicleListing,
    transmissionTypesList,
    dropOffLocation,
    vehicleTypesList,
    refreshVehicleList,
    vehicleListItems,
    setTransmissionType,
}) => {

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    const vehicleListRef = useRef();
    const today = new Date();
    const maxDate = today.setMonth(today.getMonth() + 12);
    const [filterMenu, showFilterMenu] = useState(false);
    const [modifySearch, setModifySearch] = useState(false);
    const [dateValue, onDateChange] = useState(pickupDate);
    const [selectedDate, setSelectedDate] = useState(null);
    const [detailsList, setDetailsList] = useState(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [fetchingData, setFetchingData] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [upButton, showUpButton] = useState(false);
    const [modifiedLocation, setModifiedLocation] = useState(pickupLocation);
    const [modifiedDate, setModifiedDate] = useState(null);
    const [portrait, setPortraitOrientation] = useState(true);

    const onViewRef = React.useRef((viewableItems) => {
        if (viewableItems && viewableItems.viewableItems && viewableItems.viewableItems[0] && viewableItems.viewableItems[0].index) {
            if (viewableItems.viewableItems[0].index <= 1) {
                showUpButton(false);
            }
            if (viewableItems.viewableItems[0].index >= 2) {
                showUpButton(true);
            }
        }
    })

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

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            Dimensions.get('window').width > Dimensions.get('window').height
                ? setPortraitOrientation(false)
                : setPortraitOrientation(true)
        })
    }, []);

    const scrollToTop = () => {
        vehicleListRef.current.scrollToIndex({ animated: true, index: 0 });
    }

    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
            navigation={navigation}
        >
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
                    onSubmit={(data) => {
                        let {
                            freeDaysValue,
                            childSeats,
                            adultSeats,
                            transmissionValue,
                            vehicleValue,
                            fuelValue
                        } = data;

                        let formattedDate = moment(pickupDate).format('YYYY-MM-DD');
                        startLoader();
                        refreshVehicleList();
                        showFilterMenu(false);
                        fetchVehicleListing(
                            {
                                fromCity: pickupLocation,
                                toCity: pickupDate ? null : dropOffLocation,
                                pickupDate: pickupDate ? formattedDate : null,
                                adultSeats: adultSeats,
                                childSeats: childSeats,
                                freeDays: freeDaysValue,
                                fuelType: Array.from(fuelValue),
                                vehicleType: Array.from(vehicleValue),
                                transmissionType: Array.from(transmissionValue),
                                limit: LIMITS.vehicleList,
                                index: 0,
                            },
                            () => {
                                stopLoader();
                            },
                            () => { },
                        );

                    }}
                />
            )}
            <View
                style={{ backgroundColor: '#0091ff', minHeight: scaleText(60).fontSize }}>
                {!modifySearch && <View style={{ ...styles.childContainer, flexDirection: 'row', }} >
                    <TouchableOpacity
                        onPress={() => {
                            refreshVehicleList();
                            navigation.navigate(SCREENS.HOME)
                        }}
                        hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                    >
                        <SimpleImage source={NAV_ARROW_ICON} height={20} width={20} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity onPress={() => showSearchBarAnimation()} style={{ flex: 1, paddingHorizontal: scaleText(15).fontSize, borderRightColor: 'white', borderRightWidth: 1 }}>
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
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showSearchBarAnimation()} style={{ flex: 1, marginHorizontal: scaleText(15).fontSize }}>
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
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => showSearchBarAnimation()}>
                        <SimpleImage source={SEARCH_ICON} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                </View>}
                {modifySearch && <ScrollView
                    bounces={false}
                    style={{
                        paddingVertical: scaleText(20).fontSize,
                    }}
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            backgroundColor: '#1e5e9e',
                            padding: scaleText(20).fontSize,
                            marginHorizontal: scaleText(20).fontSize
                        }}>
                        <LocationSearch
                            pickupLocation={modifiedLocation || modifiedLocation === '' ? modifiedLocation : pickupLocation}
                            setPickupLocation={(value) => setModifiedLocation(value)}
                            inputStyle={{
                                height: 2.5 * scaledFont.lineHeight,
                                fontSize: scaledFont.fontSize,
                                lineHeight: scaledFont.lineHeight,
                                ...styles.pickupLocationInput,
                            }}
                        />

                        <DatePicker
                            mode="date"
                            placeholder={modifiedDate
                                ? `${moment(modifiedDate).format('DD-MM-YYYY')}` :
                                pickupDate
                                    ? `${moment(pickupDate).format('DD-MM-YYYY')}`
                                    : 'Pick-up date'
                            }
                            format={'DD-MM-YYYY'}
                            minDate={new Date()}
                            maxDate={new Date(maxDate)}
                            // date={modifiedDate ? modifiedDate : pickupDate}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            style={{
                                padding: 0,
                                margin: 0,
                                width: '100%',
                            }}
                            getDateStr={(date) => {
                                onDateChange(date);
                                setModifiedDate(date);
                            }}
                            iconSource={DATE_ICON}
                            customStyles={{
                                dateTouchBody: {
                                    marginVertical: scaleText(20).fontSize,
                                    zIndex: 10,
                                },
                                dateIcon: {
                                    marginLeft: -1 * (scaleText(30).fontSize),
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
                                    color: pickupDate || modifiedDate ? 'black' : 'rgba(0,0,0,0.4)',
                                    fontSize: scaledFont.fontSize,
                                    lineHeight: scaledFont.lineHeight,
                                    padding: 0,
                                },
                                btnCancel: {
                                    flex: 1,
                                    paddingHorizontal: scaleText(10).fontSize,
                                },
                                btnConfirm: {
                                    flex: 1,
                                    paddingHorizontal: scaleText(10).fontSize
                                },
                                btnTextCancel: {
                                    textAlign: 'center'
                                },
                                btnTextConfirm: {
                                    textAlign: 'center'
                                }
                            }}
                            onDateChange={(date) => {
                                setSelectedDate(date);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => showFilterMenu(true)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                                marginBottom: 2,
                            }}>
                            <SimpleImage source={SEARCH_ICON} />
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
                                } else if (!pickupDate && !modifiedDate) {
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
                                    let formattedDate = moment(modifiedDate ? modifiedDate : pickupDate).format('YYYY-MM-DD');
                                    showSearchBarAnimation();
                                    refreshVehicleList();
                                    setPageIndex(0);
                                    setPickupLocation(modifiedLocation);
                                    setPickupDate(modifiedDate ? modifiedDate : pickupDate);
                                    setDropoffLocation('');
                                    setModifiedLocation('');
                                    startLoader();
                                    fetchVehicleListing(
                                        {
                                            fromCity: modifiedLocation,
                                            toCity: pickupDate ? null : dropOffLocation,
                                            pickupDate: pickupDate ? formattedDate : null,
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
                                {'Modify Search'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text
                        onPress={() => {
                            setModifiedLocation('');
                            setModifiedLocation(null);
                            showSearchBarAnimation();
                        }}
                        style={{
                            color: 'white',
                            fontSize: scaleText(14).fontSize,
                            fontWeight: 'bold',
                            textAlign: 'right',
                            textAlignVertical: 'center',
                            marginRight: scaleText(20).fontSize,
                            marginTop: scaleText(20).fontSize
                        }}
                    >{'CANCEL'}</Text>
                </ScrollView>}
            </View>

            {
                detailsList && <FlatList
                    ref={vehicleListRef}
                    style={{ flex: 5, ...styles.detailsList }}
                    contentContainerStyle={{}}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
                        refreshVehicleList();
                        setPageIndex(0);
                        setIsRefreshing(true);
                        let formattedDate = moment(pickupDate).format('YYYY-MM-DD');
                        fetchVehicleListing(
                            {
                                fromCity: pickupLocation,
                                toCity: pickupDate ? null : dropOffLocation,
                                pickupDate: pickupDate ? formattedDate : null,
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
                                setIsRefreshing(false)
                            },
                            () => { },
                        );
                    }} />}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <View style={{
                                    backgroundColor: '#0091ff',
                                }}>
                                    <View style={{ backgroundColor: 'white' }}>
                                        <Text
                                            style={{
                                                fontSize: scaledLargeFont.fontSize,
                                                lineHeight: scaledLargeFont.lineHeight,
                                                ...styles.pageHeading
                                            }}>
                                            {`We have found ${vehicleListing.totalCount ? vehicleListing.totalCount : 'no'} vehicle${vehicleListing.totalCount > 1 ? 's' : ''} available from ${pickupLocation}.`}
                                        </Text>
                                        <FlatList
                                            style={styles.vehicleTypeList}
                                            contentContainerStyle={{
                                                minWidth: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            data={vehicleTypesList}
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            keyExtractor={(item) => item._id}
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
                                                                    toCity: pickupDate ? null : dropOffLocation,
                                                                    pickupDate: pickupDate ? formattedDate : null,
                                                                    adultSeats: adultSeatsValue,
                                                                    childSeats: childSeatsValue,
                                                                    freeDays: freeDays,
                                                                    fuelType: Array.from(fuelType),
                                                                    vehicleType: Array.from(selectedVehicleType),
                                                                    transmissionType: Array.from(transmissionType),
                                                                    limit: LIMITS.vehicleList,
                                                                    index: 0,
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
                                                                indicator={Progress}
                                                                resizeMode={'contain'}
                                                                style={{
                                                                    ...styles.alignSelfCenter,
                                                                    height: scaleText(60).fontSize,
                                                                    width: scaleText(80).fontSize
                                                                }}
                                                            />
                                                        </TouchableOpacity>
                                                        <SimpleImage style={{ width: scaleText(1).fontSize, height: scaleText(40).fontSize, marginTop: scaleText(5).fontSize, alignSelf: 'center', }} source={VERTICAL_LINE} />
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
                        <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center' }}>{'No vehicles found.'}</Text>
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
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
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
                                toCity: pickupDate ? null : dropOffLocation,
                                pickupDate: pickupDate ? formattedDate : null,
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
                        let extraItemsString = '';
                        if (item.extraItemsData && item.extraItemsData.items) {
                            item.extraItemsData.items.map((item, index) => {
                                extraItemsString = `${extraItemsString}${index ? ', ' : ''}${item.name}`;
                                return;
                            });
                        }
                        return (
                            <View style={styles.detailsWrapper}>
                                <View style={styles.rowFlex}>
                                    <View style={styles.detailsLeftContainer}>
                                        <Image
                                            source={{ uri: item.vehicleData.url[0] }}
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
                                                    title={`${item.vehicleData.adultSeats || 0} adult${item.vehicleData.adultSeats > 1 ? 's' : ''}, ${item.vehicleData.childSeats || 0} child`}
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
                                                    icon={LUGGAGE_ICON}
                                                    title={`${item.vehicleData.largeLuggageSpace || 0} large, ${item.vehicleData.smallLuggageSpace || 0} small`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={FUEL_INACTIVE}
                                                    title={item.fuelTypeData.fuelType}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                            <View style={styles.rowFlex}>
                                                <IconText
                                                    icon={GEAR_ICON}
                                                    title={item.transmissionData.name}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={AC_ICON}
                                                    title={item.airConditionType ? 'Air Conditioning' : 'Non-AC'}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                            <View style={styles.rowFlex}>
                                                {/* <IconText
                                                    icon={VEHICLE_YEAR_RANGE}
                                                    title={`${item.vehicleData.vehicleYearRange.from}-${item.vehicleData.vehicleYearRange.to}`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                /> */}
                                                <IconText
                                                    icon={VEHICLE_YEAR_RANGE}
                                                    title={`${item.vehicleData.manufactureYear || 'N/A'}`}
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
                                                style={styles.listPickupText}>{item.pickupBranchData.city}</Text>
                                            <View style={styles.listDropoffWrapper}>
                                                <SimpleImage source={TURN_RIGHT} />
                                                <Text
                                                    ellipsizeMode={'tail'}
                                                    numberOfLines={1}
                                                    style={styles.listDropoffText}>{item.dropoffBranchData.city}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <View style={styles.offerTextWrapper}>
                                        <Text style={styles.carOfferTitle}>{'This relocation includes:'}</Text>
                                        <Text style={styles.carOfferText}>{!!extraItemsString ? extraItemsString : 'N/A'}</Text>
                                    </View>
                                    <CustomButton
                                        title={'View'}
                                        onPress={() => navigation.navigate(SCREENS.BOOKING_DETAILS, { vehicleDetails: item })}
                                        buttonStyle={styles.vehicleListButton}
                                    />
                                </View>
                            </View>
                        )
                    }}
                />
            }
            {upButton && <ImageButton
                onLayout={() => {
                    LayoutAnimation.configureNext({
                        duration: 250,
                        create: {
                            property: LayoutAnimation.Properties.opacity,
                            type: 'fadeIn'
                        },
                        delete: {
                            property: LayoutAnimation.Properties.opacity,
                            type: 'fadeOut'
                        }
                    })
                }}
                source={SCROLL_UP}
                style={{ alignSelf: 'flex-end', position: 'absolute', bottom: scaleText(20).fontSize, right: scaleText(20).fontSize, }}
                imageStyle={{ height: scaleText(40).fontSize, width: scaleText(40).fontSize, }}
                onPress={() => scrollToTop()} />}
        </AppHoc >
    );
};

