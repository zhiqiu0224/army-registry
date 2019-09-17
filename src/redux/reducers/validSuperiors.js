const initState = {
    isLoading: false,
    list: [],
    err: null
};

const validSuperiors = (state = initState, action) => {
    switch(action.type) {
        case "GET_VALID_START":
            return {
                ...state,
                isLoading: true,
            };
        case "GET_VALID_SUCCESS":
            return {
                ...state,
                isLoading: false,
                list: action.data,
            };
        case "GET_VALID_ERROR":
            return {
                ...state,
                isLoading: false,
                err: action.err,
            };
        default:
            return state;
    }
}

export default validSuperiors;