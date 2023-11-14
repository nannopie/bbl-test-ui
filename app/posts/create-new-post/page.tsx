"use client"

import { useRouter } from "next/navigation";
import { Post } from "../model/Post";
import { useEffect, useState } from "react";
import { User } from "@/app/users/model/User";
import { Header } from "@/app/share-component/header";
import { Box, Button, Container, CssBaseline, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip, Typography } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Textarea from '@mui/joy/Textarea';

const intitialPost = {
  userId: "",
  title: "",
  body: "",
} as unknown as Post;

const AddNewPost = () => {
  const router = useRouter();
  const [newPost, setNewPost] = useState<Post>(intitialPost);
  const [userSelect, setUserSelect] = useState<string>();
  const [userList, setUserList] = useState<User[]>([]);
  useEffect(() => {
    const urlUser = "http://localhost:5000/users/findAllUser";
    const fetchDataUser = async () => {
      try {
        const response = await fetch(urlUser);
        const json = await response.json();
        setUserList(json.user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDataUser();
  }, []);

  function postHandleChange(e: any) {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  const userSelectHandleChange = (event: SelectChangeEvent) => {
    setUserSelect(event.target.value as string);
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    try {
      e.preventDefault();
      const url = "http://localhost:5000/posts/createPost";
      const data = {
        "post": newPost,
      }
      const body = JSON.stringify(data);
      const response = await fetch(url, {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }),
        body: body
      });

      if (response.ok) {
        if (confirm("Saved! Do you want to redirect to List Page ?")) {
          router.push('/posts');
        }
        setNewPost(intitialPost);
        setUserSelect('');
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Header mode="post"></Header>
      <Box sx={{ display: 'grid', m: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={12}>
            <Grid item md={2} xs={4}>
              <Tooltip title="back to user list">
                <Button variant="outlined" href="/posts">
                  <ArrowBackIosIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item md={4} xs={8}>
              <h2><PostAddIcon />  &nbsp; Add new post</h2>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ display: 'grid', m: 2 }}>
        <form onSubmit={onSubmit}>
          <Grid container
            direction="row"
            justifyContent="space-around"
            alignItems="stretch"
            spacing={3}>
            <Grid item md={6} xs={12} p={1}>
              <Typography variant="body1" gutterBottom fontWeight={"bold"}>
                Title :
              </Typography>
              <TextField id="outlined-basic" fullWidth variant="outlined" size="small"
                name="title" value={newPost.title} onChange={postHandleChange} required />
            </Grid>

            <Grid item md={6} xs={12} p={1}>
              <Typography variant="body1" gutterBottom fontWeight={"bold"}>
                Select User :
              </Typography>

              <FormControl fullWidth>
                <Select
                  id="select_user_id"
                  name="userId"
                  value={userSelect}
                  onChange={userSelectHandleChange}
                  size="small"
                  required
                >
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

            <Grid item md={12} xs={12}>
              <Typography variant="body1" gutterBottom fontWeight={"bold"}>
                Body :
              </Typography>
              <Textarea minRows={4} name="body" value={newPost.body} onChange={postHandleChange} required />
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" color="success" type="submit"
                sx={{ float: 'right', position: 'fixed', bottom: 20, right: 20 }}>
                Post &nbsp; <AutoFixHighIcon />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

    </>
  )
}

export default AddNewPost