import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ChildPermissionControl from './permission-child-control';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PermissionControlParent from './permission-parent-control';

export default function PermissionGrid(props) {
  const borderStyle = '1px solid gray';

  const permissionTitleCellStyle = {
    borderRight: borderStyle,
  };
  const gridStyle = { border: borderStyle };
  const headerCellStyleWithWidth = {
    borderRight: borderStyle,
    borderBottom: borderStyle,
    height: '55px',
  };
  const cellStyle = {
    paddingTop: '4px',
  };
  const gricColStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '1em',
  };
  const gricCatGroupColStyle = {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    borderRight: borderStyle,
    borderBottom: borderStyle,
  };

  const [expendedMap, setExpensionMap] = React.useState({
    VIEW: false,
    ADD: false,
    DELETE: false,
    ...props.expansionConfig,
  });

  const [categories] = React.useState(
    Object.keys(props.permissionMatrix[0].permissions)
  );
  const [permissionMatrix, setPermissionMatrix] = React.useState(
    props.permissionMatrix
  );
  // const headerPermission = props.permissionMatrix.reduce((cum, item) => {
  //   cum[item.roleKey] = { checked: true, indeterminate: false };
  //   return cum;
  // }, {});

  const [headerPermissionMap, setHeaderPermissionMap] = React.useState(
    props.headerPermissionMap
  );

  // const calcParentCheckBoxCheckedStatus = (propMat?: any) => {
  //   (propMat ?? permissionMatrix).forEach((col) => {
  //     categories.forEach((cat: string) => {
  //       const colPermission = col.permissions[cat];
  //       const unchecked = colPermission.some((rowVal) => rowVal.value == false);
  //       const checked = colPermission.some((rowVal) => rowVal.value == true);
  //       const cellValue = headerPermissionMap[cat][col.roleKey];
  //       if (
  //         cellValue.checked != !unchecked ||
  //         cellValue.indeterminate != (checked && unchecked)
  //       ) {
  //         headerPermissionMap[cat][col.roleKey] = {
  //           checked: !unchecked,
  //           indeterminate: checked && unchecked,
  //         };
  //       }
  //     });
  //   });
  //   setHeaderPermissionMap(JSON.parse(JSON.stringify(headerPermissionMap)));
  // };

  const handleChangeEventChildRow = (colValue: any, currentValue) => {
    colValue.value = currentValue?.target.checked;
    props?.handleChange(permissionMatrix);
    // calcParentCheckBoxCheckedStatus();
  };
  const handleChangeEventParentRow = (
    event: any,
    column: string,
    category: string
  ) => {
    const col = permissionMatrix.find((item) => item.roleKey === column)
      ?.permissions[category];
    col.forEach((item) => {
      item.value = event?.target.checked;
    });
    // calcParentCheckBoxCheckedStatus();
    props?.handleChange(permissionMatrix);
  };

  const gridTitleColSpan = 3;
  const GRID_COL_SIZE = 12;
  const [colSizeGrid, setColSizeGrid] = React.useState(
    GRID_COL_SIZE / (props.permissionMatrix.length ?? 1)
  );
  const [gridWidth, setGridWidth] = React.useState(
    400 + props.permissionMatrix.length * 230
  );
  const [gridWidthDCol, setGridWidthDCol] = React.useState(
    props.permissionMatrix.length * 250 + 'px'
  );
  React.useEffect(() => {
    setPermissionMatrix(props.permissionMatrix);
    // calcParentCheckBoxCheckedStatus(props.permissionMatrix);
    setColSizeGrid(GRID_COL_SIZE / (props.permissionMatrix.length ?? 1));
    setGridWidthDCol(props.permissionMatrix.length * 250 + 'px');
    // setGridWidth(400 + props.permissionMatrix.length * 230);
    // props?.handleChange(props.permissionMatrix);
    // console.log(gridWidth, 'gridWidth', props.headerPermissionMap);
    if (props.headerPermissionMap) {
      setHeaderPermissionMap(
        JSON.parse(JSON.stringify(props.headerPermissionMap))
      );
    }
  }, [props.permissionMatrix, props.headerPermissionMap]);

  // React.useEffect(() => {
  //   console.log(props.expansionConfig, expendedMap, 'expendedMap');
  //   if (JSON.stringify(props.expansionConfig) != JSON.stringify(expendedMap)) {
  //     setExpensionMap({
  //       VIEW: false,
  //       ADD: false,
  //       DELETE: false,
  //       ...props.expansionConfig,
  //     });
  //   }
  // }, [props.expansionConfig]);

  const setOpen = (prop: string, open: boolean) => {
    setExpensionMap({ ...expendedMap, [prop]: open });
  };
  // const gridWidthDCol = '2000px';
  const handleScroll = (e) => {
    const eles = document.querySelectorAll('.dcols') ?? [];
    Array.from(eles).forEach((ele) => {
      ele.scrollLeft = e.target.scrollLeft;
    });
  };
  return (
    <Box
      sx={{
        width: '100%',
        padding: '0.5em 0 0.5em 0.5em',
      }}
    >
      <Grid container spacing={2} style={gridStyle}>
        <Grid item xs={gridTitleColSpan} style={headerCellStyleWithWidth}>
          <b>Permission</b>
        </Grid>
        <Grid item xs={9} style={{ overflow: 'hidden' }} className="dcols">
          <Grid container spacing={2} style={{ width: gridWidthDCol }}>
            {permissionMatrix.map((item) => (
              <Grid item xs={colSizeGrid} style={headerCellStyleWithWidth}>
                <b>{item.role}</b>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {categories.map((category, index) => {
          return (
            <React.Fragment>
              <React.Fragment>
                <Grid
                  item
                  xs={gridTitleColSpan}
                  style={{
                    ...cellStyle,
                    ...gricColStyle,
                    ...gricCatGroupColStyle,
                    ...(index !== 0 ? { borderTop: borderStyle } : {}),
                  }}
                  onClick={() => setOpen(category, !expendedMap[category])}
                >
                  <span style={{ flex: '1 1 auto' }}>
                    {category.toLowerCase() + ' Access'}
                  </span>
                  <IconButton aria-label="expand row" size="small">
                    {expendedMap[category] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </Grid>
                <Grid
                  item
                  xs={9}
                  style={{ overflow: 'hidden' }}
                  className="dcols"
                >
                  <Grid container spacing={2} style={{ width: gridWidthDCol }}>
                    {permissionMatrix.map((_matCol, colIndex) => {
                      const data = permissionMatrix[colIndex];
                      return (
                        <React.Fragment>
                          <Grid
                            item
                            xs={colSizeGrid}
                            style={{ ...cellStyle, ...gricColStyle }}
                          >
                            {headerPermissionMap ? (
                              <PermissionControlParent
                                handleChangeEventParentRow={
                                  handleChangeEventParentRow
                                }
                                category={category}
                                column={data.roleKey}
                                checked={
                                  headerPermissionMap[category][data.roleKey]
                                    .checked
                                }
                                indeterminate={
                                  headerPermissionMap[category][data.roleKey]
                                    .indeterminate
                                }
                              />
                            ) : (
                              <React.Fragment />
                            )}
                          </Grid>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                </Grid>
              </React.Fragment>
              <React.Fragment>
                {expendedMap[category] &&
                  permissionMatrix?.length &&
                  permissionMatrix[0]?.permissions[category].map(
                    (matRow, rowIndex) => {
                      return (
                        <React.Fragment>
                          <Grid
                            item
                            xs={gridTitleColSpan}
                            style={{
                              ...permissionTitleCellStyle,
                              ...gricColStyle,
                            }}
                          >
                            {matRow.action}
                          </Grid>
                          <Grid
                            item
                            xs={9}
                            style={{ overflow: 'hidden' }}
                            className="dcols"
                          >
                            <Grid
                              container
                              spacing={2}
                              style={{
                                width: gridWidthDCol,
                                overflow: 'auto',
                              }}
                            >
                              {permissionMatrix.map((matCol, colIndex) => {
                                const data =
                                  permissionMatrix[colIndex]?.permissions[
                                    category
                                  ][rowIndex];
                                return (
                                  <React.Fragment>
                                    <Grid
                                      item
                                      xs={colSizeGrid}
                                      style={{
                                        ...cellStyle,
                                        ...gricColStyle,
                                      }}
                                    >
                                      {headerPermissionMap ? (
                                        <ChildPermissionControl
                                          handleChangeEventChildRow={
                                            handleChangeEventChildRow
                                          }
                                          permission={data}
                                          checked={data.value}
                                          headerChecked={
                                            headerPermissionMap[category][
                                              matCol.roleKey
                                            ].checked
                                          }
                                          headerIndeterminate={
                                            headerPermissionMap[category][
                                              matCol.roleKey
                                            ].indeterminate
                                          }
                                        />
                                      ) : (
                                        <React.Fragment />
                                      )}
                                    </Grid>
                                  </React.Fragment>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </React.Fragment>
                      );
                    }
                  )}
              </React.Fragment>
            </React.Fragment>
          );
        })}
        <Grid
          item
          xs={gridTitleColSpan}
          style={{
            overflowX: 'hidden',
            overflowY: 'hidden',
            paddingTop: '1px',
          }}
        ></Grid>
        <Grid
          item
          xs={9}
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingTop: '1px',
          }}
          onScroll={handleScroll}
        >
          <Box sx={{ width: gridWidthDCol }}></Box>
        </Grid>
      </Grid>
    </Box>
  );
}
