import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Stack, TextField } from "@mui/material";
import LineChart from "./LineChart";
import { DateRangePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const UserStatistic = (props) => {
  const [value, setValue] = React.useState([null, null]);
  const [showStatistic, setShowStatistic] = React.useState(true);

  const record = props.record;
  if (!record) return null;

  console.log(record);

  return (
    <>
      <Box
        m="auto"
        sx={{
          width: "100%",
          maxWidth: 460,
          marginBottom: 2,
          marginTop: 2,
          bgcolor: "background.paper",
        }}
      >
        <Stack component="form" direction="row" noValidate spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
          <Button variant="contained"> Draw</Button>
        </Stack>
      </Box>
      {showStatistic && <LineChart />}
    </>
  );
};

export default UserStatistic;
