/* eslint-disable react-native/no-inline-styles */
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
    LayoutAnimation,
} from 'react-native';
import {
    APP_LOGO,
    MENU_LOGO,
    USER_ICON,
    NAV_ARROW_ICON,
    LABELS,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { Rating, AirbnbRating } from 'react-native-elements';
import styles from './style';
import { STRINGS } from '../../../../../shared/constants/us/strings';
import ImageButton from '../../../../../components/atoms/ImageButton';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
    rateAgency,
    fetchCompleteDetails,
    route,
}) => {
    let { id, editMode, completeDetails } = route.params;
    const largeScaledFont = scaleText(18);
    const [agencyRating, setAgencyRating] = useState(editMode ? completeDetails.rateForAgency : 1);
    const [commentsForAgency, setCommentsForAgency] = useState(editMode ? completeDetails.commentForAgency : '');
    const [commentsForECR, setCommentsForECR] = useState(editMode ? completeDetails.commentForECRByDriver : '');

    useEffect(() => {
        setAgencyRating(editMode ? completeDetails.rateForAgency : 1);
        setCommentsForAgency(editMode ? completeDetails.commentForAgency : '');
        setCommentsForECR(editMode ? completeDetails.commentForECRByDriver : '');
    }, [editMode]);

    useEffect(() => {
        return () => {
            fetchCompleteDetails(
                id,
                () => { stopLoader(); },
                () => { stopLoader(); }
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
                            {LABELS.howWasYourTrip}
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: scaleText(20).fontSize, }}>
                        <View style={{ marginVertical: scaleText(10).fontSize }}>
                            <Text style={{ color: 'black', fontSize: scaleText(15).fontSize, textAlign: 'left', marginBottom: scaleText(20).fontSize }}>{'How would you rate your whole experience with Bargain Rental Cars'}</Text>
                            <AirbnbRating
                                count={5}
                                reviews={[]}
                                showRating={false}
                                defaultRating={editMode ? completeDetails.rateForAgency : 1}
                                size={scaleText(25).fontSize}
                                onFinishRating={(rating) => {
                                    setAgencyRating(rating);
                                }}
                                starStyle={{ backgroundColor: 'white', }}
                            />
                        </View>
                        <View style={[styles.flexOne, { width: '100%', marginVertical: scaleText(10).fontSize }]}>
                            <Text style={{ color: 'black', fontSize: scaleText(15).fontSize, textAlign: 'left', marginVertical: scaleText(5).fontSize }}>{'You can leave a comment about the agency'}</Text>
                            <TextInput
                                placeholder={'Type your comments here...'}
                                placeholderTextColor={'black'}
                                underlineColorAndroid={'transparent'}
                                multiline={true}
                                value={commentsForAgency}
                                onChangeText={(text) => { setCommentsForAgency(text); }}
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    fontSize: scaleText(14).fontSize,
                                    textAlignVertical: 'top',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: scaleText(5).fontSize,
                                    height: 10 * scaleText(14).fontSize,
                                }}
                                returnKeyType={'next'}
                            />
                        </View>
                        <View style={[styles.flexOne, { width: '100%', marginVertical: scaleText(10).fontSize }]}>
                            <Text style={{ color: 'black', fontSize: scaleText(15).fontSize, textAlign: 'left', marginVertical: scaleText(5).fontSize }}>{'You can leave a comment to us about any aspect of the relocation'}</Text>
                            <TextInput
                                placeholder={'Type your comments here...'}
                                placeholderTextColor={'black'}
                                underlineColorAndroid={'transparent'}
                                multiline={true}
                                value={commentsForECR}
                                onChangeText={(text) => { setCommentsForECR(text); }}
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    fontSize: scaleText(14).fontSize,
                                    textAlignVertical: 'top',
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    borderRadius: scaleText(5).fontSize,
                                    height: 10 * scaleText(14).fontSize,
                                }}
                                returnKeyType={'next'}
                            />
                        </View>
                        <View style={[styles.changePasswordWrapper, {}]}>
                            <TouchableOpacity
                                style={styles.submitEditButton}
                                onPress={() => rateAgency(
                                    id,
                                    {
                                        commentForECRByDriver: commentsForECR,
                                        commentForAgency: commentsForAgency,
                                        rateForAgency: agencyRating,
                                    },
                                    () => { navigation.goBack(); },
                                    () => { })
                                }>
                                <Text style={styles.basicWhiteText}>{STRINGS.SUBMIT}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </AppHoc>
    );
};
