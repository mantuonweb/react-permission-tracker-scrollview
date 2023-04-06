import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React = require('react');
export default function ChildPermissionControl(props) {
  const [isChecked, setChecked] = React.useState(!!props?.checked);
  React.useEffect(() => {
    if (!props.headerIndeterminate) {
      setChecked(props.checked);
    }
  }, [props.headerIndeterminate, props.headerChecked, props.checked]);
  return (
    <FormControlLabel
      label=""
      control={
        <Checkbox
          checked={isChecked}
          onChange={(event) => {
            setChecked(event?.target.checked);
            props?.handleChangeEventChildRow(props?.permission, event);
          }}
        />
      }
    />
  );
}
