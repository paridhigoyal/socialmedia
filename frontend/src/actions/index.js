import axios from "axios";
import { baseURL } from '../utility/index';
import Cookies from 'js-cookie';

import {
  LOGIN, LOGIN_ERROR, LOGOUT, POSTS_SUCCESS, POSTS_REQUEST,
  POSTS_FAILURE, POST_CREATED,  DELETE_POST,
  PROFILE_SUCCESS, PROFILE_REQUEST, PROFILE_FAILURE, 
  GET_FOLLOW_SUCCESS, GET_FOLLOW_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWER_FAILURE,
  EDIT_POST_FAIL,
  EDIT_POST, ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT, EDIT_PROFILE,
  FORGET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  MAKE_LIKE,
  DELETE_LIKE,
  UPDATE_LIKE
} from "./action_types"

export const login = (values, callBack) => {
  return (dispatch) => {
    axios.post(`${baseURL}/rest-auth/login/`, values).then((res) => {
      dispatch({
        type: LOGIN,
        payload: res.data
      })
      // window.location.reload(true);
    }, (err) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message
      })
      alert('login failed')
      callBack()
    }
    )
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const forgetPassword = (email) => {
  return (dispatch) => {
    axios.post(`${baseURL}/password/reset/`, email, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((res) => {
      dispatch({
        type: FORGET_PASSWORD_SUCCESS,
        payload: res.data
      })
    })
  }
}

export const changePassword = (input) => {
  // var csrftoken = getCookie('csrftoken');

  return (dispatch, getState) => {

    const resetParameter = {
      Accept: 'application/json',
    };
    const config = setConfig(getState, resetParameter)
    console.log(config)
    axios.post(`${baseURL}/rest-auth/password/change/`, input, config).then((res) => {
      console.log(res)
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res.data
      })
    }
    )
  }
}
export const makeLike = (values) => {
  return (dispatch, getState) => {
    dispatch({
      type: MAKE_LIKE,
      payload: values
    })
    const config = setConfig(getState)
    axios.post(`${baseURL}/postrate/`, values, config).then((res) => {
      
    })
  }
}

export const updateLike = (values, id) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/postrateupdate/${id}/`, values, config).then((res) => {
      dispatch({
        type: UPDATE_LIKE,
        payload: res.data
      })
    })
  }
}

export const deleteLike = (id) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.delete(`${baseURL}/postrateupdate/${id}/`, config).then((res) => {
      dispatch({
        type: DELETE_LIKE,
        payload: res.data
      })
    })
  }
}

export const searchUserPost = (username) => {
  return (dispatch, getState) => {
  const config = setConfig(getState)
  // console.log(config)
  dispatch({ type: POSTS_REQUEST });
  axios
    .get(`${baseURL}/post/?search=${username}`, config)
    .then((response) => {
      dispatch({ type: POSTS_SUCCESS, payload: response.data.results });
      // console.log(response)
    })
    .catch((error) => {
      dispatch({ type: POSTS_FAILURE, payload: error.message });
    });
};}
export const searchuserprofile = (username) => (dispatch, getState) => {
  const config = setConfig(getState)
  // console.log(config)
  dispatch({ type: PROFILE_REQUEST });
  axios
    .get(`${baseURL}/profile/?search=${username}`, config)
    .then((response) => {
      dispatch({ type: POSTS_SUCCESS, payload: response.data.results });
      // console.log(response)
    })
    .catch((error) => {
      dispatch({ type: POSTS_FAILURE, payload: error.message });
    });
};

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


export const addPost = (values) => {
  console.log(values)
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/post/`, values, config, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    ).then((res) => {
      console.log(res.data)
      dispatch({
        type: POST_CREATED,
        payload: res.data
      })

    })
  }
}

export const deletePost = (id) => (dispatch, getState) => {
  const config = setConfig(getState)
  // console.log('dff')
  axios.delete(`${baseURL}/post/${id}/`, config)
    .then((data) => {
      const posts = data
      // console.log(posts, 'abcd')
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
  // dispatch({ type: GET_FOLLOW_REQUEST });
  const config = setConfig(getState)
  axios
    .get(`${baseURL}/follow/${id}/`, config,{
      headers: {
      'Authorization': Cookies.get('sessionid'),
      'X-CSRFToken': Cookies.get('csrftoken')
    },})
    .then((response) => {
      dispatch({ type: GET_FOLLOW_SUCCESS, payload: response.data.results });
      // console.log(response)
    })
    .catch((error) => {
      dispatch({ type: GET_FOLLOW_FAILURE, payload: error.message });
    });
};

export const getFollowers = () => (dispatch, getState) => {
  const config = setConfig(getState)
  // console.log(config, 'fdg')
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

export const editPost = (id, postData) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/post/${id}/`, postData, config).then((res) => {
      dispatch({
        type: EDIT_POST,
        payload: res.data
      })
    }, (err) => {
      dispatch({
        type: EDIT_POST_FAIL,
        payload: err.response.data
      })
      // callBack()
    })
  }
}
export const editProfile = (id, profileData) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/profile/${id}/`, profileData, config).then((res) => {
      dispatch({
        type: EDIT_PROFILE,
        payload: res.data
      })
     
    })
  }
}

export const addComment = (values) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/comment/`, values, config).then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })

    })
  }
}

export const editComment = (id, values) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/commentupdate/${id}/`, values, config).then((res) => {
      console.log(res)
      dispatch({
        type: EDIT_COMMENT,
        payload: res.data
      })

    })
  }
}
export const deleteComment = (id) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.delete(`${baseURL}/commentupdate/${id}`, config)
      .then((res) => {
        dispatch({
          type: DELETE_COMMENT,
          payload: res.data
        })
      })


  }
}


export const setConfig = (getState, restParamter) => {
  let config = null;
  const token = getState().authReducer.token
  if (token) {
    config = {
      headers: {
        Authorization: `token ${token}`,
        ...restParamter
      }
    }
  }
  return config
}