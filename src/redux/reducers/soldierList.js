const initState = {
    isLoading: false,
    list: [],
    page: 0,
    display: "all",
    err: null
};

const soldierList = (state = initState, action) => {
    switch(action.type) {
        
        case "GET_PAGE_START":
            return {
                ...state,
                isLoading: true
            };
        case "GET_PAGE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                list: [...state.list,  ...action.data],
                page: action.pageNo
            };
        case "GET_PAGE_ERROR":
            return {
                ...state,
                isLoading: false,
                err: action.err
            };
        case "ADD_SOLDIER_START":
            return {
                ...state,
                isLoading: true
            };
        case "ADD_SOLDIER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                page: 0,
                list:[]
            };
        case "ADD_SOLDIER_ERROR":
            return {
                ...state,
                err: action.err
            }
        case "DELETE_SOLDIER_START":
            return {
                ...state,
                isLoading: true
            };
        case "DELETE_SOLDIER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                page: 0,
                list: []
            };
        case "DELETE_SOLDIER_ERROR":
            return {
                ...state,
                err: action.err
            };
        case "UPDATE_SOLDIER_START":
            return {
                ...state,
                isLoading: true
            };
        case "UPDATE_SOLDIER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                list:[],
                page: 0
            };
        case "UPDATE_SOLDIER_ERROR":
            return {
                ...state,
                err: action.err
            };
        case "SHOW_ALL":
            return {
                ...state,
                display: "all"
            }
        case "SHOW_DS":
            return {
                ...state,
                display: 'ds'
            }
        case 'SHOW_SUP':
            return {
                ...state,
                display: 'sup'
            }
        default:
            return state;
    }
}

export default soldierList;