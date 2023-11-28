import React from "react";
import { CustomTabPanel } from "../../../Components/mui/MuiStyles";

const PassowrdManage = ({ value }) => {
  return (
    <CustomTabPanel value={value} index={1}>
      Password Change
    </CustomTabPanel>
  );
};

export default PassowrdManage;
