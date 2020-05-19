import React, { useState, useEffect } from 'react';
import { View, Image, Text, UIManager, LayoutAnimation } from 'react-native';
import { scaleText } from '../../../helpers';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const CollapsableWrapper = ({
    wrapperLabel,
    children
}) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        console.log(collapsed)
        setCollapsed(!collapsed);
    }
    return (
        <View style={{ marginVertical: scaleText(5).fontSize }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#dfdfdf', padding: scaleText(10).fontSize, borderRadius: scaleText(5).fontSize }}>
                <Text style={{ color: 'black', fontSize: scaleText(16).fontSize }}>{wrapperLabel}</Text>
                <Text style={{ fontSize: scaleText(18).fontSize, color: 'black' }} onPress={() => toggleCollapsed()}>{collapsed ? '+' : '-'}</Text>
            </View>
            {!collapsed && <View style={{ borderColor: '#dfdfdf', borderWidth: 1, borderRadius: scaleText(5).fontSize, padding: scaleText(5).fontSize, borderTopColor: 'transparent' }}>
                {children}
            </View>}
        </View>
    )
};

export default CollapsableWrapper;