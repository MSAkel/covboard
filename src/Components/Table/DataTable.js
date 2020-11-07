import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import './DataTable.css';
import EnhancedTableHead from '../EnhancedTableHead';

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
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 8
  },
  table: {
    maxHeight: 750,
    backgroundColor: "#385388",
    borderRadius: 8
  }
}));

function DataTable({countries}) {
  const classes = useStyles();
  const [rows, setRows] = useState([])
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("confirmed");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const columns = [
    { id: 'country', label: 'Country', minWidth: 260},
    { 
      id: 'confirmed', 
      label: 'Confirmed',
      numeric: true,
    },
    { 
      id: 'daily_confirmed', 
      label: 'Confirmed Today',
      numeric: true,
    },
    {
      id: 'recovered',
      label: 'Recovered',
      numeric: true,
    },
    {
      id: 'active',
      label: 'Active',
      numeric: true,
    },
    {
      id: 'critical',
      label: 'Critical',
      numeric: true,
    },
    {
      id: 'deaths',
      label: 'Deaths',
      numeric: true,
    },
    { 
      id: 'daily_deaths', 
      label: 'Deaths Today',
      numeric: true,
      // minWidth: 40,
      // format: (value) => value,
      // customSort: (a, b) => a.daily_deaths.length - b.daily_deaths.length
    },
  ];

  const createData = () => {
    const list = []
    countries.forEach(country => {
      if(!country.state && country.country){
      const info = {
        country: country.country,
        confirmed: country.confirmed,
        daily_confirmed: country.daily_confirmed,
        recovered: country.recovered,
        active: country.confirmed - (country.recovered + country.deaths) ,
        critical: country.critical,
        deaths: country.deaths,
        daily_deaths: country.daily_deaths
      }
      list.push(info)
    }
    })
    setRows(list)
  }

  const checkData = data => {
    if(data !== -1 && data !== 0){
      return data.toLocaleString()
    } else {
      return 'No Data'
    }
  }

  useEffect(() => {
    createData()
  }, [countries])
  
  return (
    <div className="table-container">
      <Paper className={classes.paper}>
        <TableContainer className={classes.table}>
          <Table
            stickyHeader 
            size="small"
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={columns}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row) => {
                  return (
                    <TableRow tabIndex={-1} key={row.country}>
                      <TableCell align="left">{row.country}</TableCell>
                      <TableCell align="left">{checkData(row.confirmed)}</TableCell>
                      <TableCell align="left">{checkData(row.daily_confirmed)}</TableCell>
                      <TableCell align="left">{checkData(row.recovered)}</TableCell>
                      <TableCell align="left">{checkData(row.active)}</TableCell>
                      <TableCell align="left">{checkData(row.critical)}</TableCell>
                      <TableCell align="left">{checkData(row.deaths)}</TableCell>
                      <TableCell align="left">{checkData(row.daily_deaths)}</TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default DataTable;
