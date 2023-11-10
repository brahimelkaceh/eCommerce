import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export default function CardItem() {
  return (
    <Card
      variant=""
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <CardContent>
        <Typography level="title-md" textColor="inherit">
          Solid card
        </Typography>
        <Typography textColor="inherit">Description of the card.</Typography>
      </CardContent>
    </Card>
  );
}
