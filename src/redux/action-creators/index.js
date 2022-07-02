import axios from "axios";
const url = process.env.NODE_ENV === "development" ? "http://localhost:5000" : process.env.NODE_ENV === "production" ? process.env.REACT_APP_BACKEND_URL : "";

// ******************** USER SECTION **************************\\
export const register = ({name,email,phone,password})=> async(dispatch)=> {
    try {
        const res = await axios.post(`${url}/api/auth/register`,{name,email,phone,password});

        if(res.data.success) {
            localStorage.setItem("user_auth_token", res.data.authToken);
            dispatch({
                type: "register",
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "register",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "register",
            payload: {
                error: error.message
            }
        });
    }
}

export const login = ({email,password})=> async(dispatch)=> {
    try {
        const res = await axios.post(`${url}/api/auth/login`,{email,password});

        if(res.data.success) {
            localStorage.setItem("user_auth_token", res.data.authToken);
            dispatch({
                type: "login",
                payload: {
                    user: res.data.authToken,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "login",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "login",
            payload: {
                error: error
            }
        });
    }
}

export const profile = ()=> async(dispatch)=> {
    const token = localStorage.getItem("user_auth_token");
    try {
        const res = await axios.get(`${url}/api/auth/profile`, {headers: {"user-auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("user_profile", JSON.stringify(res.data.profile));
            dispatch({
                type: "profile",
                payload: {
                    profile: res.data.profile,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "profile",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "profile",
            payload: {
                error: error
            }
        });
    }
}

export const editprofile = ({name,email,phone})=> async(dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const token = localStorage.getItem("user_auth_token");
    try {
        const res = await axios.put(`${url}/api/auth/editprofile`, {name,email,phone}, {headers: {"user-auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("user_profile", JSON.stringify(res.data.profile));
            dispatch({
                type: "edit-profile",
                payload: {
                    profile: res.data.profile,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "edit-profile",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "edit-profile",
            payload: {
                error: error
            }
        });
    }
}

export const logout = ()=> async (dispatch)=> {
    localStorage.removeItem("user_auth_token");
    localStorage.removeItem("user_profile");
    localStorage.removeItem("user_data");
    localStorage.removeItem("user_data_error");
    dispatch({
        type: "logout"
    });
}

// ******************** DATA SECTION **************************\\
export const getData = ()=> async (dispatch)=> {
    const token = localStorage.getItem("user_auth_token");
    try {
        const res = await axios.get(`${url}/api/data/`, {headers: {"user-auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("user_data", JSON.stringify(res.data.allData));
            dispatch({
                type: "get-data",
                payload: {
                    data: res.data.allData,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "get-data",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "get-data",
            payload: {
                error: error
            }
        });
    }
}

export const addData = ({name,email,phone,domain})=> async (dispatch)=> {
    const token = localStorage.getItem("user_auth_token");
    try {
        const res = await axios.post(`${url}/api/data/add-data`, {name,email,phone,domain}, {headers: {"user-auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("user_data", JSON.stringify(res.data.allData));
            dispatch({
                type: "add-data",
                payload: {
                    data: res.data.allData,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "add-data",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "add-data",
            payload: {
                error: error
            }
        });
    }
}

export const editData = ({id,name,email,phone,domain})=> async (dispatch)=> {
    const token = localStorage.getItem("user_auth_token");
    try {
        const res = await axios.put(`${url}/api/data/edit-data/${id}`, {name,email,phone,domain}, {headers: {"user-auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("user_data", JSON.stringify(res.data.allData));
            dispatch({
                type: "edit-data",
                payload: {
                    data: res.data.allData,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "edit-data",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "edit-data",
            payload: {
                error: error
            }
        });
    }
}

export const deleteData = (id)=> async (dispatch)=> {
    const token = localStorage.getItem("user_auth_token");
    try {
        const res = await axios.delete(`${url}/api/data/delete-data/${id}`, {headers: {"user-auth-token": token}});

        if(res.data.success) {
            localStorage.setItem("user_data", JSON.stringify(res.data.allData));
            dispatch({
                type: "delete-data",
                payload: {
                    data: res.data.allData,
                    error: null
                }
            });
        }

        if(res.data.error) {
            localStorage.setItem("user_data_error", res.data.error);
            dispatch({
                type: "delete-data",
                payload: {
                    error: res.data.error
                }
            });
        }

    } catch (error) {
        dispatch({
            type: "delete-data",
            payload: {
                error: error
            }
        });
    }
}