import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { CustomTabPanel, a11yProps } from "../../../Components/mui/MuiStyles";
import PersonalDetails from "./PersonalDetails";
import PassowrdManage from "./PassowrdManage";

export default function ProfileTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Personal details" {...a11yProps(0)} />
          <Tab label="Change password" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <PersonalDetails value={value} />
      <PassowrdManage value={value} />
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
