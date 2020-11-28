/**index.js file consists of actions dispatched by components */

import axios from "axios";
import { baseURL } from '../utility/index';
import Cookies from 'js-cookie';

import {
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  POSTS_SUCCESS,
  POSTS_REQUEST,
  POSTS_FAILURE,
  POST_CREATED,
  DELETE_POST,
  PROFILE_SUCCESS,
  PROFILE_REQUEST,
  PROFILE_FAILURE,
  GET_FOLLOW_SUCCESS,
  GET_FOLLOW_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWER_FAILURE,
  EDIT_POST_FAIL,
  EDIT_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  EDIT_PROFILE,
  FORGET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_SUCCESS,
  SET_LIKE,
  DELETE_LIKE,
  UPDATE_LIKE,
  CREATE_PROFILE,
  USER_INFO_FAILURE,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS
} from "./action_types"

/**tryAutoSignIn function is for taking value of login credentials even after
 *  refreshing the page*/
export const tryAutoSignIn = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  if (token) {
    dispatch({
      type: LOGIN,
      payload: {
        token: token,
        user: user
      }
    })
  }
  else {
    dispatch({
      type: LOGIN_ERROR,
      payload: "Authentication failed"
    });
  }
}

/**login function is for calling login api  */
export const login = (values, callBack) => {
  return (dispatch) => {
    axios.post(`${baseURL}/rest-auth/login/`, values).then((res) => {
      const token = res.data.token
      localStorage.setItem('user', JSON.stringify(res.data.user));
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: LOGIN,
        payload: {
          token: token,
          user: user
        }
      })
      localStorage.setItem('token', res.data.token)

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

/**logout function is for logged out from site  */
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("token");
  window.location.reload(true);
};

/**forgetPassword is for calling forgetpassword api and dispatching
 *  action type and values as payload called from api */
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

/**changePassword is for calling change password api and dispatching 
 * values from api call and type */
export const changePassword = (input) => {
  return (dispatch, getState) => {
    const resetParameter = {
      Accept: 'application/json',
    };
    const config = setConfig(getState, resetParameter)
    axios.post(`${baseURL}/rest-auth/password/change/`, input, config).then((res) => {
      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
        payload: res.data
      })
    }
    )
  }
}

/**createProfile is for calling create profile api and dispatching 
 * action and values from api */
export const createProfile = (values) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/profile/`, values, config).then((res) => {
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data
      })
    })
  }
}

/**makeLike is for calling ratingpost api  */
export const makeLike = (values) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/postrate/`, values, config).then((res) => {
     dispatch({
        type: SET_LIKE,
        payload: res.data
    })

    })
  }
}

/**update like is for updating postrate */
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

/**deleteLike is for deleting previous postrate */
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

/**searchuserPost is for searching userposts */
export const searchUserPost = (username) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    dispatch({ type: POSTS_REQUEST });
    axios
      .get(`${baseURL}/post/?search=${username}`, config)
      .then((response) => {
        dispatch({ type: POSTS_SUCCESS, payload: response.data.results });

      })
      .catch((error) => {
        dispatch({ type: POSTS_FAILURE, payload: error.message });
      });
  };
}

/**searchuserprofile is for searching userprofile */
export const searchuserprofile = (username) => (dispatch, getState) => {
  const config = setConfig(getState)
  dispatch({ type: PROFILE_REQUEST });
  axios
    .get(`${baseURL}/profile/?search=${username}`, config)
    .then((response) => {
      dispatch({ type: POSTS_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: POSTS_FAILURE, payload: error.message });
    });
};

/**getPosts is for calling gettingposts api for getting all posts and dispatching values */
export const getPosts = () => (dispatch, getState) => {
  const config = setConfig(getState)
  dispatch({ type: POSTS_REQUEST });
  axios
    .get(`${baseURL}/post/`, config)
    .then((response) => {
      dispatch({ type: POSTS_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: POSTS_FAILURE, payload: error.message });
    });
};

/**addPost is for calling adding post api and dispatching data to postreducer */
export const addPost = (values) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.post(`${baseURL}/post/`, values, config, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }
    ).then((res) => {
      dispatch({
        type: POST_CREATED,
        payload: res.data
      })

    })
  }
}

/**deletePost is for calling deleting post api for particular post and 
 * dispatching values to post reducer */
export const deletePost = (id) => (dispatch, getState) => {
  const config = setConfig(getState)
  axios.delete(`${baseURL}/post/${id}/`, config)
    .then((data) => {
      const posts = data
      dispatch({
        type: DELETE_POST,
        payload: posts,
        id
      })

    })
}

export const getUserInfo = () => (dispatch, getState) => {
  const config = setConfig(getState)
  dispatch({ type: USER_INFO_REQUEST });
  axios
    .get(`${baseURL}/rest-auth/user/`, config)
    .then((response) => {
      dispatch({ type: USER_INFO_SUCCESS, payload: response.data });
     
    })
    .catch((error) => {
      dispatch({ type: USER_INFO_FAILURE, payload: error.message });
    })
}

/**getProfiles is for calling api of getprofiles of all user and dispatching values 
 * to profilereducer */
export const getProfiles = () => (dispatch, getState) => {
  const config = setConfig(getState)
  dispatch({ type: PROFILE_REQUEST });
  axios
    .get(`${baseURL}/profile/`, config)
    .then((response) => {
      dispatch({ type: PROFILE_SUCCESS, payload: response.data.results });

    })
    .catch((error) => {
      dispatch({ type: PROFILE_FAILURE, payload: error.message });
    })
}

/**follow is for calling follow api  */
export const follow = (id) => (dispatch, getState) => {
  const config = setConfig(getState)
  axios
    .get(`${baseURL}/follow/${id}/`, config, {
      headers: {
        'Authorization': Cookies.get('sessionid'),
        'X-CSRFToken': Cookies.get('csrftoken')
      },
    })
    .then((response) => {
      dispatch({ type: GET_FOLLOW_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: GET_FOLLOW_FAILURE, payload: error.message });
    });
};

/**getFollowers is for calling api of getfollowers for particular user  */
export const getFollowers = () => (dispatch, getState) => {
  const config = setConfig(getState)
  dispatch({ type: FOLLOWER_REQUEST });
  axios
    .get(`${baseURL}/followers/`, config)
    .then((response) => {
      dispatch({ type: FOLLOWER_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: FOLLOWER_FAILURE, payload: error.message });
    })
}

/**editPost is for calling edit post api and dispatching values to postreducer */
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
    })
  }
}

/**editProfile is for calling edit user profile of logged in user */
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

/**addComment is for calling add comment api and dispatching values to commentReducer */
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

/**editComment is for calling edit comment api and dispatching values to commentReducer */
export const editComment = (id, values) => {
  return (dispatch, getState) => {
    const config = setConfig(getState)
    axios.put(`${baseURL}/commentupdate/${id}/`, values, config).then((res) => {
      dispatch({
        type: EDIT_COMMENT,
        payload: res.data
      })

    })
  }
}

/**deleteComment is for calling delete comment api and dispatching values to commentReducer */
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

/**setConfig is for setting configuration such as authorization token from api and
 *  used it in other  api calling */
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