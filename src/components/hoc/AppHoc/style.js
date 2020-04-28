import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    hocWrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    loaderWrapper: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        zIndex: 10000000000,
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
    }
});

export default styles;