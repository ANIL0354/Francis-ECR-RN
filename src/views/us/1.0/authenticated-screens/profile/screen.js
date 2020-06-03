/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AppHoc from '../../../../../components/hoc/AppHoc';
import { Rating } from 'react-native-elements';
import styles from './style';
import { EditProfileForm } from './form';
import { STRINGS } from '../../../../../shared/constants/us/strings';

export const Screen = ({
    startLoader,
    stopLoader,
    navigation,
}) => {
    const largeScaledFont = scaleText(18);
    const [editMode, setEditMode] = useState(false);
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
                            <Text style={styles.value}>{'Aditi'}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Surname:'}</Text>
                            <Text style={styles.value}>{'Singh'}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'DOB:'}</Text>
                            <Text style={styles.value}>{'21-02-1998'}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'City:'}</Text>
                            <Text style={styles.value}>{'Delhi'}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Country:'}</Text>
                            <Text style={styles.value}>{'India'}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Email:'}</Text>
                            <Text style={styles.value}>{'aditi.singh@chicmic.co.in'}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Country Code:'}</Text>
                            <Text style={styles.value}>{'+91'}</Text>
                        </View>
                        <View style={[styles.flexOne, styles.verticalFiveMargin]}>
                            <Text style={styles.label}>{'Phone:'}</Text>
                            <Text style={styles.value}>{'1234567890'}</Text>
                        </View>
                    </View>
                    : < View style={styles.detailsWrapper}>
                        <EditProfileForm
                            onCancel={() => setEditMode(false)}
                            onSubmit={() => { }}
                        />
                    </View>
                }
                {!editMode && <View style={styles.flexOne}>
                    <View style={styles.ratingWrapper}>
                        <Text style={styles.overallText}>{`Your overall score is ${4.5} out of ${5}`}</Text>
                        <View>
                            <Rating
                                ratingCount={5}
                                startingValue={4.5}
                                imageSize={20}
                                minValue={1}
                                fractions={0.1}
                                type={'star'}
                                showRating={false}
                                readonly={true}
                                style={styles.alignSelfStart}
                                onFinishRating={(rating) => console.log('rating', rating)}
                            />
                        </View>
                    </View>
                    <View style={styles.changePasswordWrapper}>
                        <TouchableOpacity style={styles.changePasswordButton} onPress={() => navigation.navigate(SCREENS.CHANGE_PASSWORD)}>
                            <Text>{LABELS.changePassword}</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </ScrollView>
        </AppHoc>
    )
};
