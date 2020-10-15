/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { Screen } from './screen';
import {
    startLoader,
    stopLoader,
    getPopularPlaces,
    fetchRatingList,
} from '../../../../../redux/actions';

const mapStateToProps = (state) => {
    return ({
        ratingList: state.RatingsReducer.ratingList,
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getPopularPlaces: (data, success, failure) => dispatch(getPopularPlaces(data, success, failure)),
        fetchRatingList: (data, success, failure) => dispatch(fetchRatingList(data, success, failure)),
    };
};
export const RatingListScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);
