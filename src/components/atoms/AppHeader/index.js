import React, { useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import styles from './style';

const AppHeader = ({
    leftIcon,
    centerIcon,
    rightIcon,
    rightMenuItems = [],
    onRightIconTap = () => { },
    onCenterIconTap = () => { },
    onLeftIconTap = () => { }
}) => {
    const menuRef = useRef();
    return (
        <View style={styles.headerContainer}>
            <View style={{
                flex: centerIcon && rightIcon ? 3 : 7
            }}>
                {leftIcon && <Image style={styles.leftIconStyle} source={leftIcon} />}
            </View>
            <View style={styles.centerIconWrapper}>
                {centerIcon && <TouchableOpacity onPress={() => onCenterIconTap()}>
                    <Image
                        source={centerIcon}
                        style={styles.centerIconStyle}
                    /></TouchableOpacity>}
                {rightIcon &&
                    <Menu
                        ref={menuRef}
                        button={<TouchableOpacity onPress={() => menuRef.current.show()}>
                            <Image
                                source={rightIcon}
                                style={styles.rightIconStyle}
                            />
                        </TouchableOpacity>}
                    >
                        {rightMenuItems.map((item, index) => (<MenuItem onPress={() => {
                            item.onPress();
                            menuRef.current.hide();
                        }}>{item.label}</MenuItem>
                        ))}
                    </Menu>
                }
            </View>
        </View>
    )
};

export default AppHeader;