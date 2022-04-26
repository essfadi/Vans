import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSchedules, reset } from "../../features/schedules/schedulesSlice";
import { toast } from "react-toastify";
import moment from "moment";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  TableBody,
  TableCell,
  TableSortLabel,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import {
  MyTableContainer,
  MyPaper,
  MyBigTable,
  MyTablePagination,
  MyTableHeadCell,
  MyToolbar,
  MyTitle
} from "./Table";
import { AiFillDelete, AiFillFilter } from "react-icons/ai";
import { visuallyHidden } from "@mui/utils";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "startStation",
    numeric: false,
    disablePadding: false,
    label: "Start Station",
  },
  {
    id: "endStation",
    numeric: false,
    disablePadding: false,
    label: "End Station",
  },
  {
    label: "Other Stations",
    id: "otherStations",
    numeric: false,
    disablePadding: false,
  },
  {
    id: "seats",
    numeric: true,
    disablePadding: false,
    label: "Available Seats",
  },
  {
    id: "driver",
    numeric: false,
    disablePadding: false,
    label: "Driver",
  },
  {
    id: "startDateTime",
    numeric: false,
    disablePadding: false,
    label: "Start Date Time",
  },
  {
    id: "endDateTime",
    numeric: false,
    disablePadding: false,
    label: "End Date Time",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <MyTableHeadCell padding="checkbox"></MyTableHeadCell>
        {headCells.map((headCell) => (
          <MyTableHeadCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </MyTableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, onDelete } = props;

  return (
    <MyToolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <MyTitle
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Van Schedule
        </MyTitle>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={onDelete}
          >
            <AiFillDelete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <AiFillFilter />
          </IconButton>
        </Tooltip>
      )}
    </MyToolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const MyTable = () => {
  const dispatch = useDispatch();

  const { schedules, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.schedule
  );
  const { user } = useSelector((state) => state.user);

  if (isSuccess) {
  }

  useEffect(() => {
    dispatch(getSchedules(user));
  }, [dispatch]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleOnDelete = () => {
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - schedules.data.length)
      : 0;
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  function stringName(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <MyPaper>
        <EnhancedTableToolbar numSelected={selected.length} onDelete={handleOnDelete}/>
        <MyTableContainer>
          <MyBigTable aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={schedules.data.length}
            />
            <TableBody>
              {stableSort(schedules.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Typography>{row.points[0]}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {row.points[row.points.length - 1]}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {row.points
                            .filter((element, index, array) => {
                              if (index !== array.length - 1 && index !== 0) {
                                return element;
                              }
                            })
                            .join(" - ")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography>{row.numberOfPassengers}</Typography>
                      </TableCell>
                      <TableCell>
                        <Grid container>
                          <Grid lg={12} align="center">
                            <Avatar {...stringName(row.driver)} />
                          </Grid>
                          <Grid lg={12} align="center">
                            <Typography style={{ color: "#1C3144" }}>
                              {row.driver}
                            </Typography>
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {moment(row.startDateTime).format(
                            "DD/MM/YYYY, HH:MM a"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {moment(row.endDateTime).format(
                            "DD/MM/YYYY, HH:MM a"
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MyBigTable>
        </MyTableContainer>
        <MyTablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={schedules.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MyPaper>
    </Box>
  );
};

export default MyTable;
