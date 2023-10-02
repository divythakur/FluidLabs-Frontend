import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./table.css";

export default function ListTable({ rows, fetchData, loading, error }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchText,setSearchText] =useState(null)

  const handleChangePage = (event, newPage) => {
    fetchData(rowsPerPage, newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchData(parseInt(event.target.value, 10), 0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = (e) => {
    if (e.target.value.trim() == "") {
      fetchData(10, 0);
    } else {
       const fetchParams = `&${selectedFilter}=${e.target.value}`;
       setPage(0);
      setRowsPerPage(10);

      fetchData(10, 0, fetchParams);
    }
    setSearchText(e.target.value)
  };

  return (
    <TableContainer component={Paper}>
      <div>
        <Select
          className="select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedFilter}
          label="Select Filter"
          onChange={(e) => {
            setSearchText("")
            fetchData(10, 0);


            setSelectedFilter(e.target.value);
          }}
        >
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"country"}>Country</MenuItem>
        </Select>

        {selectedFilter != null && (
          <TextField
            autoComplete="given-name"
            required
            className="textbox"
            placeholder={`Search for ${selectedFilter}`}
            id="search"
            label="Search Box"
            autoFocus
            value={searchText}
            onChange={handleSearch}
          />
        )}
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Country&nbsp;(g)</TableCell>
            <TableCell align="left">Code&nbsp;(g)</TableCell>

            <TableCell align="left">Url link&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {loading && !error && (
              <TableRow>
                <CircularProgress />
              </TableRow>
            )}
            {error && (
              <TableRow>
                <Alert severity="error">Something Went Wrong!!</Alert>
              </TableRow>
            )}
            {!loading &&
              !error &&
              rows?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.country}</TableCell>
                  <TableCell align="left">{row.alpha_two_code}</TableCell>
                  <TableCell align="left">
                    <a href={row.web_pages[0]}>{row.web_pages[0]}</a>
                  </TableCell>
                </TableRow>
              ))}
            {!loading && !error && rows.length >= 10 && (
              <TableRow>
                <TablePagination
                  component="div"
                  count={100}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            )}
          </>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
