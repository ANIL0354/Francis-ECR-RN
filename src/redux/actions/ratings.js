/* eslint-disable prettier/prettier */
export const FETCH_RATING_LIST = 'FETCH_RATING_LIST';
export const SAVE_RATING_LIST = 'SAVE_RATING_LIST';

export const fetchRatingList = (data, success, failure) => {
    return {
        type: FETCH_RATING_LIST,
        data,
        success,
        failure,
    };
};

export const saveRatingList = data => {
    return {
        type: SAVE_RATING_LIST,
        data,
    };
};
