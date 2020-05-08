import React from 'react';
import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    rowFlex: {
        flex: 1,
        flexDirection: 'row'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    childContainer: {
        flexDirection: 'row',
        backgroundColor: '#0091ff',
        paddingHorizontal: 30,
        paddingVertical: scaleText(20).fontSize,
        alignItems: 'center',
    },
});

export default styles;