import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CANCEL_ICON } from '../../../shared/constants';
import Slider from '../../atoms/CustomSlider';
import CustomButton from '../../atoms/CustomButton';
import styles from './style';
import CheckboxGroup from '../../molecules/CheckboxGroup';
import {
    FILTER_OPTIONS,
    FUEL_OPTIONS,
    VEHICLE_TYPE_OPTIONS,
    TRANSMISSION_OPTIONS
} from '../../../shared/constants';

const AdvanceSearchFilter = ({
    onClose = () => { }
}) => {
    const [filterValue, setFilterValue] = useState(0);
    const [fuelType, setFuelType] = useState(0);
    const [vehicleType, setVehicleType] = useState(0);
    const [transmissionType, setTransmissionType] = useState(0);
    const [seatsValue, setSeatsValue] = useState(0);
    const [freeDays, setFreeDays] = useState(0)
    return (
        <View style={styles.filterModal}>
            <View style={styles.filterWrapper}>
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
                                <Text onPress={() => setFilterValue(index)} style={{
                                    backgroundColor: filterValue === index ? 'rgba(0,0,0,0.08)' : 'white',
                                    ...styles.filterTab
                                }}>{item.title}</Text>
                            ))
                        }

                    </View>
                    <View style={{ flex: 1, padding: 20 }}>
                        {filterValue === 0 && <CheckboxGroup
                            checkboxOptions={FUEL_OPTIONS}
                            selectedValue={fuelType}
                            setSelectedValue={(value) => setFuelType(value)}
                        />}
                        {filterValue === 1 && <Slider
                            sliderValue={seatsValue}
                            setSliderValue={(value) => setSeatsValue(value)}
                        />}
                        {filterValue === 2 && <CheckboxGroup
                            checkboxOptions={VEHICLE_TYPE_OPTIONS}
                            selectedValue={vehicleType}
                            setSelectedValue={(value) => setVehicleType(value)}
                        />}
                        {filterValue === 3 && <CheckboxGroup
                            checkboxOptions={TRANSMISSION_OPTIONS}
                            selectedValue={transmissionType}
                            setSelectedValue={(value) => setTransmissionType(value)}
                        />}
                        {filterValue === 4 && <Slider
                            sliderValue={freeDays}
                            setSliderValue={(value) => setFreeDays(value)}
                        />}

                    </View>
                </View>
                <View style={{ flexDirection: 'row', borderTopColor: 'gray', borderWidth: 1, borderBottomColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 2, paddingVertical: 10 }}>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}> */}
                    <CustomButton
                        buttonStyle={{ paddingHorizontal: 30, backgroundColor: 'white' }}
                        titleStyle={{ color: '#0091ff' }}
                        onPress={() => {
                            console.log('reset pressed')
                            setFuelType(0);
                            setFreeDays(0);
                            setTransmissionType(0);
                            setVehicleType(0);
                            setSeatsValue(0);
                        }}
                        title={'Reset'} />
                    <CustomButton buttonStyle={{ paddingHorizontal: 30 }} title={'Apply'} />
                </View>
            </View>
        </View>
    )
};

export default AdvanceSearchFilter;