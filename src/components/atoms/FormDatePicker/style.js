import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    pickerStyle: {
        padding: 0,
        margin: 0,
    },
    dateInput: {
        textAlign: 'left',
        margin: 0,
        padding: 0,
        borderColor: 'transparent',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 0.8,
        paddingHorizontal: 10,
        paddingVertical: 2,
        paddingBottom: 0,
        marginBottom: 0,
        textAlign: 'left',
        flex: 1
    },
    dateText: {
        margin: 0,
        padding: 0,
        textAlign: 'left',
    },
    placeholderText: {
        margin: 0,
        padding: 0,
        color: 'black',
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    errorText: {
        color: 'red',
        paddingVertical: 0,
    },
    dateIcon: {
        display: 'none',
        padding: 0
    }
});

export default styles;