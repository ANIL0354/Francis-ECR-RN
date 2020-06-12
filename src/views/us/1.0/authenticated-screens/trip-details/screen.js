/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
    ScrollView,
    Button,
    Alert,
    LayoutAnimation,
} from 'react-native';
import {
    APP_LOGO,
    MENU_LOGO,
    USER_ICON,
    NAV_ARROW_ICON,
    EDIT_ICON,
    LABELS,
    SCREENS,
    SCROLL_UP,
    LIST_ARROW,
    DIVIDING_LINE,
    LOCATION_VERTICAL_LINE,
    LOCATION_ARROWS,
    LOCATION_CIRCLE,
    LIMITS,
} from '../../../../../shared/constants';
import moment from 'moment';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import styles from './style';
import { EmailForm } from './form';
import { STRINGS } from '../../../../../shared/constants/us/strings';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
    fetchCompleteDetails,
    completeDetails,
    emailAgency,
    cancelTrip,
    route,
    fetchPastTrips,
    fetchUpcomingTrips,
    fetchCancelledTrips,
}) => {
    const largeScaledFont = scaleText(18);
    const [formVisible, setFormVisible] = useState(false);
    let { tabValue, tripDetails } = route.params;

    useEffect(() => {
        fetchCompleteDetails(
            tripDetails.listingId ? tripDetails.listingId : tripDetails._id,
            () => { stopLoader(); },
            () => { stopLoader(); }
        )
    }, []);

    useEffect(() => {
        return () => {
            startLoader();
            if (tabValue === 0) {
                fetchUpcomingTrips({
                    index: 0,
                    limit: LIMITS.vehicleList,
                }, () => {
                    stopLoader();
                }, () => {
                    stopLoader();
                });
            }
            else if (tabValue === 1) {
                fetchPastTrips({
                    index: 0,
                    limit: LIMITS.vehicleList,
                }, () => {
                    stopLoader();
                }, () => {
                    stopLoader();
                });
            }
            else {
                fetchCancelledTrips({
                    index: 0,
                    limit: LIMITS.vehicleList,
                }, () => {
                    stopLoader();
                }, () => {
                    stopLoader();
                });
            }
        }
    }, []);

    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
            navigation={navigation}
        >


            <ScrollView
                bounces={false}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}>
                <View
                    style={styles.screenHeaderWrapper}>
                    <View style={styles.childContainer}>
                        <TouchableOpacity
                            style={styles.navArrowContainer}
                            onPress={() => {
                                navigation.goBack();
                            }}
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
                            {formVisible ? LABELS.emailAgency : LABELS.tripDetails}
                        </Text>
                    </View>
                </View>


                {formVisible
                    ? <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: scaleText(20).fontSize, marginVertical: scaleText(20).fontSize }}>
                        <EmailForm
                            emailTo={completeDetails.pickupBranchData.email}
                            onSubmit={(formProps) => {
                                let body = formProps.body.replace(/\n/g, '<br>');
                                body = `<p>${body}</p>`;
                                startLoader();
                                emailAgency({
                                    to: completeDetails.pickupBranchData.email,
                                    subject: formProps.subject,
                                    body: body,
                                },
                                    () => {
                                        setFormVisible(false);
                                        stopLoader();
                                    },
                                    () => { stopLoader(); })
                            }}
                            onCancel={() => { setFormVisible(false) }}
                        />
                    </View>
                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: scaleText(20).fontSize, }}>
                        <View style={{ flex: 1, marginVertical: scaleText(20).fontSize, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{`Reference - ${completeDetails && completeDetails.reference ? completeDetails.reference : 'N/A'}`}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{`ID - ${completeDetails && completeDetails.bookingId ? completeDetails.bookingId : 'N/A'}`}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', backgroundColor: 'rgb(233,233,233)', borderRadius: scaleText(5).fontSize, borderColor: 'transparent', borderBottomColor: 'rgb(222,219,219)', borderWidth: 1 }}>
                            <View style={{ flex: 1, borderColor: 'white', borderWidth: 0, borderRightWidth: 0.5, padding: scaleText(10).fontSize, }}>
                                <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'center', fontSize: scaleText(15).fontSize, }}>{completeDetails && completeDetails.startDate ? moment(completeDetails.startDate).format('DD MMM, YYYY') : 'N/A'}</Text>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Pick-up Date'}</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'white', borderWidth: 0, borderLeftWidth: 0.5, padding: scaleText(10).fontSize, }}>
                                <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'center', fontSize: scaleText(15).fontSize, }}>{completeDetails && completeDetails.endDate ? moment(completeDetails.endDate).format('DD MMM, YYYY') : 'N/A'}</Text>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Drop-off Date'}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginVertical: scaleText(20).fontSize, justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, }}>
                                <Image
                                    source={LOCATION_CIRCLE}
                                    height={20}
                                    width={20}
                                    style={styles.navArrow}
                                />
                                <Image
                                    source={LOCATION_VERTICAL_LINE}
                                    height={20}
                                    width={20}
                                    style={{ flex: 1, alignSelf: 'center' }}
                                />
                                <Image
                                    source={LOCATION_CIRCLE}
                                    height={20}
                                    width={20}
                                    style={styles.navArrow}
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <View style={[styles.flexOne, { justifyContent: 'flex-start', borderColor: 'rgb(230,230,230)', borderWidth: 0, borderBottomWidth: 0.5, paddingVertical: scaleText(5).fontSize }]}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Pick-up Location'}</Text>
                                    <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(14).fontSize, }}>{`${completeDetails && completeDetails.pickupBranchData && completeDetails.pickupBranchData.name ? `${completeDetails.pickupBranchData.name}, ` : ''} ${completeDetails && completeDetails.pickupBranchData && completeDetails.pickupBranchData.address ? `${completeDetails.pickupBranchData.address}, ` : ''} ${completeDetails && completeDetails.pickupBranchData && completeDetails.pickupBranchData.suburb ? `${completeDetails.pickupBranchData.suburb}, ` : ''}  ${completeDetails && completeDetails.pickupBranchData && completeDetails.pickupBranchData.city ? `${completeDetails.pickupBranchData.city}, ` : ''}  ${completeDetails && completeDetails.pickupBranchData && completeDetails.pickupBranchData.country ? `${completeDetails.pickupBranchData.country}, ` : ''}  ${completeDetails && completeDetails.pickupBranchData && completeDetails.pickupBranchData.postcode ? `${completeDetails.pickupBranchData.postcode}, ` : ''}`}</Text>
                                </View>
                                <View style={[styles.flexOne, { justifyContent: 'flex-end', borderColor: 'rgb(230,230,230)', borderWidth: 0, borderTopWidth: 0.5, paddingVertical: scaleText(5).fontSize }]}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Drop-off Location'}</Text>
                                    <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(14).fontSize, }}>{`${completeDetails && completeDetails.dropoffBranchDataData && completeDetails.dropoffBranchData.name ? `${completeDetails.dropoffBranchData.name}, ` : ''} ${completeDetails && completeDetails.dropoffBranchData && completeDetails.dropoffBranchData.address ? `${completeDetails.dropoffBranchData.address}, ` : ''} ${completeDetails && completeDetails.dropoffBranchData && completeDetails.dropoffBranchData.suburb ? `${completeDetails.dropoffBranchData.suburb}, ` : ''}  ${completeDetails && completeDetails.dropoffBranchData && completeDetails.dropoffBranchData.city ? `${completeDetails.dropoffBranchData.city}, ` : ''}  ${completeDetails && completeDetails.dropoffBranchData && completeDetails.dropoffBranchData.country ? `${completeDetails.dropoffBranchData.country}, ` : ''}  ${completeDetails && completeDetails.dropoffBranchData && completeDetails.dropoffBranchData.postcode ? `${completeDetails.dropoffBranchData.postcode}, ` : ''}`}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Image
                                    source={LOCATION_ARROWS}
                                    height={20}
                                    width={20}
                                    style={styles.navArrow}
                                />
                            </View>
                        </View>
                        <Image
                            source={DIVIDING_LINE}
                            height={20}
                            width={20}
                            style={{ flex: 1, width: '100%' }}
                        />
                        <View style={{ flex: 1, width: '100%', marginTop: scaleText(20).fontSize }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(15).fontSize, }}>{'Agency'}</Text>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{`${completeDetails && completeDetails.agencyData && completeDetails.agencyData.name ? `${completeDetails.agencyData.name}` : ''}`}</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', marginTop: scaleText(20).fontSize }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(15).fontSize, }}>{'Vehicle'}</Text>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{`${completeDetails && completeDetails.vehicleData && completeDetails.vehicleData.name ? `${completeDetails.vehicleData.name}` : ''}`}</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', marginTop: scaleText(20).fontSize }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(15).fontSize, }}>{'Rego'}</Text>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{`${completeDetails && completeDetails.rego ? `${completeDetails.rego}` : 'N/A'}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            {tabValue === 0 ?
                                <React.Fragment>
                                    <View style={[styles.changePasswordWrapper, { marginVertical: scaleText(20).fontSize }]}>
                                        <TouchableOpacity
                                            style={styles.changePasswordButton}
                                            onPress={() => Alert.alert(LABELS.cancelReservation,
                                                'Are you sure you want to cancel this trip?', [
                                                {
                                                    text: STRINGS.CANCEL,
                                                    onPress: () => { },
                                                },
                                                {
                                                    text: STRINGS.CONFIRM,
                                                    onPress: () => {
                                                        cancelTrip(
                                                            tripDetails._id,
                                                            {
                                                                status: 4,
                                                            },
                                                            () => {
                                                                navigation.goBack();
                                                            },
                                                            () => { }
                                                        );
                                                    },
                                                },
                                            ])}>
                                            <Text style={styles.basicBlueText}>{LABELS.cancelReservation}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.changePasswordWrapper, { marginVertical: scaleText(20).fontSize }]}>
                                        <TouchableOpacity
                                            style={styles.changePasswordButton}
                                            onPress={() => { setFormVisible(true) }}>
                                            <Text style={styles.basicBlueText}>{LABELS.emailAgency}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>
                                : tabValue === 1 ? <View style={[styles.changePasswordWrapper, { marginVertical: scaleText(20).fontSize, marginHorizontal: scaleText(80).fontSize }]}>
                                    <TouchableOpacity
                                        style={styles.changePasswordButton}
                                        onPress={() => { navigation.navigate(SCREENS.RATE_AGENCY, { id: tripDetails._id, editMode: !(completeDetails && !completeDetails.rateForAgency), completeDetails: completeDetails }) }}>
                                        <Text style={styles.basicBlueText}>{completeDetails && !completeDetails.rateForAgency ? LABELS.rateTrip : LABELS.editRating}</Text>
                                    </TouchableOpacity>
                                </View> : null}
                        </View>
                    </View>}


            </ScrollView>
        </AppHoc >
    );
};
