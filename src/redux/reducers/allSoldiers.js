const initState = {
    isLoading: false,
    all: [],
    err: null
};

const allSoldiers = (state = initState, action) => {
    switch(action.type) {
        case "GET_ALL_START":
            return {
                ...state,
                isLoading: true
            };
        case "GET_ALL_SUCCESS":
            return {
                ...state,
                all: action.data
            };
        case "GET_ALL_ERROR":
            return {
                ...state,
                err: action.err
            };
        default:
            return state;
    }
}

export default allSoldiers;