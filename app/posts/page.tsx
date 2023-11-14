/* eslint-disable @next/next/no-async-client-component */
"use client"
import React from "react";
import { Header } from "../share-component/header";
import { useEffect, useState } from "react";
import { Post } from "./model/Post";
import { User } from "../users/model/User";
import {
  Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, 
  OutlinedInput, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PostAddIcon from '@mui/icons-material/PostAdd';

const PostPage = () => {
  const [search, setSearch] = useState<string>('');
  const [postList, setPostList] = useState<Post[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    const url = "http://localhost:5000/posts/findAllPost";
    const urlUser = "http://localhost:5000/users/findAllUser";

    const fetchDataPost = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPostList(json.post);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchDataUser = async () => {
      try {
        const response = await fetch(urlUser);
        const json = await response.json();
        setUserList(json.user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataPost();
    fetchDataUser();
  }, []);

  async function findByUser() {
    let url;
    if (search) {
      url = "http://localhost:5000/posts/getPostByUserId/" + search;
    } else {
      url = "http://localhost:5000/posts/findAllPost";
    }

    try {
      const response = await fetch(url);
      const json = await response.json();
      setPostList(json.post);
    } catch (error) {
      console.log("error", error);
    }
  }

  function getUserName(userId: number) {
    const find = userList.find(i => i.id == userId);
    if (find) return find.name;
    else return "";
  }


  const userSelectHandleChange = (event: SelectChangeEvent) => {
    setSearch(event.target.value as string);
  };

  return (
    <>
      <Header mode="post"></Header>
      <Box sx={{ display: 'grid', m: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select_user">Select User</InputLabel>
                <Select
                  labelId="select_user"
                  id="select_user_id"
                  value={search}
                  onChange={userSelectHandleChange}
                  label="Select User"
                  size="small"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {userList.map((user) => (
                    <MenuItem
                      key={user.id}
                      value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={2} xs={12}>
              <Button variant="contained" endIcon={<SearchIcon />} onClick={findByUser}>
                Search
              </Button>
            </Grid>
            <Grid item md={3} xs={12}>
              <Button variant="contained" endIcon={<PostAddIcon />} color="success" href="/posts/create-new-post">
                Create New Post
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ display: 'grid', m: 2 }}>
        <Container maxWidth="xl">
          <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell >Title</TableCell>
                  <TableCell >Body</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postList?.map((row) => (
                  <Row key={row.id} row={row} findByUser={findByUser} userName={getUserName(row.userId)} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  )
}

interface Props {
  row: Post
  userName: string;
  findByUser: Function
}

function Row(props: Props) {
  const { row } = props;
  const { userName } = props;
  async function deletePost(post: Post) {
    if (confirm("confirm delete post : " + post.title + " ?")) {
      const url = "http://localhost:5000/posts/deletePostById/" + post.id;
      try {
        const response = await fetch(url, { method: 'DELETE' });
        if (response.ok) {
          alert("Delete success!");
          props.findByUser();
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell >{row.title}</TableCell>
        <TableCell >{row.body}</TableCell>
        <TableCell >{userName}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="error" size="small" onClick={(item) => deletePost(row)}>
            <DeleteForeverIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default PostPage