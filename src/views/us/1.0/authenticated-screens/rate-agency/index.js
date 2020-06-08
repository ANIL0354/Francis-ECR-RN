/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    rateAgency,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        rateAgency: (listingId, data, success, failure) => dispatch(rateAgency(listingId, data, success, failure)),
    };
};
export const RatingAgencyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
