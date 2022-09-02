import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT
} from "../constants/actionTypes";
import * as api from "../api";




//Action Creators



export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) =>  async (dispatch) =>{
  try {
    dispatch({ type: START_LOADING });
    const {data: {data}} = await api.fetchPostsBySearch(searchQuery)
    console.log("data from getPostsBySearch actions",data)
    dispatch({ type: FETCH_BY_SEARCH, payload: {data} });
    console.log("AFTER DISPATCH FETCH_BY_SEARCH", data);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log("getPostBySearch Actions posts.js", error)
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    console.log(data)

    history.push(`/posts/${data._id}`)

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post ) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
        const {data} = await api.updatePost(id, post)
        dispatch({type: UPDATE, payload: data})
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id });
        console.log("Post Deleted")
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        console.log("trying to like post, id", id);
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log("Error from liking post", error);
      const { data } = await api.likePost(id);
      console.log(data);
        
    }
}

export const commentPost = (value, id) => async (dispatch)=> {
  try {

    const {data} = await api.comment(value,id)
    dispatch({type: COMMENT, payload: data })
    return data.comments

  } catch (error) {
    console.log(error)
  }
}