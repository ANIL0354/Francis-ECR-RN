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
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { Rating } from 'react-native-elements';
import styles from './style';
import { EmailForm } from './form';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import ImageButton from '../../../../../components/atoms/ImageButton';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
    route,
}) => {
    const largeScaledFont = scaleText(18);
    const [formVisible, setFormVisible] = useState(false);
    let { upcomingTrip } = route.params;
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
                            {formVisible ? LABELS.emailAgency : LABELS.tripDetails}
                        </Text>
                    </View>
                </View>


                {formVisible
                    ? <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: scaleText(20).fontSize, marginVertical: scaleText(20).fontSize }}>
                        <EmailForm
                            onSubmit={(formProps) => { console.log('formProps', JSON.stringify(formProps)) }}
                            onCancel={() => { setFormVisible(false) }}
                        />
                    </View>
                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: scaleText(20).fontSize, }}>
                        <View style={{ flex: 1, marginVertical: scaleText(20).fontSize, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Reference - 12ABC'}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'ID - XY001'}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', backgroundColor: 'rgb(233,233,233)', borderRadius: scaleText(5).fontSize, borderColor: 'transparent', borderBottomColor: 'rgb(222,219,219)', borderWidth: 1 }}>
                            <View style={{ flex: 1, borderColor: 'white', borderWidth: 0, borderRightWidth: 0.5, padding: scaleText(10).fontSize, }}>
                                <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'center', fontSize: scaleText(15).fontSize, }}>{'26 Feb, 2020'}</Text>
                                <Text style={{ textAlignVertical: 'center', textAlign: 'center', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Pick-up Date'}</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'white', borderWidth: 0, borderLeftWidth: 0.5, padding: scaleText(10).fontSize, }}>
                                <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'center', fontSize: scaleText(15).fontSize, }}>{'26 Feb, 2020'}</Text>
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
                                    <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(14).fontSize, }}>{'Private Bag 14901, Kilbirnie, Wellington 6241 '}</Text>
                                </View>
                                <View style={[styles.flexOne, { justifyContent: 'flex-end', borderColor: 'rgb(230,230,230)', borderWidth: 0, borderTopWidth: 0.5, paddingVertical: scaleText(5).fontSize }]}>
                                    <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Drop-off Location'}</Text>
                                    <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(14).fontSize, }}>{'Level 1, 1 Nelson Street Auckland 1142 Level 1'}</Text>
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
                            <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Bargain Rentals'}</Text>
                        </View>
                        <View style={{ flex: 1, width: '100%', marginTop: scaleText(20).fontSize }}>
                            <Text style={{ color: 'rgb(103,100,100)', textAlignVertical: 'center', textAlign: 'left', fontSize: scaleText(15).fontSize, }}>{'Vehicle'}</Text>
                            <Text style={{ textAlignVertical: 'center', textAlign: 'left', color: 'rgb(155,155,155)', fontSize: scaleText(14).fontSize, }}>{'Hatchback'}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            {upcomingTrip ?
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
                                                    onPress: () => { },
                                                },
                                            ])}>
                                            <Text>{LABELS.cancelReservation}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.changePasswordWrapper, { marginVertical: scaleText(20).fontSize }]}>
                                        <TouchableOpacity
                                            style={styles.changePasswordButton}
                                            onPress={() => { setFormVisible(true) }}>
                                            <Text>{LABELS.emailAgency}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>
                                : <View style={[styles.changePasswordWrapper, { marginVertical: scaleText(20).fontSize, marginHorizontal: scaleText(80).fontSize }]}>
                                    <TouchableOpacity
                                        style={styles.changePasswordButton}
                                        onPress={() => { }}>
                                        <Text>{LABELS.rateTrip}</Text>
                                    </TouchableOpacity>
                                </View>}
                        </View>
                    </View>}


            </ScrollView>
        </AppHoc >
    );
};
