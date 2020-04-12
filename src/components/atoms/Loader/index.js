import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';

const CustomLoader = ({
    loader
}) => {
    return (
        <View>
            {true && <View style={{
                flex: 1, flexDirection: 'column',
                backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100000, top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', position: 'absolute'
            }}>
                <Spinner
                    isVisible={true}
                    type={'Circle'}
                    size={60}
                    color={'#0091ff'}
                />
            </View>}
        </View>

    )
};

export default CustomLoader;