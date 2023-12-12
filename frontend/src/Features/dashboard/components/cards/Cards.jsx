import React from "react";
import CardItem from "./CardItem";
import { Box, Grid } from "@mui/material";
import { useCustomer } from "../../../customers/Context";
import { useData } from "../../../orders/Context";

const Cards = () => {
  // console.log(MonetizationOnIcon);
  const { custTotal } = useCustomer();
  const { orderTotal } = useData();
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CardItem content={`$${5500.99}`} icon={"revenue"} description={"total revenue"} />
        </Grid>
        <Grid item xs={3}>
          <CardItem content={273} icon={"sales"} description={"total products"} />
        </Grid>
        <Grid item xs={3}>
          <CardItem content={orderTotal} icon={"orders"} description={"total orders"}/>
        </Grid>
        <Grid item xs={3}>
          <CardItem content={custTotal} icon={"customers"} description={"total customers"}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
