import axios from "axios";
import { baseURL } from '../utility/index';
import {
    LOGIN, LOGIN_ERROR, LOGOUT, POSTS_SUCCESS, POSTS_REQUEST,
    POSTS_FAILURE, POST_CREATED, POST_CREATED_FAILED, DELETE_POST,
    PROFILE_SUCCESS, PROFILE_REQUEST, PROFILE_FAILURE, GET_FOLLOW_REQUEST,
    GET_FOLLOW_SUCCESS, GET_FOLLOW_FAILURE,
    FOLLOWER_REQUEST,
    FOLLOWER_SUCCESS,
    FOLLOWER_FAILURE,
    EDIT_POST_FAIL,
    EDIT_POST
} from "./action_types"

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

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("token");
    window.location.reload(true);
};


export const searchuserpost = (posts) => (dispatch, getState) => {
    const config = setConfig(getState)
    console.log(config)
    dispatch({ type: POSTS_REQUEST });
    axios
        .get(`${baseURL}/post/?search=${posts}`, config)
        .then((response) => {
            dispatch({ type: POSTS_SUCCESS, payload: response.data.results });
            // console.log(response)
        })
        .catch((error) => {
            dispatch({ type: POSTS_FAILURE, payload: error.message });
        });
};

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
    dispatch({ type: POSTS_REQUEST });
    axios
        .get(`${baseURL}/post/`, config)
        .then((response) => {
            dispatch({ type: POSTS_SUCCESS, payload: response.data.results });
            // console.log(response)
        })
        .catch((error) => {
            dispatch({ type: POSTS_FAILURE, payload: error.message });
        });
};
export const addPost = (postData, callBack) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.post(`${baseURL}/post/`, postData, config).then((res) => {
            // console.log(res)
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

export const deletePost = (id) => (dispatch, getState) => {
    const config = setConfig(getState)
    console.log('dff')
    axios.delete(`${baseURL}/posts/${id}/`, config)
        .then((data) => {
            const posts = data
            console.log(posts, 'abcd')
            dispatch({
                type: DELETE_POST,
                payload: posts,
                id
            })

        })
}
export const getProfiles = () => (dispatch, getState) => {
    const config = setConfig(getState)
    // console.log(config)
    dispatch({ type: PROFILE_REQUEST });
    axios
        .get(`${baseURL}/profile/`, config)
        .then((response) => {
            dispatch({ type: PROFILE_SUCCESS, payload: response.data.results });
            // console.log(response)
        })
        .catch((error) => {
            dispatch({ type: PROFILE_FAILURE, payload: error.message });
        })
}

export const follow = (id) => (dispatch, getState) => {
    dispatch({ type: GET_FOLLOW_REQUEST });
    const config = setConfig(getState)
    axios
        .get(`http://127.0.0.1:8000/follow/${id}/`, config)
        .then((response) => {
            dispatch({ type: GET_FOLLOW_SUCCESS, payload: response.data.results });
            console.log(response)
        })
        .catch((error) => {
            dispatch({ type: GET_FOLLOW_FAILURE, payload: error.message });
        });
};

export const getFollowers = () => (dispatch, getState) => {
    const config = setConfig(getState)
    console.log(config, 'fdg')
    dispatch({ type: FOLLOWER_REQUEST });
    axios
        .get(`${baseURL}/followers/`, config)
        .then((response) => {
            dispatch({ type: FOLLOWER_SUCCESS, payload: response.data.results });
            console.log(response)
        })
        .catch((error) => {
            dispatch({ type: FOLLOWER_FAILURE, payload: error.message });
        })
}

export const editPost = (id, postData, callBack) => {
    return (dispatch, getState) => {
        const config = setConfig(getState)
        axios.put(`posts/${id}/`, postData, config).then((res) => {
            dispatch({
                type: EDIT_POST,
                payload: res.data
            })
            callBack()
        }, (err) => {
            dispatch({
                type: EDIT_POST_FAIL,
                payload: err.response.data
            })
            callBack()
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