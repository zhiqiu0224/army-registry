const initState = {
    isLoading: false,
    details: {},
    err: null
};

const soldierDetail = (state = initState, action) => {
    switch(action.type) {
        case "GET_SUPERIOR_START":
            return {
                ...state,
                isLoading: true
            };
        case "GET_SUPERIOR_SUCCESS":
            return {
                ...state,
                details: action.data
            };
        case "GET_SUPERIOR_ERROR":
            return {
                ...state,
                err: action.err
            };
        default:
            return state;
    }
}

export default soldierDetail;