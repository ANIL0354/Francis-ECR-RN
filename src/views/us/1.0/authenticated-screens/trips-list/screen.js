/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    RefreshControl,
    Image,
    ScrollView,
    LayoutAnimation,
    FlatList,
} from 'react-native';
import {
    APP_LOGO,
    MENU_LOGO,
    USER_ICON,
    NAV_ARROW_ICON,
    TRIP_CALENDAR,
    LABELS,
    SCREENS,
    SCROLL_UP,
    LIST_ARROW,
    LIMITS,
} from '../../../../../shared/constants';
import CustomLoader from '../../../../../components/atoms/Loader';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { Rating } from 'react-native-elements';
import styles from './style';
import moment from 'moment';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import ImageButton from '../../../../../components/atoms/ImageButton';

export const Screen = ({
    route,
    startLoader,
    stopLoader,
    navigation,
    pastTrips,
    upcomingTrips,
    fetchPastTrips,
    fetchUpcomingTrips,
}) => {
    const largeScaledFont = scaleText(18);
    const tripListRef = useRef();
    const [upcomingVisible, showUpcoming] = useState(true);
    const [upButton, showUpButton] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [fetchingData, setFetchingData] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [screenFocused, setScreenFocused] = useState(false);
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
    const scrollToTop = () => {
        tripListRef.current.scrollToIndex({ animated: true, index: 0 });
    };

    let { fromNotification = false, targetId = '5edf1ec7b9db4806b7f11152' } = route.params;

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

    useEffect(() => {
        setScreenFocused(true);
    }, []);

    useEffect(() => {
        if (upcomingVisible) {
            startLoader();
            fetchUpcomingTrips({
                index: 0,
                limit: LIMITS.vehicleList,
            }, () => {
                stopLoader();
            }, () => {
                stopLoader();
            });
        }
        else {
            fetchPastTrips({
                index: 0,
                limit: LIMITS.vehicleList,
            }, () => { }, () => { });
        }
    }, [upcomingVisible]);

    useEffect(() => {
        if (upcomingTrips) {
            if (!!fromNotification) {
                let data = null;
                let targetData = null;
                if (upcomingVisible) {

                    data = upcomingTrips.trips;
                }
                else {
                    data = pastTrips.trips;
                }
                if (data) {
                    data.map((item) => {
                        if (item._id === targetId) {
                            targetData = item;
                            return;
                        }
                    });
                    if (Object.keys(data).length) {
                        navigation.navigate(SCREENS.TRIP_DETAILS, { upcomingTrip: upcomingVisible, tripDetails: targetData });
                    }
                }

            }
        }
    }, [upcomingTrips])

    useEffect(() => {
        return () => {
            setScreenFocused(false);
            setPageIndex(0);
            stopLoader();
        };
    }, []);

    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
            navigation={navigation}
        >
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
                        {LABELS.trips}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginTop: scaleText(20).fontSize, alignSelf: 'center', marginHorizontal: scaleText(80).fontSize, }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            showUpcoming(true);
                        }}
                        style={[{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#0091ff',
                            borderWidth: 1,
                            borderRightWidth: 0.5,
                            padding: scaleText(5).fontSize,
                            borderRadius: scaleText(5).fontSize,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                        },
                        upcomingVisible ? {
                            backgroundColor: '#0091ff',
                        } : {
                                backgroundColor: 'white',
                            }]}>
                        <Text style={[{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            alignSelf: 'center',
                            fontSize: scaleText(15).fontSize,
                        },
                        upcomingVisible ? {
                            color: 'white',
                        } : {
                                color: '#0091ff',
                            }]}>{'Upcoming'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            showUpcoming(false);
                        }}
                        style={[{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#0091ff',
                            borderWidth: 1,
                            borderLeftWidth: 0.5,
                            borderRadius: scaleText(5).fontSize,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            padding: scaleText(5).fontSize,
                        },
                        !upcomingVisible ? {
                            backgroundColor: '#0091ff',
                        } : {
                                backgroundColor: 'white',
                            }]}>
                        <Text style={[{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            alignSelf: 'center',
                            fontSize: scaleText(15).fontSize,
                        },
                        !upcomingVisible ? {
                            color: 'white',
                        } : {
                                color: '#0091ff',
                            },
                        ]}>{'Past'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, paddingHorizontal: scaleText(30).fontSize }}>
                    <FlatList
                        style={{ flex: 1, minHeight: scaleText(250).fontSize }}
                        contentContainerStyle={{}}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
                            setPageIndex(0);
                            setIsRefreshing(true);
                            if (upcomingVisible) {
                                fetchUpcomingTrips({
                                    index: 0,
                                    limit: LIMITS.vehicleList,
                                }, () => { setIsRefreshing(false); }, () => { });
                            }
                            else {
                                fetchPastTrips({
                                    index: 0,
                                    limit: LIMITS.vehicleList,
                                }, () => { setIsRefreshing(false); }, () => { });
                            }
                        }} />}
                        ref={tripListRef}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            <View style={{
                                width: '100%',
                                height: 40,
                                opacity: 1,
                                marginVertical: 10,
                            }}>
                                {fetchingData && <CustomLoader size={30} />}
                            </View>}
                        scrollEnabled={true}
                        onEndReachedThreshold={0.8}
                        onEndReached={() => {
                            if (!screenFocused) {
                                return;
                            }
                            else if (upcomingVisible ? upcomingTrips.totalCount === upcomingTrips.length : pastTrips.totalCount === pastTrips.length) {
                                return;
                            }
                            else if (upcomingVisible) {
                                console.log('end');
                                setFetchingData(true);
                                fetchUpcomingTrips({
                                    index: pageIndex,
                                    limit: LIMITS.vehicleList,
                                }, () => {
                                    setFetchingData(false);
                                    setPageIndex(pageIndex + 1);
                                }, () => {
                                    setFetchingData(false);
                                });
                            }
                            else {
                                fetchPastTrips({
                                    index: pageIndex,
                                    limit: LIMITS.vehicleList,
                                }, () => {
                                    setFetchingData(false);
                                    setPageIndex(pageIndex + 1);
                                }, () => {
                                    setFetchingData(false);
                                });
                            }
                            setFetchingData(false);
                        }}
                        ListEmptyComponent={<View>
                            <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center', paddingVertical: scaleText(20).fontSize }}>{upcomingVisible ? 'No upcoming trip.' : 'No past trip.'}</Text>
                        </View>}
                        data={upcomingVisible
                            ? upcomingTrips && upcomingTrips.trips
                                ? upcomingTrips.trips
                                : []
                            : pastTrips && pastTrips.trips
                                ? pastTrips.trips
                                : []
                        }
                        keyExtractor={(item, index) => (item.id ? item.id : `${index}`)}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.rowFlex}>
                                    <View style={{ flex: 1, paddingVertical: scaleText(20).fontSize, justifyContent: 'center' }}>
                                        <Image
                                            source={TRIP_CALENDAR}
                                            height={20}
                                            width={20}
                                            style={{ alignSelf: 'flex-start' }}
                                        />
                                    </View>
                                    <View style={{ flex: 5, flexDirection: 'row', paddingVertical: scaleText(20).fontSize, borderColor: 'transparent', borderBottomColor: 'rgb(222,219,219)', borderWidth: 1 }}>
                                        <View style={{ flex: 5 }}>
                                            <Text style={{ color: 'black', fontSize: scaleText(14).fontSize }}>{upcomingVisible ? moment(item.startDate).format('dddd, DD MMMM YYYY') : moment(item.startDate).format('dddd, DD MMMM YYYY')}</Text>
                                            <Text style={{ color: 'rgb(155,155,155)', fontSize: scaleText(12).fontSize }}>{`Pickup Location: ${item.pickupBranch.name}`}</Text>
                                            <Text style={{ color: 'rgb(155,155,155)', fontSize: scaleText(12).fontSize }}>{`Drop-off Location: ${item.dropoffBranch.name}`}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.TRIP_DETAILS, { upcomingTrip: upcomingVisible, tripDetails: item })} style={[styles.flexOne, { alignItems: 'center', justifyContent: 'center' }]}>
                                            <Image
                                                source={LIST_ARROW}
                                                height={10}
                                                width={10}
                                                resizeMode={'contain'}
                                                style={{ alignSelf: 'flex-end', height: scaleText(14).fontSize, width: scaleText(14).fontSize }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
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
                    })
                }}
                source={SCROLL_UP}
                style={{ alignSelf: 'flex-end', position: 'absolute', bottom: scaleText(20).fontSize, right: scaleText(20).fontSize, }}
                imageStyle={{ height: scaleText(40).fontSize, width: scaleText(40).fontSize, }}
                onPress={() => scrollToTop()} />}
        </AppHoc>
    );
};
