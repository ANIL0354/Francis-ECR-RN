import React, { useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

const AppHeader = ({
    leftIcon,
    centerIcon,
    rightIcon,
    onRightIconTap = () => { },
    onCenterIconTap = () => { },
    onLogout = () => { },
    onLeftIconTap = () => { }
}) => {
    const menuRef = useRef();
    return (
        <View style={{ backgroundColor: 'white', padding: 10, minHeight: 50, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
                flex: centerIcon && rightIcon ? 3 : 7
            }}>
                {leftIcon && <Image style={{ height: 35, width: 90 }} source={leftIcon} />}
            </View>
            <View style={{ flex: 1, height: '100%', justifyContent: 'space-between', alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                {centerIcon && <TouchableOpacity onPress={() => onCenterIconTap()}>
                    <Image
                        source={centerIcon}
                        style={{
                            marginLeft: 10,
                            justifyContent: 'flex-start',
                            height: 20,
                            width: 20
                        }}
                    /></TouchableOpacity>}
                {rightIcon &&
                    <Menu
                        ref={menuRef}
                        button={<TouchableOpacity onPress={() => menuRef.current.show()}>
                            <Image
                                source={rightIcon}
                                style={{
                                    alignItems: 'flex-end',
                                    height: 20,
                                    width: 20
                                }}
                            />
                        </TouchableOpacity>}
                    >
                        <MenuItem onPress={() => {
                            menuRef.current.hide();
                            Alert.alert('Logout', 'Are you sure you want to logout?', [
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                },
                                {
                                    text: 'Confirm',
                                    onPress: () => onLogout()
                                },
                            ])
                        }}>{'Logout'}</MenuItem>
                    </Menu>
                }
            </View>
        </View>
    )
};

export default AppHeader;