/* eslint-disable @next/next/no-async-client-component */
"use client"
import {
  Box, Button, Collapse, Container, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Header } from "../share-component/header";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "./model/User";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const UserPage = () => {
  const [search, setSearch] = useState<string>('');
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const url = "http://localhost:5000/users/findAllUser";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setUserList(json.user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  async function findUser() {
    let url;
    if (search && search.length > 0) {
      url = "http://localhost:5000/users/findUserByName/" + search;
    } else {
      url = "http://localhost:5000/users/findAllUser";
    }

    try {
      const response = await fetch(url);
      const json = await response.json();
      setUserList(json.user);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <Header mode="user"></Header>
      <Box sx={{ display: 'grid', m: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic" fullWidth label="Search User By Name" variant="outlined" size="small"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </Grid>
            <Grid item md={2} xs={12}>
              <Button variant="contained" endIcon={<SearchIcon />} onClick={findUser}>
                Search
              </Button>
            </Grid>
            <Grid item md={2} xs={12}>
              <Button variant="contained" endIcon={<PersonAddAlt1Icon />} color="success" href="/users/add-new-user">
                Add New User
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ display: 'grid', m: 2 }}>
        <Container maxWidth="xl">
          <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
            <Table stickyHeader aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>id</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell >Username</TableCell>
                  <TableCell >Email</TableCell>
                  <TableCell >Phone</TableCell>
                  <TableCell >Website</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList?.map((row) => (
                  <Row key={row.name} row={row} findUser={findUser} />
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
  row: User
  findUser: Function
}

function Row(props: Props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  async function deleteUser(user: User) {
    if (confirm("confirm delete user : " + user.name + " ?")) {
      const url = "http://localhost:5000/users/deleteUserById/" + user.id;
      try {
        const response = await fetch(url, { method: 'DELETE' });
        if (response.ok) {
          console.log("is ok delete");
          alert("Delete success!");
          props.findUser();
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell >{row.name}</TableCell>
        <TableCell >{row.username}</TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell >{row.phone}</TableCell>
        <TableCell >{row.website}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="error" size="small" onClick={(item) => deleteUser(row)}>
            <DeleteForeverIcon />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Address
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Street</TableCell>
                    <TableCell>Suite</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Zipcode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      {row.address?.street}
                    </TableCell>
                    <TableCell>{row.address?.suite}</TableCell>
                    <TableCell >{row.address?.city}</TableCell>
                    <TableCell >{row.address?.zipcode}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Company
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>CatchPhrase</TableCell>
                    <TableCell >BS</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow >
                    <TableCell component="th" scope="row">
                      {row.company?.name}
                    </TableCell>
                    <TableCell>{row.company?.catchPhrase}</TableCell>
                    <TableCell >{row.company?.bs}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserPage