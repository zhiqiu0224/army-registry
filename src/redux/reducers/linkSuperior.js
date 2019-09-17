const initState = {
    isLoading: false,
    list: [],
    err: null
};

const linkSuperior = (state = initState, action) => {
    switch(action.type) {
        case "GET_LINKSUP_START":
            return {
                ...state,
                isLoading: true
            };
        case "GET_LINKSUP_SUCCESS":
            return {
                ...state,
                list: [action.data]
            };
        case "GET_LINKSUP_ERROR":
            return {
                ...state,
                err: action.err
            };
        case "EMPTY_SUP":
            return {
                ...state,
                list: []
            }
        default:
            return state;
    }
}

export default linkSuperior;