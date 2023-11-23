import React from "react";
import { CustomTabPanel } from "../../../Components/mui/MuiStyles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { UserC } from "../../auth/Context";

const PersonalDetails = ({ value }) => {
  const { username, role, userData } = UserC();
  console.log(userData);
  return (
    <CustomTabPanel value={value} index={0}>
      <FormControl>
        <Box
          sx={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: "10px",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gridColumn: "span 1",
              }}
            >
              <Stack direction="row" spacing={1}>
                <Chip
                  avatar={
                    <Avatar
                      sx={{
                        backgroundColor: "#E5E5E580",
                      }}
                    >
                      {username[0]?.toUpperCase()}
                    </Avatar>
                  }
                  label={role}
                  sx={{
                    background: "#C5F2C7",
                  }}
                />
              </Stack>
              <TextField
                id="firstName"
                name="firstName"
                label="first name"
                variant="outlined"
                sx={{ gridColumn: "span 1", marginBottom: "5px" }}
                size="small"
              />
              <TextField
                id="lastName"
                name="lastName"
                label="last name"
                variant="outlined"
                sx={{ gridColumn: "span 1", marginBottom: "5px" }}
                size="small"
              />
            </Box>
            <Box
              sx={{
                display: "grid",
                gap: "10px",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gridColumn: "span 1",
              }}
            >
              <TextField
                id="userName"
                name="userName"
                label="user name"
                variant="outlined"
                sx={{ gridColumn: "span 1", marginBottom: "5px" }}
                size="small"
              />
              <TextField
                id="email"
                name="email"
                label="email"
                type="email"
                variant="outlined"
                sx={{ gridColumn: "span 1", marginBottom: "5px" }}
                size="small"
              />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: "fixed",
            left: "95%",
            top: "95%",
            transform: "translate(-100% , -100%)",
          }}
        >
          <Button
            type="submit"
            className="submit-btn"
            style={{
              color: "var(--white-background)",
            }}
            variant="contained"
          >
            Submit <DoneIcon></DoneIcon>
          </Button>
        </Box>
      </FormControl>
    </CustomTabPanel>
  );
};

export default PersonalDetails;
