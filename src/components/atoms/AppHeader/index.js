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
                {leftIcon && <Image source={leftIcon} />}
            </View>
            <View style={{ flex: 1, height: '100%', justifyContent: 'space-between', alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                {centerIcon && <TouchableOpacity>
                    <Image
                        source={centerIcon}
                        style={{
                            justifyContent: 'flex-start',
                            height: 20,
                            width: 20
                        }}
                    /></TouchableOpacity>}
                {rightIcon && <TouchableOpacity onPress={() => alert('menu pressed')}>
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