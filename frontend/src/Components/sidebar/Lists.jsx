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
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";

import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { UserC } from "../../Features/auth/Context";
const Lists = ({ open }) => {
  const { userData } = UserC();
  return userData.role === "admin" ? (
    <List>
      <NavLink to="/">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon
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
              <ShoppingCartCheckoutIcon
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
              <InventoryIcon
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
              <CategoryIcon
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
              <ManageAccountsIcon
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
              <PeopleIcon
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
  ) : (
    <List>
      <NavLink to="/">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon
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
              <ShoppingCartCheckoutIcon
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
              <InventoryIcon
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
              <CategoryIcon
                sx={{
                  color: "#fff",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>
      </NavLink>
    </List>
  );
};

export default Lists;
