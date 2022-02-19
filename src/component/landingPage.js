import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

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

export default function UseFormControl(){
  return (
    <div>
    <img src='https://teamworxteambuilding.com/wp-content/uploads/2018/08/nba-logo-72dpi.jpg'
    style={{
        height: '80%',
        width: '80%',
        position: 'relative',
        top: '-5px'}}/>
    <Box component="form" noValidate autoComplete="off" >
      <FormControl sx={{ width: '35ch'}}>
        <OutlinedInput placeholder="Enter NBA player's first and last name" />
      </FormControl>
    </Box>
    </div>
  );
}
