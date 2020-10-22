import axios from "axios"
// import { reset } from 'redux-form';
import { baseURL } from '../utility/index';
import { LOGIN, LOGIN_ERROR, LOGOUT, POSTS_SUCCESS, POSTS_REQUEST, 
    POSTS_FAILURE, POST_CREATED, POST_CREATED_FAILED, }
    // GET_USER_ERROR,  REGISTER, REGISTER_ERROR}
    from "./action_types"

export const login = (values, callBack) => {
    return (dispatch) => {
        axios.post(`${baseURL}/rest-auth/login/`, values).then((res) => {
            dispatch({
                type: LOGIN,
                payload: res.data
            })
        }, (err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data
            })
            callBack()
        }
        )
    }
}
export const logout = () => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.post(`${baseURL}/rest-auth/logout/`, null, config).then((res) => {
            dispatch({ type: LOGOUT })
        }, (err) => console.log(err.response.data))
    }
}

// export const getUser = () => (dispatch) => {
//     dispatch({ type: PROFILE_REQUEST });
//     axios
//       .get(`${baseURL}/api/users/profile`, headers)
//       .then((response) => {
//         dispatch({ type: PROFILE_SUCCESS, payload: response.data });
//       })
//       .catch((error) => {
//         dispatch({ type: PROFILE_FAILURE, payload: error.message });
//       });
//   };

export const getPosts = () => (dispatch, getState) => {
    const config = setConfig(getState)
    console.log(config)
    dispatch({ type: POSTS_REQUEST });
    axios
        .get(`${baseURL}/post/`, config)
        .then((response) => {
            dispatch({ type: POSTS_SUCCESS, payload: response.data.results });
            console.log(response)
        })
        .catch((error) => {
            dispatch({ type: POSTS_FAILURE, payload: error.message });
        });
};
export const addPost = (postData, callBack) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.post(`${baseURL}/post/`, postData, config).then((res) => {
            console.log(res)
            dispatch({
                type: POST_CREATED,
                payload: res.data
            })
            callBack()
        }, (err) => {
            dispatch({
                type: POST_CREATED_FAILED,
                payload: err.response.data
            })
        })
    }
}

export const setConfig = (getState) => {
    let config = null;
    const token = getState().authReducer.token
    console.log(token)
    if (token) {
        config = {
            headers: {
                Authorization: `token ${token}`
            }
        }
    }
    return config
}