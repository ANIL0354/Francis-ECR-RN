/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
    RefreshControl,
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
    LIST_ARROW,
    LIMITS,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import CustomLoader from '../../../../../components/atoms/Loader';
import { AirbnbRating } from 'react-native-elements';
import moment from 'moment';
import styles from './style';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import ImageButton from '../../../../../components/atoms/ImageButton';

export const Screen = ({
    startLoader,
    stopLoader,
    ratingList,
    navigation,
    fetchRatingList,
    getPopularPlaces,
}) => {
    const largeScaledFont = scaleText(18);
    const rateListRef = useRef();
    const [editMode, setEditMode] = useState(false);
    const [upButton, showUpButton] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [fetchingData, setFetchingData] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
    const scrollToTop = () => {
        rateListRef.current.scrollToIndex({ animated: true, index: 0 });
    };

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
        fetchRatingList({
            index: 0,
            limit: LIMITS.vehicleList,
        },
            () => { },
            () => { })
    }, []);

    useEffect(() => {
        return () => {
            getPopularPlaces(
                {},
                () => { },
                () => { },
            );
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
                        {LABELS.ratings}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingVertical: scaleText(10).fontSize, paddingHorizontal: scaleText(30).fontSize }}>
                    <FlatList
                        style={{ flex: 1, minHeight: scaleText(250).fontSize }}
                        contentContainerStyle={{}}
                        ref={rateListRef}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => {
                            setPageIndex(0);
                            setIsRefreshing(true);
                            fetchRatingList({
                                index: 0,
                                limit: LIMITS.vehicleList,
                            },
                                () => { },
                                () => { })
                        }} />}
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
                            if (ratingList.totalCount === ratingList.length) {
                                return;
                            }
                            else {
                                setFetchingData(true);
                                fetchRatingList({
                                    index: pageIndex + 1,
                                    limit: LIMITS.vehicleList,
                                },
                                    () => { },
                                    () => { });
                                setFetchingData(false);
                                setPageIndex(pageIndex + 1);
                            }
                        }}
                        ListEmptyComponent={<View>
                            <Text style={{ color: 'black', textAlign: 'center', textAlignVertical: 'center', paddingVertical: scaleText(20).fontSize }}>{'No rating received yet.'}</Text>
                        </View>}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        showsVerticalScrollIndicator={false}
                        data={ratingList && ratingList.data ? ratingList.data : []}
                        keyExtractor={(item, index) => (item.id ? item.id : `${index}`)}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.rowFlex}>
                                    <View style={{ flex: 5, flexDirection: 'row', paddingVertical: scaleText(20).fontSize, borderColor: 'transparent', borderBottomColor: 'rgb(222,219,219)', borderWidth: 1 }}>
                                        <View style={{ flex: 5 }}>
                                            <Text style={{ color: 'black', fontSize: scaleText(14).fontSize, textTransform: 'capitalize' }}>{`Agency: ${item.agency && item.agency.name ? item.agency.name : ''}`}</Text>
                                            <View style={{ flex: 1, width: '35%', justifyContent: 'flex-start' }}>
                                                <AirbnbRating
                                                    count={5}
                                                    reviews={[]}
                                                    showRating={false}
                                                    defaultRating={item.rateForDriver ? item.rateForDriver : 0}
                                                    size={scaleText(14).fontSize}
                                                    isDisabled={true}
                                                    starStyle={{ backgroundColor: 'white', marginHorizontal: scaleText(2).fontSize }}
                                                />
                                            </View>
                                            <Text style={{ color: 'rgb(155,155,155)', fontSize: scaleText(12).fontSize, textTransform: 'capitalize' }}>{`Vehicle: ${item.vehicle && item.vehicle.name ? item.vehicle.name : ''}`}</Text>
                                            <Text style={{ color: 'rgb(155,155,155)', fontSize: scaleText(12).fontSize, textTransform: 'capitalize' }}>{`Rated On: ${moment(item.driverRatedOn).format('dddd, DD MMMM YYYY')}`}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.RATING_DETAILS, { ratingDetails: item })} style={[styles.flexOne, { alignItems: 'center', justifyContent: 'center' }]}>
                                            <Image
                                                source={LIST_ARROW}
                                                height={14}
                                                width={14}
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
