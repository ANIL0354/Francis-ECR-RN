/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
} from 'react-native';
import {
    APP_LOGO,
    MENU_LOGO,
    USER_ICON,
    NAV_ARROW_ICON,
    EDIT_ICON,
    LABELS,
    SCREENS,
    RATING_STAR,
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { Rating } from 'react-native-elements';
import moment from 'moment';
import styles from './style';
import { EditProfileForm } from './form';
import { STRINGS } from '../../../../../shared/constants/us/strings';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
    profileData,
    completeProfile,
    fetchProfile,
}) => {
    const largeScaledFont = scaleText(18);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchProfile(() => { }, () => { });
    }, []);

    console.log('profileData', profileData)
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
                            {LABELS.profile}
                        </Text>
                        {!editMode && <TouchableOpacity
                            onPress={() => setEditMode(true)}
                            hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                        >
                            <Image
                                source={EDIT_ICON}
                                height={20}
                                width={20}
                            />
                        </TouchableOpacity>}
                    </View>
                </View>
                {!editMode
                    ? < View style={styles.detailsWrapper}>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Name:'}</Text>
                            <Text style={styles.value}>{profileData && profileData.name ? profileData.name : ''}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Surname:'}</Text>
                            <Text style={styles.value}>{profileData && profileData.surname ? profileData.surname : ''}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'DOB:'}</Text>
                            <Text style={styles.value}>{profileData && profileData.dob ? moment(profileData.dob).format('DD/MM/YYYY') : ''}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'City:'}</Text>
                            <Text style={styles.value}>{profileData && profileData.city ? profileData.city : ''}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Country:'}</Text>
                            <Text style={styles.value}>{profileData && profileData.country ? profileData.country : ''}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Email:'}</Text>
                            <Text style={styles.value}>{profileData && profileData.dob ? profileData.email : ''}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Country Code:'}</Text>
                            <Text style={styles.value}>{`${profileData && profileData.phoneNumber && profileData.phoneNumber.code ? profileData.phoneNumber.code : ''}`}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Phone:'}</Text>
                            <Text style={styles.value}>{profileData && profileData.phoneNumber && profileData.phoneNumber.phone ? profileData.phoneNumber.phone : ''}</Text>
                        </View>
                    </View>
                    : < View style={styles.detailsWrapper}>
                        <EditProfileForm
                            profileData={profileData}
                            onCancel={() => setEditMode(false)}
                            onSubmit={(formData) => {
                                var dobStamp = new Date(formData.dob);
                                dobStamp = new Date(formData.dob).getTime();
                                completeProfile({
                                    email: formData.email,
                                    password: formData.password,
                                    name: formData.name,
                                    surname: formData.surname,
                                    dob: dobStamp,
                                    phoneNumber: {
                                        code: formData['country-code'],
                                        phone: formData.phone,
                                    },
                                    city: formData.city,
                                    country: formData.country,
                                }, (response) => {
                                    setEditMode(false);
                                    fetchProfile(() => {
                                    }, () => { });

                                }, (response) => {
                                    stopLoader();
                                });
                            }}
                        />
                    </View>
                }
                {!editMode && <View style={styles.flexOne}>
                    <View style={styles.ratingWrapper}>
                        <Text style={styles.overallText}>{`Your overall score is ${profileData && profileData.overallRating ? profileData.overallRating : 0} out of ${5}`}</Text>
                        <View>
                            <Rating
                                ratingCount={5}
                                // ratingImage={RATING_STAR}
                                startingValue={profileData && profileData.overallRating ? profileData.overallRating : 0}
                                ratingColor={'rgb(255,255,255)'}
                                // ratingColor={'rgb(255,255,255)'}
                                imageSize={20}
                                ratingBackgroundColor={'rgb(255,188,0)'}
                                minValue={1}
                                fractions={0.1}
                                showRating={false}
                                readonly={true}
                                type={'star'}
                                style={styles.alignSelfStart}
                                onFinishRating={(rating) => console.log('rating', rating)}
                            />
                        </View>
                    </View>
                    {profileData && (profileData.loginType === 1) && <View style={styles.changePasswordWrapper}>
                        <TouchableOpacity style={styles.changePasswordButton} onPress={() => navigation.navigate(SCREENS.CHANGE_PASSWORD)}>
                            <Text>{LABELS.changePassword}</Text>
                        </TouchableOpacity>
                    </View>}
                </View>}
            </ScrollView>
        </AppHoc>
    )
};
