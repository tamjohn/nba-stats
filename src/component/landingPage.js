import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    return 'Helper text';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export default function UseFormControl() {
  const [year, setYear] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
      <div>
    <img src='https://teamworxteambuilding.com/wp-content/uploads/2018/08/nba-logo-72dpi.jpg'
    style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        top: '-50px'}}/>
        <div>
        <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
      </Button>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Year</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={year}
          label="Year"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>2020-2021</MenuItem>
          <MenuItem value={20}>2019-2020</MenuItem>
          <MenuItem value={30}>2018-2019</MenuItem>
          <MenuItem value={30}>2017-2018</MenuItem>
          <MenuItem value={30}>2016-2017</MenuItem>
        </Select>
      </FormControl>
        </div>
    <Box component="form" noValidate autoComplete="off">
      <FormControl sx={{ width: '25ch'}}>
        <OutlinedInput placeholder="Enter NBA player's first and last name" />
        <MyFormHelperText />
      </FormControl>
    </Box>
    </div>
  );
}
