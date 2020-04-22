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
        color: 'black',
        minWidth: 110,
        textAlignVertical: 'center',
        fontWeight: 'bold',
        padding: 5,
        maxWidth: 110,
        minHeight: 60,
        maxHeight: 60,
        borderBottomColor: 'darkgrey',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        alignItems: 'center',
        textAlign: 'left',
        fontSize: 14,
        flexWrap: 'wrap',
    },
    filterTabContainer: {
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent'
    }
});

export default styles;