import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
// import { PieChart } from "@mui/icons-material";
// import ProgressCircle from "./ProgressCircle";

import { PieChart } from "@mui/x-charts/PieChart";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    { id: 0, value: 20, label: "series A" },
    { id: 1, value: 20, label: "series B" },
  ];
  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        {/* <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box> */}
        {/* <Box> */}
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },
            },
          ]}
          height={120}
          width={"180"}
        />
        {/* </Box> */}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
