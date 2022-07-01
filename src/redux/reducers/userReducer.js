let isUser;
let isProfile;
let isError;

if(localStorage.getItem("user_auth_token") === null) {
    isUser = null;
}
else {
    isUser = localStorage.getItem("user_auth_token");
}

if(localStorage.getItem("user_profile") === null) {
    isProfile = null;
}
else {
    isProfile = JSON.parse(localStorage.getItem("user_profile"));
}

if(localStorage.getItem("user_data_error") === null) {
    isError = null;
}
else {
    isError = localStorage.getItem("user_data_error");
}


const initState = {
    user: isUser,
    profile: isProfile,
    error: isError,
    isLoading: false
}

const userReducer = (state=initState,action)=> {
    if(action.type === "user-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "register") {
        const {user,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error
            }
        }
        else {
            return {
                ...state,
                user: user,
                error: null
            }
        }
    }
    else if(action.type === "login") {
        const {user,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error
            }
        }
        else {
            return {
                ...state,
                user: user,
                error: null
            }
        }
    }
    else if(action.type === "profile") {
        const {profile,error} = action.payload;
        if(error) {
            return {
                ...state,
                error: error
            }
        }
        else {
            return {
                ...state,
                profile: profile,
                error: null
            }
        }
    }
    else if(action.type === "edit-profile") {
        const {profile,error} = action.payload;
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
                profile: profile,
                error: null,
                isLoading: false
            }
        }
    }
    else if(action.type === "logout") {
        return {
            ...state,
            user: null,
            profile: null,
            error: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default userReducer;