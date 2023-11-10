import React from "react";
import Grid from "@mui/material/Grid";
import { Item } from "../../Components/mui/MuiStyles";
import CardItem from "./components/cards/CardItem";

const Container = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {/* <Item>card 1 </Item> */}
        <CardItem />
      </Grid>
      <Grid item xs={4}>
        <CardItem />
      </Grid>
      <Grid item xs={4}>
        <CardItem />
      </Grid>
    </Grid>
  );
};

export default Container;
