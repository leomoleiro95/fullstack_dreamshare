
import React from "react";
import Post from "./Post/Post"
import useStyles from "./styles";
import {useSelector} from 'react-redux'
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";


const Posts = ({setCurrentId }) => {
  const {posts, isLoading} = useSelector((state) => state.posts);
  const classes = useStyles();
  //console.log("Posts from Posts.js",posts);

  //if(!posts?.length && !isLoading) return "No Posts"

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
          <Post post={post} key={post.id} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
