import React, { useState } from "react";
import {Container,Grow,Grid,Paper,AppBar,Button,TextField,} from "@mui/material";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import ChipInput from "material-ui-chip-input";

import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import { useHistory, useLocation } from "react-router-dom";
//import Chip from "@mui/material/Chip";


//DOUBLE CHECK classes.name for variables
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const classes = {
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "10px",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    flexDirection: "column-reverse",
  },
};

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  

 // console.log("Search Query from Home.js", searchQuery)

  const searchPost = () => {
    if(search.trim() || tags) {
      dispatch(getPostsBySearch({search, tags: tags.join(',')}))
      if(search==='none' && tags === 'none'){history.push("/fullstack_dreamshare/posts");}
       history.push(
         `/fullstack_dreamshare/posts/search?searchQuery=${
           search || "none"
         }&tags=${tags.join(",")}`
       );
    } else {
      history.push("/fullstack_dreamshare");
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl" spacing={3}>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9} >
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} elevation={3} >
            <AppBar position="static" color="inherit">
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Dreams"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              spacing={2}
            />
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
