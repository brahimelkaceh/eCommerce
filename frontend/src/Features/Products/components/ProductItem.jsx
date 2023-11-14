import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function ProductItem({ product }) {
  const cardStyle = {
    maxWidth: 345,
    marginBottom: "16px",
  };

  const mediaStyle = {
    height: 200,
  };

  const productNameStyle = {
    textDecoration: "none",
    color: "primary",
    "&:hover": {
      textDecoration: "underline",
    },
  };

  return (
    <Card style={cardStyle}>
      {/* <CardActionArea component={Link} to={`/products/${product._id}`}> */}
      <CardMedia
        style={mediaStyle}
        image={product.image}
        title={product.productName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <Link to={`/products/${product._id}`} style={productNameStyle}>
            {product.productName}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.shortDescription}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.longDescription}
        </Typography>
        <Typography variant="h6" component="p">
          Price: $ {product.price}
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}

export default ProductItem;
