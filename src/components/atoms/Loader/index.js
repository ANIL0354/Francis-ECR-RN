import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const CustomLoader = ({
    loader
}) => {
    return (
        <View>
            {loader && <View style={{
                flex: 1, flexDirection: 'column',
                backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100000, top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', position: 'absolute'
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    position: 'absolute', zIndex: 10089000,

                }}>
                    <ActivityIndicator size={'large'} color={'red'} />
                </View>
            </View>}
        </View>

    )
};

export default CustomLoader;