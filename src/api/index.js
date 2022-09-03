import axios from 'axios'

const API = axios.create({
  baseURL: "https://fulldreamshare.herokuapp.com/",
});

//const url = 'http://localhost:5000/fullstack_dreamshare/posts' https://fulldreamshare.herokuapp.com/

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPost = (id) => API.get(`/fullstack_dreamshare/posts/${id}`);
export const fetchPosts = (page) =>
  API.get(`/fullstack_dreamshare/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/fullstack_dreamshare/posts/search?searchQuery=${
      searchQuery.search || "none"
    }&tags=${searchQuery.tags || "none"}`
  );
export const createPost = (newPost) =>
  API.post("/fullstack_dreamshare/posts", newPost);
export const likePost = (id) =>
  API.patch(`/fullstack_dreamshare/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/fullstack_dreamshare/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) =>
  API.patch(`/fullstack_dreamshare/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/fullstack_dreamshare/posts/${id}`);


export const signIn = (formData) =>
  API.post("/fullstack_dreamshare/user/signin", formData);
export const signUp = (formData) =>
  API.post("/fullstack_dreamshare/user/signup", formData);