import { StyleSheet } from 'react-native';
import { scaleText } from '../../../helpers';

const styles = StyleSheet.create({
    filterModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end'
    },
    filterWrapper: {
        backgroundColor: 'white',
        minHeight: 360,
        maxHeight: 500,
        minWidth: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    filterWrapperHeader: {
        borderBottomColor: 'darkgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        padding: 15,
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
        padding: scaleText(5).fontSize,
        height: 60,
        width: scaleText(130).fontSize,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: 'darkgrey',
    },
    filterTabText: {
        fontSize: scaleText(14).fontSize,
        fontWeight: 'bold',
        flex: 1,
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