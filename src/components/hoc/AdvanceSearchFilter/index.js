import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CANCEL_ICON } from '../../../shared/constants';
import Slider from '../../atoms/CustomSlider';
import CustomButton from '../../atoms/CustomButton';
import styles from './style';

const AdvanceSearchFilter = ({
    onClose = () => { }
}) => {
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
                        <Text style={styles.filterTab}>{'Fuel Options'}</Text>
                        <Text style={styles.filterTab}>{'Number of Seats'}</Text>
                        <Text style={styles.filterTab}>{'Vehicle Type'}</Text>
                        <Text style={styles.filterTab}>{'Transmission Options'}</Text>
                        <Text style={styles.filterTab}>{'Free Days'}</Text>
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>
                        <Slider />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', borderTopColor: 'gray', borderWidth: 1, borderBottomColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', backgroundColor: 'white', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 10 }}>
                    <Text style={{ fontSize: 18, textAlignVertical: 'center', textAlign: 'center', color: 'black' }}>{'Reset'}</Text>
                    <CustomButton buttonStyle={{ paddingHorizontal: 30 }} title={'Apply'} />
                </View>
            </View>
        </View>
    )
};

export default AdvanceSearchFilter;