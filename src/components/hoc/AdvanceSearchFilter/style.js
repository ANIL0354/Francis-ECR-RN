import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    filterModal: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        zIndex: 9999999999,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterWrapper: {
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        minHeight: 360,
        maxHeight: 500,
        minWidth: '100%',
        marginTop: '75%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    filterWrapperHeader: {
        borderBottomColor: 'darkgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        padding: 15
    },
    filterHeaderText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginRight: -30
    },
    filterTab: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        minHeight: 60,
        maxHeight: 60,
        minWidth: 130,
        maxWidth: 130,
        borderBottomColor: 'darkgrey',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    filterTabText: {
        flexWrap: 'wrap',
        textAlign: 'left',
        fontSize: 14,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        minWidth: 90,
        maxWidth: 90,
    },
    filterTabContainer: {
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'darkgrey',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent'
    }
});

export default styles;