import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React = require('react');

export default function PermissionControlParent(props) {
  const [isChecked, setChecked] = React.useState(!!props?.value?.checked);
  const [isIndeterminate, setIndeterminate] = React.useState(
    !!props?.value?.indeterminate
  );
  React.useEffect(() => {
    setIndeterminate(props?.indeterminate);
    setChecked(props?.checked);
  }, [props?.checked, props?.indeterminate]);
  return (
    <FormControlLabel
      label=""
      control={
        <Checkbox
          checked={isChecked}
          indeterminate={isIndeterminate}
          onChange={(event) => {
            setChecked(event?.target.checked);
            props?.handleChangeEventParentRow(
              event,
              props.column,
              props.category
            );
          }}
        />
      }
    />
  );
}
