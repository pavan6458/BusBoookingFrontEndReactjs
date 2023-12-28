import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiUrl from "../../../constants/projectConstants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

function Bookings() {
    const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [fetchedRows, setFetchedRows] = useState([]);
  const data = useLocation().state;

  useEffect(() => {
    getAllBookedPassangers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllBookedPassangers = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiIsInN1YiI6Imp3dFRva2VuIiwiaWQiOjU3MjE4MzQzMywiaWF0IjoxNzAyODM4NDE5LCJleHAiOjE3MDUyNTc2MTl9.wLcOI8rNECPAaLEHtyldYX_yyoh-6F08cUqAJXO52Zo"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      apiUrl +
        `api/bus/passangers/ListOfScheduledPassangers/${data.scheduleid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if ((result.StatusCode = "OK")) {
          setFetchedRows(result.Response);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold  text-[30px] pl-4 py-3">
          Bus Schedule Details
        </h1>
     
      </div>
      <div className="px-[70px]">
        <Paper>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead className="bg-gray-300">
                <TableRow>
                  <TableCell>Seat Number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Gender </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="space-y-1">
                {fetchedRows.reverse()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  
                  .map((row, index) => {
  
                    return (
                      <TableRow
                        key={row.seatNumber}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="py-3" component="th" scope="row">
                          {row.seatNumber}
                        </TableCell>
                        <TableCell className="py-3" component="th" scope="row">
                          {row.firstName}
                        </TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">
                          {row.gender}
                        </TableCell>
                  
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={fetchedRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

    </>
  );
}

export default Bookings;
