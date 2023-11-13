import React from "react";
import CardItem from "./CardItem";
import { Box, Grid } from "@mui/material";

const Cards = () => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardItem content={"Customers"} />
        </Grid>
        <Grid item xs={4}>
          <CardItem content={"Orders"} />
        </Grid>
        <Grid item xs={4}>
          <CardItem content={"revenue"} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
