import { StyleSheet } from 'react-native';
import { scaleText } from '../../../../../helpers';

const styles = StyleSheet.create({
    childContainer: {
        flexDirection: 'row',
        backgroundColor: '#0091ff',
        paddingHorizontal: 30,
        paddingVertical: scaleText(20).fontSize,
        alignItems: 'center',
    },
    navArrowContainer: {
        flex: 1,
        height: 20,
        maxWidth: 20,
        alignItems: 'center',
    },
    subHeaderText: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    rowFlex: {
        flex: 1,
        flexDirection: 'row'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    detailsWrapper: {
        marginHorizontal: scaleText(10).fontSize
    },
    iconContainerStyle: {
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    detailsLeftContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsRightContainer: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: scaleText(10).fontSize,
        padding: scaleText(10).fontSize,
    },
    carTitle: {
        color: '#565353',
        fontWeight: 'bold',
        width: '100%',
        fontSize: scaleText(18).fontSize,
        marginBottom: scaleText(10).fontSize,
    },
    carFeaturesWrapper: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // flexWrap: 'wrap',
        // maxWidth: '90%',
        justifyContent: 'center'
    },
    iconTextContainer: {
        paddingVertical: 5,
        marginRight: scaleText(7).fontSize
    },
    iconText: {
        color: 'gray',
        textAlign: 'left',
        fontSize: scaleText(14).fontSize,
        textAlignVertical: 'center',
        textTransform: 'capitalize'
    },
    listPickupText: {
        textTransform: 'uppercase',
        textAlign: 'left',
        fontSize: scaleText(16).fontSize,
        textAlignVertical: 'center',
        borderRadius: 15,
    },
    vehicleListButton: {
        flex: 1,
        maxHeight: scaleText(40).fontSize,
        borderRadius: scaleText(10).fontSize,
        marginTop: scaleText(10).fontSize,
        backgroundColor: '#009000'
    }
});

export default styles;