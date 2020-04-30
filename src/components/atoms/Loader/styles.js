import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loaderWrapper: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 100000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
});

export default styles;