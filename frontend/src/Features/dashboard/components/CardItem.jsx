import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function CardItem({ content, icon }) {
  const getIcon = () => {
    switch (icon) {
      case "sales":
        return <MonetizationOnIcon />;
      case "customers":
        return <PeopleIcon />;
      case "revenue":
        return <MonetizationOnIcon />;
      case "orders":
        return <ShoppingCartCheckoutIcon />;
      default:
        return null;
    }
  };
  return (
    <Card variant="" className="dashboard-card">
      <div className="card-content">
        <h4> {content}</h4>
        <p>Description of the card.</p>
      </div>
      <div className="card-icon"> {getIcon()}</div>
    </Card>
  );
}
