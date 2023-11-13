import React from "react";
import CardItem from "./CardItem";
import { Box, Grid } from "@mui/material";

const Cards = () => {
  // console.log(MonetizationOnIcon);
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CardItem content={"Sales"} icon={"sales"} />
        </Grid>
        <Grid item xs={3}>
          <CardItem content={"Orders"} icon={"orders"} />
        </Grid>
        <Grid item xs={3}>
          <CardItem content={"Revenue"} icon={"revenue"} />
        </Grid>
        <Grid item xs={3}>
          <CardItem content={"Customers"} icon={"customers"} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
