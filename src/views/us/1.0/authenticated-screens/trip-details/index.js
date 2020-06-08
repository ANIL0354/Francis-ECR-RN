/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    emailAgency,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        emailAgency: (data, success, failure) => dispatch(emailAgency(data, success, failure)),
    };
};
export const TripDetailScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
