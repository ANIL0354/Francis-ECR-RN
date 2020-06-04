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
    LIST_ARROW,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { Rating } from 'react-native-elements';
import styles from './style';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import ImageButton from '../../../../../components/atoms/ImageButton';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
}) => {
    const largeScaledFont = scaleText(18);
    const rateListRef = useRef();
    const [editMode, setEditMode] = useState(false);
    const [upButton, showUpButton] = useState(false);
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
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        showsVerticalScrollIndicator={false}
                        data={[{ id: 'sbs' }, { id: 'sgsdg' }, { id: 'syerbs' }, { id: 'jn' }, { id: 'syefdrbs' }, { id: 'ew' }, { id: 'hjj' }, { id: 'mghm' }, { id: 'ad' }]}
                        keyExtractor={(item, index) => (item.id ? item.id : `${index}`)}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.rowFlex}>
                                    <View style={{ flex: 5, flexDirection: 'row', paddingVertical: scaleText(20).fontSize, borderColor: 'transparent', borderBottomColor: 'rgb(222,219,219)', borderWidth: 1 }}>
                                        <View style={{ flex: 5 }}>
                                            <Text style={{ color: 'black', fontSize: scaleText(14).fontSize, }}>{'Agency: Bargain Rentals'}</Text>
                                            <Rating
                                                ratingCount={5}
                                                // ratingImage={RATING_STAR}
                                                startingValue={4.5}
                                                ratingColor={'rgb(255,255,255)'}
                                                // ratingColor={'rgb(255,255,255)'}
                                                imageSize={14}
                                                ratingBackgroundColor={'rgb(255,188,0)'}
                                                minValue={1}
                                                fractions={0.1}
                                                showRating={false}
                                                readonly={true}
                                                type={'star'}
                                                style={styles.alignSelfStart}
                                                onFinishRating={(rating) => console.log('rating', rating)}
                                            />
                                            <Text style={{ color: 'rgb(155,155,155)', fontSize: scaleText(12).fontSize }}>{'Vehicle: Mazda Damio'}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.RATING_DETAILS)} style={[styles.flexOne, { alignItems: 'center', justifyContent: 'center' }]}>
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
