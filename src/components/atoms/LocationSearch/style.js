import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    containerStyle: {
        zIndex: 10,
        borderColor: 'transparent',
    },
    textInputStyle: {
        marginLeft: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
    },
    placeholderStyle: {
        color: 'black',
    },
    descriptionStyle: {
        fontWeight: 'bold',
    },
    predefinedDescriptionStyle: {
        color: 'black',
    },
    poweredByStyle: {
        display: 'none',
    },
    listViewStyle: {
        backgroundColor: 'white',
        width: '100%',
        position: Platform.OS === 'ios' ? 'absolute' : 'relative',
        top: Platform.OS === 'ios' ? 44 : 0,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    }
});

export default styles;