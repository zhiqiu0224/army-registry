import axios from 'axios';

//get all soldiers
const getAllStart = () => {
    return {
        type: "GET_ALL_START"
    };
};

const getAllSuccess = (res) => {
    return {
        type: "GET_ALL_SUCCESS",
        data: res,
    };
};

const getAllError = (err) => {
    return {
        type: "GET_ALL_ERROR",
        err,
    };
};

export const getAllSoldiers = () => {
    return (dispatch) => {
        dispatch(getAllStart());
        axios({
                method: 'get',
                url: 'http://localhost:8888/api/soldiers',
            })
            .then((res) => {
                dispatch(getAllSuccess(res.data));
            })
            .catch((err) => {
                dispatch(getAllError(err));
            })
    };
};

//get soldiers by page
const getPageStart = () => {
    return {
        type: "GET_PAGE_START"
    };
}

const getPageSuccess = (res, pageNo) => {
    return {
        type: "GET_PAGE_SUCCESS",
        data: res,
        pageNo
    };
};

const getPageError = (err) => {
    return {
        type: "GET_PAGE_ERROR",
        err
    };
};

export const getPage = (pageNo) => {
    return (dispatch) => {
        dispatch(getPageStart());
        axios.get(`http://localhost:8888/api/soldiers/${pageNo}`)
            .then(res => {
                dispatch(getPageSuccess(res.data, pageNo));
            })
            .catch(err => {
                dispatch(getPageError(err));
            })
    }
}

//get superior
const getValidStart = () => {
    return {
        type: "GET_VALID_START"
    };
};

const getValidSuccess = (res) => {
    return {
        type: "GET_VALID_SUCCESS",
        data: res
    };
}

const getValidError = (err) => {
    return {
        type: "GET_VALID_ERROR",
        err
    };
}

export const getValidSuperiors = (id) => {
    return (dispatch) => {
        dispatch(getValidStart());
        axios.get(`http://localhost:8888/api/validSuperiors/${id}`)
            .then(res => {
                dispatch(getValidSuccess(res.data));
            })
            .catch(err => {
                dispatch(getValidError(err));
            })
    }
}

//get linked superior
const getLinkSupStart = () => {
    return {
        type: "GET_LINKSUP_START"
    };
}

const getLinkSupSuccess = (res) => {
    return {
        type: "GET_LINKSUP_SUCCESS",
        data: res
    };
}

const getLinkSupError = (err) => {
    return {
        type: "GET_LINKSUP_ERROR",
        err
    };
}

const emptySup = () => {
    return {
        type: "EMPTY_SUP"
    }
}

export const getLinkSup = (id, history) => {
    return (dispatch) => {
        dispatch(getLinkSupStart());
        axios({
            method: 'get',
            url: `http://localhost:8888/api/linksup/${id}`,
            
        })
        .then(res => {
            dispatch(getLinkSupSuccess(res.data));
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            dispatch(getLinkSupError(err));
        })
    }
}

export const emptyLinkSup = () => {
    return (dispatch) => {
        dispatch(emptySup());
    }
}

export const showDS = () => {
    return (dispatch) => {
        dispatch({type: "SHOW_DS"});
    }
}

export const showSup = () => {
    return (dispatch) => {
        dispatch({type: "SHOW_SUP"});  
    }
}

export const showAll = () => {
    return (dispatch) => {
        dispatch({type: "SHOW_ALL"});
    }
}

//get linked ds
const getLinkDsStart = () => {
    return {
        type: "GET_LINKDS_START"
    };
}

const getLinkDsSuccess = (res) => {
    return {
        type: "GET_LINKDS_SUCCESS",
        data: res
    };
}

const getLinkDsError = (err) => {
    return {
        type: "GET_LINKDS_ERROR",
        err
    };
}

const emptyDs = () => {
    return {
        type: "EMPTY_DS",
    }
}

export const getLinkDs = (ds, history) => {
    console.log(ds);
    return (dispatch) => {
        dispatch(getLinkDsStart());
        axios({
            method: 'post',
            url: 'http://localhost:8888/api/linkds',
            data: ds
        })
        .then(res => {
            dispatch(getLinkDsSuccess(res.data));
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            dispatch(getLinkDsError(err));
        })
    }
}

export const emptyLinkDs = () => {
    return (dispatch) => {
        dispatch(emptyDs());
    }
}

//add one soldier
const addSoldierStart = () => {
    return {
        type: "ADD_SOLDIER_START"
    };
}

const addSoldierSuccess = () => {
    return {
        type: "ADD_SOLDIER_SUCCESS"
    };
}

const addSoldierError = (err) => {
    return {
        type: "ADD_SOLDIER_ERROR",
        err
    };
}

export const addSoldier = (soldier, history) => {
    return (dispatch) => {
        dispatch(addSoldierStart());
        axios({
            method: 'post',
            url: 'http://localhost:8888/api/soldiers',
            data: soldier
        })
        .then(res => {
            dispatch(addSoldierSuccess());
            //dispatch(getPage(1));
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            dispatch(addSoldierError(err));
        })
    }
}

//delete one soldier
const deleteSoldierStart = () => {
    return {
        type: "DELETE_SOLDIER_START"
    };
};

const deleteSoldierSuccess = () => {
    return {
        type: "DELETE_SOLDIER_SUCCESS",
        
    };
};

const deleteSoldierError = (err) => {
    return {
        type: "DELETE_SOLDIER_ERROR",
        err
    };
};

export const deleteSoldier = (id, history) => {
    return(dispatch) => {
        dispatch(deleteSoldierStart());
        axios.delete(`http://localhost:8888/api/soldiers/${id}`)
            .then(res => {
                dispatch(deleteSoldierSuccess());
                dispatch(getPage(1));

            })
            .catch(err => {
                dispatch(deleteSoldierError(err));
            })
    }  
};

//update one soldier
const updateSoldierStart = () => {
    return {
        type: "UPDATE_SOLDIER_START"
    };
}

const updateSoldierSuccess = () => {
    return {
        type: "UPDATE_SOLDIER_SUCCESS"
    };
}

const updateSoldierError = (err) => {
    return {
        type: "UPDATE_SOLDIER_ERROR",
        err
    }
}

export const updateSoldier = (id, data, history) => {
    return (dispatch) => {
        dispatch(updateSoldierStart());
        axios({
            method: 'put',
            url: `http://localhost:8888/api/soldiers/${id}`,
            data: data
        })
        .then(res => {
            dispatch(updateSoldierSuccess());
            history.push('/');
        })
        .catch(err => {
            dispatch(updateSoldierError(err));
        })
    }
}