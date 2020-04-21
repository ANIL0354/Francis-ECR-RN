export const GET_POPULAR_PLACES = 'GET_POPULAR_PLACES';
export const SAVE_POPULAR_PLACES = 'SAVE_POPULAR_PLACES';

export const getPopularPlaces = ({ data, success, failure }) => {
    return {
        type: GET_POPULAR_PLACES,
        data,
        success,
        failure
    }
};

export const savePopularPlaces = data => {
    return {
        type: SAVE_POPULAR_PLACES,
        data
    }
};
