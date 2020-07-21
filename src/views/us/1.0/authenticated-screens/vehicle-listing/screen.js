/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image as SimpleImage,
    RefreshControl,
    FlatList,
    Alert,
    Keyboard,
    ScrollView,
    Dimensions,
    LayoutAnimation,
    UIManager,
    Platform,
    TouchableOpacity,
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
    NAV_ARROW_ICON,
    CAR_SEATS_ICON,
    AC_ICON,
    TURN_RIGHT,
    DOORS_ICON,
    VERTICAL_LINE,
    GEAR_ICON,
    SEARCH_ICON,
    LUGGAGE_ICON,
    DATE_ICON,
    LIMITS,
    SCREENS,
    SCROLL_UP,
    FUEL_INACTIVE,
    VEHICLE_YEAR_RANGE,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from './styles.js';
import IconText from '../../../../../components/atoms/IconTextComponent';
import CustomButton from '../../../../../components/atoms/CustomButton';
import LocationSearch from '../../../../../components/atoms/LocationSearch';
import CustomLoader from '../../../../../components/atoms/Loader';
import ImageButton from '../../../../../components/atoms/ImageButton';
import { STRINGS } from '../../../../../shared/constants/us/strings';
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
    getPopularPlaces,
    setDropoffLocation,
    fetchVehicleListing,
    transmissionTypesList,
    dropOffLocation,
    vehicleTypesList,
    refreshVehicleList,
    vehicleListItems,
    setTransmissionType,
}) => {

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
    const vehicleListRef = useRef();
    const today = new Date();
    const maxDate = today.setMonth(today.getMonth() + 12);
    const [filterMenu, showFilterMenu] = useState(false);
    const [modifySearch, setModifySearch] = useState(false);
    const [detailsList, setDetailsList] = useState(null);
    const [dateValue, onDateChange] = useState(pickupDate);
    const [selectedDate, setSelectedDate] = useState(null);
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
    });

    const scaledLargerFont = scaleText(20);
    const scaledLargeFont = scaleText(18);
    const scaledMediumFont = scaleText(16);
    const scaledSmallFont = scaleText(14);
    const scaledSmallerFont = scaleText(12);
    const scaledFont = scaleText(14);

    const showSearchBarAnimation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setModifySearch(!modifySearch);
    };

    useEffect(() => {
        return () => {
            getPopularPlaces(
                {},
                () => { },
                () => { },
            );
            refreshVehicleList();
            setPageIndex(0);
            stopLoader();
        };
    }, []);


    useEffect(() => {
        setDetailsList(vehicleListItems);
    }, [vehicleListItems]);

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            Dimensions.get('window').width > Dimensions.get('window').height
                ? setPortraitOrientation(false)
                : setPortraitOrientation(true);
        });
    }, []);

    const scrollToTop = () => {
        vehicleListRef.current.scrollToIndex({ animated: true, index: 0 });
    };

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
                            fuelValue,
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
                style={styles.screenHeaderWrapper}>
                {!modifySearch && <View style={styles.displayLocationWrapper} >
                    <TouchableOpacity
                        onPress={() => {
                            refreshVehicleList();
                            navigation.navigate(SCREENS.HOME);
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
                                    height: Platform.OS == 'ios' ? scaleText(15).lineHeight + 2 : 'auto',
                                    fontSize: scaleText(15).fontSize,
                                }}>
                                {'Pick-up Location:'}
                            </Text>
                            <Text
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                                style={{
                                    ...styles.subHeaderText,
                                    maxWidth: 150,
                                    height: Platform.OS == 'ios' ? scaleText(15).lineHeight + 2 : 'auto',
                                    fontSize: scaleText(15).fontSize,
                                    lineHeight: scaleText(15).lineHeight,
                                }}>
                                {pickupLocation ? pickupLocation : ''}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showSearchBarAnimation()} style={{ flex: 1, marginHorizontal: scaleText(15).fontSize }}>
                            <Text
                                style={{
                                    ...styles.subHeaderText,
                                    height: Platform.OS == 'ios' ? scaleText(15).lineHeight + 2 : 'auto',
                                    fontSize: scaleText(15).fontSize,
                                    lineHeight: scaleText(15).lineHeight,
                                }}>
                                {'Pick-up Date:'}
                            </Text>
                            <Text
                                style={{
                                    ...styles.subHeaderText,
                                    height: Platform.OS == 'ios' ? scaleText(15).lineHeight + 2 : 'auto',
                                    fontSize: scaleText(15).fontSize,
                                    lineHeight: scaleText(15).lineHeight,
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
                    keyboardShouldPersistTaps={'always'}
                    showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            backgroundColor: '#1e5e9e',
                            padding: scaleText(20).fontSize,
                            marginHorizontal: scaleText(20).fontSize,
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
                            mode={'date'}
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
                            confirmBtnText={'Confirm'}
                            cancelBtnText={'Cancel'}
                            style={styles.datePickerStyle}
                            getDateStr={(date) => {
                                onDateChange(date);
                                setModifiedDate(date);
                            }}
                            iconSource={DATE_ICON}
                            customStyles={{
                                dateTouchBody: styles.dateTouchBody,
                                dateIcon: styles.dateIcon,
                                dateInput: styles.dateInput,
                                dateText: styles.dateText,
                                datePickerCon: {
                                    backfaceVisibility: false,
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
                                    paddingHorizontal: scaleText(10).fontSize,
                                },
                                btnTextCancel: {
                                    textAlign: 'center',
                                },
                                btnTextConfirm: {
                                    textAlign: 'center',
                                },
                            }}
                            onDateChange={(date) => {
                                setSelectedDate(date);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => showFilterMenu(true)}
                            style={styles.advanceTextWrapper}>
                            <SimpleImage source={SEARCH_ICON} />
                            <Text
                                style={styles.advanceSearchText}>
                                {'Advanced Search'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modifyTextWrapper}
                            activeOpacity={0.7}
                            onPress={() => {
                                Keyboard.dismiss();
                                if (!!!pickupLocation) {
                                    Alert.alert(
                                        'Select Pick-up Location',
                                        'Please select a pick-up location before proceeding.',
                                        [
                                            {
                                                text: STRINGS.OKAY,
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
                                                text: STRINGS.OKAY,
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
                                style={styles.modifyText}>
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
                        style={styles.cancelText}
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
                                setIsRefreshing(false);
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
                                                ...styles.pageHeading,
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
                                                            selectedVehicleType.add(item._id);
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
                                                                () => { stopLoader(); },
                                                                () => { },
                                                            );
                                                        }} style={styles.vehicleTypeContainer}>
                                                            <Text style={{
                                                                fontSize: scaledSmallerFont.fontSize,
                                                                ...styles.vehicleTypeTitle,
                                                            }}>{item.name === 'Recreational Vans' ? 'Recreational' : item.name}</Text>
                                                            <Image
                                                                source={{ uri: item.URL }}
                                                                indicator={Progress}
                                                                resizeMode={'contain'}
                                                                style={{
                                                                    ...styles.alignSelfCenter,
                                                                    height: scaleText(60).fontSize,
                                                                    width: scaleText(80).fontSize,
                                                                }}
                                                            />
                                                        </TouchableOpacity>
                                                        <SimpleImage style={{ width: scaleText(1).fontSize, height: scaleText(40).fontSize, marginTop: scaleText(5).fontSize, alignSelf: 'center' }} source={VERTICAL_LINE} />
                                                    </View>
                                                );
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
                        );
                    }}
                    ListEmptyComponent={<View>
                        <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center' }}>{'No vehicles found.'}</Text>
                    </View>}
                    ListFooterComponent={
                        <View style={{
                            width: '100%',
                            height: 40,
                            opacity: 1,
                            marginVertical: 10,
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
                        setFetchingData(true);
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
                                setFetchingData(false);
                                setPageIndex(pageIndex + 1);
                            },
                            () => { },
                        );
                    }}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        let extraItemsString = `${item.kmAllow 
                        ? `Free ${item.kmAllow} Kms` 
                        : ''}${item.fuelOfferData&&item.fuelOfferData.value
                        ?`${item.kmAllow
                        ?', '
                        :''}${item.fuelOfferData.value}`
                        :''}${item.expenses
                        ?`${(item.fuelOfferData&&item.fuelOfferData.value)||item.kmAllow
                        ?', ':''}${item.expenses}`
                        :''}${item.ferryCost&&item.insurance
                        ?`${(item.fuelOfferData&&item.fuelOfferData.value)||item.kmAllow||item.expenses
                        ?', '
                        :''}${'Ferry cost and standard insurance'}`
                        :`${item.ferryCost
                        ?`${(item.fuelOfferData&&item.fuelOfferData.value)||item.kmAllow||item.expenses
                        ?' and Ferry cost.'
                        :''}`
                        :`${(item.fuelOfferData&&item.fuelOfferData.value)||item.kmAllow||item.expenses
                        ?' and standard insurance.'
                        :''}`}`}`;
                           
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
                                                width: scaleText(110).fontSize,
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
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={DOORS_ICON}
                                                    title={`${item.vehicleData.numberOfDoor || 0} doors`}
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                            <View style={styles.rowFlex}>
                                                <IconText
                                                    icon={LUGGAGE_ICON}
                                                    title={`${item.vehicleData.largeLuggageSpace || 0} large, ${item.vehicleData.smallLuggageSpace || 0} small`}
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={FUEL_INACTIVE}
                                                    title={item.fuelTypeData.fuelType}
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                            <View style={styles.rowFlex}>
                                                <IconText
                                                    icon={GEAR_ICON}
                                                    title={item.transmissionData.name}
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={AC_ICON}
                                                    title={item.airConditionType ? 'Air Conditioning' : 'Non-AC'}
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                            <View style={styles.rowFlex}>
                                                <IconText
                                                    icon={VEHICLE_YEAR_RANGE}
                                                    title={`${item.vehicleData.yearRange.from}-${item.vehicleData.yearRange.to}`}
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                {/* <IconText
                                                    icon={VEHICLE_YEAR_RANGE}
                                                    title={`${item.vehicleData.manufactureYear || 'N/A'}`}
                                                    titleFontSize={13}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                /> */}
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
                        );
                    }}
                />
            }
            {upButton && <ImageButton
                onLayout={() => {
                    LayoutAnimation.configureNext({
                        duration: 250,
                        create: {
                            property: LayoutAnimation.Properties.opacity,
                            type: 'fadeIn',
                        },
                        delete: {
                            property: LayoutAnimation.Properties.opacity,
                            type: 'fadeOut',
                        },
                    });
                }}
                source={SCROLL_UP}
                style={{ alignSelf: 'flex-end', position: 'absolute', bottom: scaleText(20).fontSize, right: scaleText(20).fontSize }}
                imageStyle={{ height: scaleText(40).fontSize, width: scaleText(40).fontSize }}
                onPress={() => scrollToTop()} />}
        </AppHoc >
    );
};

