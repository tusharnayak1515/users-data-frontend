let isData;
let isError;

if(localStorage.getItem("user_data") === null) {
    isData = null;
}
else {
    isData = JSON.parse(localStorage.getItem("user_data"));
}

if(localStorage.getItem("user_data_error") === null) {
    isError = null;
}
else {
    isError = localStorage.getItem("user_data_error");
}


const initState = {
    data: isData,
    error: isError,
    isLoading: false
}

const dataReducer = (state=initState,action)=> {
    if(action.type === "data-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-data") {
        const {data,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error
            }
        }
        else {
            return {
                ...state,
                data: data,
                error: null
            }
        }
    }
    else if(action.type === "add-data") {
        const {data,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error
            }
        }
        else {
            return {
                ...state,
                data: data,
                error: null
            }
        }
    }
    else if(action.type === "edit-data") {
        const {data,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                data: data,
                error: null,
                isLoading: false
            }
        }
    }
    else if(action.type === "delete-data") {
        const {data,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error,
                isLoading: false
            }
        }
        else {
            return {
                ...state,
                data: data,
                error: null,
                isLoading: false
            }
        }
    }
    else if(action.type === "logout") {
        return {
            ...state,
            data: null,
            error: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default dataReducer;