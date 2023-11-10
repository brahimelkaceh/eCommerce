import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
const Lists = ({ open }) => {
  return (
    <List>
      <NavLink to="/">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon
                sx={{
                  color: "#fff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </NavLink>
      <NavLink to="/orders">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon
                sx={{
                  color: "#fff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
      </NavLink>
      <NavLink to="/products">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon
                sx={{
                  color: "#fff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="products" />
          </ListItemButton>
        </ListItem>
      </NavLink>
      <NavLink to="/categories">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon
                sx={{
                  color: "#fff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>
      </NavLink>
      <NavLink to="/managers">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon
                sx={{
                  color: "#fff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Managers" />
          </ListItemButton>
        </ListItem>
      </NavLink>
      <NavLink to="/customers">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon
                sx={{
                  color: "#fff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </ListItem>
      </NavLink>
    </List>
  );
};

export default Lists;
