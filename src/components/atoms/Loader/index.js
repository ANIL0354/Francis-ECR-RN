import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import styles from './styles';

const CustomLoader = ({
    size = 60
}) => {
    return (
        <View>
            {true && <View style={styles.loaderWrapper}>
                <Spinner
                    isVisible={true}
                    type={'Circle'}
                    size={size}
                    color={'#0091ff'}
                />
            </View>}
        </View>

    )
};

export default CustomLoader;