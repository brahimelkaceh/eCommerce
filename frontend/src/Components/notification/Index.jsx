import {
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const Index = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [websocket, setWebsocket] = useState(null);
  const [notif, setNotif] = useState([]);
  useEffect(() => {
    const storedNotif = localStorage.getItem("notif");
    if (storedNotif) {
      setNotif(JSON.parse(storedNotif));
    }
  }, []);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/");

    ws.onopen = (e) => {
      console.log("connnect to sockets");
    };

    ws.onmessage = (e) => {
      const newdata = JSON.parse(e.data);
      setNotif((prev) => [...prev, newdata]);

      console.log("message received from socket", JSON.parse(e.data));
    };
    ws.onclose = () => {
      console.log("close socket");
    };
  }, []);
  useEffect(() => {
    // Store 'notif' in local storage whenever it changes
    localStorage.setItem("notif", JSON.stringify(notif));
  }, [notif]);
  return (
    <div>
      <IconButton color="inherit">
        <Badge
          badgeContent={notif.length > 0 ? notif.length : "0"}
          color="secondary"
          onClick={handleMenu}
        >
          <NotificationsActiveIcon />
        </Badge>
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {notif.map((data, i) => {
            const dateObject = new Date(data.data?.createdAt);
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            };
            const formatted = dateObject.toLocaleDateString(undefined, options);
            return (
              <Link to="/orders" key={i}>
                <ListItem
                  onClick={handleClose}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: " 10px ",
                  }}
                >
                  <ListItemAvatar direction="row" spacing={2}>
                    <Avatar
                      {...stringAvatar(
                        `${data?.data?.customerID?.firstName} ${data?.data?.customerID?.lastName}`
                      )}
                    ></Avatar>
                  </ListItemAvatar>
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Order <b>#{data?.data?._id.slice(-6).toUpperCase()}</b>{" "}
                      has been placed. Total amount:{" "}
                      <b>${data.data.cartTotalPrice}</b>
                    </Typography>

                    <Chip
                      label={formatted}
                      size="small"
                      style={{
                        backgroundColor: "transparent",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        color: "#0F56B3",
                      }}
                    ></Chip>
                  </Box>
                </ListItem>
                <Divider />
              </Link>
            );
          })}
        </List>
      </Menu>
    </div>
  );
};

export default Index;
