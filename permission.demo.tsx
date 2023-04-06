import { Box, Button } from '@mui/material';
import React = require('react');
import PermissionGrid from './permission-matrix/permission-grid';

import { NEWDATA } from './permission-matrix/data-new';
export default function PermissionMatrix() {
  const calcParentCheckBoxCheckedStatus = (propMat?: any) => {
    if (!propMat) {
      return;
    }
    console.log(propMat, 'propMat', propMat[0].permissions);
    const categories = Object.keys(propMat[0].permissions);
    const headerPermission = propMat.reduce((cum, item) => {
      cum[item.roleKey] = { checked: true, indeterminate: false };
      return cum;
    }, {});

    const headerPermissionMapInner = Object.keys(propMat[0].permissions).reduce(
      (cum, item) => {
        cum[item] = JSON.parse(JSON.stringify(headerPermission));
        return cum;
      },
      {}
    );
    (propMat ?? []).forEach((col) => {
      categories.forEach((cat: string) => {
        const colPermission = col.permissions[cat];
        const unchecked = colPermission.some((rowVal) => rowVal.value == false);
        const checked = colPermission.some((rowVal) => rowVal.value == true);
        const cellValue = headerPermissionMapInner[cat][col.roleKey];
        if (
          cellValue.checked != !unchecked ||
          cellValue.indeterminate != (checked && unchecked)
        ) {
          headerPermissionMapInner[cat][col.roleKey] = {
            checked: !unchecked,
            indeterminate: checked && unchecked,
          };
        }
      });
    });
    if (
      JSON.stringify(headerPermissionMapInner) !==
      JSON.stringify(headerPermissionMap)
    ) {
      setHeaderPermissionMap(
        JSON.parse(JSON.stringify(headerPermissionMapInner))
      );
    }
  };
  const [permissionMatrix, setPermissionMatrix] = React.useState(
    JSON.parse(JSON.stringify(NEWDATA))
  );

  const headerPermission = permissionMatrix.reduce((cum, item) => {
    cum[item.roleKey] = { checked: true, indeterminate: false };
    return cum;
  }, {});
  const [headerPermissionMap, setHeaderPermissionMap] = React.useState(
    Object.keys(permissionMatrix[0].permissions).reduce((cum, item) => {
      cum[item] = JSON.parse(JSON.stringify(headerPermission));
      return cum;
    }, {})
  );
  let currentValue = JSON.parse(JSON.stringify(NEWDATA));
  // calcParentCheckBoxCheckedStatus(currentValue);
  const handleChange = (matrix) => {
    currentValue = matrix;
    calcParentCheckBoxCheckedStatus(currentValue);
    console.log(currentValue, 'changed');
  };
  const expansionConfig = {
    VIEW: true,
    ADD: false,
    DELETE: false,
    EDIT: false,
  };

  return (
    <React.Fragment>
      <div style={{ margin: '4em' }}>
        <Box
          sx={{ width: '100%' }}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            columnGap: '1em',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              currentValue = JSON.parse(JSON.stringify(NEWDATA));
              calcParentCheckBoxCheckedStatus(currentValue);
              console.log(currentValue, 'currentValue');
              setPermissionMatrix(currentValue);
            }}
          >
            Reset
          </Button>
          <Button variant="contained" color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              console.table(currentValue);
              calcParentCheckBoxCheckedStatus(currentValue);
              alert('Please check console');
            }}
          >
            Submit
          </Button>
        </Box>
        <Box sx={{ width: '100%' }} style={{ marginTop: '30px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <PermissionGrid
              permissionMatrix={permissionMatrix}
              handleChange={handleChange}
              expansionConfig={expansionConfig}
              headerPermissionMap={headerPermissionMap}
            />
          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
}
