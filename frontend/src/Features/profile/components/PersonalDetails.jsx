import React, { useEffect, useState } from "react";
import {
  CustomTabPanel,
  VisuallyHiddenInput,
} from "../../../Components/mui/MuiStyles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { UserC } from "../../auth/Context";
import { useFormik } from "formik";
import initialValues, { validationSchema } from "./InitialValues";
import { editUser } from "../../managers/service";

const PersonalDetails = ({ value }) => {
  const { userData } = UserC();
  const [updatedImg, setUpdatedImg] = useState("");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(userData?._id, values);
      // return;
      editUser(userData?._id, values);
    },
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      userName: userData?.userName,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
    });
  }, [userData]);
  return (
    <CustomTabPanel value={value} index={0}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        style={{
          width: "100%",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "250px",
              alignItems: "start",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: "10px",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }}
            >
              <Box
                sx={{
                  gridColumn: "span 1",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ gridColumn: "span 2", marginBottom: "5px" }}
                >
                  <Chip
                    avatar={
                      <Avatar
                        sx={{
                          backgroundColor: "#E5E5E580",
                        }}
                      >
                        {/* {userData?.userName[0]?.toUpperCase()} */}
                      </Avatar>
                    }
                    label={userData?.role}
                    sx={{
                      background: "#C5F2C7",
                    }}
                  />
                </Stack>
              </Box>
              <TextField
                id="firstName"
                name="firstName"
                label="first name"
                variant="outlined"
                data-shrink={formik.values.userName ? true : false}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                sx={{ gridColumn: "span 2", marginBottom: "5px" }}
                size="small"
              />
              <TextField
                id="lastName"
                name="lastName"
                label="last name"
                variant="outlined"
                data-shrink={formik.values.userName ? true : false}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                sx={{ gridColumn: "span 2", marginBottom: "5px" }}
                size="small"
              />
              <TextField
                id="userName"
                name="userName"
                label="user name"
                variant="outlined"
                data-shrink={formik.values.userName ? true : false}
                value={formik.values.userName}
                onChange={formik.handleChange}
                sx={{ gridColumn: "span 2", marginBottom: "5px" }}
                size="small"
              />
              <TextField
                id="email"
                name="email"
                label="email"
                type="email"
                disabled
                value={formik.values.email}
                variant="outlined"
                sx={{ gridColumn: "span 1", marginBottom: "5px" }}
                size="small"
              />
              <Box
                sx={{
                  display: "grid",
                  gap: "10px",
                  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                  gridColumn: "span 2",
                }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  width: "150px",
                  height: "150px",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                  }}
                  src={
                    formik?.values?.images
                      ? URL?.createObjectURL(formik?.values?.images)
                      : userData?.images && userData?.images[0]
                  }
                  alt={userData?.userName}
                  srcset=""
                />
              </Box>

              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Update Image
                <VisuallyHiddenInput
                  type="file"
                  name="images"
                  onChange={(e) => {
                    // ();
                    formik.setFieldValue("images", e.target.files[0]); // Set the image file directly
                    // setUpdatedImg(formik.values?.images?.name);
                  }}
                />
              </Button>
              <Typography className="profile-username">
                {userData?.firstName} {userData?.lastName}
              </Typography>
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
      </form>
    </CustomTabPanel>
  );
};

export default PersonalDetails;
