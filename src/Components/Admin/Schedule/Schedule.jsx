import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import apiUrl from "../../../constants/projectConstants";
import ViewBusModal from "./ViewBusModal";
import CreateScheduleModal from "./CreateScheduleModal";
import { useNavigate } from "react-router-dom";

export default function Schedule() {
  const id = sessionStorage.getItem("id");
  const [fetchedRows, setFetchedRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [scheduleModal, setScheduleModal] = React.useState(false);
  const [modalData, setModalData] = useState();
  const navigate = useNavigate();
  const handleOpen = (e, data) => {
    e.preventDefault();
    setModalData(data);
    console.log("modalDatadata", data);
    setOpen(true);
    console.log("modalData", modalData);
  };

  
  const handleClose = () => {setOpen(false);
  setScheduleModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiIsInN1YiI6Imp3dFRva2VuIiwiaWQiOjE3Mjc0NTYzOSwiaWF0IjoxNzAyNzIyMjYyLCJleHAiOjE3MDUxNDE0NjJ9.Haj2L89N5H8nyF4sio0pkLiRCLEoEOoVrJkc65Uy26A"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(apiUrl + `api/bus/scheudle/All/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setFetchedRows(result.Response))
      .catch((error) => console.log("error", error));
  }, []);
  const convertTimeStamp = (date1) => {
    const date = new Date(date1);

    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return {
      date: `${day.toString()} ${monthName.substring(0, 3)}`,
      time: `${hours}:${minutes}`,
    };
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold  text-[30px] pl-4 py-3">
          Bus Schedule Details
        </h1>
        <button className="border-1 border-gray-600 bg-blue-500  rounded h-[30px] px-2 text-white active:bg-black mr-[20px] font-bold "
        onClick={()=>setScheduleModal(true)}
        >
          Create Schedule
        </button>
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
                  <TableCell>Schedule id</TableCell>
                  <TableCell>Bus Name</TableCell>
                  <TableCell align="right">Origin</TableCell>
                  <TableCell align="right">Destination </TableCell>
                  <TableCell align="right">Arrival Time </TableCell>
                

                  <TableCell align="right">Departure Time </TableCell>
                  <TableCell align="right">Status </TableCell>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="space-y-1">
                {fetchedRows.reverse()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                
                  .map((row, index) => {
                    const arrivalTime1 = convertTimeStamp(row.arrivalTime);
                    const departureTime1 = convertTimeStamp(row.departureTime);
                    const updatedrow = {
                      ...row,
                      arrivalTime: arrivalTime1,
                      departureTime: departureTime1,
                    };
                
                    return (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="py-3" component="th" scope="row">
                          {updatedrow.id}
                        </TableCell>
                        <TableCell className="py-3" component="th" scope="row">
                          {updatedrow.bus.busName}
                        </TableCell>
                        <TableCell align="right">{updatedrow.origin}</TableCell>
                        <TableCell align="right">
                          {updatedrow.destination}
                        </TableCell>
                        <TableCell align="right">
                          {updatedrow.arrivalTime.date}{" "}
                          {updatedrow.arrivalTime.time}{" "}
                        </TableCell>
                        <TableCell align="right">
                          {updatedrow.departureTime.date}{" "}
                          {updatedrow.departureTime.time}
                        </TableCell>
                         <TableCell align="right">
                          {updatedrow.departureTime.date}{" "}
                          {updatedrow.departureTime.time}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="w-full bg-blue-500 text-white px-2 py-1 rounded font-bold active:bg-black active:text-white"
                            onClick={(e) => handleOpen(e, updatedrow)}
                          >
                            View
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          <button
                            className="w-full bg-blue-500 text-white px-1 py-1 rounded font-bold active:bg-black active:text-white"
                            onClick={(e) => navigate("/booking",{state:{scheduleid:updatedrow.id}})}
                          >
                            Bookings
                          </button>
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
      <ViewBusModal modalData = {modalData} open={open} handleClose ={handleClose}/>
      <CreateScheduleModal  open={scheduleModal} handleClose ={handleClose}/>

    </>
  );
}
