// ** MUI Imports
import { Box, Button, Popover } from "@mui/material";
import { DateRangePicker } from "react-date-range";

const RangeDatePicker = (props) => {
  const { anchorEl, handleClose, handleOk, onChange, dateState, name } = props;

  return (
    <>
      <Popover
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <DateRangePicker
          onChange={(item) => onChange(item, name)}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={dateState}
          direction="horizontal"
        />
        <Box textAlign="end" sx={{ padding: "0px 20px 10px 20px" }}>
          <Button
            size="small"
            variant="outlined"
            sx={{ mr: 2 }}
            color="secondary"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => {
              handleOk();
            }}
          >
            Apply
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default RangeDatePicker;
