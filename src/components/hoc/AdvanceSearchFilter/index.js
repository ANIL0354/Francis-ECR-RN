import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { CANCEL_ICON } from '../../../shared/constants';
import Slider from '../../atoms/CustomSlider';
import CustomButton from '../../atoms/CustomButton';
import styles from './style';
import MultiCheckGroup from '../../molecules/MultiCheckGroup';
import {
    FILTER_OPTIONS,
    FUEL_OPTIONS,
    VEHICLE_TYPE_OPTIONS,
    TRANSMISSION_OPTIONS
} from '../../../shared/constants';
import { Modal } from 'react-native';
import { scaleText } from '../../../helpers';

const AdvanceSearchFilter = ({
    fuelType,
    vehicleType,
    transmissionType,
    childSeatsValue,
    adultSeatsValue,
    freeDays,
    onClose = () => { },
    setFuelType = () => { },
    setTransmissionType = () => { },
    setVehicleType = () => { },
    setFreeDays = () => { },
    setChildSeats = () => { },
    setAdultSeats = () => { },
    onSubmit = () => { }
}) => {
    const [filterValue, setFilterValue] = useState(0);
    const [fuelValue, setFuel] = useState(fuelType);
    const [vehicleValue, setVehicle] = useState(vehicleType);
    const [transmissionValue, setTransmission] = useState(transmissionType);
    const [childSeats, setChildsSeatValue] = useState(childSeatsValue);
    const [adultSeats, setAdultsSeatValue] = useState(adultSeatsValue);
    const [freeDaysValue, setFreeDaysValue] = useState(freeDays);

    useEffect(() => {
        setFuel(fuelType);
        setVehicle(vehicleType);
        setTransmission(transmissionType);
        setChildsSeatValue(childSeatsValue);
        setAdultsSeatValue(adultSeatsValue);
        setFreeDaysValue(freeDays);
    }, [fuelType, vehicleType, transmissionType, childSeatsValue, adultSeatsValue, freeDays])

    return (
        <Modal
            transparent
            animated
            onRequestClose={onClose}
        >
            <View style={styles.filterModal}>
                <View style={{ flex: 1 }} />
                <View style={styles.filterWrapper}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginVertical: scaleText(10).fontSize }}>
                        <View style={styles.filterWrapperHeader}>
                            <View style={{ flex: 10 }}>
                                <Text style={styles.filterHeaderText}>{'Advanced Search'}</Text>
                            </View>
                            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => onClose()}>
                                <Image source={CANCEL_ICON} style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: -5 }}>
                            <View style={styles.filterTabContainer}>
                                {
                                    FILTER_OPTIONS.map((item, index) => (
                                        <TouchableOpacity
                                            onPress={() => setFilterValue(index)}
                                            style={{
                                                backgroundColor: filterValue === index ? 'rgba(0,0,0,0.08)' : 'white',
                                                ...styles.filterTab,
                                            }}>
                                            <View style={{ flex: 1, marginRight: scaleText(5).fontSize }}>
                                                <Image source={filterValue === index ? item.activeIcon : item.inactiveIcon} />
                                            </View>
                                            <View style={{ flex: 5, flexWrap: 'wrap' }}>
                                                <Text
                                                    style={{
                                                        color: index === filterValue ? '#0091ff' : 'black',
                                                        ...styles.filterTabText
                                                    }}
                                                >{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }

                            </View>
                            <View style={{ flex: 1, padding: 20 }}>
                                {filterValue === 0 && <MultiCheckGroup
                                    checkboxOptions={FUEL_OPTIONS}
                                    selectedValue={fuelValue}
                                    setSelectedValue={(value) => setFuel(value)}
                                />}
                                {filterValue === 1 && <View style={{ justifyContent: 'space-between' }}>
                                    <View style={{ marginBottom: 30, minWidth: '100%' }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{'Adult Seat'}</Text>
                                        <Slider
                                            sliderValue={adultSeats}
                                            setSliderValue={(value) => setAdultsSeatValue(value)}
                                        />
                                    </View>
                                    <View>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{'Child Seat'}</Text>
                                        <Slider
                                            sliderValue={childSeats}
                                            setSliderValue={(value) => setChildsSeatValue(value)}
                                        />
                                    </View>
                                </View>}
                                {filterValue === 2 && <MultiCheckGroup
                                    checkboxOptions={VEHICLE_TYPE_OPTIONS}
                                    selectedValue={vehicleValue}
                                    setSelectedValue={(value) => setVehicle(value)}
                                />}
                                {filterValue === 3 && <MultiCheckGroup
                                    checkboxOptions={TRANSMISSION_OPTIONS}
                                    selectedValue={transmissionValue}
                                    setSelectedValue={(value) => setTransmission(value)}
                                />}
                                {filterValue === 4 && <Slider
                                    sliderValue={freeDaysValue}
                                    setSliderValue={(value) => setFreeDaysValue(value)}
                                />}
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', zIndex: 1000, borderTopColor: 'gray', borderWidth: 1, borderBottomColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 2, paddingTop: 10, alignItems: 'center' }}>
                            <CustomButton
                                buttonStyle={{ paddingHorizontal: 30, backgroundColor: 'white' }}
                                titleStyle={{ color: '#0091ff' }}
                                onPress={() => {
                                    setFuelType(new Set());
                                    setFreeDays(0);
                                    setTransmissionType(new Set());
                                    setVehicle(new Set());
                                    setVehicleType(new Set());
                                    setChildsSeatValue(0);
                                    setAdultsSeatValue(0);
                                    setFuel(new Set());
                                    setTransmission(new Set());
                                    setChildSeats(0);
                                    setAdultSeats(0);
                                    setFreeDaysValue(0);
                                }}
                                title={'Reset'} />
                            <CustomButton
                                buttonStyle={{ paddingHorizontal: 30 }}
                                title={'Submit'}
                                onPress={() => {
                                    setFuelType(fuelValue);
                                    setFreeDays(freeDaysValue);
                                    setTransmissionType(transmissionValue);
                                    setVehicleType(vehicleValue);
                                    setChildSeats(childSeats);
                                    setAdultSeats(adultSeats);
                                    onSubmit();
                                }} />
                        </View>
                    </ScrollView>
                </View>
            </View>
            <SafeAreaView />
        </Modal>
    )
};

export default AdvanceSearchFilter;