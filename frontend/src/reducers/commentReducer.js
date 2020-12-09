/**commentReducer consists ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT */

import {
  ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, SET_COMMENT_LIKE,
  UPDATE_COMMENT_LIKE,
  DELETE_COMMENT_LIKE,
} from "../actions/action_types";

export default function (state = [], action) {

  let comments
  let commentIndex
  switch (action.type) {


    case ADD_COMMENT:
      return [
        action.payload,
        ...state,
      ]

    case DELETE_COMMENT:
      comments = [...state]
      commentIndex = comments.findIndex((comment) => comment.id === action.payload.commentId)
      comments.splice(commentIndex, 1)
      return comments

    case EDIT_COMMENT:
      comments = [...state]
      commentIndex = comments.findIndex((comment) => comment.id === action.payload.id)
      comments.splice(commentIndex, 1, action.payload)
      return comments

    case SET_COMMENT_LIKE:
      comments = [...state]
      commentIndex = comments.findIndex((comment) => comment.id === action.payload.id)
      comments.splice(commentIndex, 1, action.payload)

      return comments


    case UPDATE_COMMENT_LIKE:
      comments = [...state]
      commentIndex = comments.findIndex((comment) => comment.id === action.payload.id)
      comments.splice(commentIndex, 1, action.payload)

      return comments
    case DELETE_COMMENT_LIKE:
      comments = [...state]
      commentIndex = comments.findIndex((comment) => comment.id === action.payload.id)
      comments.splice(commentIndex, 1, action.payload)
      return comments

    default:
      return [...state]
  }
}
