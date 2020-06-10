/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
    ScrollView,
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
    DIVIDING_LINE,
    LOCATION_VERTICAL_LINE,
    LOCATION_ARROWS,
    LOCATION_CIRCLE,
} from '../../../../../shared/constants';
import moment from 'moment';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { Rating } from 'react-native-elements';
import styles from './style';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
    route,
}) => {
    const largeScaledFont = scaleText(18);
    let { ratingDetails } = route.params;

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
                            onPress={() => navigation.goBack()}
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
                            {LABELS.ratingsDetails}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: scaleText(20).fontSize, }}>
                    <View style={{ marginVertical: scaleText(20).fontSize }}>
                        <Rating
                            ratingCount={5}
                            // ratingImage={RATING_STAR}
                            startingValue={ratingDetails.rateForDriver}
                            ratingColor={'rgb(255,255,255)'}
                            // ratingColor={'rgb(255,255,255)'}
                            imageSize={25}
                            ratingBackgroundColor={'rgb(255,188,0)'}
                            minValue={1}
                            fractions={0.1}
                            showRating={false}
                            readonly={true}
                            type={'star'}
                            style={styles.alignSelfCenter}
                            onFinishRating={(rating) => console.log('rating', rating)}
                        />
                    </View>
                    <View style={{ flex: 1, width: '100%', paddingBottom: scaleText(10).fontSize, borderColor: 'transparent', borderBottomColor: 'rgb(222,219,219)', borderWidth: 1 }}>
                        <Text style={{ color: 'rgb(155,155,155)', fontSize: scaleText(15).fontSize, textAlign: 'left' }}>{'Comment:'}</Text>
                        <Text style={{ color: 'black', fontSize: scaleText(14).fontSize, textAlign: 'left' }}>{ratingDetails.commentForDriver ? ratingDetails.commentForDriver : '--'}</Text>
                    </View>
                    <View style={{ flex: 1, marginVertical: scaleText(20).fontSize, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{`Reference - ${ratingDetails.reference ? ratingDetails.reference : 'NA'}`}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{`ID - ${ratingDetails.id ? ratingDetails.id : 'NA'}`}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', width: '100%', backgroundColor: 'rgb(233,233,233)', borderRadius: scaleText(5).fontSize, borderColor: 'transparent', borderBottomColor: 'rgb(222,219,219)', borderWidth: 1 }}>
                        <View style={{ flex: 1, borderColor: 'white', borderWidth: 0, borderRightWidth: 0.5, padding: scaleText(10).fontSize, }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'center', fontSize: scaleText(15).fontSize, }}>{ratingDetails.startDate ? moment(ratingDetails.startDate).format('DD MMM, YYYY') : 'NA'}</Text>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Pick-up Date'}</Text>
                        </View>
                        <View style={{ flex: 1, borderColor: 'white', borderWidth: 0, borderLeftWidth: 0.5, padding: scaleText(10).fontSize, }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'center', fontSize: scaleText(15).fontSize, }}>{ratingDetails.endDate ? moment(ratingDetails.endDate).format('DD MMM, YYYY') : 'NA'}</Text>
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
                                <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(14).fontSize, }}>{`${ratingDetails.pickupBranch && ratingDetails.pickupBranch.name ? `${ratingDetails.pickupBranch.name}, ` : ''} ${ratingDetails && ratingDetails.pickupBranch && ratingDetails.pickupBranch.address ? `${ratingDetails.pickupBranch.address}, ` : ''} ${ratingDetails && ratingDetails.pickupBranch && ratingDetails.pickupBranch.suburb ? `${ratingDetails.pickupBranch.suburb}, ` : ''}  ${ratingDetails && ratingDetails.pickupBranch && ratingDetails.pickupBranch.city ? `${ratingDetails.pickupBranch.city}, ` : ''}  ${ratingDetails && ratingDetails.pickupBranch && ratingDetails.pickupBranch.country ? `${ratingDetails.pickupBranch.country}, ` : ''}  ${ratingDetails && ratingDetails.pickupBranch && ratingDetails.pickupBranch.postcode ? `${ratingDetails.pickupBranch.postcode}, ` : ''}`}</Text>
                            </View>
                            <View style={[styles.flexOne, { justifyContent: 'flex-end', borderColor: 'rgb(230,230,230)', borderWidth: 0, borderTopWidth: 0.5, paddingVertical: scaleText(5).fontSize }]}>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Drop-off Location'}</Text>
                                <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(14).fontSize, }}>{`${ratingDetails.dropoffBranch && ratingDetails.dropoffBranch.name ? `${ratingDetails.dropoffBranch.name}, ` : ''} ${ratingDetails && ratingDetails.dropoffBranch && ratingDetails.dropoffBranch.address ? `${ratingDetails.dropoffBranch.address}, ` : ''} ${ratingDetails && ratingDetails.dropoffBranch && ratingDetails.dropoffBranch.suburb ? `${ratingDetails.dropoffBranch.suburb}, ` : ''}  ${ratingDetails && ratingDetails.dropoffBranch && ratingDetails.dropoffBranch.city ? `${ratingDetails.dropoffBranch.city}, ` : ''}  ${ratingDetails && ratingDetails.dropoffBranch && ratingDetails.dropoffBranch.country ? `${ratingDetails.dropoffBranch.country}, ` : ''}  ${ratingDetails && ratingDetails.dropoffBranch && ratingDetails.dropoffBranch.postcode ? `${ratingDetails.dropoffBranch.postcode}, ` : ''}`}</Text>
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
                    <View style={{ flex: 1, justifyContent: 'space-between', marginVertical: scaleText(15).fontSize, flexDirection: 'row', }}>
                        <View style={{ flex: 1, paddingRight: scaleText(20).fontSize, }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(15).fontSize }}>{'Agency'}</Text>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`${ratingDetails && ratingDetails.agency && ratingDetails.agency.name ? `${ratingDetails.agency.name}` : ''}`}</Text>
                        </View>
                        <View style={{ flex: 1, paddingLeft: scaleText(20).fontSize }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(15).fontSize }}>{'Vehicle'}</Text>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`${ratingDetails && ratingDetails.vehicle && ratingDetails.vehicle.name ? `${ratingDetails.vehicle.name}` : ''}`}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </AppHoc>
    );
};
