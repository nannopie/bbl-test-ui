"use client"

import { Header } from "@/app/share-component/header";
import { Box, Button, Container, Grid, TextField, Tooltip, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from "react";
import { User } from "../model/User";
import { Address } from "../model/Address";
import { Company } from "../model/Company";
import { Geo } from "../model/Geo";
import { useRouter } from "next/navigation";

const intitialUser = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
} as User;

const intitialAddress = {
  street: "",
  suite: "",
  city: "",
  zipcode: "",
} as Address;

const intitialGeo = {
  lat: "",
  lng: "",
} as Geo;

const intitialCompany = {
  name: "",
  catchPhrase: "",
  bs: "",
} as Company;

const AddNewUser = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState<User>(intitialUser);
  const [newAddress, setAddress] = useState<Address>(intitialAddress);
  const [newGeo, setGeo] = useState<Geo>(intitialGeo);
  const [newCompany, setNewCompany] = useState<Company>(intitialCompany);

  function userHandleChange(e: any) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  function addressHandleChange(e: any) {
    setAddress({ ...newAddress, [e.target.name]: e.target.value });
  }

  function companyHandleChange(e: any) {
    setNewCompany({ ...newCompany, [e.target.name]: e.target.value });
  }

  function geoHandleChange(e: any) {
    setGeo({ ...newGeo, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    try {
      e.preventDefault();
      const url = "http://localhost:5000/users/createUser";
      const data = {
        "user": newUser,
        "address": newAddress,
        "geo": newGeo,
        "company": newCompany,
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
          router.push('/users');
        }
        setNewUser(intitialUser);
        setAddress(intitialAddress);
        setGeo(intitialGeo);
        setNewCompany(intitialCompany);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Header mode="user"></Header>
      <Box sx={{ display: 'grid', m: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={12}>
            <Grid item md={2} xs={4}>
              <Tooltip title="back to user list">
                <Button variant="outlined" href="/users">
                  <ArrowBackIosIcon />
                </Button>
              </Tooltip>
            </Grid>
            <Grid item md={4} xs={8}>
              <h2><PersonAddIcon />  &nbsp; Add new user</h2>
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
            {/* Personal Detail */}
            <Grid item md={4} xs={12}>
              <Grid item md={12} xs={12}>
                <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                  Personal Detail :
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Name" variant="outlined" size="small"
                  name="name" value={newUser.name} onChange={userHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Username" variant="outlined" size="small"
                  name="username" value={newUser.username} onChange={userHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Email" variant="outlined" size="small"
                  type="email" name="email" value={newUser.email} onChange={userHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Phone" variant="outlined" size="small"
                  name="phone" value={newUser.phone} onChange={userHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Website" variant="outlined" size="small"
                  name="website" value={newUser.website} onChange={userHandleChange} required />
              </Grid>
            </Grid>

            {/* Address */}
            <Grid item md={4} xs={12}>
              <Grid item md={12} xs={12}>
                <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                  Address :
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Street" variant="outlined" size="small"
                  name="street" value={newAddress.street} onChange={addressHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Suite" variant="outlined" size="small"
                  name="suite" value={newAddress.suite} onChange={addressHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="City" variant="outlined" size="small"
                  name="city" value={newAddress.city} onChange={addressHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Zipcode" variant="outlined" size="small"
                  name="zipcode" value={newAddress.zipcode} onChange={addressHandleChange} required />
              </Grid>

              {/* Geo */}
              <Grid item md={12} xs={12}>
                <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                  Geo :
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Latitude " variant="outlined" size="small"
                  name="lat" value={newGeo.lat} onChange={geoHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Longitude" variant="outlined" size="small"
                  name="lng" value={newGeo.lng} onChange={geoHandleChange} required />
              </Grid>
            </Grid>

            {/* Company */}
            <Grid item md={4} xs={12}>
              <Grid item md={12} xs={12}>
                <Typography variant="h5" gutterBottom fontWeight={"bold"}>
                  Company :
                </Typography>
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="Company Name" variant="outlined" size="small"
                  type="company_name" name="name" value={newCompany.name} onChange={companyHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="CatchPhrase" variant="outlined" size="small"
                  type="catchPhrase" name="catchPhrase" value={newCompany.catchPhrase} onChange={companyHandleChange} required />
              </Grid>

              <Grid item md={12} xs={12} p={1}>
                <TextField id="outlined-basic" fullWidth label="BS" variant="outlined" size="small"
                  type="bs" name="bs" value={newCompany.bs} onChange={companyHandleChange} required />
              </Grid>
            </Grid>

            <Grid item md={12} xs={12}>
              <Button variant="contained" color="success" type="submit"
                sx={{ float: 'right', position: 'fixed', bottom: 20, right: 20 }}>
                Save New User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default AddNewUser