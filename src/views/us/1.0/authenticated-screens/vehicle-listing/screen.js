import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    FlatList,
    Animated,
    Alert,
    LayoutAnimation,
    UIManager,
    TouchableOpacity
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
    VEHICLE_DETAILS_LISTING,
    GEAR_ICON,
    SEARCH_ICON,
    LUGGAGE_ICON
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from "./styles.js";
import IconText from "../../../../../components/atoms/IconTextComponent";
import CustomButton from "../../../../../components/atoms/CustomButton";
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const Screen = ({
    navigation,
    fuelType,
    vehicleType,
    transmissionType,
    seatsValue,
    freeDays,
    setChildSeats,
    setAdultSeats,
    setPickupLocation,
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
    setTransmissionType,
}) => {
    const [filterMenu, showFilterMenu] = useState(false);
    const [modifySearch, setModifySearch] = useState(false);
    const [dateValue, onDateChange] = useState(pickupDate);
    const [selectedDate, setSelectedDate] = useState(null)

    const scaledLargerFont = scaleText(20);
    const scaledLargeFont = scaleText(18);
    const scaledMediumFont = scaleText(16);
    const scaledSmallFont = scaleText(14);
    const scaledSmallerFont = scaleText(12);
    let animatedValue = new Animated.Value(0);

    const showSearchBarAnimation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setModifySearch(!modifySearch);
    }

    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
        >
            {filterMenu && <AdvanceSearchFilter
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
                onClose={() => showFilterMenu(false)}
            />}
            {modifySearch &&
                <View
                    style={{ backgroundColor: '#0091ff', padding: 20, paddingVertical: 40 }}>
                    <View style={{ backgroundColor: '#1e5e9e', minWidth: '100%', minHeight: 100, padding: 20 }}>
                        <View style={{ flexDirection: 'column', minWidth: '100%', justifyContent: 'space-between', }}>
                            {/* <LocationSearch /> */}
                            <TextInput
                                placeholder={'Pick-up location'}
                                placeholderTextColor={'black'}
                                underlineColorAndroid={"transparent"}
                                style={{

                                    height: 2.5 * scaledSmallerFont.lineHeight,
                                    fontSize: scaledSmallerFont.fontSize,
                                    lineHeight: scaledSmallerFont.lineHeight,
                                    ...styles.pickupLocationInput
                                }}
                                value={pickupLocation}
                                onChangeText={value => setPickupLocation(value)}
                                returnKeyType={'next'}
                            />

                            <DatePicker
                                mode="date"
                                placeholder={pickupDate ? `${moment(pickupDate).format('DD-MM-YYYY')}` : 'Pick-up date'}
                                format={'DD-MM-YYYY'}
                                minDate={new Date()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    width: '100%'
                                }}
                                getDateStr={(date) => { onDateChange(date); setPickupDate(date) }}
                                customStyles={{
                                    dateTouchBody: {
                                        marginVertical: scaleText(20).fontSize,
                                        zIndex: 99999
                                    },
                                    dateIcon: {
                                        padding: 0,
                                        marginLeft: -40,
                                        display: 'none'
                                    },
                                    dateInput: {
                                        textAlign: 'left',
                                        minWidth: '40%',
                                        margin: 0,
                                        backgroundColor: 'white',
                                        padding: 0,
                                        height: 2.5 * scaledSmallerFont.lineHeight,
                                        borderColor: 'transparent',
                                        borderColor: 'black',
                                        borderRadius: 5,
                                        borderWidth: 0.8,
                                        fontSize: scaledSmallerFont.fontSize,
                                        lineHeight: scaledSmallerFont.lineHeight,
                                        paddingHorizontal: 10,
                                        alignSelf: 'center',
                                        paddingVertical: 2,
                                        paddingBottom: 0,
                                        marginBottom: 0,
                                        textAlign: 'left',
                                    },
                                    datePickerCon: {
                                        backfaceVisibility: false
                                    },
                                    dateText: {
                                        textAlign: 'left',
                                        margin: 0,
                                        fontSize: scaledSmallerFont.fontSize,
                                        lineHeight: scaledSmallerFont.lineHeight,
                                        padding: 0
                                    },
                                    placeholderText: {
                                        textAlign: 'left',
                                        margin: 0,
                                        alignSelf: 'flex-start',
                                        color: 'black',
                                        fontSize: scaledSmallerFont.fontSize,
                                        lineHeight: scaledSmallerFont.lineHeight,
                                        padding: 0
                                    }
                                }}
                                onDateChange={(date) => { setSelectedDate(date) }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => showFilterMenu(true)}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomColor: 'white', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderWidth: 1, marginBottom: 2 }}>
                            <Text style={{ color: 'white', fontSize: scaledLargeFont.fontSize, textAlign: 'left', textAlignVertical: 'center' }}>{'Advance Search'}</Text>
                            <Image source={SEARCH_ICON} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff93e', alignItems: 'center', borderRadius: 5, padding: scaleText(10).fontSize, marginTop: scaleText(20).fontSize }}
                            activeOpacity={0.7}
                            onPress={() => {
                                if (!(!!pickupLocation)) {
                                    Alert.alert(
                                        'Error',
                                        'Please select a pick-up location before proceeding.',
                                        [{
                                            text: 'Okay',
                                            onPress: () => { }
                                        }]
                                    )
                                    return;
                                }
                                else if (!pickupDate) {
                                    Alert.alert(
                                        'Error',
                                        'Please select a pick-up date before proceeding.',
                                        [{
                                            text: 'Okay',
                                            onPress: () => { }
                                        }]
                                    )
                                    return;
                                }
                                else {
                                    showSearchBarAnimation()
                                }
                            }}
                        >
                            <Text style={{ fontWeight: '700', fontSize: scaleText(16).fontSize }}>Search Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {!modifySearch && <View
                style={styles.childContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ height: 20, width: 20, justifyContent: 'center', alignSelf: 'center', marginHorizontal: 5 }} onPress={() => navigation.navigate('HOME_SCREEN')}>
                        <Image source={NAV_ARROW_ICON} height={20} width={20} />
                    </TouchableOpacity>
                    <View style={{ paddingRight: 10, borderRightColor: 'white', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent', borderWidth: 1 }}>
                        <Text
                            style={{
                                ...styles.subHeaderText,
                                height: Platform.OS == 'ios' ? scaledLargeFont.lineHeight + 2 : 'auto',
                                fontSize: scaledLargeFont.fontSize,
                                lineHeight: scaledLargeFont.lineHeight
                            }}>
                            {'Pick-up Location:'}
                        </Text>
                        <Text
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            style={{
                                ...styles.subHeaderText,
                                maxWidth: 150,
                                height: Platform.OS == 'ios' ? scaledLargeFont.lineHeight + 2 : 'auto',
                                fontSize: scaledLargeFont.fontSize,
                                lineHeight: scaledLargeFont.lineHeight
                            }}>
                            {pickupLocation}
                        </Text>
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Text
                            style={{
                                ...styles.subHeaderText,
                                height: Platform.OS == 'ios' ? scaledLargeFont.lineHeight + 2 : 'auto',
                                fontSize: scaledLargeFont.fontSize,
                                lineHeight: scaledLargeFont.lineHeight
                            }}>
                            {'Pick-up Date:'}
                        </Text>
                        <Text
                            style={{
                                ...styles.subHeaderText,
                                height: Platform.OS == 'ios' ? scaledLargeFont.lineHeight + 2 : 'auto',
                                fontSize: scaledLargeFont.fontSize,
                                lineHeight: scaledLargeFont.lineHeight
                            }}>
                            {`${moment(pickupDate).format('DD-MMM-YYYY')}`}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => showSearchBarAnimation()}>
                    <Image source={SEARCH_ICON} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
            </View>}

            <ScrollView>
                <View style={{ backgroundColor: 'white' }}>
                    <Text
                        style={{
                            fontSize: scaledLargeFont.fontSize,
                            lineHeight: scaledLargeFont.lineHeight,
                            ...styles.pageHeading
                        }}>
                        {'We have found 20 vehicles available from Wellington.'}
                    </Text>
                    <FlatList
                        style={styles.vehicleTypeList}
                        contentContainerStyle={{}}
                        data={VEHICLE_TYPE_LISTING}
                        horizontal={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.vehicleTypeWrapper}>
                                    <View style={styles.vehicleTypeContainer}>
                                        <Text style={{
                                            fontSize: scaledSmallerFont.fontSize,
                                            ...styles.vehicleTypeTitle
                                        }}>{item.title}</Text>
                                        <Image style={styles.alignSelfCenter} source={item.icon} />
                                    </View>
                                </View>
                            )
                        }}
                    />
                    <Text
                        onPress={() => showFilterMenu(true)}
                        style={{
                            fontSize: scaledSmallFont.fontSize,
                            lineHeight: scaledSmallFont.lineHeight,
                            ...styles.advanceFilterText
                        }}>
                        {'Advanced Filters'}
                    </Text>
                    <FlatList
                        style={styles.detailsList}
                        contentContainerStyle={{}}
                        data={VEHICLE_DETAILS_LISTING}
                        scrollEnabled={true}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.detailsWrapper}>
                                    <View style={styles.rowFlex}>
                                        <View style={styles.detailsLeftContainer}>
                                            <Image style={styles.alignSelfCenter} source={item.carImage} />
                                            <Text style={styles.freeDaysText}>{`Free Days: ${item.freeDays}`}</Text>
                                        </View>
                                        <View style={styles.detailsRightContainer}>
                                            <Text
                                                onPress={() => showFilterMenu(true)}
                                                style={styles.carTitle}>{item.title}</Text>
                                            <View style={styles.carFeaturesWrapper}>
                                                <IconText
                                                    icon={CAR_SEATS_ICON}
                                                    title={`${item.seats} seats`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={LUGGAGE_ICON}
                                                    title={`${item.luggageCapacity} bags`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={DOORS_ICON}
                                                    title={`${item.doors} doors`}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={AC_ICON}
                                                    title={item.conditioning}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                                <IconText
                                                    icon={GEAR_ICON}
                                                    title={item.transmission}
                                                    titleFontSize={14}
                                                    titleStyle={styles.iconText}
                                                    containerStyle={styles.iconTextContainer}
                                                />
                                            </View>
                                            <View style={styles.listLocationWrapper}>
                                                <Text style={styles.listPickupText}>{item.pickupLocation}</Text>
                                                <View style={styles.listDropoffWrapper}>
                                                    <Image source={TURN_RIGHT} />
                                                    <Text style={styles.listDropoffText}>{item.dropoffLocation}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                    <View>
                                        <View style={styles.offerTextWrapper}>
                                            <Text style={styles.carOfferTitle}>{'This relocation includes:'}</Text>
                                            <Text style={styles.carOfferText}>{item.includes}</Text>
                                        </View>
                                        <CustomButton title={'View'}
                                            buttonStyle={styles.vehicleListButton}
                                        />
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </ScrollView>
        </AppHoc >
    );
}
