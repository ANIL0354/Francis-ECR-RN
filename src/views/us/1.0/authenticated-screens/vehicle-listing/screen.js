import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView, FlatList } from 'react-native';
import AppHoc from '../../../../../components/hoc/AppHoc';
import {
    APP_LOGO,
    MENU_LOGO,
    USER_ICON,
    VEHICLE_TYPE_LISTING,
    BIG_NORMAL_CAR,
    CAR_SEATS_ICON,
    AC_ICON,
    DOORS_ICON,
    GEAR_ICON,
    LUGGAGE_ICON
} from '../../../../../shared/constants';
import { scaleText } from '../../../../../helpers';
import AdvanceSearchFilter from '../../../../../components/hoc/AdvanceSearchFilter';
import styles from "./styles.js";
import IconText from "../../../../../components/atoms/IconTextComponent";

export const Screen = ({

}) => {
    const scaledFont = scaleText(12);
    const [filterMenu, showFilterMenu] = useState(false);
    return (
        <AppHoc
            rightIcon={MENU_LOGO}
            leftIcon={APP_LOGO}
            centerIcon={USER_ICON}
        >
            {filterMenu && <AdvanceSearchFilter onClose={() => showFilterMenu(false)} />}
            <View style={styles.childContainer}>
                <Text
                    style={{
                        ...styles.subHeaderText,
                        height: Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
                        fontSize: scaleText(20).fontSize,
                        lineHeight: scaleText(20).lineHeight
                    }}>
                    {'Great deals on vehicle relocation'}
                </Text>
            </View>
            <View style={{ backgroundColor: 'white' }}>
                <Text
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        paddingVertical: 10,
                        maxWidth: '80%',
                        alignSelf: 'center',
                        height: Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
                        fontSize: scaleText(18).fontSize,
                        lineHeight: scaleText(18).lineHeight
                    }}>
                    {'We have found 20 vehicles available from Wellington.'}
                </Text>
                <FlatList
                    style={{ paddingVertical: 10, borderTopColor: 'lightgray', borderBottomColor: 'lightgray', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderWidth: 1 }}
                    contentContainerStyle={{}}
                    data={VEHICLE_TYPE_LISTING}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flexDirection: 'row', paddingVertical: 5, backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'column', paddingHorizontal: 5, borderRightColor: 'lightgray', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderBottomColor: 'transparent', borderWidth: 1, }}>
                                    <Text style={{
                                        fontSize: scaledFont.fontSize,
                                        textAlign: 'center',
                                        color: 'black',
                                        textAlignVertical: 'center',
                                    }}>{item.title}</Text>
                                    <Image style={{ alignSelf: 'center' }} source={item.icon} />
                                </View>
                            </View>
                        )
                    }}
                />
                <Text
                    onPress={() => showFilterMenu(true)}
                    style={{
                        color: 'gray',
                        textAlign: 'center',
                        paddingTop: 20,
                        width: '100%',
                        alignSelf: 'center',
                        height: Platform.OS == 'ios' ? scaleText(18).lineHeight + 2 : 'auto',
                        fontSize: scaleText(14).fontSize,
                        lineHeight: scaleText(14).lineHeight
                    }}>
                    {'Advanced Filters'}
                </Text>
                <FlatList
                    style={{ paddingVertical: 10, minHeight: 100 }}
                    contentContainerStyle={{}}
                    data={VEHICLE_TYPE_LISTING}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                borderColor: 'lightgray',
                                borderWidth: 1,
                                borderRadius: 10,
                                margin: 10
                            }}>
                                <View style={{ flexDirection: 'column', backgroundColor: 'red', maxWidth: '40%' }}>
                                    <Image style={{ alignSelf: 'center' }} source={BIG_NORMAL_CAR} />
                                </View>
                                <View style={{ flexDirection: 'column', flexWrap: 'wrap', minWidth: '60%', }}>
                                    <Text
                                        onPress={() => showFilterMenu(true)}
                                        style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            width: '100%',
                                        }}>{'Hatch Back - Medium Size'}</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', maxWidth: '90%', }}>
                                        <IconText
                                            icon={CAR_SEATS_ICON}
                                            title={'5 seats'}
                                            titleFontSize={14}
                                            titleStyle={{ color: 'gray', }}
                                            containerStyle={{ paddingVertical: 5, marginRight: 10, maxWidth: '40%', }}
                                        />
                                        <IconText
                                            icon={LUGGAGE_ICON}
                                            title={'2 Bags'}
                                            titleFontSize={14}
                                            titleStyle={{ color: 'gray', }}
                                            containerStyle={{ paddingVertical: 5, marginRight: 10, maxWidth: '40%', }}
                                        />
                                        <IconText
                                            icon={DOORS_ICON}
                                            title={'5 Doors'}
                                            titleFontSize={14}
                                            titleStyle={{ color: 'gray', }}
                                            containerStyle={{ paddingVertical: 5, marginRight: 10, maxWidth: '40%', }}
                                        />
                                        <IconText
                                            icon={AC_ICON}
                                            title={'Air Conditioning'}
                                            titleFontSize={14}
                                            titleStyle={{ color: 'gray', }}
                                            containerStyle={{ paddingVertical: 5, marginRight: 10, maxWidth: '40%', }}
                                        />
                                        <IconText
                                            icon={GEAR_ICON}
                                            title={'Automatic'}
                                            titleFontSize={14}
                                            titleStyle={{ color: 'gray', }}
                                            containerStyle={{ paddingVertical: 5, marginRight: 10, maxWidth: '40%', }}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </AppHoc >
    );
}
