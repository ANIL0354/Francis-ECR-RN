import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const AppHeader = ({
    leftIcon,
    centerIcon,
    rightIcon
}) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 10, minHeight: 50, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
                flex: centerIcon && rightIcon ? 3 : 7
            }}>
                {leftIcon && <Image style={{ height: 35, width: 90 }} source={leftIcon} />}
            </View>
            <View style={{ flex: 1, height: '100%', justifyContent: 'space-between', alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                {centerIcon && <TouchableOpacity onPress={() => { }}>
                    <Image
                        source={centerIcon}
                        style={{
                            marginLeft: 10,
                            justifyContent: 'flex-start',
                            height: 20,
                            width: 20
                        }}
                    /></TouchableOpacity>}
                {rightIcon && <TouchableOpacity onPress={() => { }}>
                    <Image
                        source={rightIcon}
                        style={{
                            alignItems: 'flex-end',
                            height: 20,
                            width: 20
                        }}
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
};

export default AppHeader;