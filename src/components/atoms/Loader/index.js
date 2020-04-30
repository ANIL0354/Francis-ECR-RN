import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import styles from './styles';

const CustomLoader = ({
    loader
}) => {
    return (
        <View>
            {true && <View style={styles.loaderWrapper}>
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