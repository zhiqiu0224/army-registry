const initState = {
    isLoading: false,
    list: [],
    err: null
};

const linkDs = (state = initState, action) => {
    switch(action.type) {
        case "GET_LINKDS_START":
            return {
                ...state,
                isLoading: true
            };
        case "GET_LINKDS_SUCCESS":
            return {
                ...state,
                list: action.data
            };
        case "GET_LINKDS_ERROR":
            return {
                ...state,
                err: action.err
            };
        case "EMPTY_DS":
            return {
                ...state,
                list: []
            }
        default:
            return state;
    }
}

export default linkDs;